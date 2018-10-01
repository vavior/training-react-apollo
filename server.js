const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// This allows us to use different variables for those entries we provided in our env file
require('dotenv').config({ path: 'variables.env' });

// Schemas (Mongoose models)
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Create GraphQL schema
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// Connects to the DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { console.log('db connected' )})
    .catch(err => console.error(err));

// Initializes the app
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // this enables ApolloClient to work correctly
};
app.use(cors(corsOptions));

// Create GraphiQL app
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Connect schemas (mongoose models) with GraphQL
app.use(
    '/graphql', 
    bodyParser.json(), // We'll need it for our json requests and responses.
    graphqlExpress({
        schema,
        context: {
            Recipe,
            User
        }
    })
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
});