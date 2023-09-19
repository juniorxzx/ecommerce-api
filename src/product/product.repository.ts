import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductRepository {
    private products = [];


    async save(product) {
        this.products.push(product)
        console.log(this.products)
    }

    async get() {
        return this.products

    }
}