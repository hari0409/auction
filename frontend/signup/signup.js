let url = `http://localhost:3000`;

const verify = async () => {
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  if (user_data) {
    window.location.href = `http://localhost:5500/frontend/profile/profile.html`;
  }
};

const create = async () => {
  try {
    console.log("executing create");
    var pass = document.getElementById("Pass").value;
    var cpass = document.getElementById("CPass").value;
    if (pass != cpass) {
      alert("Password not matching");
      return false;
    }
    const userObject = {
      name: document.getElementById("Uname").value,
      email: document.getElementById("Uemail").value,
      password: pass,
    };
    const res = await fetch(`${url}/api/auth/create`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(userObject), // body data type must match "Content-Type" header
    });
    var user_data = await Promise.resolve(res.json());
    console.log(user_data);
    if (user_data.status == "failure") {
      alert(user_data.msg);
    }
  } catch (error) {
    console.log(error);
  }
};
