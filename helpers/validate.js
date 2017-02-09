function checkIsLonger (min, value) {
  return value.length >= min;
}

function checkIsEmpty (value) {
  return value.length === 0;
}

module.exports = {
  checkIsLonger,
  checkIsEmpty
};
