const db = require("../db/connection");

////////////////////////////////////////////////////////////////////////////////////////////////
/// USERS
////////////////////////////////////////////////////////////////////////////////////////////////
const getUserWithEmail = function (email) {
  return db
    .query(`SELECT * FROM users WHERE email ILIKE $1;`, [email])
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
      [user["signup-name"], user["signup-email"], user["signup-password"]]
    )
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
        JOIN users ON users.id = user_id
        WHERE users.id = $1
        GROUP BY users.id, planes.id
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

const getMyLikes = function (user_id, limit = 10) {
  return db
    .query(
      `
        SELECT planes.*, users.name
        FROM planes
        JOIN favorites ON planes.id = favorites.listing_id
        JOIN users ON users.id = favorites.user_id
        WHERE users.id = $1
        GROUP BY users.id, planes.id
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

/*--- Function to get featured listings to be rendered on the home page---*/
const getFeaturedList = function () {
  return db
    .query(
      `SELECT planes.*, users.name
    FROM planes
    JOIN users on users.id = user_id
    WHERE planes.featured = TRUE;`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/*--- Function to get all the data of selected plane to be used in the veiw details ---*/
const getSpecificPlaneInfo = function (id) {
  return db
    .query(
      `SELECT planes.*, users.name
    FROM planes
    JOIN users on users.id = user_id
    WHERE planes.id = $1;`,
      [id]
    )
    .then((result) => {
      console.log("result.rows:", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
/*--- Function to add new listing data ---*/
const addListing = function (newListing) {
  return db
    .query(
      `INSERT INTO planes (
        user_id, title, description, condition, year, make, model,
        planes_class, airframe_hours, engine_hours, img_path, price,
        active, sold, featured, date_posted
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP) RETURNING *;`,
      [
        newListing.id,
        newListing.title,
        newListing.description,
        newListing.condition,
        newListing.year,
        newListing.make,
        newListing.model,
        newListing.planes_class,
        newListing.airframe_hours,
        newListing.engine_hours,
        newListing.img_path,
        newListing.price,
        newListing.active,
        newListing.sold,
        newListing.featured,
      ]
    )
    .then((result) => {
      console.log("Inserted listing:", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/*--- Function to delete specific listing by id ---*/
const deleteListing = function (id) {
  return db
    .query(
      `DELETE FROM planes
      WHERE planes.id = $1;`,
      [id]
    )
    .then((result) => {
      console.log("result.rows:", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////
/// MESSAGES
////////////////////////////////////////////////////////////////////////////////////////////////
const getMessages = function (userId) {
  return db
    .query(
      `
    SELECT messages.content,messages.time_sent,planes.title, planes.year,planes.id  AS planesID, planes.make, planes.model,users.name,users.id AS userID
    FROM messages
    JOIN planes ON messages.listing_id = planes.id
    JOIN users ON messages.sender_id = users.id
    WHERE messages.receiver_id = $1;
    `,
      [userId]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const postMessages = function (
  listing_id,
  sender_id,
  receiver_id,
  content,
  time
) {
  return db
    .query(
      `
    INSERT INTO messages (listing_id, sender_id, receiver_id, content, time_sent)
    VALUES ($1,$2,$3,$4,$5);
    `,
      [listing_id, sender_id, receiver_id, content, time]
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getPlanes,
  getMyListings,
  getMyLikes,
  getUserWithEmail,
  getUserWithId,
  addUser,
  getFeaturedList,
  getSpecificPlaneInfo,
  getMessages,
  postMessages,
  deleteListing,
  addListing,
};
