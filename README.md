# FREE PROXY CHATGPT

![Cloudflare](https://www.cloudflare.com/img/logo-cloudflare-dark.svg)

![Cloudflare](https://img.shields.io/badge/Platform-Cloudflare-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

Ini adalah proyek untuk mengelola pengguna menggunakan Cloudflare Workers. Skrip ini memungkinkan Anda untuk melakukan berbagai tindakan seperti registrasi pengguna, menghapus pengguna, mengatur ulang token pengguna, dan lainnya.

## Penggunaan

Untuk menggunakan proyek ini, Anda perlu melakukan beberapa langkah:

1. **Setup Worker di Cloudflare**

   - Pastikan Anda memiliki akun Cloudflare.
   - Buat Worker baru di dashboard Cloudflare dan salin script `worker.js` ini ke dalam editor kode Worker Anda.
   - Binding KV

2. **Konfigurasi Variabel Lingkungan**

   - Anda perlu mengatur beberapa variabel lingkungan yang dibutuhkan oleh skrip. Berikut adalah variabel yang perlu diatur:

     - `ACCESS_TOKEN`: Token akses yang diperlukan untuk otorisasi permintaan.
     - `URL_HOST`: Host URL yang akan menjadi tujuan permintaan yang diforward oleh Worker.
     - `API_KEY` (opsional): API key jika diperlukan untuk autentikasi ke host URL.

3. **Menggunakan Worker**

   - Proyek ini memungkinkan Anda untuk melakukan beberapa tindakan berdasarkan permintaan yang diterima, seperti:

     - `/{token}/delete/{user}`: Menghapus pengguna.
     - `/{token}/register/{user}`: Mendaftarkan pengguna baru dan memberikan kunci API.
     - `/{token}/reset/{user}`: Mengatur ulang kunci API pengguna.
     - `/{token}/info/{user}`: Mendapatkan informasi pengguna atau `/{token}/info` untuk mendapatkan informasi semua pengguna.

## Kontribusi

Anda dipersilakan untuk berkontribusi pada proyek ini. Silakan buat permintaan tarik (pull request) dengan perbaikan atau fitur baru yang Anda tambahkan.

---

Silakan hubungi kami jika Anda memiliki pertanyaan atau saran.
