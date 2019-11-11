import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
const bearerToken = require('express-bearer-token');
import {router as productRouter} from './product'
import {oktaAuth} from './auth'
import {GraphQLSchema} from "graphql";
import graphqlHTTP = require("express-graphql");
import {queryType} from './query';
import {mutationType} from "./mutation";
import {subscriptionType} from "./subscribe";

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
    subscription: subscriptionType
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());
app.use(oktaAuth);
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