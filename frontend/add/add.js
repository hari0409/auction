let url = `http://localhost:3000`;

let img_link;

const upload = async (e) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID 4c058197db82eae");
    var formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    var res = await fetch(
      "https://api.imgur.com/3/image",
      requestOptions
    ).catch((error) => alert(error));
    res = res.json();
    res = await Promise.resolve(res);
    img_link = res.data.link;
  } catch (error) {
    alert(error);
  }
};

const add = async () => {
  try {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var baseprice = document.getElementById("baseprice").value;
    var minInc = document.getElementById("minInc").value;
    var img = [img_link];
    var proof = [];
    var proof = [];
    let user = localStorage.getItem("user_data");
    user = JSON.parse(user);
    const data = {
      email: user.user.email,
      name: name,
      basePrice: Number(baseprice),
      img: img,
      minInc: Number(minInc),
      desc: desc,
      category: ["collectibles & art", "electronics"],
      proof: proof, //img and proof are in array format
    };
    const res = await fetch(`${url}/api/item/createitem`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-rerer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    var user_data = await Promise.resolve(res.json());
    if (res.status == 200) {
      alert("Item added Successfully");
      location.href = "http://localhost:5500/frontend/profile/profile.html";
    } else {
      alert(user_data.msg);
    }
  } catch (error) {
    alert(error);
  }
};
