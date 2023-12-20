// const $sell = $(`
// <section class="search-box">
//   <h2>SELL YOUR PLANE</h2>
//   <form id="planeForm" class="planeForm" action="/" method="post">
//     <div class="form-left">
//       <input type="text" id="title" name="title" placeholder="Title" required />
//       <input
//         type="number"
//         id="price"
//         name="price"
//         placeholder="Price"
//         required
//       />
//       <textarea
//         id="description"
//         name="description"
//         rows="4"
//         placeholder="Description"
//         required
//       ></textarea>

//       <input
//         type="text"
//         id="condition"
//         name="condition"
//         placeholder="Condition"
//         required
//       />
//       <div class="input-inline">
//         <input type="text" id="make" name="make" placeholder="Make" required />

//         <input
//           type="text"
//           id="model"
//           name="model"
//           placeholder="Model"
//           required
//         />
//       </div>
//       <input type="text" id="class" name="class" placeholder="Class" required />
//       <div class="input-inline">
//         <input
//           type="number"
//           id="airframeHours"
//           name="airframe_hours"
//           placeholder="Airframe Hours"
//           required
//         />

//         <input
//           type="number"
//           id="engineHours"
//           name="engine_hours"
//           placeholder="Engine Hours"
//           required
//         />
//       </div>
//       <input
//         type="url"
//         id="photoUrl"
//         name="photo_url"
//         placeholder="Photo URL"
//         required
//       />
//     </div>
//     <div class="form-right">
//       <button type="submit">Submit</button>
//     </div>
//   </form>
// </section>;
// `);

// const $search = $(`
//   <section class="search-box">
//       <h2>SEARCH FOR YOUR DREAM PLANE</h2>
//       <form id="planeForm" class="planeForm" action="/listings" method="get">
//         <div class="form-left">
//           <input
//             type="text"
//             id="year"
//             name="year"
//             placeholder="Year"
//             required
//           />
//           <input
//             type="text"
//             id="condition"
//             name="condition"
//             placeholder="Condition"
//             required
//           />

//           <div class="input-inline">
//             <input
//               type="text"
//               id="minprice"
//               name="minprice"
//               placeholder="Minimum Price"
//               required
//             />

//             <input
//               type="text"
//               id="maxprice"
//               name="maxprice"
//               placeholder="Maximum Price"
//               required
//             />
//           </div>
//           <input
//             type="text"
//             id="make"
//             name="make"
//             placeholder="Make"
//             required
//           />

//           <button type="submit">SEARCH</button>
//         </div>
//       </form>
//     </section>
//   `);

// const $planeListings = $(`
//     <section class="all-listings">
//       <div class="divider">
//         <div class="divider-line"></div>
//         <h2 class="divider-text">Featured Listings</h2>
//         <div class="divider-line"></div>
//       </div>
//     </section>
//     `);

// const createListing = function (plane) {
//   return `
//   <article class="listing">
//   <div class="listing-image">
//     <img
//       src="${plane.photo_url}"
//       alt="plane listing image"
//     />
//   </div>
//   <div class="listing-details">
//     <h2 class="listing-details-title">${plane.title}</h2>
//     <ul class="listing-details-items">
//       <li>PRICE: $${plane.price}</li>
//       <li>YEAR: ${plane.year}</li>
//       <li>CONDITION: ${plane.condition}</li>
//       <li>MAKE: ${plane.make}</li>
//       <li>MODEL: ${plane.model}</li>
//       <li>AIRFRAME: ${plane.airframe_hours} hours</li>
//       <li>ENGINE: ${plane.engine_hours} hours</li>
//     </ul>
//     <footer class="listing-footer">
//       <button class="footer-button details-button">View details</button>
//       <button class="footer-button like-button">
//         <i class="fa-solid fa-heart"></i>
//       </button>
//     </footer>
//   </div>
// </article>
//   `;
// };

// const renderListings = function (listings) {
//   $planeListings.empty();
//   // for (const id in listings) {
//   //   const listing = listings[id];
//   //   $planeListings.prepend(createListing(listing));
//   // }
//   console.log("listings:", listings);
//   listings.forEach((plane) => {
//     const $listing = createListing(plane);
//     $planeListings.append($listing);
//   });
// };

// const loadListings = function () {
//   console.log("load listings function...");
//   console.log("ajax url:", "/api/planes");
//   $.ajax({
//     method: "GET",
//     url: "/api/planes",
//   })
//     .then(function (results) {
//       console.log("results:", results);
//       console.log("results.planes:", results.planes);
//       renderListings(results.planes);
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// $(() => {
//   const $header = $(".header");

//   let currentUser = null;

//   function updateHeader(user) {
//     console.log("updating header with user:", user);
//     currentUser = user;
//     $header.find(".nav-bar").remove();
//     let navBar;
//     if (!user) {
//       navBar = `
//       <div class="nav-box">
//         <div class="logo">
//           <i class="fa-solid fa-plane-up"></i>
//         </div>
//       <nav class="nav-bar">
//           <ul class="nav-bar-items">
//             <li class="home">Home</li>
//             <li class="search">Search</li>
//             <li class="login">Log In</li>
//             <li class="signup">Sign Up</li>
//           </ul>
//         </nav>
//       `;
//     } else {
//       navBar = `
//       <div class="nav-box">
//         <div class="logo">
//           <i class="fa-solid fa-plane-up"></i>
//         </div>
//       <nav class="nav-bar">
//           <ul class="nav-bar-items">
//             <li class="home">Home</li>
//             <li class="search">Search</li>
//             <li class="sell">Sell</li>
//             <li class="my-listings">Listings</li>
//             <li class="my-likes">Favorites</li>
//             <li class="messages">Messages</li>
//             <li class="logout">Log out</li>
//           </ul>
//         </nav>
//       `;
//     }
//     $header.append(navBar);
//   }

//   // testing: when there is a user logged in
//   const testUser = { name: "abc" };
//   // testing: when there is no user logged in
//   // const testUser = null;
//   updateHeader(testUser);

//   ////////////////////////////////////////////////////////////////////////
//   /// event listeners for header elements: home, search, myListing...
//   ////////////////////////////////////////////////////////////////////////

//   $header.on("click", ".home", function () {
//     console.log("home got clicked!");
//     $search.detach();
//     $sell.detach();
//     loadListings();
//   });

//   $header.on("click", ".search", function () {
//     console.log("search got clicked!");
//     $sell.detach();
//     $("main").append($search);
//   });

//   $header.on("click", ".sell", function () {
//     console.log("sell got clicked!");
//     $search.detach();
//     $("main").append($sell);
//   });

//   $header.on("click", ".my-listings", function () {});

//   $header.on("click", ".my-likes", function () {});
//   $header.on("click", ".messages", function () {});
//   $header.on("click", ".login", function () {});
//   $header.on("click", ".signup", function () {});
//   $header.on("click", ".logout", function () {});
// });
