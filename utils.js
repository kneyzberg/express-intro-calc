const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  if (!strNums){
    throw new BadRequestError(message="Nums are required");
  }

  let nums = strNums.split(",");
  for (let i = 0; i < nums.length; i++){
    if(isNaN(nums[i])){
      throw new BadRequestError(message=`${nums[i]} is not a number`);
    }
    nums[i] = +nums[i];
  }
  return nums;
}


module.exports = { convertStrNums };