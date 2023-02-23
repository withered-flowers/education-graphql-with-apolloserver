// Dummy Data untuk Resolver
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = `#graphql
  # Komentar di dalam GraphQL diawali dengan tanda hashtag / kres (#).

  # Ini adalah tipe data yang digunakan dalam GraphQL ini
  # Istilahnya adalah "Type Definition"
  type Book {
    title: String
    author: String
  }

  # type "Query" ini bersifat spesial:
  # - Melisting seluruh Query yang bisa digunakan oleh client
  # - Memberitahukan kembalian data yang digunakan untuk tiap Query yang ada
  type Query {
    # Pada query di bawah ini dinyatakan bahwa:
    # - GraphQL akan memiliki sebuah query dengan nama "books"
    # - Kembaliannya berupa array of type Book yang didefinisikan di type Book di atas
    books: [Book]
    
    # Di sini kita mencoba untuk membuat sebuah Query dengan nama "balikinAngka"
    # Kembaliannya berupa suatu angka
    balikinAngka: Int
  }
`;

const resolvers = {
  Query: {
    // Di sini Query books akan mengembalikan dummy data books yang didefine di atas
    books: () => books,

    // Di sini Query balikinAngka akan mengembalikan angka 6 saja
    balikinAngka: () => {
      return 6;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
