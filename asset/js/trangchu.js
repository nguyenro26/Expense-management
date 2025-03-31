// Hanlde đăng nhập trên web
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải USER PROFILE");

  // Lấy thông tin người dùng đang đăng nhập từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const displayName = document.querySelector(".display-name");
  const userEmail = document.querySelector(".user-name");
  const adminLink = document.getElementById("adminLink");
  const userProfile = document.querySelector(".user-profile");
  const adminDropdown = document.querySelector(".dropdown-menu");

  if (currentUser) {
    console.log("Thông tin người dùng:", currentUser);

    // Hiển thị tên và email người dùng
    if (displayName) {
      displayName.textContent = `${currentUser.displayName}`;
    } else {
      displayName.style.display = "none";
    }
    if (userEmail) {
      userEmail.textContent = currentUser.email;
    }

    // Kiểm tra nếu là admin
    if (currentUser.email.toLowerCase() === "mocnhienoffical@gmail.com") {
      if (adminLink) adminLink.style.display = "block";
      if (userProfile) userProfile.classList.add("is-admin"); // Đánh dấu admin
    } else {
      if (adminLink) adminLink.style.display = "none";
      if (userProfile) userProfile.classList.remove("is-admin"); // Xóa quyền admin
    }
  } else {
    console.log("Không tìm thấy thông tin người dùng!");
    if (displayName) displayName.textContent = "Khách";
    if (userEmail) userEmail.textContent = "Chưa đăng nhập";
    if (adminLink) adminLink.style.display = "none";
    if (userProfile) userProfile.classList.remove("is-admin");
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
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

document.addEventListener("DOMContentLoaded", function () {
  const userProfile = document.querySelector(".user-profile-mobile");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const loginBtn = document.getElementById("login");
  const registerBtn = document.getElementById("register");

  // 📌 Kiểm tra trạng thái đăng nhập từ Firebase Auth
  onAuthStateChanged(auth, (user) => {
    if (user) {
      let dropdownContent = `<a id="logout-btn" href="#">Đăng xuất</a>`;

      if (user.email.toLowerCase() === "mocnhienoffical@gmail.com") {
        dropdownContent =
          `<a href="admin.html">Quản trị viên</a>` + dropdownContent;
      }

      dropdownMenu.innerHTML = dropdownContent;

      if (loginBtn) loginBtn.style.display = "none";
      if (registerBtn) registerBtn.style.display = "none";
    } else {
      dropdownMenu.innerHTML = `<a href="dangnhap.html">Đăng nhập</a>`;

      if (loginBtn) loginBtn.style.display = "block";
      if (registerBtn) registerBtn.style.display = "block";
    }
  });

  // 📱 Xử lý dropdown trên điện thoại
  if (userProfile && dropdownMenu) {
    userProfile.addEventListener("touchstart", function (event) {
      event.stopPropagation();
      dropdownMenu.style.display =
        dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("touchstart", function () {
      dropdownMenu.style.display = "none";
    });

    dropdownMenu.addEventListener("touchstart", function (event) {
      event.stopPropagation();
    });
  }

  // 📌 Xử lý khi đăng xuất
  document.addEventListener("click", function (event) {
    if (event.target.id === "logout-btn") {
      signOut(auth)
        .then(() => {
          alert("Bạn đã đăng xuất!");

          // Xóa thông tin user khỏi localStorage
          localStorage.removeItem("currentUser");

          // 👉 Làm mới trang để cập nhật giao diện ngay
          setTimeout(() => {
            location.reload();
          }, 500);
        })
        .catch((error) => {
          console.error("Lỗi khi đăng xuất:", error.message);
          alert(`❌ Lỗi: ${error.message}`);
        });
    }
  });
});
