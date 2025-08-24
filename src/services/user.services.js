import db from "../models/index.js"
const { User } = db

export const upsertUser = async (userId) => {
    return await User.findOrCreate({
        where: { id: userId }
    });
}