// Đăng nhập user
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải!");

  const loginBtn = document.getElementById("login-Btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      console.log("Nút đăng nhập đã được nhấn!");
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("❌ Vui lòng nhập email và mật khẩu!");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Kiểm tra user trong danh sách
      const user = users.find(
        (u) => u.loginName === username && u.password === password
      );

      if (user) {
        alert("✅ Đăng nhập thành công!");
        // Lưu thông tin người dùng
        localStorage.setItem("currentUser", JSON.stringify(user));
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        alert("❌ Email hoặc mật khẩu không đúng!");
      }
    });
  }
});

/* Xử lý hiển thị mật khẩu khi click vào icon */
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải EYE ICON");

  function togglePasswordVisibility(inputId, iconId) {
    const passwordField = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);

    if (toggleIcon) {
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
  }

  togglePasswordVisibility("password", "togglePassword");
});

/* Xử lý chuyển hướng khi nhấn nút Đăng ký */
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải Button Register!");

  const registerBtn = document.getElementById("register-Btn");

  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      console.log("Nút đăng ký đã được nhấn!");
      window.location.href = "dangky.html";
    });
  }
});
