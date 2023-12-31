// Client facing scripts here
const $header = $(".header");
const $viewOurPlanes = $("#view-our-planes");

let currentUser = null;
const $msgContainer = $("#msg-container");

// Function to display an app browser message

const displayMsg = function (message) {
  $("#msg-container").addClass("visible-element");
  $("#msg-container").text(message).slideDown();
  const $mainElement = $("#main");
  $mainElement[0].scrollIntoView({ behavior: "smooth", block: "start" });
};

// Function to hide the error message
const hideMsg = function () {
  $msgContainer.removeClass("visible-element");
  $msgContainer.slideUp();
  $msgContainer.text("");
};

const updateHeader = function (user) {
  console.log("updating header with user:", user);
  currentUser = user;
  $header.find(".nav-bar").remove();
  let navBar;
  if (!user) {
    navBar = `
    <div class="nav-box">
      <div class="logo">
        <i class="fa-solid fa-plane-up fa-spin"></i>
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
        <i class="fa-solid fa-plane-up fa-spin"></i>
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

const divider = function (string) {
  return `
  <div class="divider">
    <div class="divider-line"></div>
    <h2 class="divider-text">${string}</h2>
    <div class="divider-line"></div>
  </div>
  <div id="msg-container"></div>
  `;
};

const $viewSpecificListing = $(".view-specific-listing");
const fullListingDetails = function (plane) {
  return `
  <div class="view-top">
  <h1 id="planes-title">${plane[0].title}</h1>
  </div>
  <div class="view-bottom">
    <div class="plane-image">
      <img class="view-right"
        src="${plane[0].img_path}"
        id = "planes-image-path"
        alt="plane listing image"
      />
    </div>
    <div class="view-right">
        <div class="planeDesc">
            <span class="value" id = "planes-description">${plane[0].description}</span>
        </div>
        <div class="ten-details">
          <div class="first-five">
            <div class="planesPrice">
              <span class="label">PRICE :</span>
              <span class="value" id = "planes-price">${plane[0].price}</span>
            </div>
            <div class="planeYear">
              <span class="label">YEAR :</span>
              <span class="value" id = "planes-year">${plane[0].year}</span>
            </div>
            <div class="planeMake">
              <span class="label">MAKE :</span>
              <span class="value" id = "planes-make">${plane[0].make}</span>
            </div>
            <div class="planeModel">
              <span class="label">MODEL:</span>
              <span class="value" id = "planes-model">${plane[0].model}</span>
            </div>
            <div class="planeCondition">
              <span class="label">CONDITION :</span>
              <span class="value" id = "planes-condition">${plane[0].condition}</span>
            </div>
          </div>
          <div class="second-five">
            <div class="planeClass">
              <span class="label">CLASS :</span>
              <span class="value" id = "planes-class">${plane[0].planes_class}</span>
            </div>
            <div class="planeAirFrameHrs">
              <span class="label">AIR FRAME HOURS :</span>
              <span class="value" id = "planes-airframe-hours">${plane[0].airframe_hours}</span>
            </div>
            <div class="planeEngineHrs">
              <span class="label">ENGINE HOURS :</span>
              <span class="value" id = "planes-engine-hours">${plane[0].engine_hours}</span>
            </div>

            <div class="planeSeller">
              <span class="label">SELLER :</span>
              <span class="value" id = "planes-user-id">${plane[0].email}</span>
            </div>
            <div class="planePosted">
              <span class="label">DATE POSTED :</span>
              <span class="value" id = "planes-date-posted">${plane[0].date_posted}"</span>
            </div>
          </div>
      </div>
        <div class="view-buy-like-buttons">
              <button class="footer-button buy-button" id="buy-button" data-plane-id="${plane[0].id}">BUY</button>
              <button class="footer-button like-button" id="like-button" data-plane-id="${plane[0].id}"><i class="fa-solid fa-heart"></i></button>
        </div>
        <div class="view-edit-delete-buttons">
              <button class="footer-button edit-button" id="edit-button" data-plane-id="${plane[0].id}">EDIT</button>
              <button class="footer-button delete-button" id="delete-button" data-plane-id="${plane[0].id}">DELETE</button>
      </div>
  </div>
</div>
`;
};

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
      <button class="footer-button details-button" data-plane-id="${plane.id}" data-user-id="${plane.user_id}">View details</button>
      <button class="footer-button like-button" data-plane-id="${plane.id}" data-user-id="${plane.user_id}">
        <i class="fa-solid fa-heart"></i>
      </button>
    </footer>
  </div>
</article>
  `;
};

const renderDetailedListings = function (plane, sectionName) {
  $viewSpecificListing.empty();
  $viewSpecificListing.append(divider(sectionName));
  console.log("passed plane value: ", plane);
  const $planeDetails = fullListingDetails(plane);
  $viewSpecificListing.append($planeDetails);
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
    const $listing = $(createListing(plane));
    $planeListings.append($listing);
    /*-- Check if the currentUser is defined, if not set to null ---*/
    console.log("current user id:", currentUser ? currentUser.id : null);
    /*-- Check if the current user is the owner of the plane ---*/
    const isCurrentUserOwner = currentUser && plane.user_id === currentUser.id;
    /*-- Show or hide edit and delete buttons based on ownership ---*/
    const $likeButton = $listing.find(".like-button");
    if (isCurrentUserOwner) {
      $likeButton.hide();
    } else {
      $likeButton.show();
    }
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

  $search.detach();
  $sell.detach();
  $viewSpecificListing.detach().empty();
  hideMsg();
  $("main").append($planeListings);
  loadListings();

  ////////////////////////////////////////////////////////////////////////
  /// event listener for header button: VIEW OUR PLANES
  ////////////////////////////////////////////////////////////////////////
  $viewOurPlanes.on("click", function () {
    $planeListings.empty();
    $search.detach();
    $sell.detach();
    $logout.detach();
    $login.detach();
    $signup.detach();
    $messages.empty();
    $viewSpecificListing.detach().empty();
    hideMsg();
    $.ajax({
      method: "GET",
      url: `api/planes/all`,
    }).then((results) => {
      $("main").append($planeListings);
      renderListings(results.planes, "all plane listings");
      $planeListings[0].scrollIntoView({ behavior: "smooth" });
    });
  });

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: HOME
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".home", function () {
    console.log("home got clicked!");
    $logout.detach();
    $login.detach();
    $signup.detach();
    $planeListings.detach();
    $search.detach();
    $sell.detach();
    $messages.empty();
    $newmessage.empty();
    $viewSpecificListing.detach().empty();
    hideMsg();
    $("main").append($planeListings);
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    loadListings();
  });

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: SEARCH
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".search", function () {
    console.log("search got clicked!");
    $planeListings.detach();
    $sell.detach();
    $logout.detach();
    $login.detach();
    $signup.detach();
    $messages.empty();
    $newmessage.empty();
    $viewSpecificListing.detach().empty();
    hideMsg();
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
          $searchForm.find("input[type=text], input[type=number]").val("");
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  });

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: SELL
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".sell", function () {
    console.log("sell got clicked!");
    $planeListings.detach();
    $search.detach();
    $logout.detach();
    $login.detach();
    $signup.detach();
    $messages.empty();
    $newmessage.empty();
    $viewSpecificListing.detach().empty();
    hideMsg();
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
        img_path: $("#photoUrl").val(),
        userId: currentUser.id,
      };
      console.log("sell form data:", formData);
      $.ajax({
        method: "POST",
        url: "api/planes/listings",
        data: formData,
      })
        .then(function (results) {
          console.log("success inserted data:", results);
          /*--- Clear all form fields --*/
          $sellForm.find(":input").val("");
          //$("main").append($planeListings);
          $sell.detach();

          /*-- Append $viewSpecificListing to DOM ---*/
          $("main").append($viewSpecificListing);

          /*-- Call function to render detailed listing ---*/
          renderDetailedListings(results.planes, "PLANE LISTING FULL DETAILS");

          $viewSpecificListing[0].scrollIntoView({ behavior: "smooth" });

          /*-- Check if the currentUser is defined, if not set to null ---*/
          console.log("current user id:", currentUser ? currentUser.id : null);

          /*-- Check if the current user is the owner of the plane ---*/
          const isCurrentUserOwner =
            currentUser && results.planes[0].user_id === currentUser.id;

          /*-- Show or hide edit and delete buttons based on ownership ---*/
          if (isCurrentUserOwner) {
            $(".view-edit-delete-buttons").show();
            $(".view-buy-like-buttons").hide();
          } else {
            $(".view-edit-delete-buttons").hide();
            $(".view-buy-like-buttons").show();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  });

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: LISTINGS
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".my-listings", function () {
    $planeListings.empty();
    console.log("current user id:", currentUser.id);
    $search.detach();
    $sell.detach();
    $logout.detach();
    $login.detach();
    $signup.detach();
    $messages.empty();
    $newmessage.empty();
    $viewSpecificListing.detach().empty();
    hideMsg();
    $.ajax({
      method: "GET",
      url: `api/planes/listings/user`,
    }).then((results) => {
      console.log("results in my listings:", results.listings);
      $("main").append($planeListings);
      renderListings(results.listings, "my listings");
      $planeListings[0].scrollIntoView({ behavior: "smooth" });
      $(".like-button").hide();
    });
  });

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: FAVORITES
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".my-likes", function () {
    $planeListings.empty();
    console.log("current user id:", currentUser.id);
    $search.detach();
    $sell.detach();
    $logout.detach();
    $login.detach();
    $signup.detach();
    $messages.empty();
    $newmessage.empty();
    $viewSpecificListing.detach().empty();
    hideMsg();
    $.ajax({
      method: "GET",
      url: `api/planes/listings/user/likes`,
    }).then((results) => {
      console.log("results in my liked listings:", results.likedListings);
      $("main").append($planeListings);

      renderListings(results.likedListings, "my favorite planes");
      $planeListings[0].scrollIntoView({ behavior: "smooth" });
      $(".like-button").hide();
    });
  });

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for messaging related functions
  ////////////////////////////////////////////////////////////////////////
  const $messages = $(".all-messages");
  const $newmessage = $(".new-message");
  const createMessageListing = function (message, index) {
    return `
    <div class="message-container">
    <div class="message-flex">
    <div class="message-list">
     <p class="message-title">Messsage for the listing:</p>
    <p>Title: ${message.title}</p>
    <p>Year:${message.year}</p>
    <p>Make:${message.make} </p>
    <p>Model:${message.model} </p>
    </div>
   <div class="message-sender">
    <p >Message: ${message.content} </p>
    <p>Sent by: ${message.name} </p>
  <p>At:${message.time_sent} </p>
  </div>
  </div>
  <div class="message-form">
<p>Reply to this message:</p>
<form class="message-reply" data-id=${index}  >
<input type="hidden" id ="receiver_id_${index}" name="receiver_id" value=${message.userid}>
<input type="hidden" id ="listing_id_${index}" name="listing_id" value=${message.planesid}>
<input type="text" id = "content_${index}" name="content" required>
<p id = "sent-text_${index}"></p>
<button>Submit</button>
</form>

</div>
</div>
  `;
  };
  $messages.on("submit", ".message-reply", function (event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    const list = `#listing_id_${id}`;
    const rec = `#receiver_id_${id}`;
    const con = `#content_${id}`;
    const formData = {
      listing_id: $(list).val(),
      receiver_id: $(rec).val(),
      content: $(con).val(),
    };
    $.ajax({
      method: "POST",
      url: "/api/planes/messages",
      data: formData,
    })
      .then((results) => {
        const mm = `#sent-text_${id}`;
        $(mm).text("Message sent!");
        $(con).val(" ");
      })
      .catch((error) => {
        console.log("error during ajax:", error);
      });
  });
  const $button = $(
    `<button class="mes_compose_button">Compose New Message</button>`
  );
  const $newMsg = $(`
  <form id="new-msg-Form">
        <label for="new-dropdown">Select a Listing:</label>
        <select id="new-dropdown" name="dropdown">
      </select>
      <br>
    <label for="msg-Field">Enter message:</label>
    <input type="text" id="msg-Field" name="msg-Field" required>
    <button type="submit">Submit Message</button>
    <p class="new-msg-p"></p>
  </form>
  </div>
  `);
  const createNewMessage = function (listing) {
    return `
        <option value="${listing.user_id}_${listing.id}">${listing.title}</option>
    `;
  };
  $messages.on("click", ".mes_compose_button", function () {
    console.log("compose new message clicked");
    $messages.empty();
    $.ajax({
      method: "GET",
      url: "/api/planes/listings/search",
    }).then((results) => {
      const lismsg = results.planes;
      $newmessage.append($newMsg);
      lismsg.forEach((lis) => {
        const $nems = createNewMessage(lis);
        $("#new-dropdown").append($nems);
      });
    });
  });
  $newmessage.on("submit", "#new-msg-Form", function (event) {
    console.log("new message submitted");
    event.preventDefault();
    let joinedVal = $("#new-dropdown").val();
    const lisitng_id = joinedVal.split("_")[1];
    const receiver_id = joinedVal.split("_")[0];
    const formData = {
      listing_id: lisitng_id,
      receiver_id: receiver_id,
      content: $("#msg-Field").val(),
    };
    $.ajax({
      method: "POST",
      url: "/api/planes/messages",
      data: formData,
    })
      .then((results) => {
        $(".new-msg-p").text("Message sent!");
        $("#msg-Field").val(" ");
      })
      .catch((error) => {
        console.log("error during ajax:", error);
      });
  });
  const renderMessages = function (messages) {
    $messages.empty();
    $messages.append($button);
    messages.forEach((message, index) => {
      const $msg = createMessageListing(message, index);
      $messages.append($msg);
    });
  };

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: messages
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".messages", function () {
    $.ajax({
      method: "GET",
      url: "/api/planes/messages",
    }).then((results) => {
      $newmessage.empty();
      $planeListings.detach();
      $search.detach();
      $sell.detach();
      $logout.detach();
      $login.detach();
      $viewSpecificListing.detach().empty();
      renderMessages(results);
    });
  });

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: LOGIN
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".login", function () {
    console.log("login got clicked!");
    $planeListings.detach();
    $search.detach();
    $sell.detach();
    $logout.detach();
    $signup.detach();
    $messages.empty();
    $viewSpecificListing.detach().empty();
    hideMsg();
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

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: SIGNUP
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".signup", function () {
    console.log("signup got clicked!");
    $planeListings.detach();
    $search.detach();
    $sell.detach();
    $logout.detach();
    $login.detach();
    $messages.empty();
    $viewSpecificListing.detach().empty();
    hideMsg();
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

  ////////////////////////////////////////////////////////////////////////
  /// event listeners for nav-bar button: LOGOUT
  ////////////////////////////////////////////////////////////////////////
  $header.on("click", ".logout", function () {
    console.log("logout got clicked!");
    $planeListings.detach();
    $search.detach();
    $sell.detach();
    $login.detach();
    $messages.empty();
    $signup.detach();
    $viewSpecificListing.detach().empty();
    hideMsg();
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

////////////////////////////////////////////////////////////////////////
/// event listeners for plane listing buttons: VIEW DETAILS
////////////////////////////////////////////////////////////////////////
$planeListings.on("click", ".details-button", function () {
  console.log("View Detail button clicked!");
  console.log("Clicked element:", this);
  const clickedPlaneId = $(this).data("plane-id");
  console.log("plane id ---> ", clickedPlaneId);

  /*-- Detach HTML templates from DOM---*/
  $planeListings.detach();
  $search.detach();
  $sell.detach();
  hideMsg();

  /*-- Ajax call for full details of selected plane---*/
  $.ajax({
    method: "GET",
    url: "/api/planes/listings/" + clickedPlaneId,
  })
    .then(function (results) {
      console.log("planes:", results);

      /*-- Append $viewSpecificListing to DOM ---*/
      $("main").append($viewSpecificListing);

      /*-- Call function to render detailed listing ---*/
      renderDetailedListings(results.planes, "PLANE LISTING FULL DETAILS");
      $viewSpecificListing[0].scrollIntoView({ behavior: "smooth" });
      /*-- Check if the currentUser is defined, if not set to null ---*/
      console.log("current user id:", currentUser ? currentUser.id : null);

      /*-- Check if the current user is the owner of the plane ---*/
      const isCurrentUserOwner =
        currentUser && results.planes[0].user_id === currentUser.id;

      /*-- Show or hide edit and delete buttons based on ownership ---*/
      if (isCurrentUserOwner) {
        $(".view-edit-delete-buttons").show();
        $(".view-buy-like-buttons").hide();
      } else {
        $(".view-edit-delete-buttons").hide();
        $(".view-buy-like-buttons").show();
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
});

////////////////////////////////////////////////////////////////////////
/// event listeners for plane listing buttons: DELETE
////////////////////////////////////////////////////////////////////////
$viewSpecificListing.on("click", "#delete-button", function () {
  console.log("View Delete button clicked!");
  console.log("Clicked element:", this);
  const clickedPlaneId = $(this).data("plane-id");
  console.log("plane id ---> ", clickedPlaneId);

  ///*-- Ajax call deleting specific plane ---*/
  $.ajax({
    method: "DELETE",
    url: "/api/planes/listings/delete/" + clickedPlaneId,
  })
    .then(function (results) {
      console.log("response received from api ---> ", results);
      displayMsg("Success : Listing successfully deleted.");
      // Redirect to the home page after a delay (e.g., 3 seconds)
      setTimeout(function () {
        $viewSpecificListing.detach().empty();
        $("main").append($planeListings);
        loadListings();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 3000);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

////////////////////////////////////////////////////////////////////////
/// event listeners for plane listing buttons: LIKE
////////////////////////////////////////////////////////////////////////
$viewSpecificListing.on("click", "#like-button", function () {
  console.log("View LIKE button clicked!");
  console.log("Clicked element:", this);
  const clickedPlaneId = $(this).data("plane-id");
  console.log("plane id ---> ", clickedPlaneId);

  /*-- Check if the user is logged in---*/
  const userId = currentUser ? currentUser.id : null;

  if (!userId) {
    console.log("You must be logged in to LIKE this.");
    displayMsg("Error: You must be logged in to LIKE this.");
  } else {
    /*-- Ajax call to insert new likes---*/
    $.ajax({
      method: "POST",
      url: "/api/planes/listings/" + clickedPlaneId + "/likes",
    })
      .then(function (results) {
        console.log("response received from api ---> ", results);
        displayMsg(
          "Success : Listing added to Favourites. Click on Favourites for complete list."
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
});

$planeListings.on("click", ".like-button", function () {
  console.log("View LIKE button clicked!");
  console.log("Clicked element:", this);
  const clickedPlaneId = $(this).data("plane-id");
  console.log("plane id ---> ", clickedPlaneId);

  /*-- Check if the user is logged in---*/
  const userId = currentUser ? currentUser.id : null;

  if (!userId) {
    console.log("You must be logged in to LIKE this.");
    displayMsg("Error: You must be logged in to LIKE this.");
  } else {
    /*-- Ajax call to insert new likes---*/
    $.ajax({
      method: "POST",
      url: "/api/planes/listings/" + clickedPlaneId + "/likes",
    })
      .then(function (results) {
        console.log("response received from api ---> ", results);
        displayMsg(
          "Success : Listing added to Favourites. Click on Favourites for complete list."
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
});

////////////////////////////////////////////////////////////////////////
/// event listeners for plane listing buttons: BUY
////////////////////////////////////////////////////////////////////////
$viewSpecificListing.on("click", "#buy-button", function () {
  console.log("View BUY button clicked!");
  console.log("Clicked element:", this);
  const clickedPlaneId = $(this).data("plane-id");
  console.log("plane id ---> ", clickedPlaneId);

  /*-- Check if the user is logged in---*/
  const userId = currentUser ? currentUser.id : null;
  console.log("current user id:", currentUser ? currentUser.id : null);
  if (!userId) {
    console.log("You must be logged in to BUY this.");
    displayMsg("Error: You must be logged in to BUY this.");
  } else {
    displayMsg(
      "Thank you for buying and enjoy your new plane. NO RETURNS!😁😁😁"
    );
    setTimeout(function () {
      $viewSpecificListing.detach().empty();
      $("main").append($planeListings);
      loadListings();
      // Scroll the entire page to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);
  }
});

////////////////////////////////////////////////////////////////////////
/// event listeners for plane listing buttons: EDIT

////////////////////////////////////////////////////////////////////////
$viewSpecificListing.on("click", "#edit-button", function () {
  console.log("View EDIT button clicked!");
  console.log("Clicked element:", this);
  const clickedPlaneId = $(this).data("plane-id");
  console.log("plane id ---> ", clickedPlaneId);
});
