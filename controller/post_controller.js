const model = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();


function save(req, res) {
    const pst = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.userData.userId
    };
    const schema = {
        title: { type: "string", optional: false, max: "100", min: "5" },
        content: { type: "string", optional: false, max: "500", min: "5" },
        categoryId: { type: "number", optional: false }
    };
    const check = v.compile(schema);

    const validationResponse = check(pst);
    console.log(validationResponse);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "validation failed",
            errors: validationResponse,
        });
    }


    model.Posts.create(pst).then(result => {
        res.status(201).json({
            status: 201,
            message: "post created successfully",
            post: result,
        });
    }
    ).catch(error => {
        res.status(500).json({
            message: "Server Error",
            error: error,
        });
    });

}
function show(req, res) {
    const id = req.params.id;
    model.Posts.findByPk(id).then(result => {
        res.status(200).json({ data: result });
    }).catch(error => {
        res.status(500).json({
            message: "Server Error",
            error: error,
        })
    });
}
function index(req, res) {

    model.Posts.findAll().then(result => {
        res.status(200).json({ data: result });
    }).catch(error => {
        res.status(500).json({
            message: "Server Error",
            error: error,
        })
    });
}
function update(req, res) {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,

    };
    const userId = 1;
    model.Posts.update(updatedPost, {
        where: {
            id: id, userId: userId,
        }
    }).then(result => {
        res.status(200).json({
            data: result, message: "Post deleted successfully",
        });
    }).catch(error => {
        res.status(500).json({
            message: "Server Error",
            error: error,
        })
    });
}
function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;
    model.Posts.destroy({
        where: {
            id: id, userId: userId,
        }
    }).then(result => {
        res.status(200).json({
            data: result,
            message: "Post update successfully",
        });
    }).catch(error => {
        res.status(500).json({
            message: "Server Error",
            error: error,
        })
    });
}


module.exports = { save: save, show: show, index: index, destroy: destroy, update: update };