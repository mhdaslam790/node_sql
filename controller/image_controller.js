function upload(req, res) {
    if (req.file.filename) {
        res.status(201).json({
            message: "image uploaded successfully",
            url: req.file.filename,
        });
    }
    lse
    res.status(500).json({
        message: "something went wrong"
    });
}
module.exports = {
    upload: upload
}