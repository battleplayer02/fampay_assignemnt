const {db} = require("../models");
const {parse} = require("dotenv");
const {validVariable} = require("../helper");
module.exports.getData = async (req, res) => {
    let {id, page, perPage, search} = req.query;
    perPage = parseInt(perPage);
    page = parseInt(page)
    let limit = perPage;
    let offset = perPage * (page - 1 < 0 ? 0 : page - 1);

    let paginate = {}
    if (validVariable(limit)) {
        paginate = {...paginate, limit}
    }
    if (validVariable(offset)) {
        paginate = {...paginate, offset}
    }
    if (validVariable(search)) {
        paginate = {
            ...paginate, where: {
                title: {
                    [db.Sequelize.Op.like]: `%${search}% `
                }
            }
        }
    } else if (validVariable(id)) {
        paginate = {
            ...paginate, where: {
                videoID: id
            }
        }
    }

    res.json(await db.Video.findAll(paginate))
}