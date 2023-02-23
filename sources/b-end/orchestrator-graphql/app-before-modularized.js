// Import package
const axios = require("axios");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

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

// Define Schema (Type Definition)
const typeDefs = `#graphql
  # Komentar di dalam GraphQL diawali dengan tanda hashtag / kres (#).

  # Ini adalah tipe data yang digunakan dalam GraphQL ini
  # Istilahnya adalah "Type Definition"
  type Book {
    title: String
    author: String
  }

  type Todo {
    # Notasi tanda seru (!) menyatakan bahwa data tidak boleh kosong
    id: ID!
    name: String
    completed: Boolean
  }

  type TodoPostResult {
    statusCode: Int
    message: String
  }

  type Color {
    id: ID!
    name: String
    year: Int
    color: String
  }

  type ColorDeleteResult {
    statusCode: Int
    message: String
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
    # Di sini kita mencoba untuk membuat sebuah Query dengan nama "getAllTodos"
    # Kembaliannya berupa array of Todo
    getAllTodos: [Todo]
    # Di sini kita mencoba untuk membuat sebuah Query dengan nama "getAllColors"
    # Kembaliannya berupa array of Color
    getAllColors: [Color]
  }

  # type "Mutation" ini bersifat spesial:
  # - Melisting seluruh Mutation (DELETE PATCH POST PUT)
  # - Memberitahukan kembalian data yang digunakan untuk tiap Mutation yang ada
  type Mutation {
    # Karena di sini tipe kembaliannya berupa statusCode dan message
    # Maka dibentuk dalam sebuah type yang baru bernama
    # TodoPostResult
    postTodo(name: String!): TodoPostResult
    
    # Karena di sini tipe kembaliannya berupa statusCode dan message
    # Maka dibentuk dalam sebuah type yang baru bernama
    # ColorDeleteResult
    deleteColor(id: Int!): ColorDeleteResult
  }
`;

// Define Resolver
const resolvers = {
  Query: {
    // Di sini Query books akan mengembalikan dummy data books yang didefine di atas
    books: () => books,
    // Di sini Query balikinAngka akan mengembalikan angka 6 saja
    balikinAngka: () => {
      return 6;
    },
    getAllTodos: async () => {
      // Jangan lupa bila nanti harus ada cache, di cache di redis yah !
      const { data } = await axios.get("http://localhost:3000/todos");
      return data.data;
    },
    getAllColors: async () => {
      // Jangan lupa bila nanti ada cache, gunakan strategi cache (redis)
      // di sini yah
      const { data } = await axios.get("http://localhost:3001/colors");
      return data.data;
    },
  },
  Mutation: {
    // Mutation di sini parameter pertamanya adalah

    // BUKAN DATA yang didefine di type mutation, melainkan mutate function
    // Karena di sini tidak digunakan, akan di-skip
    // (sehingga parameter pertama di functionnya adalah "_")

    // Parameter keduanya adalah Object dari parameter yang didefine
    // di type Mutation, sehingga di bawah ini di-destructuring
    // untuk mendapatkan parameter "name" yang ada di type Mutation
    // untuk postTodo
    postTodo: async (_, { name }) => {
      const { data } = await axios.post("http://localhost:3000/todos", {
        name,
      });
      return data;
    },

    // Ini untuk yang delete Color
    deleteColor: async (_, { id }) => {
      const { data } = await axios.delete(`http://localhost:3001/colors/${id}`);
      return data;
    },
  },
};

(async () => {
  // Define Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Ini supaya kita tetap bisa membuka explorer sekalipun di production
    introspection: true,
    // (in real case yang digunakan adalah sebagai berikut)
    // introspection: process.env.NODE_ENV !== 'production'
  });

  // Start Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
