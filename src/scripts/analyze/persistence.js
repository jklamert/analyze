const { getClient } = require("../../connectionProvider");

module.exports = {
  /**
   * Method to get the listings from the database.
   */
  getListings: async function () {
    const client = await getClient();
    let retVal = [];
    try {
      const SELECT = `SELECT * FROM Listing`;
      const res = await client.query(SELECT);
      retVal = res.rows;
    } catch (err) {
      console.log(err.stack);
    }
    return retVal;
  },
};
