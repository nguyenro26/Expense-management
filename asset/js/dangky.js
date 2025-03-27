// DatePicker
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải DATEPICKER");
  flatpickr("#datepicker", {
    dateFormat: "d/m/Y",
    maxDate: "today",
    defaultDate: "01/01/2000",
    locale: "vn",
  });
});

// Đăng ký người dùng
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải BUTTON REGISTER");

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      console.log("Nút đăng ký đã được nhấn!");

      const loginName = document.getElementById("loginName").value.trim();
      const role = document.getElementById("role").value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,}$/;

      if (
        !loginName ||
        !role ||
        !firstName ||
        !lastName ||
        !phone ||
        !address ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        alert("❌ Thiếu thông tin, vui lòng nhập đầy đủ!");
        return;
      }

      if (!passwordRegex.test(password)) {
        alert(
          "❌ Mật khẩu phải có ít nhất 6 ký tự, bao gồm:\n- Ít nhất 1 chữ hoa\n- Ít nhất 1 chữ thường\n- Ít nhất 1 số\n- Ít nhất 1 ký tự đặc biệt"
        );
        return;
      }

      if (password !== confirmPassword) {
        alert("❌ Mật khẩu nhập lại không khớp!");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Kiểm tra xem email đã tồn tại chưa
      const isUserExist = users.some((user) => user.email === email);
      if (isUserExist) {
        alert("❌ Email đã tồn tại! Vui lòng chọn email khác.");
        return;
      }

      const userData = {
        loginName,
        role,
        firstName,
        lastName,
        phone,
        address,
        email,
        password,
      };

      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));

      console.log("Đăng ký thành công!", userData);
      alert("✅ Đăng ký thành công!");

      setTimeout(() => {
        window.location.href = "dangnhap.html";
      }, 1000);
    });
  }
});

// Hiện thị password
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
  togglePasswordVisibility("confirmPassword", "toggleConfirmPassword");
});
