import db from '../models/index.js'
const { Category } = db;

export const getAll = () => {
    return Category.findAll();
}

export const createOne = (body) => {
    return Category.create(body)
}

export const getOne = (id) => {
    return Category.findByPk(id)
    
}
export const updateOne = async (id, body) => {
    const category = await Category.findByPk(id)
    category.set(body)
    await category.save()
    return category
}
export const deleteOne = async(id) => {
    return Category.destroy({
        where: {
            id: id
        }, 
        force: true
    })
}



export const getCategoryByName = (name) => {
    return Category.findOne({ where: { name } })
}