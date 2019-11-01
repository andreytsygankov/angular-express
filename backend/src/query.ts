import {getProductRepository, Product} from "./model";
import {GraphQLID, GraphQLList, GraphQLUnionType} from "graphql";

const { GraphQLObjectType, GraphQLString} = require('graphql');

export const productType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        stock: { type: GraphQLString }
    }
});

export const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        products: {
            type: GraphQLList(productType),
            resolve: async function  () {
                const repository = await getProductRepository();
                let allProducts = await repository.find();
                return allProducts;
            }
        },
        deleteProduct: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLID },
            },
            resolve: async function (root, param) {
                const repository = await getProductRepository();
                await repository.delete({id: param.id});
                return 'OK';
            }
        }
    }
});

