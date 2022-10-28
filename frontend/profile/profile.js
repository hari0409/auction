const verify = async () => {
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  document.getElementById("name").innerHTML = user_data.user.name;
  document.getElementById("email").innerHTML = user_data.user.email;
  if (!user_data) {
    window.location.href = `http://localhost:5500/frontend/login/login.html`;
  }
<<<<<<< Updated upstream
};

const logout = async () => {
  try {
    localStorage.removeItem("user_data");
    location.href = `http://localhost:5500/frontend/login/login.html`;
  } catch (error) {
    console.log(error);
  }
=======
  listed.map(async (e) => {
    var item = await fetch(`${url}/api/item/getitem/${e}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    item = await Promise.resolve(item.json());
    var itemo = item.item;
    var all_item = document.getElementById("all_item_auction");
    var item = document.createElement("div");
    item.className = "item";
    if (itemo.status == "live" && itemo.heldBy) {
      item.innerHTML = `<h4 class="prod_name">${itemo?.name.toUpperCase()}</h4></ br><p>Current Price: ${itemo?.currentPrice}</p><a href="/frontend/item/item.html?item_id=${itemo?._id}">
      <button>View Item</button>
      </a>
      <a href="accept/accept.html?prod_id=${itemo._id}&user_id=${user_data.user._id}">
      <button>Accept Offer</button>
    </a>
    `;
    } else if (itemo.status == "live") {
      item.innerHTML = `<h4 class="prod_name">${itemo?.name.toUpperCase()}</h4><p>Current Price: ${itemo?.currentPrice}</p><a href="/frontend/item/item.html?item_id=${itemo?._id}">
      <button>View Item</button>
      </a>
      <p>Item not bid by any one</p>
    `;
    } else {
      item.innerHTML = `<h4 class="prod_name">${itemo?.name.toUpperCase()}</h4><p>Current Price: ${itemo?.currentPrice}</p><a href="/frontend/item/item.html?item_id=${itemo?._id}">
    <button>View Item</button>
    </a>
    <h3 class="sold">SOLD</h3>
    `;
    }
    all_item.appendChild(item);
  });
  console.log(main_user);
  const heldItems = main_user.heldItems;
  heldItems.map(async (e) => {
    var item = await fetch(`${url}/api/item/getitem/${e}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    item = await Promise.resolve(item.json());
    var itemo = item.item;
    var all_item = document.getElementById("all_item_bid");
    var item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `<h4 class="prod_name">${itemo?.name}</h4><p>Current Price: ${itemo?.currentPrice}</p><a href="/frontend/item/item.html?item_id=${itemo?._id}">
    <button>View Item</button>
    </a>
    
    `;
    all_item.appendChild(item);
  });
>>>>>>> Stashed changes
};

function name() {
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  let name = document.getElementById("name");
  document.getElementById("username").innerHTML = user_data.user.email;
}
