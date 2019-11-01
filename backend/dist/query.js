"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const graphql_1 = require("graphql");
const { GraphQLObjectType, GraphQLString } = require('graphql');
exports.productType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        stock: { type: GraphQLString }
    }
});
exports.queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        products: {
            type: graphql_1.GraphQLList(exports.productType),
            resolve: function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const repository = yield model_1.getProductRepository();
                    let allProducts = yield repository.find();
                    return allProducts;
                });
            }
        },
        product: {
            type: exports.productType,
            args: {
                id: { type: GraphQLString },
            },
            resolve: function (args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const repository = yield model_1.getProductRepository();
                    let product = yield repository.find({ id: args.id });
                    return product;
                });
            }
        }
    }
});
