let url = `http://localhost:3000`;

const getitem = async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value = params.item_id; // "some_value"
  var item = await fetch(`${url}/api/item/getitem/${value}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  item = await Promise.resolve(item.json());
  if (item.status != "success") {
    alert("item doesnt exists");
    var no = document.createElement("h1");
    no.innerHTML = "Item Not Found";
    document.body.appendChild(no);
    return;
  } else {
    item = item.item;
    var name_center = document.createElement("center");
    var name_h1 = document.createElement("h1");
    name_h1.innerHTML = item.name;
    name_center.appendChild(name_h1);
    document.body.appendChild(name_center);
    // Main container
    var product_div = document.createElement("div");
    product_div.className = "product";
    // Image of product
    var img = document.createElement("img");
    img.src = item.img[0];
    img.style.width = "500px";
    img.style.height = "500px";
    img.alt = item.name;
    product_div.appendChild(img);
    // Product Description
    var desc_div = document.createElement("div");
    desc_div.className = "desc";
    var prod_desc_p = document.createElement("p");
    prod_desc_p.innerHTML = `<b>Product Description:</b> ${item.desc}`;
    var hr = document.createElement("hr");
    hr.className = "hr";
    //Content Div
    var content_div = document.createElement("div");
    var cp_div = document.createElement("div");
    cp_div.className = "cp_div";
    var bp = document.createElement("p");
    bp.innerHTML = `Base Price: ${item.basePrice}`;
    bp.className = "cp";
    var cp = document.createElement("p");
    cp.innerHTML = `Current Price: ${item.currentPrice}`;
    cp.className = "cp";
    var owner_p = document.createElement("p");
    owner_p.innerHTML = `Owner Name:  <span class="span_content">${item.owner}</span>`;
    var min_inc_p = document.createElement("p");
    min_inc_p.innerHTML = `Minimum Increment:  <span class="span_content">${item.minInc}</span>`;
    var status = document.createElement("p");
    status.innerHTML = `Status:  <span class="span_content status_span">${item.status.toUpperCase()}</span>`;
    var held_by = document.createElement("p");
    held_by.innerHTML = `Held By:  <span class="span_content">${item.heldBy}</span>`;
    var bought_by = document.createElement("p");
    bought_by.innerHTML = `Bought By:  <span class="span_content">${item.boughtBy}</span>`;
    var doc_p = document.createElement("p");
    doc_p.innerHTML = "Important Documents";
    cp_div.appendChild(bp);
    cp_div.appendChild(cp);
    content_div.appendChild(cp_div);
    content_div.appendChild(owner_p);
    content_div.appendChild(min_inc_p);
    content_div.appendChild(status);
    content_div.appendChild(held_by);
    content_div.appendChild(bought_by);
    desc_div.appendChild(prod_desc_p);
    desc_div.appendChild(hr);
    desc_div.appendChild(content_div);
    desc_div.appendChild(doc_p);
    var doc_ul = document.createElement("ul");
    var docs = item.proof;
    doc_ul.className = "doc_list";
    docs.map((e) => {
      var doc_li = document.createElement("li");
      var doc_link = document.createElement("a");
      doc_link.href = e;
      doc_link.innerHTML = "Required Docs";
      doc_li.appendChild(doc_link);
      doc_ul.appendChild(doc_li);
    });
    desc_div.appendChild(doc_ul);
    product_div.appendChild(desc_div);
    document.body.appendChild(product_div);
  }
};
