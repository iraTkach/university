const reset = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("wu").style = "display:none";  
};

const url = "https://jsonplaceholder.typicode.com/users";

sessionStorage.setItem("isLogin", false);

const getUser = async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const response = await fetch(`${url}?username=${name}&email=${email}`);

  if (response.ok) {
    const data = await response.json();

    if (data.length) {
      sessionStorage.setItem("user", name);
      sessionStorage.setItem("isLogin", true);
      window.location.replace("full-website.html");
    }
    else
        document.getElementById("wu").style = "display:inline";
  } else {
    console.log("Error");
    document.getElementById("wu").style = "display:inline";

  }
};

const checkAuth = () => {
  if (sessionStorage.getItem("isLogin") === "true") {
    window.location.replace("full-website.html");
  } else {
    return false;

  }
};
