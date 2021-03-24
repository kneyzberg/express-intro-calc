/** Simple demo Express app. */

const { json } = require("express");
const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json());

app.use(express.urlencoded({extended: true}));

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res){
  if (!req.query.nums){
    throw new BadRequestError(message="Nums are required");
  }
  let nums = req.query.nums.split(",");
  console.log(nums);
  let sum = 0;
  for (let num of nums){
    if(isNaN(num)){
      throw new BadRequestError(message=`${num} is not a number`);
    }
    sum+= +num;
  }
  let mean = sum / nums.length;
  return res.json({response: {operation: "mean", value: mean}})
})


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function(req, res){
  if (!req.query.nums){
    throw new BadRequestError(message="Nums are required");
  }
  let nums = req.query.nums.split(",").sort();

  for (let num of nums){
    if(isNaN(num)){
      throw new BadRequestError(message=`${num} is not a number`);
    }
  }
  console.log(nums);
  let median;

  if(nums.length % 2 === 1){
    let index = Math.floor(nums.length / 2);
    median = nums[index];
  } else {
    let index1 = (nums.length / 2);
    console.log(index1, "index");
    let index2 = (nums.length / 2) - 1;
    console.log(index2, "index2")
    median = (+(nums[index1]) + +(nums[index2])) / 2
  }
  return res.json({response: {operation: "median", value: median}})
})


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function(req, res){
  if (!req.query.nums){
    throw new BadRequestError(message="Nums are required");
  }
  let nums = req.query.nums.split(",").sort();

  for (let num of nums){
    if(isNaN(num)){
      throw new BadRequestError(message=`${num} is not a number`);
    }
  }
  
  let freqCounter = {};
  for (let num of nums){
    let count = freqCounter[+num] || 0;
    freqCounter[+num] = count + 1;
  }
  console.log(freqCounter, "counter");

  let key;
  for (let val in freqCounter){
    let max = 0;
    if(freqCounter[val] > max){
      key = val;
      max = freqCounter[val];
      console.log(max);
      console.log(key);
    }
  }

  let mode = key;
  return res.json({response: {operation: "mode", value: mode}})
})




/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;