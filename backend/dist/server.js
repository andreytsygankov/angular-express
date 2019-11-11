"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bearerToken = require('express-bearer-token');
const auth_1 = require("./auth");
const graphql_1 = require("graphql");
const graphqlHTTP = require("express-graphql");
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const subscribe_1 = require("./subscribe");
const schema = new graphql_1.GraphQLSchema({
    query: query_1.queryType,
    mutation: mutation_1.mutationType,
    subscription: subscribe_1.subscriptionType
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());
app.use(auth_1.oktaAuth);
// app.use(productRouter);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4201, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log('My Node App listening on port 4201');
});
