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
            <li>Home</li>
            <li>Search</li>
            <li>Log In</li>
            <li>Sign Up</li>
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
            <li>Home</li>
            <li>Search</li>
            <li>Sell</li>
            <li>Listings</li>
            <li>Favorites</li>
            <li>Messages</li>
            <li>Log out</li>
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
});
