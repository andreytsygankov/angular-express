import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Product } from '../models/product';
import {Apollo, QueryRef} from "apollo-angular";
import {
    CREATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_SUBSCRIBE,
    UPDATE_PRODUCT
} from "../models/product-graphql.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    constructor(public oktaAuth: OktaAuthService, private http: HttpClient, private apollo: Apollo) {}

    private query(query, variables?, data?: any) {

        console.log(query);
        const result = this.apollo.watchQuery({
            query: query,
            variables: variables
        });
        return new Promise<any>((resolve, reject) => {
            result.valueChanges.subscribe(resolve as any, reject as any);
        });
    }

    private mutation(query, variables?, data?: any) {

        console.log(query);
        const result = this.apollo.mutate({
            mutation: query,
            variables: variables
        });
        return new Promise<any>((resolve, reject) => {
            result.subscribe(resolve as any, reject as any);
        });
    }

    private subscription(query, variables?, data?: any) {

        console.log(query);
        const result = this.apollo.subscribe({
            query: query
        });
        return new Promise<any>((resolve, reject) => {
            result.subscribe(resolve as any, reject as any);
        });
    }

    getProducts() {
        // return this.query(GET_PRODUCTS);
        return this.subscription(GET_PRODUCTS_SUBSCRIBE);
    }

    createProduct(product: Product) {
        return this.mutation(CREATE_PRODUCT, product)
    }

    updateProduct(product: Product) {
        return this.mutation(UPDATE_PRODUCT, product)
    }

    deleteProduct(id: string) {
        return this.query(DELETE_PRODUCT, {id: id});
    }
}
