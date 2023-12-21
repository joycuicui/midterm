const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// import all database queries related functions. e.g. getAllPlanes
const database = require("../db/database");

//////////////////////////////////////////////////////////////////////////////////////
/// GET / => home page, shows all plane listings, limiting to 10
//////////////////////////////////////////////////////////////////////////////////////
router.get("/all", (req, res) => {
  database
    .getPlanes(req.query, 20)
    .then((planes) => res.send({ planes }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// GET / => home page, shows all listings that are tagged feature = True in the db
//////////////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
  database
    .getFeaturedList()
    .then((planes) => res.send({ planes }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// GET /listings/user/:userId => get a user's listings
//////////////////////////////////////////////////////////////////////////////////////
// router.get("/listings/user/:userId", (req, res) => {
router.get("/listings/user", (req, res) => {
  const userId = req.session.userId;
  console.log("userId in get/listings/user: ", userId);
  if (!userId) {
    return res.send("error for !userID in get/listings/user/:userId");
  }
  database
    .getMyListings(userId)
    .then((listings) => res.json({ listings }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////
/// GET /listings/user/:userId/likes => get a user's liked/favorites listings
//////////////////////////////////////////////////////////////////////////////////////
// need a getMyLikes function from database
router.get("/listings/user/likes", (req, res) => {
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
/// GET /listings/:id => Shows all the details of the plane that was selected. Triggered from the View Button.
//////////////////////////////////////////////////////////////////////////////////////

router.get("/listings/:id", (req, res) => {
  console.log("please work");
  const clickedPlaneId = req.params.id;
  console.log("Clicked plane ID:", clickedPlaneId);
  console.log("please work");

  database
    .getSpecificPlaneInfo(clickedPlaneId)
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
  console.log(newListing);
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

//////////////////////////////////////////////////////////////////////////////////////
/// GET /messages/:id => get messages for a user's listings
//////////////////////////////////////////////////////////////////////////////////////
router.get("/messages", (req, res) => {
  const userId = req.session.userId;
  database
    .getMessages(userId)
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/messages", (req, res) => {
  const sender_id = req.session.userId;
  const d = new Date();
  const time = d.toLocaleString();
  console.log(time);
  const { listing_id, receiver_id, content } = req.body;
  database
    .postMessages(listing_id, sender_id, receiver_id, content, time)
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
