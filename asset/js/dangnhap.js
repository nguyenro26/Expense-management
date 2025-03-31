import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuCDqeR0UcQL4V1HHCc1Anm2lKb75mgh0",
  authDomain: "mocnhienproject-e9a7b.firebaseapp.com",
  projectId: "mocnhienproject-e9a7b",
  storageBucket: "mocnhienproject-e9a7b.appspot.com",
  messagingSenderId: "351963088473",
  appId: "1:351963088473:web:7f9a01b17bdf6062e79348",
  measurementId: "G-4TSEL459SZ",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Đăng nhập user
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải LOGIN!");

  const loginBtn = document.getElementById("login-Btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      console.log("Nút đăng nhập đã được nhấn!");

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        alert("❌ Vui lòng nhập email và mật khẩu!");
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Đăng nhập thành công:", user);

          // Lưu thông tin user vào localStorage (tùy chọn)
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );

          alert(`✅ Chào mừng ${user.displayName || "bạn"}!`);
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1000);
        })
        .catch((error) => {
          console.error("Lỗi đăng nhập:", error.message);
          alert(`❌ Lỗi: ${error.message}`);
        });
    });
  } else {
    console.error("❌ Không tìm thấy nút đăng nhập!");
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
