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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app); // 🔥 Khởi tạo Firestore

document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải BUTTON REGISTER");

  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", async function () {
      console.log("Nút đăng ký đã được nhấn!");

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const role = document.getElementById("role").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document
        .getElementById("confirmPassword")
        .value.trim();

      if (
        !email ||
        !password ||
        !confirmPassword ||
        !firstName ||
        !lastName ||
        !phone ||
        !address ||
        !role
      ) {
        alert("❌ Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      if (password !== confirmPassword) {
        alert("❌ Mật khẩu nhập lại không khớp!");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Đăng ký thành công:", user);

        await updateProfile(user, { displayName: `${firstName} ${lastName}` });

        // 🔥 Lưu thông tin vào Firestore
        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          email,
          phone,
          address,
          role,
          uid: user.uid,
          createdAt: new Date(),
        });

        alert("✅ Đăng ký thành công!");
        setTimeout(() => {
          window.location.href = "dangnhap.html";
        }, 1000);
      } catch (error) {
        console.error("Lỗi đăng ký:", error.message);
        alert(`❌ Lỗi: ${error.message}`);
      }
    });
  } else {
    console.error("❌ Không tìm thấy nút đăng ký!");
  }
});
