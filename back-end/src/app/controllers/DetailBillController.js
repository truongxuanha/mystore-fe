const DetailBill = require("../models/DetailBill");
const Products = require("../models/Products");
const { mongooseToObject } = require("../../until/mongoose");
const { createSlug } = require("../../until/slug");
const mysql = require("../../config/mysql_db");

class DetailBillController {
  //[GET] / detailBill
  index(req, res, next) {
    DetailBill.getAll(function (data) {
      res.json(data);
    });
  }

  //[GET] / detailBill/getByIdBii
  getByIdAccount(req, res, next) {
    const id = req.dataToken.id;

    DetailBill.getByIdAccount(id, function (data) {
      res.json(data);
    });
  }

  //[GET] / detailBill/getByIdBii
  getByIdBill(req, res, next) {
    const id = req.params.id;

    DetailBill.getByIdBill(id, function (data) {
      res.json(data);
    });
  }

  //[POST] / detailBill/create
  create(req, res, next) {
    const formData = req.body;
    const type = req.params.type;

    DetailBill.create(formData, type, function (data) {
      res.json(data);
    });
  }
}

module.exports = new DetailBillController();
