const logOutLink = document.querySelector("#logout");

/* calls API to destroy the session */
const userLogOut = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) await document.location.replace("/");
  else alert("Logout failed.");
};

logOutLink.addEventListener("click", userLogOut);
