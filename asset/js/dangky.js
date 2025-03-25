document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải DATEPICKER");
  flatpickr("#datepicker", {
    dateFormat: "d/m/Y", // Hiển thị theo định dạng ngày/tháng/năm
    maxDate: "today", // Không cho chọn ngày trong tương lai
    defaultDate: "2000-01-01", // Ngày mặc định
    locale: "vn", // Hỗ trợ tiếng Việt nếu cần
  });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải BUTTON REGISTER");

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      console.log("Nút đăng ký đã được nhấn!");

      const loginName = document.getElementById("loginName").value.trim();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

      // Biểu thức kiểm tra mật khẩu mạnh
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,}$/;

      // Kiểm tra các trường có bị bỏ trống không
      if (
        !loginName ||
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

      // Kiểm tra mật khẩu có đạt yêu cầu không
      if (!passwordRegex.test(password)) {
        alert(
          "❌ Mật khẩu phải có ít nhất 6 ký tự, bao gồm:\n- Ít nhất 1 chữ hoa\n- Ít nhất 1 chữ thường\n- Ít nhất 1 số\n- Ít nhất 1 ký tự đặc biệt"
        );
        return;
      }

      // Kiểm tra mật khẩu nhập lại có khớp không
      if (password !== confirmPassword) {
        alert("❌ Mật khẩu nhập lại không khớp!");
        return;
      }

      const userData = {
        loginName,
        firstName,
        lastName,
        phone,
        address,
        email,
        password,
      };
      localStorage.setItem("userData", JSON.stringify(userData));

      console.log("Đăng ký thành công!", {
        loginName,
        firstName,
        lastName,
        phone,
        address,
        email,
      });
      alert("✅ Đăng ký thành công!");
      setTimeout(() => {
        window.location.href = "dangnhap.html";
      }, 1000);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải EYE ICON");

  // Xử lý hiển thị mật khẩu khi click vào icon con mắt
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

  // Gọi hàm cho cả hai ô mật khẩu
  togglePasswordVisibility("password", "togglePassword");
  togglePasswordVisibility("confirmPassword", "toggleConfirmPassword");
});
