const loginFormHandler = async (event) => {
  alert("login");
};

const signupFormHandler = async (event) => {
  alert("signup");
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
