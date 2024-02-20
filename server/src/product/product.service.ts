import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product } from 'src/schemas/Product.schema'
import { CreateProductDto, QueryProductDto, UpdateProductDto } from './dto'
import { ImageService } from 'src/image/image.service'
import { ColorService } from 'src/color/color.service'
import { StorageService } from 'src/storage/storage.service'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private imageService: ImageService,
    private colorService: ColorService,
    private storageService: StorageService
  ) {}

  async createProduct(payload: CreateProductDto) {
    const images = await this.imageService.checkAndCreateImage(payload.images.map((i) => ({ url: i })))

    const colors = await this.colorService.checkAndCreateColor(payload.specs.map((i) => ({ name: i.color })))

    const storages = await this.storageService.upsertMultiStorage(
      payload.specs.map((item) => ({
        name: item.storage.name,
        unit: item.storage.unit
      }))
    )

    const specs = payload.specs.map((item, index) => ({
      color: colors[index]._id,
      storage: storages[index]._id,
      quantity: item.quantity,
      price: item.price
    }))

    const createdProduct = new this.productModel({
      name: payload.name,
      description: payload.description,
      user_id: payload.user_id,
      images,
      specs
    })

    const new_product = await createdProduct.save()
    return new_product
  }

  getProducts(payload: QueryProductDto) {
    const page = Number(payload.page) || 1
    const limit = Number(payload.limit) || 10

    // const { search, user_id } = payload

    if (page <= 0) throw new BadRequestException('Page must be greater than zero')

    const per_page = (page - 1) * limit

    return this.productModel
      .find({
        $or: [{}]
      })
      .limit(limit)
      .skip(per_page)
      .sort({
        createdAt: 'desc'
      })
      .populate(['images', 'specs.color', 'specs.storage'])
  }

  async updateProduct({ id, payload }: { id: string; payload: UpdateProductDto }) {
    const images = await this.imageService.checkAndCreateImage(payload.images.map((i) => ({ url: i })))

    const colors = await this.colorService.checkAndCreateColor(payload.specs.map((i) => ({ name: i.color })))

    const storages = await this.storageService.upsertMultiStorage(
      payload.specs.map((item) => ({
        name: item.storage.name,
        unit: item.storage.unit
      }))
    )

    const specs = payload.specs.map((item, index) => ({
      color: colors[index]._id,
      storage: storages[index]._id,
      quantity: item.quantity,
      price: item.price
    }))

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      {
        name: payload.name,
        description: payload.description,
        images,
        specs
      },
      { new: true }
    )

    return updatedProduct
  }

  async deleteProduct() {}
}
