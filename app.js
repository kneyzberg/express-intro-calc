/** Simple demo Express app. */

const { json } = require("express");
const express = require("express");
const {findMean, findMedian, findMode} = require("./stats");
const app = express();

// useful error class to throw
const { NotFoundError} = require("./expressError");
const {converStrNums, convertStrNums} = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(json());

app.use(express.urlencoded({extended: true}));

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res){
  /** use converStrNums to convert query string of numbers into array of numbers */
  let nums = convertStrNums(req.query.nums);
  let mean = findMean(nums);
  return res.json({response: {operation: "mean", value: mean}});
})


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function(req, res){
  
  let nums = convertStrNums(req.query.nums);
  let median = findMedian(nums);

  return res.json({response: {operation: "median", value: median}});
})


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function(req, res){
  
  let nums = convertStrNums(req.query.nums);
  let mode = findMode(nums);
  return res.json({response: {operation: "mode", value: mode}});

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