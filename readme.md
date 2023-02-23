# Education GraphQL with Apollo Server

## Table of Content

- Intro to GraphQL
- Apa itu GraphQL
- Apollo GraphQL
- Let's Code

### Intro GraphSQL

Sebelumnya kita sudah mempelajari suatu protokol untuk menjalankan API, yang bernama REST API. Setelah kita pakai beberapa lama, kita menemukan suatu masalah: `REST API` ternyata tidak sefleksibel yang dikira.

Oleh sebab itu pada pembelajaran hari ini kita akan belajar tentang protokol lainnya yang bernama `GraphQL`

### Apa itu GraphQL

GraphQL adalah sebuah bahasa query untuk API yang diciptakan oleh Facebook (Meta). GraphQL memungkinkan klien untuk mendefinisikan struktur permintaan data yang diinginkan dan mendapatkan respons hanya untuk data tersebut.

GraphQL juga memungkinkan pengembang untuk mengekspose banyak sumber daya data sebagai satu API, yang membuat penggunaan API menjadi lebih sederhana dan intuitif.

Perbedaannya dengan REST adalah:

- Pada REST, menggunakan HTTP Method yang terstruktur (GET POST PUT PATCH DELETE), Pada GraphQL, yang digunakan adalah `Query` (setara GET) dan `Mutation` (untuk POST PUT PATCH DELETE)
- Dalam REST, klien harus membuat permintaan yang spesifik untuk setiap sumber daya yang ingin diambil atau dimanipulasi, sementara dalam GraphQL, klien dapat membuat permintaan yang lebih kompleks dan spesifik hanya dalam satu permintaan.

Karena setting awal untuk GraphQL yang cukup sulit, oleh karena itu kita akan menggunakan Provider untuk GraphQL yang bernama Apollo GraphQL.

### Apollo GraphQL

Apollo GraphQL adalah sebuah platform yang menyediakan berbagai alat untuk membangun aplikasi berbasis GraphQL. Platform ini menyediakan klien GraphQL untuk bahasa pemrograman seperti JavaScript, iOS, dan Android, serta server GraphQL yang dapat diintegrasikan dengan berbagai teknologi back-end.

GraphQL dan Apollo GraphQL saling terkait, **namun tidak sama**. GraphQL adalah bahasa query untuk API, sedangkan Apollo GraphQL adalah platform yang menyediakan berbagai alat untuk membangun aplikasi berbasis GraphQL.

### Let's Code
