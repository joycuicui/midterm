// home page
GET /

// user listings
GET /listings/user/:userId

// user favorites
GET /listings/user/:userId/favorites

// search listings
GET /listings/:id
queryParams could be id, year, make, condition, etc

// edit user listing
POST /listings:id

// delete a listing
POST /listings/:id/delete

// add a new plane listing
POST /listings

// add a listing to favorites
POST /listings/:id/favorites
