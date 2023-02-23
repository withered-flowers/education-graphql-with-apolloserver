const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// Import package
const {
  typeDefs: bookTypeDefs,
  resolvers: bookResolvers,
} = require("./schemas/book");

const {
  typeDefs: todoTypeDefs,
  resolvers: todoResolvers,
} = require("./schemas/todo");

const {
  typeDefs: colorTypeDefs,
  resolvers: colorResolvers,
} = require("./schemas/color");

(async () => {
  // Define Server
  const server = new ApolloServer({
    // Jadi typeDefs di sini bisa menerima array
    typeDefs: [bookTypeDefs, todoTypeDefs, colorTypeDefs],
    // sama seperti typeDefs, resolvers juga bisa menerima array
    resolvers: [bookResolvers, todoResolvers, colorResolvers],
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
