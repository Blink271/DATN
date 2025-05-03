import { Product } from '../models/Product';
import { MouseDetails } from '../models/MouseDetails';
import { KeyboardDetails } from '../models/KeyboardDetails';
import { HeadphoneDetails } from '../models/HeadphoneDetails';

export class ProductService {

  async getAllProducts() {
    const products = await Product.find();
    const detailedProducts = await Promise.all(
      products.map(async (product) => {
        let details;
        if (product.category === 'mouse') {
          details = await MouseDetails.findOne({ product_id: product._id });
        } else if (product.category === 'keyboard') {
          details = await KeyboardDetails.findOne({ product_id: product._id });
        } else if (product.category === 'headphone') {
          details = await HeadphoneDetails.findOne({ product_id: product._id });
        }
        return { ...product.toJSON(), details };
      })
    );

    return detailedProducts;
  }

  async getProductsByCategory(category: string) {
    if (!['mouse', 'keyboard', 'headphone'].includes(category)) {
      throw new Error('Invalid category');
    }

    const products = await Product.find({ category });
    const detailedProducts = await Promise.all(
      products.map(async (product) => {
        let details;
        if (category === 'mouse') {
          details = await MouseDetails.findOne({ product_id: product._id });
        } else if (category === 'keyboard') {
          details = await KeyboardDetails.findOne({ product_id: product._id });
        } else if (category === 'headphone') {
          details = await HeadphoneDetails.findOne({ product_id: product._id });
        }
        return { ...product.toJSON(), details };
      })
    );

    return detailedProducts;
  }

  async createProduct(category: string, data: any) {
    if (!['mouse', 'keyboard', 'headphone'].includes(category)) {
      throw new Error('Invalid category');
    }

    const { name, brand, description, price, stock, image_url, details } = data;

    const product = new Product({
      name,
      brand,
      description,
      price,
      stock,
      image_url,
      category,
      sold_count: 0,
      created_at: new Date(),
    });

    await product.save();

    if (category === 'mouse') {
      const mouseDetails = new MouseDetails({
        product_id: product._id,
        ...details,
      });
      await mouseDetails.save();
    } else if (category === 'keyboard') {
      const keyboardDetails = new KeyboardDetails({
        product_id: product._id,
        ...details,
      });
      await keyboardDetails.save();
    } else if (category === 'headphone') {
      const headphoneDetails = new HeadphoneDetails({
        product_id: product._id,
        ...details,
      });
      await headphoneDetails.save();
    }

    return product;
  }

  async searchProductsByName(name: string) {
  // Sử dụng regex để tìm kiếm không phân biệt hoa thường
  const regex = new RegExp(name, 'i');
  
  const products = await Product.find({ name: { $regex: regex } });
  
  const detailedProducts = await Promise.all(
    products.map(async (product) => {
      let details;
      if (product.category === 'mouse') {
        details = await MouseDetails.findOne({ product_id: product._id });
      } else if (product.category === 'keyboard') {
        details = await KeyboardDetails.findOne({ product_id: product._id });
      } else if (product.category === 'headphone') {
        details = await HeadphoneDetails.findOne({ product_id: product._id });
      }
      return { ...product.toJSON(), details };
    })
  );

  return detailedProducts;
}

  async getProductsByID(id: string, category: string) {
    if (!['mouse', 'keyboard', 'headphone'].includes(category)) {
      throw new Error('Invalid category');
    }

    const product = await Product.findById(id);
    if (!product) {
      return null;
    }
    if (product.category !== category) {
      throw new Error('Category mismatch');
    }

    let details;
    if (category === 'mouse') {
      details = await MouseDetails.findOne({ product_id: id });
    } else if (category === 'keyboard') {
      details = await KeyboardDetails.findOne({ product_id: id });
    } else if (category === 'headphone') {
      details = await HeadphoneDetails.findOne({ product_id: id });
    }

    return { ...product.toJSON(), details };
}

  async updateProduct(id: string, category: string, data: any) {
    if (!['mouse', 'keyboard', 'headphone'].includes(category)) {
      throw new Error('Invalid category');
    }

    const { name, brand, description, price, stock, image_url, details } = data;

    const product = await Product.findById(id);
    if (!product) {
      return null;
    }
    if (product.category !== category) {
      throw new Error('Category mismatch');
    }

    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.image_url = image_url || product.image_url;

    await product.save();

    if (category === 'mouse') {
      await MouseDetails.updateOne({ product_id: id }, details);
    } else if (category === 'keyboard') {
      await KeyboardDetails.updateOne({ product_id: id }, details);
    } else if (category === 'headphone') {
      await HeadphoneDetails.updateOne({ product_id: id }, details);
    }

    return product;
  }

  async deleteProduct(id: string, category: string) {
    if (!['mouse', 'keyboard', 'headphone'].includes(category)) {
      throw new Error('Invalid category');
    }

    const product = await Product.findById(id);
    if (!product) {
      return false;
    }
    if (product.category !== category) {
      throw new Error('Category mismatch');
    }

    await Product.deleteOne({ _id: id });
    if (category === 'mouse') {
      await MouseDetails.deleteOne({ product_id: id });
    } else if (category === 'keyboard') {
      await KeyboardDetails.deleteOne({ product_id: id });
    } else if (category === 'headphone') {
      await HeadphoneDetails.deleteOne({ product_id: id });
    }

    return true;
  }
}