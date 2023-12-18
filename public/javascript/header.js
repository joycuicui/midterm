$(() => {
  window.header = {};

  const $header = $(".header");

  let currentUser = null;

  function updateHeader(user) {
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
  }
  window.header.update = updateHeader;

  // testing: when there is a user logged in
  const testUser = { name: "abc" };
  // testing: when there is no user logged in
  // const testUser = null;
  window.header.update(testUser);

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for header elements: home, search, myListing...
  ////////////////////////////////////////////////////////////////////////
  $("$header").on("click", ".home", function () {
    // 1. clear listings
    // 2. get all listings
    // 3. show listings
  });

  $("$header").on("click", ".search", function () {});

  $("$header").on("click", ".sell", function () {});

  $("$header").on("click", ".my-listings", function () {
    // 1. clear listings
    // 2. get all listings(pass user_id as argument)
    // 3. show listings
  });

  $("$header").on("click", ".my-likes", function () {});
  $("$header").on("click", ".messages", function () {});
  $("$header").on("click", ".login", function () {});
  $("$header").on("click", ".signup", function () {});
  $("$header").on("click", ".logout", function () {});
});
