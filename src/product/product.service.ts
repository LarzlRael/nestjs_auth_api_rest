import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductoDTO } from './dto/producto.dto';
import { Product } from './interfaces/producto.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productoModel: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productoModel.find();
    return products;
  }
  async getProduct(productiId: string): Promise<Product> {
    const product = await this.productoModel.findById(productiId);
    return product;
  }
  async createProduct(createProductDTO): Promise<Product> {
    const product = new this.productoModel(createProductDTO);
    return await product.save();
  }
  async deleteProduct(productiId: string): Promise<Product> {
    const deleteProduct = await this.productoModel.findByIdAndDelete(
      productiId,
    );
    return deleteProduct;
  }
  async updateProduct(
    productId: string,
    createProductoDTO: CreateProductoDTO,
  ): Promise<Product> {
    const updateProduct = await this.productoModel.findByIdAndUpdate(
      productId,
      createProductoDTO,
      { new: true },
    );
    return updateProduct;
  }
}
