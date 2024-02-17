import db from "./../models/index.js"
const bcrypt = require('bcryptjs');
import { Op } from 'sequelize';
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const isValidEmail = (email) => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

const isValidPhone = (phone) => {
    let regex = /^\d{10}$/;
    return regex.test(phone);
}
const isValidPassword = (password) => {
    let regex = /^\S{8,}$/;
    return regex.test(password);
}
const isExistEmail = async (email) => {
    const Email = await db.User.findOne(
        {
            where: { email: email }
        }
    );
    return Email
}
const isExistPhone = async (phone) => {
    const Phone = await db.User.findOne(
        {
            where: { phone: phone }
        }
    );
    return Phone
}
const isExistUsername = async (username) => {
    const Username = await db.User.findOne(
        {
            where: { username: username }
        }
    );
    return Username
}
const hashPassword = (password) => {
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}
const checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}
module.exports = {
    isExistEmail,
    isExistPhone,
    isExistUsername,
    hashPassword,
    checkPassword,
    isValidEmail,
    isValidPhone,
    isValidPassword
}