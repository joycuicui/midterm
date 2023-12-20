// Client facing scripts here
const $header = $(".header");

let currentUser = null;

const updateHeader = function (user) {
  console.log("updating header with user:", user);
  currentUser = user;
  $header.find(".nav-bar").remove();
  let navBar;
  if (!user) {
    navBar = `
    <div class="nav-box">
      <div class="logo">
        <i class="fa-solid fa-plane-up"></i>
      </div>
    <nav class="nav-bar">
        <ul class="nav-bar-items">
          <li class="home">Home</li>
          <li class="search">Search</li>
          <li class="login">Log In</li>
          <li class="signup">Sign Up</li>
        </ul>
      </nav>
    `;
  } else {
    navBar = `
    <div class="nav-box">
      <div class="logo">
        <i class="fa-solid fa-plane-up"></i>
      </div>
    <nav class="nav-bar">
        <ul class="nav-bar-items">
          <li class="home">Home</li>
          <li class="search">Search</li>
          <li class="sell">Sell</li>
          <li class="my-listings">Listings</li>
          <li class="my-likes">Favorites</li>
          <li class="messages">Messages</li>
          <li class="logout">Log out</li>
        </ul>
      </nav>
    `;
  }
  $header.append(navBar);
};

const $sell = $(`
<section class="sell-box">
  <h2>SELL YOUR PLANE</h2>
  <form id="planeForm" class="planeForm" action="/" method="post">
    <div class="form-left">
      <input type="text" id="title" name="title" placeholder="Title" required />
      <input
        type="number"
        id="price"
        name="price"
        placeholder="Price"
        required
      />
      <input
        type="number"
        id="sell-year"
        name="year"
        placeholder="Year"
        required
      />
      <textarea
        id="description"
        name="description"
        rows="4"
        placeholder="Description"
        required
      ></textarea>

      <input
        type="text"
        id="sell-condition"
        name="condition"
        placeholder="Condition"
        required
      />
      <div class="input-inline">
        <input type="text" id="sell-make" name="make" placeholder="Make" required />

        <input
          type="text"
          id="model"
          name="model"
          placeholder="Model"
          required
        />
      </div>
      <input type="text" id="class" name="class" placeholder="Class" required />
      <div class="input-inline">
        <input
          type="number"
          id="airframeHours"
          name="airframe_hours"
          placeholder="Airframe Hours"
          required
        />

        <input
          type="number"
          id="engineHours"
          name="engine_hours"
          placeholder="Engine Hours"
          required
        />
      </div>
      <input
        type="url"
        id="photoUrl"
        name="photo_url"
        placeholder="Photo URL"
        required
      />
    </div>
    <div class="form-right">
      <button type="submit">Submit</button>
    </div>
  </form>
</section>;
`);

const $search = $(`
  <section class="search-box">
      <h2>SEARCH FOR YOUR DREAM PLANE</h2>
      <form id="planeForm" class="planeForm" action="/listings" method="get">
        <div class="form-left">
          <input
            type="text"
            id="year"
            name="year"
            placeholder="Year"
          />
          <input
            type="text"
            id="condition"
            name="condition"
            placeholder="Condition"
          />

          <div class="input-inline">
            <input
              type="text"
              id="minprice"
              name="minprice"
              placeholder="Minimum Price"
            />

            <input
              type="text"
              id="maxprice"
              name="maxprice"
              placeholder="Maximum Price"
            />
          </div>
          <input
            type="text"
            id="make"
            name="make"
            placeholder="Make"
          />

          <button type="submit">SEARCH</button>
        </div>
      </form>
    </section>
  `);

const $planeListings = $(".all-listings");
// const $planeListings = $(`
//     <section class="all-listings">
//       <div class="divider">
//         <div class="divider-line"></div>
//         <h2 class="divider-text">Featured Listings</h2>
//         <div class="divider-line"></div>
//       </div>
//     </section>
//     `);

const divider = function (string) {
  return `
  <div class="divider">
    <div class="divider-line"></div>
    <h2 class="divider-text">${string}</h2>
    <div class="divider-line"></div>
  </div>
  
  `;
};
// const $divider = $(`
//   <div class="divider">
//     <div class="divider-line"></div>
//     <h2 class="divider-text">Featured Listings</h2>
//     <div class="divider-line"></div>
//   </div>
// `);

