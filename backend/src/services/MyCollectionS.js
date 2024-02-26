import db from "../models/index.js";
import { Op, literal } from 'sequelize';
const fetchAll = async (userEmail) => {
    try {
        let user = await db.User.findOne(
            { where: { email: userEmail } }
        )
        if (user) {
            let my_collection = await db.My_Collection.findAll(
                {
                    where: { userId: user.id },
                    attributes: ['id', 'title', 'description']
                }
            )

            return {
                EM: "loaded all your collections",//error message
                EC: 0,//error code -1 means error , 0 means no error
                DT: {
                    my_collection: my_collection
                }
            }
        }
        else {
            return {
                EM: "user is not exist",//error message
                EC: 3,//error code -1 means error , 0 means no error
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: 4,
            DT: null
        }
    }
}

const update = async (updateData) => {
    try {
        const { id, title, description, imageName } = updateData
        let my_collection = await db.My_Collection.findOne(
            { where: { id: id } }
        )
        if (my_collection) {
            if (title) {
                my_collection.title = title;
                my_collection.description = description;
                my_collection.imageName = imageName;
                await my_collection.save()
                return {
                    EM: "update collection detail success",
                    EC: 0,
                    DT: null
                }
            }
            else {
                return {
                    EM: "title is required",
                    EC: 4,
                    DT: null
                }
            }
        }
        else {
            return {
                EM: "not found collection",//error message
                EC: 3,//error code -1 means error , 0 means no error
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: 4,
            DT: null
        }
    }
}

const deleteCollection = async (collectionId, userId) => {
    try {
        let my_collection = await db.My_Collection.findOne({
            where: { id: collectionId }
        });
        if (my_collection && +my_collection.userId === +userId) {
            await db.My_Collection.destroy({
                where: { id: collectionId, userId: userId }
            })
            return {
                EM: "delete collection successfully",
                EC: 0,
                DT: null
            }
        }
        else {
            return {
                EM: "not found collection",//error message
                EC: 3,//error code -1 means error , 0 means no error
                DT: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: 4,
            DT: null
        }
    }
}
const create = async (collectionData) => {
    try {

        let { title, description, userId } = collectionData;
        if (title && title.length > 0) {
            await db.My_Collection.create({ title: title, description: description, userId: userId });
            return {
                EM: "create collection success",
                EC: 0,
                DT: null
            }
        }
        else {
            return res.status(200).json({
                EM: "title can not be null",//error message
                EC: 3,//error code -1 means error , 0 means no error
                DT: null,//data
            });
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "something wrong with service",
            EC: 4,
            DT: null
        }
    }
}
const fetchWithPageAndLimit = async (userEmail, page, limit, searchTerm, field, order) => {
    try {
        let user = await db.User.findOne(
            { where: { email: userEmail } }
        )
        let whereCondition = { userId: user.id };
        if (searchTerm) {
            // Thêm điều kiện tìm kiếm nếu có
            whereCondition.title = literal(`LOWER(title) LIKE LOWER('%${searchTerm}%')`);
        }
        const offset = (page - 1) * limit;
        const { count, rows } = await db.My_Collection.findAndCountAll({
            offset: offset,
            limit: limit,
            where: whereCondition,
            attributes: ['id', 'title', 'description', 'imageName'],
            order: [[field, order]]
        })
        const totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            my_collection: rows ? rows : []
        }
        return {
            EM: "get collections success",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs with service",
            EC: 4,
            DT: null
        }
    }
}
module.exports = { fetchAll, update, deleteCollection, create, fetchWithPageAndLimit }