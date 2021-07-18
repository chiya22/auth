const knex = require('../db/knex').connect();
const log4js = require("log4js");
const logger = log4js.configure("./config/log4js-config.json").getLogger();

// CREATE TABLE IF NOT EXISTS `users` (
//     `id` varchar(10) NOT NULL,
//     `name` varchar(100) NOT NULL,
//     `password` varchar(1000) NOT NULL,
//     `role` varchar(100) DEFAULT NULL,
//     `ymd_add` char(8) NOT NULL,
//     `id_add` char(10) NOT NULL,
//     `ymd_upd` char(8) NOT NULL,
//     `id_upd` char(10) NOT NULL,
//     PRIMARY KEY (`id`,`ymd_end`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

const findPKey = async (id) => {
    try {
        const retObj = await knex.from("users").where({id: id})
        return retObj;
    } catch(err) {
        throw err;
    }
};

const find = async () => {
    try {
        const retObj = await knex.from("users").orderBy("id","asc")
        return retObj;
    } catch(err) {
        throw err;
    }
};

const insert = async (inObj) => {
    try {
        const query = 'insert into users values ("' + inObj.id + '","' + inObj.name + '","' + inObj.password + '","' + inObj.role + '", "' + inObj.ymd_add + '", "' + inObj.id_add + '", "' + inObj.ymd_upd + '", "' + inObj.id_upd + '")';
        logger.info(query);
        const retObj = await knex.raw(query)
        return retObj[0];
    } catch(err) {
        throw err;
    }
};

const update = async (inObj) => {
    try {
        const query = 'update users set name = "' + inObj.name + '", password = "' + inObj.password + '", role = "' + inObj.role + '", ymd_add = "' + inObj.ymd_add + '", id_add = "' + inObj.id_add + '", ymd_upd = "' + inObj.ymd_upd + '", id_upd = "' + inObj.id_upd + '" where id = "' + inObj.id + '"';
        logger.info(query);
        const retObj = await knex.raw(query)
        return retObj[0];
    } catch(err) {
        throw err;
    }
};

const remove = async (id) => {
    try {
        const query = 'delete from users where id = "' + id + '"';
        const retObj = await knex.raw(query)
        return retObj[0];
    } catch(err) {
        throw err;
    }
};

module.exports = {
    find: find,
    findPKey: findPKey,
    insert: insert,
    update: update,
    remove: remove,
};