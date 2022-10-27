let url = `http://localhost:3000`;

const accept = async () => {
  var stat = confirm("Ready to accept the offer?");
  if (stat) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let uid = params.user_id;
    let pid = params.prod_id;
    var res = await fetch(`${url}/api/item/accept/${pid}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
      }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    res = await Promise.resolve(res.json());
    if (res.status="success")
    {
      alert("Offer accepted");
    }
    else{
      alert("Error on accepting the offer");
    }
  } else {
    location.href = "/frontend/profile/profile.html";
  }
};
