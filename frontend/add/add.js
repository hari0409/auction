let url = `http://localhost:3000`;

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