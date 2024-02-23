//Sort desc
function compare(a, b) {
  return a - b;
}

module.exports = {
  /**
   * Method to get the average of an array of numbers.
   * @param arr
   * @returns average
   */
  getAverage: (arr) => {
    const copy = Array.from(arr);
    if (!copy.length || copy.length === 1) {
      return null;
    }
    const filtered = copy.filter((item) => {
      return !!item;
    });

    let accum = 0;
    filtered.forEach((num) => {
      accum = accum + num;
    });
    return accum / filtered.length;
  },

  /**
   * Method to get the median value of the array.
   * @param arr
   * @returns median
   */
  getMedian: (arr) => {
    if (arr && !arr.length) {
      return null;
    }
    const copy = Array.from(arr);
    const sortedData = copy.sort(compare);
    let median = null;
    if (sortedData.length % 2 === 0) {
      let index1 = Math.floor(sortedData.length / 2);
      let index2 = index1--;
      let value1 = sortedData[index1];
      let value2 = sortedData[index2];
      median = (value1 + value2) / 2;
    } else {
      median = sortedData[Math.floor(sortedData.length / 2)];
    }

    return median;
  },

  /**
   * Method to get the mode of the array.
   * @param arr
   * @returns mode
   */
  getMode: (arr) => {
    let priceMap = new Map();
    arr.forEach((price) => {
      if (priceMap.has(price)) {
        let value = priceMap.get(price);
        value++;
        priceMap.set(price, value);
      } else {
        //Ignore nulls
        if (price) {
          priceMap.set(price, 1);
        }
      }
    });

    let occursMostKey = null;
    let max = -1;
    for (let [key, val] of priceMap.entries()) {
      if (val > max) {
        max = val;
        occursMostKey = key;
      }
    }
    return occursMostKey;
  },
};
