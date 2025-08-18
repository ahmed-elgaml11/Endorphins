import db from "../models/index.js"
const { User } = db

export const getUser = (phone) => {
    return User.findOne({where: {phone}})
} 

export const createUser = (body) => {
    return User.create(body)
}