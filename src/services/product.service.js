import { where } from 'sequelize';
import db from '../models/index.js'
const { Product } = db;

export const getAll = () => {
    return Product.findAll();
}

export const createOne = (body) => {
    return Product.create(body)
}

export const getOne = (id) => {
    return Product.findOne({
        where: {
            id: id
        }
    })
    
}
export const updateOne = async (id, body) => {
    const product = Product.findByPk(id)
    product.set(body)
    await product.save()
    return product
}
export const deleteOne = async(id) => {
    return Product.destroy({
        where: {
            id: id
        }, 
        force: true
    })
}