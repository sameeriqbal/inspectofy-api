var ObjectId = require('mongodb').ObjectID;
var auth = require('../Auth.js')
module.exports = function (app, db, config) {
    //Save Route
    app.post('/contact/save', auth.verifyToken, (req, res) => {
        req.body.inspectorID = ObjectId(req.body.inspectorID)
        db.collection("contact").insertOne(req.body, function (err, item) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "Added Successfully"
                })
            }
        });
    })
    //GetAll route
    app.post('/contact/GetAll', auth.verifyToken, (req, res) => {
        var query = { $and: [{ "inspectorID": ObjectId(req.body.inspectorID) }, { "Type": req.body.Type }] };
        db.collection("contact").find(query).toArray((err, item) => {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: item
                })
            }
        })
    })
    //Delete Route
    app.post('/contact/delete', auth.verifyToken, (req, res) => {
        var query = { _id: ObjectId(req.body._id) };
        db.collection("contact").deleteOne(query, function (err, item) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                res.send({
                    error: false,
                    message: "Deleted Successfully"
                })
            }
        });
    })
    //Search route
    app.post('/contact/search', auth.verifyToken, (req, res) => {
        db.collection("contact").find({ $text: { $search: req.body.query } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } }, function (err, results) {
                if (err) {
                    res.send({
                        error: true,
                        message: results
                    });
                } else {
                    res.send({
                        error: false,
                        message: results
                    });
                }
            });
    })



}