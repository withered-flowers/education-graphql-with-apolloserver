const HOST = "http://localhost:3001";
const axios = require("axios");

// Define Schema (Type Definition)
const typeDefs = `#graphql
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

  type Query {  
    # Di sini kita mencoba untuk membuat sebuah Query dengan nama "getAllColors"
    # Kembaliannya berupa array of Color
    getAllColors: [Color]
  }

  type Mutation {
    # Karena di sini tipe kembaliannya berupa statusCode dan message
    # Maka dibentuk dalam sebuah type yang baru bernama
    # ColorDeleteResult
    deleteColor(id: Int!): ColorDeleteResult
  }
`;

// Define Resolver
const resolvers = {
  Query: {
    getAllColors: async () => {
      // Jangan lupa bila nanti ada cache, gunakan strategi cache (redis)
      // di sini yah
      const { data } = await axios.get(`${HOST}/colors`);
      return data.data;
    },
  },
  Mutation: {
    // Ini untuk yang delete Color
    deleteColor: async (_, { id }) => {
      const { data } = await axios.delete(`${HOST}/colors/${id}`);
      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
