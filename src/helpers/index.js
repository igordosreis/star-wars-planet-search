const deleteProperties = (arrOfObj, arrOfStr) => arrOfObj
  .map((obj) => Object.keys(obj)
    .reduce((accNewObj, currKey) => ((arrOfStr.includes(currKey))
      ? accNewObj
      : ({ ...accNewObj, [currKey]: obj[currKey] })), {}));

export default deleteProperties;
