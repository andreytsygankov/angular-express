import {getProductRepository, Product} from "./model";
import {GraphQLID, GraphQLList, GraphQLUnionType} from "graphql";
import {productType} from "./query";

const { GraphQLObjectType, GraphQLString} = require('graphql');

export const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createProduct: {
            type: productType,
            args: {
                name: { type: GraphQLString },
                sku: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                stock: { type: GraphQLString }
            },
            resolve: async function (root, param) {
                const repository = await getProductRepository();
                const product = new Product();
                product.name = param.name;
                product.sku = param.sku;
                product.description = param.description;
                product.price = Number.parseFloat(param.price);
                product.stock = Number.parseInt(param.stock);

                const result = await repository.save(product);
                return result;
            }
        },
        updateProduct: {
            type: productType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                sku: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                stock: { type: GraphQLString }
            },
            resolve: async function (root, param) {
                const repository = await getProductRepository();
                const product = await repository.findOne({id: param.id});
                product.name = param.name;
                product.sku = param.sku;
                product.description = param.description;
                product.price = Number.parseFloat(param.price);
                product.stock = Number.parseInt(param.stock);

                let result = await repository.save(product);
                return result;
            }
        }
    }
});