const createListing = function (plane) {
  return `
  <article class="listing">
  <div class="listing-image">
    <img
      src="${plane.img_path}"
      alt="plane listing image"
    />
  </div>
  <div class="listing-details">
    <h2 class="listing-details-title">${plane.title}</h2>
    <ul class="listing-details-items">
      <li>PRICE: $${plane.price}</li>
      <li>YEAR: ${plane.year}</li>
      <li>CONDITION: ${plane.condition}</li>
      <li>MAKE: ${plane.make}</li>
      <li>MODEL: ${plane.model}</li>
      <li>AIRFRAME: ${plane.airframe_hours} hours</li>
      <li>ENGINE: ${plane.engine_hours} hours</li>
    </ul>
    <footer class="listing-footer">
      <button class="footer-button details-button">View details</button>
      <button class="footer-button like-button">
        <i class="fa-solid fa-heart"></i>
      </button>
    </footer>
  </div>
</article>
  `;
};

const renderListings = function (listings, sectionName) {
  $planeListings.empty();
  // for (const id in listings) {
  //   const listing = listings[id];
  //   $planeListings.prepend(createListing(listing));
  // }
  $planeListings.append(divider(sectionName));
  console.log("listings:", listings);

  listings.forEach((plane) => {
    const $listing = createListing(plane);
    $planeListings.append($listing);
  });
};

