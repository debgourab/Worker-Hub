document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const registerForm = document.querySelector("#register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Demo navigation only; do not persist personal credentials.
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
      // Demo navigation only; do not persist personal credentials.
      document.querySelector("#auth-message").textContent = `${accountType} demo selected. No account was created.`;
      setTimeout(() => {
        window.location.href = accountType === "Worker" ? "worker-dashboard.html" : "customer-dashboard.html";
      }, 800);
    });
  }
});
