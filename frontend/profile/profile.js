const verify=async()=>{
    var user_data=localStorage.getItem("user_data");
    user_data=JSON.parse(user_data);
    console.log(user_data);
    if (!user_data){
        window.location.href=`http://localhost:5500/frontend/login/login.html`;
    }
}