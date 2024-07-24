const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (!(email && password)) {
    alert("Please supply email and password");
    return;
  }
  alert("email " + email + " password " + password);
  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application-json" },
  });

  if (response.ok) document.location.replace("/");
  else alert("holy cow, failed to log in");
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  //   const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  if (!(email && password)) {
    alert("Please supply email and password");
    return;
  }
  alert(" email " + email + " password " + password);
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);