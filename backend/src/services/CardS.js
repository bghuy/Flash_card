
import db from "../models";
const create = async (cardData, userId) => {
    try {
        const { title, description, collectionId } = cardData;
        const collection = await db.My_Collection.findOne({
            where: { id: collectionId, userId: userId }
        })
        if (collection) {
            const card = await db.Card.create({ title: title, description: description, collectionId: +collectionId })
            return {
                EM: "create card success",
                EC: 0,
                DT: null
            }
        }
        else {
            return {
                EM: "collection doesn't match",
                EC: -1,
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
const deleteCard = async (cardData) => {
    try {
        const { id } = cardData;
        const card = await db.Card.findOne({
            where: { id: +id }
        })
        if (card) {
            const my_card = await db.Card.destroy({ where: { id: +id } })

            return {
                EM: "delete card success",
                EC: 0,
                DT: null
            }
        }
        else {
            return {
                EM: "card not found",
                EC: -1,
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
const update = async (cardData, userId) => {
    try {
        const { id, collectionId, title, description } = cardData;
        const collection = await db.My_Collection.findOne({
            where: { id: collectionId, userId: userId }
        })
        if (collection) {
            const card = await db.Card.findOne({ id: +id, collectionId: +collectionId })
            if (card) {
                if (!title || title.trim().length === 0) {
                    return {
                        EM: "title cannot be empty",
                        EC: -1,
                        DT: null
                    }
                }
                if (!description || description.trim().length === 0) {
                    return {
                        EM: "description cannot be empty",
                        EC: -1,
                        DT: null
                    }
                }
                card.title = title.trim();
                card.description = description.trim();
                const newCard = await card.save()
                return {
                    EM: "update card success",
                    EC: 0,
                    DT: null
                }
            }
            else {
                return {
                    EM: "not found card",
                    EC: -1,
                    DT: null
                }
            }

        }
        else {
            return {
                EM: "collection doesn't match",
                EC: -1,
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
const fetchWithPageAndLimit = async (queryField, userId) => {
    try {
        const { collectionId, page, limit, search, field, order } = queryField;
        const collection = await db.My_Collection.findOne({
            where: { id: collectionId, userId: userId }
        })
        if (collection) {
            let whereCondition = { collectionId: collectionId };
            if (search) {
                // Thêm điều kiện tìm kiếm nếu có
                whereCondition.title = literal(`LOWER(title) LIKE LOWER('%${search}%')`);
            }
            const offset = (page - 1) * limit;
            const { count, rows } = await db.Card.findAndCountAll({
                offset: offset,
                limit: limit,
                where: whereCondition,
                attributes: ['id', 'collectionId', 'title', 'description',],
                order: [[field, order]]
            })
            const totalPages = Math.ceil(count / limit);
            let data = {
                totalRows: count,
                totalPages: totalPages,
                card_list: rows ? rows : []
            }
            return {
                EM: "get cards success",
                EC: 0,
                DT: data
            }
        }
        else {
            return {
                EM: "collection doesn't match",
                EC: -1,
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
const fetchAll = async (collectionId, userId) => {
    try {
        const collection = await db.My_Collection.findAll({
            where: { id: collectionId, userId: userId }
        })
        if (collection) {
            const cardList = await db.Card.findAll({
                where: { collectionId: collectionId }
            })
            if (cardList) {
                return {
                    EM: "fetch cards success",
                    EC: 0,
                    DT: cardList
                }
            }
            else {
                return {
                    EM: "not found cards",
                    EC: -1,
                    DT: null
                }
            }
        }
        else {
            return {
                EM: "collection doesn't match",
                EC: -1,
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
module.exports = {
    create, deleteCard, update, fetchWithPageAndLimit, fetchAll
}