const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// import all database queries related functions. e.g. getAllPlanes
const database = require("../db/database");

//////////////////////////////////////////////////////////////////////////////////////
/// GET / => home page, shows all plane listings, limiting to 10
//////////////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
  database
    .getPlanes(req.query, 10)
    .then((planes) => res.send({ planes }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// GET /listings/user/:userId => get a user's listings
//////////////////////////////////////////////////////////////////////////////////////
router.get("/listings/user/:userId", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send("error for !userID in get/listings/user/:userId");
  }
  database
    .getMyListings(userId)
    .then((listings) => res.send({ listings }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// GET /listings/user/:userId/likes => get a user's liked/favorites listings
//////////////////////////////////////////////////////////////////////////////////////
// need a getMyLikes function from database
router.get("/listings/user/:userId/likes", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send("error for !userID in get/listings/user/:userId/likes");
  }
  database
    .getMyLikes(userId)
    .then((likedListings) => res.send({ likedListings }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// GET /listings/search => search listings
//////////////////////////////////////////////////////////////////////////////////////
router.get("/listings/search", (req, res) => {
  database
    .getPlanes(req.query)
    .then((planes) => res.send({ planes }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// POST /listings:id => edit a user listing
//////////////////////////////////////////////////////////////////////////////////////
// need a editListing function from database
router.post("/listings/:id", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send("error for !userID in post/listings/:id");
  }

  const listingId = req.params.id;
  const editedListing = req.body;

  database
    .editListing(listingId, editedListing)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// POST /listings/:id/delete => delete a user listing
//////////////////////////////////////////////////////////////////////////////////////
// need a deleteListing function from database
router.post("/listings/:id/delete", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send("error for !userID in post/listings/:id/delete");
  }
  database
    .deleteListing(req.body.planes_id)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// POST /listings => create a new listing
//////////////////////////////////////////////////////////////////////////////////////
// need a addListing function from database
router.post("/listings", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send("error for !userID in post/listings");
  }
  const newListing = req.body;
  newListing.owner_id = userId;
  database
    .addListing(newListing)
    .then((listing) => res.send(listing))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// POST /listings/:id/likes => add a listing to likes/favorites
//////////////////////////////////////////////////////////////////////////////////////
// need a createLike function from database
router.post("/listings/:id/likes", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send("error for !userID in post/listings/:id/likes");
  }
  const likedListing = req.body;
  likedListing.user_id = userId;
  database
    .createLike(likedListing)
    .then((like) => res.send({ like }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;
