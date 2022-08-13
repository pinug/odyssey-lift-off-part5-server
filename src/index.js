const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginUsageReporting } = require("apollo-server-core");
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

async function startApolloServer(typeDefs, resolvers) {

  const graphRef = "Catstronauts-Lift-off-hiasip@current";
  const key = "service:Catstronauts-Lift-off-hiasip:DBQSrvZTRAJ-qZDewewRJQ";

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
    /*
    // Apollo Client ta belirlediğin ayarlara göre
    // buradan yani apollo server dan çekiyorsun bu bilgileri
    // buradan da apollo studio da tracing report olarak göreceksin
    // hangi query nereden yapılmış vb web, mobile vb..tabi birden fazla server olabilir her biri için
    // çünkü burada "web" diye apollo client da biz belirledik
    // veya 2 server değil, header dan web,mobile vb nereden geliyorsa onun bilgisini
    // header dan çekip apollo client a aktarabiliriz
    // sonra apollo studio 2 farklı gösterim yapıyor mu kendisi ayarlıyor mu bilmiyorum tabi..
    // sanırım apollo support gerekiyor "client awareness" istiyorum diye istek yolluyorsun ?
    // bu sayede hangi query hangi client da error vermiş vb diagnosis yapabiliyorsun
    // yani client lar farklı field ları kullanabilir bunları gösteren vb bilgiler "client awareness" oluyor
    // schema dan yaptığın herhangi bir değişiklik, resolver veya data source (rest api vb) de de
    // değişikliğe neden olur genelde.
    // APOLLO_KEY/APOLLO_GRAPH_REF değerlerini istiyor bunun için
    // sandbox yani localhost da çalışmıyor sanırım...
    apollo: {key, graphRef},
    plugins: [
      ApolloServerPluginUsageReporting({
        generateClientInfo: ({ request }) => {
          // userSuppliedLogic i kendin yazman lazım..
          const { clientName, clientVersion } = userSuppliedLogic(request);
          return {
            clientName,
            clientVersion
          };
        }
      })
    ],
    */

  });

  // const { url, port } = await server.listen();

  const { url, port } = await server.listen({port: process.env.PORT || 4000});

  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
