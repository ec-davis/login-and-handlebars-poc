const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (!(email && password)) {
    alert("Please supply email and password");
    return;
  }
  // alert("email " + email + " password " + password);
  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) document.location.replace("/");
  else alert("login failed");
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  //   const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  if (!(email && password)) {
    alert("To sign up, please supply email and password");
    return;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    document.querySelector("#password-signup").value = "";
    return;
  }

  const response = await fetch("/api/users/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("signup ok");
    document.location.replace("/");
  } else {
    console.log("response", response);
    alert(response.statusText);
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
