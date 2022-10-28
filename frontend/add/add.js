let url = `http://localhost:3000`;

<<<<<<< Updated upstream
=======
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
    if (res.status == 200) {
      img_link = res.data.link;
      alert(`Image Uploaded Successfully ${img_link}`);
    }
    else {
      alert(res.data.error);
      alert("Image Upload Failed");
    }
  } catch (error) {
    alert(error);
  }
};

>>>>>>> Stashed changes
const add = async () => {
  try {
    var name = document.getElementById("name").value;
    var desc = document.getElementById("desc").value;
    var baseprice = document.getElementById("baseprice").value;
    var minInc = document.getElementById("minInc").value;
    var image = document.getElementById("img").value;
    var prf = document.getElementById("proof").value;
    var img = [image];
    var proof = [prf];
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
      proof: proof,  //img and proof are in array format
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
      user_data = JSON.stringify(user_data);
      localStorage.setItem("user_data", user_data);
    } else {
      alert(user_data.msg);
    }
  } catch (error) {
    console.log(error);
  }
};