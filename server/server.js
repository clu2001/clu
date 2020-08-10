const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
{/***********************************************************************/}

// mongoose connection 
mongoose.connect('mongodb://localhost/form', {useNewUrlParser: true, useUnifiedTopology: true });

// make a schema 


// see if mongoose connection is successful 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const typeDefs = gql`
  type Query {
    hello: String
    raeSremmurd(songName: String): String
  }

  type Music {
      success: Boolean
  }

`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    raeSremmurd: (_, { songName } ) => `${ songName }`
  },

  Music: {
    success: false, 
  }
  
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);