import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    displayedColumns: string[] = ['name', 'sku', 'description', 'price', 'stock', 'edit', 'delete'];
    dataSource = new MatTableDataSource<any>();

    selectedProduct: Product = new Product();
    loading = false;
    data;
    currentData;

    constructor(public productService: ProductsService) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh(data?) {
        this.loading = true;
        if(data) {
            this.currentData = this.currentData.filter(item => item.id !== data);
            this.dataSource.data = this.currentData;
            this.loading = false;
        } else {
            this.productService.getProducts().subscribe(res => {
                this.data = res;
                this.currentData = this.data.data.products;
                this.dataSource.data = this.currentData;
                this.loading = false;
            });
        }
    }

    updateProduct() {
        if (this.selectedProduct.id !== undefined) {
            this.productService.updateProduct(this.selectedProduct).subscribe(res => {
                console.log(res);
            });
        } else {
            this.productService.createProducts(this.selectedProduct).subscribe(res => {
                let data = res.data;
                console.log(res);
                // this.currentData.push(data.createProduct);
            });
        }
        this.selectedProduct = new Product();
        this.refresh();
    }

    editProduct(product: Product) {
        this.selectedProduct = product;
    }

    clearProduct() {
        this.selectedProduct = new Product();
    }

    deleteProduct(product: Product) {
        this.loading = true;
        if (confirm(`Are you sure you want to delete the product ${product.name}. This cannot be undone.`)) {
            this.productService.deleteProduct(product.id).subscribe(res => {
                console.log(res);
            });
            this.refresh(product.id);
        }
    }

}
