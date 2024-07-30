const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (!(email && password)) {
    alert("Please supply email and password");
    return;
  }

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) document.location.replace("/");
  else {
    const responseData = await response.json();
    alert(`Login error: ${responseData}`);    
  }
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
    document.location.replace("/");
  } else {
    const responseData = await response.json();
    if (responseData.name === "SequelizeUniqueConstraintError") {
      alert(
        `Is there an echo in here? That email already exists in the system.\n\nPlease log in.\n\nIf you have forgotten your password, contact the system administrator (until we implement the 'Forgot Password' feature).`
      );
    } else alert(`Error occurred while creating user: ${response.statusText}`);
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
