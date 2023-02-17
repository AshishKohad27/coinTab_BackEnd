const express = require("express");
const { AddData, GetData, DeleteData, GetDataFilter } = require("../Controller/data.controller");
const dataRoute = express.Router();

dataRoute.get("/", async (req, res) => {

    const { data, flag, message, desc, length, filter } = await GetData({ ...req.query });
    if (flag) {
        return res.status(201).send({ length, filter, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});

dataRoute.get("/filter", async (req, res) => {

    const { data, flag, message, desc, length, filter, list } = await GetDataFilter({ ...req.query });
    if (flag) {
        return res.status(201).send({ length, filter, list, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});

dataRoute.post("/", async (req, res) => {
    const { data, flag, message, desc, length } = await AddData();
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});

dataRoute.delete("/", async (req, res) => {
    const { data, flag, message, desc, length } = await DeleteData();
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});



module.exports = dataRoute;