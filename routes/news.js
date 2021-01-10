var express = require("express");
const request = require("request");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require("axios");
var router = express.Router();

var options = {
  method: "GET",
  url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete",
  params: { q: "tesla", region: "US" },
  headers: {
    "x-rapidapi-key": "4bf9004746mshf9f96babce1a025p1265fbjsn901f8df1c82f",
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  },
};

const getCache = (req, res) => {
  let value = myCache.get("news");
  if (value === undefined) {
    getNews(req, res);
  } else {
    res.send(value);
  }
};

const getNews = (req, res) => {
  axios
    .request(options)
    .then(function (response) {
      myCache.set("news", JSON.stringify(response.data), 3600);
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

router.get("/", getCache);

module.exports = router;
