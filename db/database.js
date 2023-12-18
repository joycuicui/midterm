const db = require("../db/connection");

const getAllPlanes = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `SELECT  * FROM planes`;

  if (options.year) {
    queryParams.push(`%${options.year}%`);
    queryString += `WHERE year = $${queryParams.length}`;
  }

  if (options.condition) {
    queryParams.push(options.condition);
    if (queryParams.length === 1) {
      queryString += `WHERE condition = $${queryParams.length}`;
    } else {
      queryString += `AND condition = $${queryParams.length}`;
    }
  }

  if (options.minimum_price && options.maximum_price) {
    queryParams.push(options.minimum_price, options.maximum_price);
    if (queryParams.length === 2) {
      queryString += `WHERE price BETWEEN $${queryParams.length - 1} AND $${
        queryParams.length
      }`;
    } else {
      queryString += `AND price BETWEEN $${queryParams.length - 1} AND $${
        queryParams.length
      }`;
    }
  }

  if (options.make) {
    queryParams.push(options.make);
    if (queryParams.length === 1) {
      queryString += `WHERE make = $${queryParams.length}`;
    } else {
      queryString += `AND make = $${queryParams.length}`;
    }
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY price
  LIMIT $${queryParams.length}`;

  // console.log("queryString:", queryString);
  // console.log("queryParams:", queryParams);

  return db.query(queryString, queryParams).then((res) => res.rows);
};

module.exports = { getAllPlanes };
