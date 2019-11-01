import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Product } from '../products/product';
import {API_PATH} from "../common/constants";
import {Apollo, QueryRef} from "apollo-angular";
import gql from 'graphql-tag';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

const GET_PRODUCTS = gql`
  {
    products { 
       id
       name
       sku
       description
       price
       stock 
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $description: String!, $sku: String!, $price: String!, $stock: String!) {
    createProduct(name: $name, description: $description, sku: $sku, price: $price, stock: $stock){
       id
       name
       sku
       description
       price
       stock
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    private query: QueryRef<any>;
    constructor(public oktaAuth: OktaAuthService, private http: HttpClient, private apollo: Apollo) {}

    private async request(query, variables?, data?: any) {


        const result = this.apollo.watchQuery({
            query: query,
            variables: variables
        });

        return new Promise<any>((resolve, reject) => {
            result.valueChanges.subscribe(resolve as any, reject as any);
        });
    }

    private async mutationRequest(query, variables?, data?: any) {

        console.log(query);
        console.log(variables);
        const result = this.apollo.mutate({
            mutation: query,
            variables: variables
        });

        return new Promise<any>((resolve, reject) => {
            result.subscribe(resolve as any, reject as any);
        });
    }

    getProducts() {
        console.log('1');
        return this.request(GET_PRODUCTS);
    }

    createProduct(product: Product) {
        return this.mutationRequest(CREATE_PRODUCT, product)
    }

    updateProduct(product: Product) {
        console.log('updateProduct ' + JSON.stringify(product));
        // return this.request('post', `${API_PATH.baseUrl}/${API_PATH.product}/${product.id}`, product);
    }

    deleteProduct(id: string) {
        // return this.request('delete', `${API_PATH.baseUrl}/${API_PATH.product}/${id}`);
    }
}
