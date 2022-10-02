let url = `http://localhost:3000`;

const fetchHistory = async () => {
  var user = localStorage.getItem("user_data");
  user = JSON.parse(user);
  var orderHistory = user.user.bought;
  console.log(orderHistory);
  var product_container = document.getElementById("product_grid");
  orderHistory.map(async (e) => {
    var item = await fetch(`${url}/api/item/getitem/${e.prodId}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    item = await Promise.resolve(item.json());
    item = item.item;
    console.log(item.img[0]);
    //Main Product div;
    var product = document.createElement("div");
    product.className = "product";
    // Product Image
    var productImg = document.createElement("img");
    productImg.src = item.img[0];
    productImg.style.width = "200px";
    productImg.style.height = "200px";
    productImg.className = "prod_img";
    // Data Div
    var data = document.createElement("div");
    data.className = "data";
    // Meta data
    var h2 = document.createElement("h2");
    h2.innerHTML = item.name;
    h2.className = "prod_title";
    var bp = document.createElement("p");
    bp.innerHTML = `Bought for: ${item.currentPrice}`;
    bp.className = "bp";
    var owner = document.createElement("p");
    owner.innerHTML = `Bought from: ${item.owner}`;
    owner.className = "owner";
    var atag = document.createElement("a");
    atag.href = `http://localhost:5500/frontend/item/item.html?item_id=${item._id}`;
    var abutton = document.createElement("button");
    abutton.className = "view_more";
    abutton.innerHTML = "View More";
    atag.append(abutton);
    data.appendChild(h2);
    data.appendChild(bp);
    data.appendChild(owner);
    data.appendChild(atag);
    product.appendChild(productImg);
    product.appendChild(data);
    product_container.appendChild(product);
  });
};
