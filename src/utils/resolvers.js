import db from "../models/index.js";
const { Category, Product } = db

export const resolvers = {
  Query: {
    products() {
      return Product.findAll();
    },
    product(_, args) {
      return Product.findOne({
        where: {
          id: args.id
        }
      })
    },
    categories() {
      return Category.findAll();
    },
    category(_, args) {
      return Category.findOne({
        where: {
          id: args.id
        }
      })
    },
  },
  Product: {
    category(parent) {
      return Category.findOne({ where: { id: parent.CategoryId } })

    }
  },
  Category: {
    products(parent) {
      return Product.findAll({ where: { CategoryId: parent.id } })
    }
  },
};
