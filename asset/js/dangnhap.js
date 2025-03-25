document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải!");

  const loginBtn = document.getElementById("login-Btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      console.log("Nút đăng nhập đã được nhấn!");
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      // Kiểm tra nếu không nhập
      if (!username || !password) {
        alert("❌ Vui lòng nhập email và mật khẩu!");
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("userData"));

      if (!storedUser) {
        alert("❌ Không tìm thấy tài khoản! Vui lòng đăng ký.");
        return;
      }
      // Kiểm tra tài khoản đã đăng ký
      if (
        username === storedUser.loginName &&
        password === storedUser.password
      ) {
        alert("✅ Đăng nhập thành công!");
        console.log("Người dùng đăng nhập:", storedUser);

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        alert("❌ Email hoặc mật khẩu không đúng!");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải EYE ICON");

  function togglePasswordVisibility(inputId, iconId) {
    const passwordField = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);

    toggleIcon.addEventListener("click", function () {
      if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
      } else {
        passwordField.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
      }
    });
  }

  // Gọi hàm cho ô mật khẩu
  togglePasswordVisibility("password", "togglePassword");
});
