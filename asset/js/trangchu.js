// Hiển thị thông tin đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải USER PROFILE");

  // Lấy thông tin người dùng đang đăng nhập từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const displayName = document.querySelector(".display-name");
  const userEmail = document.querySelector(".user-name");
  const adminLink = document.getElementById("adminLink");

  if (currentUser) {
    console.log("Thông tin người dùng:", currentUser);

    // Hiển thị tên và email người dùng
    if (displayName) {
      displayName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    }
    if (userEmail) {
      userEmail.textContent = currentUser.email;
    }

    // Kiểm tra nếu là admin
    if (
      currentUser.email.toLowerCase() === "mocnhienoffical@gmail.com" &&
      adminLink
    ) {
      adminLink.style.display = "block";
      adminLink.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "admin.html";
      });
    } else if (adminLink) {
      adminLink.style.display = "none";
    }
  } else {
    console.log("Không tìm thấy thông tin người dùng!");
    if (displayName) displayName.textContent = "Khách";
    if (userEmail) userEmail.textContent = "Chưa đăng nhập";
  }
});

// // Ẩn đăng nhập và đăng ký
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("Kiểm tra trạng thái đăng nhập...");

//   const loginBtn = document.getElementById("login");
//   const registerBtn = document.getElementById("register");

//   // Kiểm tra xem có user trong localStorage không
//   const currentUser = JSON.parse(localStorage.getItem("users"));

//   if (currentUser) {
//     console.log("Người dùng đã đăng nhập:", currentUser);

//     // Ẩn nút Đăng Nhập & Đăng Ký
//     if (loginBtn) loginBtn.style.display = "none";
//     if (registerBtn) registerBtn.style.display = "none";
//   }
// });

// // Hanlde đăng xuất
// document.addEventListener("DOMContentLoaded", function () {
//   const logoutBtn = document.getElementById("logout-btn");
//   const displayName = document.querySelector(".display-name");
//   const userEmail = document.querySelector(".user-name");
//   const loginBtn = document.getElementById("login");
//   const registerBtn = document.getElementById("register");
//   const thankYouPopup = document.getElementById("thank-you-popup");
//   const closePopupBtn = document.getElementById("close-popup");

//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", function () {
//       localStorage.removeItem("currentUser"); // Xóa user khỏi localStorage
//       alert("Bạn đã đăng xuất!");

//       // Ẩn tên người dùng và nút Đăng Xuất, hiện lại Đăng Nhập & Đăng Ký
//       displayName.style.display = "none";
//       logoutBtn.style.display = "none";
//       userEmail.style.display = "none";
//       loginBtn.style.display = "flex";
//       registerBtn.style.display = "block";

//       // Hiển thị popup cảm ơn
//       thankYouPopup.style.display = "block";
//     });
//   }

//   // Đóng popup cảm ơn
//   if (closePopupBtn) {
//     closePopupBtn.addEventListener("click", function () {
//       thankYouPopup.style.display = "none";
//     });
//   }
// });

// Ẩn nút đăng ký
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout-btn");
  const displayNames = document.getElementsByClassName("display-name");
  const userNames = document.getElementsByClassName("user-name");
  const loginBtn = document.getElementById("login");
  const registerBtn = document.getElementById("register");
  const thankYouPopup = document.getElementById("thank-you-popup");

  // 📌 Kiểm tra người dùng khi tải trang
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Lấy đúng user đang đăng nhập

  if (currentUser) {
    // Nếu có người đăng nhập, hiển thị tên và ẩn nút đăng nhập/đăng ký
    for (let i = 0; i < displayNames.length; i++) {
      displayNames[i].style.display = "block";
      displayNames[
        i
      ].textContent = `Xin chào, ${currentUser.firstName} ${currentUser.lastName}`;
    }
    for (let i = 0; i < userNames.length; i++) {
      userNames[i].style.display = "block";
      userNames[i].textContent = currentUser.email;
    }

    if (loginBtn) loginBtn.style.display = "none";
    if (registerBtn) registerBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block"; // 👉 Hiện nút Đăng xuất
  } else {
    // Nếu không có người dùng -> Ẩn tên, hiển thị lại nút Đăng Nhập & Đăng Ký
    for (let i = 0; i < displayNames.length; i++) {
      displayNames[i].style.display = "none";
    }
    for (let i = 0; i < userNames.length; i++) {
      userNames[i].style.display = "none";
    }

    if (loginBtn) loginBtn.style.display = "block";
    if (registerBtn) registerBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none"; // 👉 Ẩn nút Đăng xuất
  }

  // 📌 Xử lý khi người dùng Đăng Xuất
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("currentUser"); // Xóa user hiện tại
      alert("Bạn đã đăng xuất!");

      // Ẩn tên người dùng
      for (let i = 0; i < displayNames.length; i++) {
        displayNames[i].style.display = "none";
      }
      for (let i = 0; i < userNames.length; i++) {
        userNames[i].style.display = "none";
      }

      // Hiện lại nút Đăng Nhập & Đăng Ký
      if (loginBtn) loginBtn.style.display = "block";
      if (registerBtn) registerBtn.style.display = "block";
      if (logoutBtn) logoutBtn.style.display = "none"; // Ẩn nút Đăng xuất khi logout

      // Hiển thị popup cảm ơn khi đăng xuất
      if (thankYouPopup) {
        thankYouPopup.style.display = "block"; // Hiện popup
        setTimeout(() => {
          thankYouPopup.style.opacity = "1"; // Hiện dần
        }, 100);

        // Mờ dần và ẩn sau 10 giây
        setTimeout(() => {
          thankYouPopup.style.opacity = "0"; // Mờ dần
          setTimeout(() => {
            thankYouPopup.style.display = "none"; // Ẩn hoàn toàn
          }, 1000);
        }, 5000);
      }
    });
  }
});
