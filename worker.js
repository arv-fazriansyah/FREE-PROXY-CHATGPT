async function handleRequest(request, env) {
  const { pathname } = new URL(request.url);
  const [_, token, action, user] = pathname.split('/');

  if (/^v\d+$/.test(token)) {
    return proxy(request, env);
  }

  if (token !== env.ACCESS_TOKEN) {
    throw new Error('Access forbidden');
  }

  console.log('Accessing master handler');

  let result;

  try {
    switch (action) {
      case 'delete':
        result = await deleteUser(user, env);
        break;
      case 'register':
        result = await registerUser(user, env);
        break;
      case 'reset':
        result = await resetUserToken(user, env);
        break;
      case 'info':
        if (user) {
          result = await getUserInfo(user, env);
        } else {
          result = await getAllUsersInfo(env);
        }
        break;
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    throw new Error(error.message || 'Unknown reason');
  }

  if (!result) {
    throw new Error('Invalid action');
  }

  return new Response(result, {
    headers: { 'Content-Type': 'application/json' },
  });
}

async function proxy(request, env) {
  const headers = new Headers(request.headers);
  const authKey = 'Authorization';
  const token = headers.get(authKey)?.split(' ').pop();

  if (!token) {
    throw new Error('Auth required');
  }

  const users = await env.KV.list();
  let name;

  for (const user of users.keys) {
    const userData = await env.KV.get(user.name, { type: 'json' });

    if (userData && userData.key === token) {
      name = user.name;
      break;
    }
  }

  if (!name) {
    throw new Error('Invalid token');
  }

  console.log(`User ${name} accepted.`);

  const url = new URL(request.url);
  url.host = env.URL_HOST.replace(/^https?:\/\//, '');

  if (env.API_KEY) {
    headers.set(authKey, `Bearer ${env.API_KEY}`);
  }

  const requestBody =
    request.method !== 'GET' ? JSON.stringify(await request.json()) : null;

  return fetch(url, {
    method: request.method,
    headers,
    body: requestBody,
    redirect: 'follow',
  });
}

async function registerUser(user, env) {
  if (!user?.length) {
    throw new Error('Invalid username');
  }

  const existingUserData = await env.KV.get(user, { type: 'json' });

  if (existingUserData) {
    return 'User already exists';
  }

  const key = generateAPIKey();
  const userData = { key };

  await env.KV.put(user, JSON.stringify(userData));

  return key;
}

async function resetUserToken(user, env) {
  if (!user?.length) {
    throw new Error('Invalid username');
  }

  const existingUserData = await env.KV.get(user, { type: 'json' });

  if (!existingUserData) {
    throw new Error('User not found');
  }

  const key = generateAPIKey();
  existingUserData.key = key;

  await env.KV.put(user, JSON.stringify(existingUserData));

  return key;
}

async function deleteUser(user, env) {
  if (!user?.length) {
    throw new Error('Invalid username');
  }

  const userData = await env.KV.get(user, { type: 'json' });

  if (!userData) {
    throw new Error('User not found');
  }

  await env.KV.delete(user);

  return 'User deleted';
}

async function getUserInfo(user, env, getAll = false) {
  if (!user?.length) {
    throw new Error('Invalid username');
  }

  const userData = await env.KV.get(user, { type: 'json' });

  if (!userData) {
    throw new Error('User not found');
  }

  if (getAll) {
    return JSON.stringify([{ user, key: userData.key }]);
  } else {
    return JSON.stringify({ user, key: userData.key });
  }
}

async function getAllUsersInfo(env) {
  const users = await env.KV.list();
  const allUserInfo = [];

  for (const user of users.keys) {
    const userData = await env.KV.get(user.name, { type: 'json' });
    if (userData) {
      allUserInfo.push({ user: user.name, key: userData.key });
    }
  }

  return JSON.stringify(allUserInfo);
}

function generateAPIKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = 'arv-';

  for (let i = 0; i < 45; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    apiKey += characters.charAt(randomIndex);
  }

  return apiKey;
}

export default {
  async fetch(request, env) {
    try {
      return await handleRequest(request, env);
    } catch (err) {
      return new Response(err.message || 'Unknown reason', { status: 403 });
    }
  },
};
