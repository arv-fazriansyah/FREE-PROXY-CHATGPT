# FREE-PROXY-CHATGPT

![Cloudflare](https://www.cloudflare.com/img/logo-cloudflare-dark.svg)

![Cloudflare](https://img.shields.io/badge/Platform-Cloudflare-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)
![Lisensi](https://img.shields.io/badge/Lisensi-MIT-green)

Ini adalah proyek untuk mengelola pengguna menggunakan Cloudflare Workers. Skrip ini memungkinkan Anda untuk melakukan berbagai tindakan seperti registrasi pengguna, menghapus pengguna, mengatur ulang token pengguna, dan lainnya.

## Cara Menggunakan

1. Pastikan Anda memiliki akun Cloudflare dan akses ke layanan Cloudflare Workers.

2. Salin seluruh konten skrip `worker.js` ke Cloudflare Workers Anda. Anda dapat melakukannya melalui dashboard Cloudflare atau dengan menggunakan [Cloudflare CLI](https://developers.cloudflare.com/workers/cli-wrangler).

3. Setel variabel lingkungan yang diperlukan. Pastikan untuk mengatur variabel `ACCESS_TOKEN` dan `API_KEY` jika diperlukan.

4. Simpan perubahan Anda.

5. Gunakan URL worker yang telah Anda setel sebagai endpoint untuk melakukan tindakan manajemen pengguna melalui API HTTP.

## Endpoints API

Berikut adalah daftar endpoints API yang dapat Anda akses:

- `/<token>/register/<nama_pengguna>`: Mendaftarkan pengguna baru.
- `/<token>/reset/<nama_pengguna>`: Mengatur ulang token pengguna.
- `/<token>/delete/<nama_pengguna>`: Menghapus pengguna.
- `/<token>/info` : Mendapatkan informasi tentang semua pengguna.

Pastikan untuk mengganti `<token>` dengan token akses yang Anda atur dalam variabel lingkungan.

## Kontribusi

Anda dipersilakan untuk berkontribusi pada proyek ini. Silakan buat permintaan tarik (pull request) dengan perbaikan atau fitur baru yang Anda tambahkan.

## Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).

---

Proyek ini dibuat dengan cinta oleh [Nama Anda]. Silakan hubungi kami jika Anda memiliki pertanyaan atau saran.
