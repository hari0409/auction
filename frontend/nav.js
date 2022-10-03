const loadnav = async () => {
  var ele = document.getElementById("nav_inject");
  ele.innerHTML = `
  `
}

const logout = async () => {
  try {
    localStorage.removeItem("user_data");
    location.href = `http://localhost:5500/frontend/login/login.html`;
  } catch (error) {
    console.log(error);
  }
};

const search=async()=>{
  
}