const HOST = "http://localhost:3000";
const axios = require("axios");

const typeDefs = `#graphql
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

  type Query {
    # Di sini kita mencoba untuk membuat sebuah Query dengan nama "getAllTodos"
    # Kembaliannya berupa array of Todo
    getAllTodos: [Todo]
  }

  # type "Mutation" ini bersifat spesial:
  # - Melisting seluruh Mutation (DELETE PATCH POST PUT)
  # - Memberitahukan kembalian data yang digunakan untuk tiap Mutation yang ada
  type Mutation {
    # Karena di sini tipe kembaliannya berupa statusCode dan message
    # Maka dibentuk dalam sebuah type yang baru bernama
    # TodoPostResult
    postTodo(name: String!): TodoPostResult
  }
`;

const resolvers = {
  Query: {
    getAllTodos: async () => {
      // Jangan lupa bila nanti harus ada cache, di cache di redis yah !
      const { data } = await axios.get(`${HOST}/todos`);
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
      const { data } = await axios.post(`${HOST}/todos`, {
        name,
      });
      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
