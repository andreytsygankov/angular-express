import {getProductRepository, Product} from "./model";
import {GraphQLID, GraphQLList, GraphQLUnionType} from "graphql";
import {productType} from "./query";

const { GraphQLObjectType, GraphQLString} = require('graphql');


export const subscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        products: {
            type: GraphQLList(productType),
            resolve: async function  () {
                const repository = await getProductRepository();
                let allProducts = await repository.find();
                return allProducts;
            }
        }
    }
});

