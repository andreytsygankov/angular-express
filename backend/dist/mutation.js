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
const query_1 = require("./query");
const { GraphQLObjectType, GraphQLString } = require('graphql');
exports.mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createProduct: {
            type: query_1.productType,
            args: {
                name: { type: GraphQLString },
                sku: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                stock: { type: GraphQLString }
            },
            resolve: function (root, param) {
                return __awaiter(this, void 0, void 0, function* () {
                    const repository = yield model_1.getProductRepository();
                    const product = new model_1.Product();
                    product.name = param.name;
                    product.sku = param.sku;
                    product.description = param.description;
                    product.price = Number.parseFloat(param.price);
                    product.stock = Number.parseInt(param.stock);
                    const result = yield repository.save(product);
                    return result;
                });
            }
        },
        updateProduct: {
            type: query_1.productType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: GraphQLString },
                sku: { type: GraphQLString },
                description: { type: GraphQLString },
                price: { type: GraphQLString },
                stock: { type: GraphQLString }
            },
            resolve: function (root, param) {
                return __awaiter(this, void 0, void 0, function* () {
                    const repository = yield model_1.getProductRepository();
                    const product = yield repository.findOne({ id: param.id });
                    product.name = param.name;
                    product.sku = param.sku;
                    product.description = param.description;
                    product.price = Number.parseFloat(param.price);
                    product.stock = Number.parseInt(param.stock);
                    let result = yield repository.save(product);
                    return result;
                });
            }
        }
    }
});
