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
};

const logout = async () => {
  try {
    localStorage.removeItem("user_data");
    location.href = `http://localhost:5500/frontend/login/login.html`;
  } catch (error) {
    console.log(error);
  }
};

function name() {
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  let name = document.getElementById("name");
  document.getElementById("username").innerHTML = user_data.user.email;
}