const loadListings = function () {
  console.log("load listings function...");
  console.log("ajax url:", "/api/planes");
  $.ajax({
    method: "GET",
    url: "/api/planes",
  })
    .then(function (results) {
      console.log("results:", results);
      console.log("results.planes:", results.planes);
      renderListings(results.planes, "featured listings");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const $logout = $(`
<section class="logout-section">
<div class="logout-box">
  <div class="logout-with-title">
    <h2>UNTIL NEXT TIME . . .</h2>
      <div class="logout-buttons">
        <button class="logout-button">Log out</button>
      </div>
      <div class="form__group">
        <button class="logout-cancel"><a href="#">Cancel</a></button>
      </div>
  </div>
</div>
</section>
`);

const $login = $(`
<section class="login-section"> 
<div class="login-box">
  <div class="login-form-with-title">
      <h2>READY FOR TAKEOFF? LOG IN NOW!</h2>
      <form action="#" class="login-form">
        <div class="form__group">
            <input type="email" name="login-email" class="form__input" placeholder="Email address" id="login-email" required>
            <label for="login-email" class="form__label">Email address</label>
        </div>
        <div class="form__group">
          <input type="password" name="login-password" class="form__input" placeholder="Password" id="login-password" required>
          <label for="login-password" class="form__label">Password</label>
        </div>
        <div class="form__group">
          <button class="login-button">Log In</button>
         </div>
      </form>
  </div>
</div>
</section>


`);

const $signup = $(`
    <section class="signup-section">
        <div class="signup-box">
          <div class="signup-form-with-title">
            <h2>ELEVATE YOUR DREAMS, SIGN UP TODAY!</h2>
            <form action="#" class="signup-form">
              <div class="form__group">
                <input type="text" name="signup-name" class="form__input" placeholder="Full Name" id="signup-name" required>
                <label for="signup-name" class="form__label">Full name</label>
              </div>
              <div class="form__group">
                 <input type="email" name="signup-email" class="form__input" placeholder="Email Address" id="signup-email" required>
                 <label for="signup-email" class="form__label">Email address</label>
              </div>
              <div class="form__group">
                <input type="password" name="signup-password" class="form__input" placeholder="Password" id="signup-password" required>
                <label for="signup-password" class="form__label">Password</label>
              </div>
              <div class="form__group">
                <button class="signup-button">Sign up</button>
              </div>
            </form>
          </div>
        </div>
    </section>
`);

$(() => {
  $.ajax({
    url: "api/users/me",
  }).then(function (json) {
    updateHeader(json.user);
  });

  // testing: when there is a user logged in
  // const testUser = { name: "abc" };
  // testing: when there is no user logged in
  // const testUser = null;
  // updateHeader(testUser);
  $search.detach();
  $sell.detach();
  $("main").append($planeListings);
  loadListings();

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for header elements: home, search, myListing...
  ////////////////////////////////////////////////////////////////////////

  $header.on("click", ".home", function () {
    console.log("home got clicked!");
    $logout.detach();
    $login.detach();
    $signup.detach();
    $planeListings.detach();
    $search.detach();
    $sell.detach();
    $("main").append($planeListings);
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    loadListings();
  });

  $header.on("click", ".search", function () {
    console.log("search got clicked!");
    $planeListings.detach();
    $sell.detach();
    $logout.detach();
    $login.detach();
    $signup.detach();
    $("main").append($search);
    $search[0].scrollIntoView({ behavior: "smooth" });

    const $searchForm = $(".search-box");
    $searchForm.on("submit", function (event) {
      event.preventDefault();
      const formData = {
        year: $("#year").val(),
        condition: $("#condition").val(),
        minimum_price: $("#minprice").val(),
        maximum_price: $("#maxprice").val(),
        make: $("#make").val(),
      };
      console.log("search form data:", formData);
      $.ajax({
        method: "GET",
        url: "api/planes/listings/search",
        data: formData,
      })
        .then(function (results) {
          console.log("search results:", results);
          $("main").append($planeListings);
          $search.detach();
          renderListings(results.planes, "search results");
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  });

  $header.on("click", ".sell", function () {
    console.log("sell got clicked!");
    $planeListings.detach();
    $search.detach();
    $logout.detach();
    $login.detach();
    $signup.detach();
    $("main").append($sell);
    $sell[0].scrollIntoView({ behavior: "smooth" });

    const $sellForm = $(".sell-box");
    $sellForm.on("submit", function (event) {
      event.preventDefault();
      const formData = {
        title: $("#title").val(),
        price: $("#price").val(),
        year: $("#sell-year").val(),
        description: $("#description").val(),
        condition: $("#sell-condition").val(),
        make: $("#sell-make").val(),
        model: $("#model").val(),
        planes_class: $("#class").val(),
        airframe_hours: $("#airframeHours").val(),
        engine_hours: $("#engineHours").val(),
        // img_path: $("#photoUrl").val(),
      };
      console.log("sell form data:", formData);
      $.ajax({
        method: "POST",
        url: "api/planes/listings",
        data: formData,
      })
        .then(function (results) {
          console.log("sell form results:", results);
          $("main").append($planeListings);
          $sell.detach();
          renderListings(results.planes, "my new listing");
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  });
  $header.on("click", ".my-listings", function () {});

  $header.on("click", ".my-likes", function () {});
  $header.on("click", ".messages", function () {});
  $header.on("click", ".login", function () {
    console.log("login got clicked!");
    $planeListings.detach();
    $search.detach();
    $sell.detach();
    $logout.detach();
    $("main").append($login);
    $login[0].scrollIntoView({ behavior: "smooth" });
    const $loginFrom = $(".login-form");
    $loginFrom.on("submit", function (event) {
      event.preventDefault();
      console.log("login form submitted!");
      const data = $(this).serialize();
      const email = $(this).find('input[name="login-email"]').val();
      console.log("email entered for login is:", email);
      console.log("serialized data:", data);
      console.log("before ajax request");
      $.ajax({
        method: "POST",
        url: "/api/users/login",
        data,
      })
        .then((results) => {
          console.log("server response:", results);
          if (!results.user) {
            return console.log("unable to log in");
          }
          console.log("results.user:", results.user);
          updateHeader(results.user);
        })
        // .then(() => {
        //   window.location.href = "/";
        // })
        .catch((error) => {
          console.log("error during ajax:", error);
        });
      $login.detach();
      $("main").append($planeListings);
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      loadListings();
    });
  });
  $header.on("click", ".signup", function () {
    console.log("signup got clicked!");
    $planeListings.detach();
    $search.detach();
    $sell.detach();
    $logout.detach();
    $login.detach();
    $("main").append($signup);
    $signup[0].scrollIntoView({ behavior: "smooth" });
    const $signupFrom = $(".signup-form");
    $signupFrom.on("submit", function (event) {
      event.preventDefault();
      console.log("signup form submitted!");
      const data = $(this).serialize();
      console.log("serialized data:", data);
      // const email = $(this).find('input[name="login-email"]').val();
      // console.log("email entered for login is:", email);
      console.log("before ajax request");
      $.ajax({
        method: "POST",
        url: "/api/users/",
        data,
      }).then(() => {
        $.ajax({
          url: "api/users/me",
        }).then((results) => {
          console.log("server response:", results);
          // console.log("results.user:", results.user);
          updateHeader(results);
        });
      });
      $signup.detach();
      $("main").append($planeListings);
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      loadListings();
    });
  });

  $header.on("click", ".logout", function () {
    console.log("logout got clicked!");
    $planeListings.detach();
    $search.detach();
    $sell.detach();
    $login.detach();
    $signup.detach();
    $("main").append($logout);
    $logout[0].scrollIntoView({ behavior: "smooth" });
    const $logoutButton = $(".logout-button");
    $logoutButton.on("click", function () {
      console.log("logout button clicked!");
      $.ajax({
        method: "POST",
        url: "/api/users/logout",
      })
        .then(() => {
          return updateHeader(null);
        })
        .then(() => {
          window.location.href = "/";
        });
    });
    const $logoutCancel = $(".logout-cancel");
    $logoutCancel.on("click", function () {
      console.log("cancel in logout box got clicked!");
      window.location.href = "/";
    });
  });
});
