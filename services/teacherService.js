const md5 = require("md5");
const Teacher = require("../modules/Teacher");
const { Op } = require("sequelize");

async function addTeacher(tObj) {
    if(typeof tObj != "object"){
        console.log("传入老师数据有误");
        return null;
    }
    tObj.password = md5(tObj.password);
    try {
        const res = await Teacher.create(tObj);
        console.log("添加老师成功");
        return res.toJSON();
    } catch (e) {
        return e;
    }
}

async function updateTeacher(id, tObj) {
    if(typeof tObj != "object"){
        console.log("传入老师数据有误");
        return null;
    }
    tObj.password = tObj.password ? md5(tObj.password) : undefined;
    try {
        const res = await Teacher.update(tObj, {
            where: {
                id: id
            }
        });
        console.log('修改老师数据成功');
        return res;
    } catch (e) {
        return e;
    }
}

async function deleteTeacher(id) {
    try {
        const res = await Teacher.destroy({
            where: {
                id: id
            }
        });
        console.log("删除老师数据成功");
        return res;
    } catch (e) {
        return e;
    }
}
async function getTeacherById(id) {
    const where = {};
    where.id = id;
    const resp = await Teacher.findOne({
        where,
        attributes: ["id", "name"]
    });
    return JSON.parse(JSON.stringify(resp));
}
async function login(Nob, pwd) {
    pwd = md5(pwd);
    const res = await Teacher.findOne({
        where: {
            [Op.and]: [
                {Nob : Nob},
                {password : pwd}
            ]
        },
        attributes : ["id", "Nob", "name"]
    });
    return JSON.parse(JSON.stringify(res));
}

module.exports = {
    addTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
    login
}