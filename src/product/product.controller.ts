import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  Param,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateProductoDTO } from './dto/producto.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('/create')
  async createPost(@Res() res, @Body() createProductoDto: CreateProductoDTO) {
    const product = await this.productService.createProduct(createProductoDto);
    return res.status(HttpStatus.OK).json({
      message: 'producto succesfully create',
      product: product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      productDeleted,
    });
  }

  // Update Product: /update?productID=5c9d45e705ea4843c8d0e8f7
  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductoDTO,
    @Query('productID') productID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully',
      updatedProduct,
    });
  }
}
