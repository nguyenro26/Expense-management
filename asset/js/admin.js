document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải Button Home");
  const homeBtn = document.getElementById("home-btn");
  if (homeBtn) {
    homeBtn.addEventListener("click", function () {
      console.log("Nút đăng ký đã được nhấn!");
      window.location.href = "index.html";
    });
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuCDqeR0UcQL4V1HHCc1Anm2lKb75mgh0",
  authDomain: "mocnhienproject-e9a7b.firebaseapp.com",
  projectId: "mocnhienproject-e9a7b",
  storageBucket: "mocnhienproject-e9a7b.appspot.com",
  messagingSenderId: "351963088473",
  appId: "1:351963088473:web:7f9a01b17bdf6062e79348",
  measurementId: "G-4TSEL459SZ",
};

// 🔥 Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 📌 Hiển thị tên người dùng đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const displayName = document.querySelector(".info-user");
      if (displayName) {
        displayName.textContent = user.displayName || user.email;
      } else {
        console.log("Không tìm thấy phần tử hiển thị thông tin người dùng!");
      }
    } else {
      alert("❌ Bạn chưa đăng nhập! Hãy đăng nhập để tiếp tục.");
      window.location.href = "dangnhap.html";
    }
  });
});

// 📌 Lắng nghe thay đổi từ Firestore (REALTIME)
function loadUserData() {
  console.log("🔄 Đang tải dữ liệu người dùng...");

  const userTableBody = document.getElementById("userTableBody");
  if (!userTableBody) {
    console.error("❌ Không tìm thấy bảng userTableBody!");
    return;
  }

  userTableBody.innerHTML = ""; // Xóa dữ liệu cũ

  const usersCollection = collection(db, "users");

  onSnapshot(usersCollection, (snapshot) => {
    userTableBody.innerHTML = ""; // Xóa bảng trước khi cập nhật mới

    if (snapshot.empty) {
      console.log("⚠ Không có dữ liệu người dùng!");
      return;
    }

    let index = 1;
    snapshot.forEach((doc) => {
      const user = doc.data();
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${index++}</td>
            <td>${user.firstName || "N/A"} ${user.lastName || "N/A"}</td>
            <td>${user.email || "N/A"}</td>
            <td>${user.phone || "Chưa cập nhật"}</td>
            <td>${user.address || "Chưa cập nhật"}</td>
            <td>${user.role || "User"}</td>
          `;
      userTableBody.appendChild(row);
    });

    console.log("✅ Danh sách người dùng đã cập nhật!");
  });
}

// 🚀 Gọi hàm tải dữ liệu khi trang được tải
document.addEventListener("DOMContentLoaded", loadUserData);

// 📌 Xử lý chuyển tab
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải thành công!");

  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Xóa active khỏi tất cả tab và nội dung
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Kích hoạt tab đang chọn
      this.classList.add("active");

      // Hiển thị bảng tương ứng
      const targetId = this.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      } else {
        console.error(`Không tìm thấy phần tử có ID: ${targetId}`);
      }
    });
  });
});

// Đóng mở sidebar
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const header = document.getElementById("headerId"); // Thay ID header thực tế

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("show");

    if (sidebar.classList.contains("show")) {
      header.style.display = "none"; // Ẩn header
      toggleBtn.style.display = "none"; // Ẩn button toggle
    } else {
      header.style.display = "block";
      toggleBtn.style.display = "block";
    }
  });

  // Click bên ngoài sidebar để đóng nó
  document.addEventListener("click", function (event) {
    if (!sidebar.contains(event.target) && !toggleBtn.contains(event.target)) {
      sidebar.classList.remove("show");
      header.style.display = "block"; // Hiển thị lại header
      toggleBtn.style.display = "block"; // Hiển thị lại button toggle
    }
  });
});
