document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const registerForm = document.querySelector("#register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      localStorage.setItem("laborconnectUser", document.querySelector("#login-email").value);
      document.querySelector("#auth-message").textContent = "Logged in for this demo. Redirecting...";
      setTimeout(() => {
        window.location.href = "customer-dashboard.html";
      }, 700);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const accountType = document.querySelector("#account-type").value;
      localStorage.setItem("laborconnectUser", document.querySelector("#register-email").value);
      document.querySelector("#auth-message").textContent = `${accountType} account created for this demo.`;
      setTimeout(() => {
        window.location.href = accountType === "Worker" ? "worker-dashboard.html" : "customer-dashboard.html";
      }, 800);
    });
  }
});
