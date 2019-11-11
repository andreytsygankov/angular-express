import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
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

export const GET_PRODUCTS_SUBSCRIBE = gql`
  subscription products{
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

export const CREATE_PRODUCT = gql`
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

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $name: String!, $description: String!, $sku: String!, $price: String!, $stock: String!) {
    updateProduct(id: $id, name: $name, description: $description, sku: $sku, price: $price, stock: $stock){
       id
       name
       sku
       description
       price
       stock
    }
  }
`;

export const DELETE_PRODUCT = gql`
  query deleteProduct($id: ID!){
    deleteProduct(id: $id) 
  }
`;