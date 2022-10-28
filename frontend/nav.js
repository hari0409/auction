const loadnav = async () => {
  var ele = document.getElementById("nav_inject");
  var stat = localStorage.getItem("user_data");
  if (stat) {
    ele.innerHTML = `
    <a href="/frontend" style="float: left">
      <img class="logo" src="../img/logo.jpg" alt="logo" height="70" width="70" />
    </a>
    <form id="form" onsubmit="search()">
    <input id="query" />
      <button>
        <svg viewBox="0 0 1024 1024">
          <path class="path1"
            d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z">
          </path>
        </svg>
      </button>
    </form>
    <div class="navbar">  
    <a href="" onclick="logout()">
        <button>Logout</button>
      </a>  
    <a href="/frontend/profile/profile.html">
        <button>Profile</button>
      </a>
      <a href="/frontend/add/add.html">
        <button href="">Add item</button>
      </a>
    </div>
  `
  }
  else {
    ele.innerHTML = `
    <a href="/frontend" style="float: left">
      <img class="logo" src="../img/logo.jpg" alt="logo" height="70" width="70" />
    </a>
    <form id="form" onsubmit="search()">
    <input id="query" />
      <button>
        <svg viewBox="0 0 1024 1024">
          <path class="path1"
            d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z">
          </path>
        </svg>
      </button>
    </form>
    <div class="navbar">
      <a href="login/login.html">
        <button>Login</button>
      </a>
      <a href="signup/signup.html">
        <button href="">Sign up</button>
      </a>
      <a href="about/about.html">
        <button href="">About</button>
      </a>
    </div>
  `
  }

}

const logout = async () => {
  try {
    localStorage.removeItem("user_data");
    location.href = `http://localhost:5500/frontend/login/login.html`;
  } catch (error) {
    console.log(error);
  }
};

const search = async () => {
  var search_query = document.getElementById("query").value;
  location.href = `http://localhost:5500/frontend/result/result.html?search_query=${search_query}`;
}

const verify = async () => {
  var user_data = localStorage.getItem("user_data");
  if (!user_data) {
    location.href = `http://localhost:5500/frontend/login/login.html`;
  }
  else {
    var user_data = JSON.parse(user_data);
    var time = Date.now();
    if (time - user_data.time > 3600000) {
      localStorage.removeItem("user_data");
      location.href = `http://localhost:5500/frontend/login/login.html`;
    }
  }
  return;
};


