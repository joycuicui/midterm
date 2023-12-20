const db = require("../db/connection");

////////////////////////////////////////////////////////////////////////////////////////////////
/// USERS
////////////////////////////////////////////////////////////////////////////////////////////////
const getUserWithEmail = function (email) {
  knownemail = "ava@email.com";
  return db
    .query(`SELECT * FROM users WHERE email ILIKE $1;`, [knownemail])
    .then((result) => {
      console.log("result.rows:", result.rows);
      console.log("result.rows[0]", result.rows[0]);
      const user = result.rows[0];
      return user || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUserWithId = function (id) {
  return db
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      // console.log("result.rows:", result.rows);
      // console.log("result.rows[0]", result.rows[0]);
      const user = result.rows[0];
      return user || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addUser = function (user) {
  return db
    .query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
      [user.name, user.email, user.password]
    )
    .then((result) => {
      // console.log("result.rows:", result.rows);
      // console.log("result.rows[0]", result.rows[0]);
      const user = result.rows[0];
      return user || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////
/// LISTINGS
////////////////////////////////////////////////////////////////////////////////////////////////
const getPlanes = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT  planes.*, users.name
  FROM planes
  JOIN users on users.id = user_id
  WHERE 1 = 1`;

  if (options.year) {
    queryParams.push(options.year);
    queryString += `AND year = $${queryParams.length}`;
  }
  //// DOES NOT WORK FOR used lowercase
  if (options.condition) {
    queryParams.push(options.condition);
    queryString += `AND condition = $${queryParams.length}`;
  }

  if (options.minimum_price && options.maximum_price) {
    queryParams.push(options.minimum_price, options.maximum_price);
    queryString += `AND price BETWEEN $${queryParams.length - 1} AND $${
      queryParams.length
    }`;
  }

  if (options.make) {
    queryParams.push(`%${options.make}`);
    queryString += `AND make LIKE $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY price
  LIMIT $${queryParams.length}`;

  // console.log("queryString:", queryString);
  // console.log("queryParams:", queryParams);

  return db.query(queryString, queryParams).then((res) => res.rows);
};

const getMyListings = function (user_id, limit = 10) {
  return db
    .query(
      `
        SELECT planes.*, users.name
        FROM planes
        JOIN users ON users.id = owner_id
        WHERE users.id = $1
        GROUP BY users.id
        ORDER BY price
        LIMIT $2;`,
      [user_id, limit]
    )
    .then((result) => {
      // console.log("result.rows:", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getPlanes,
  getMyListings,
  getUserWithEmail,
  getUserWithId,
  addUser,
};
