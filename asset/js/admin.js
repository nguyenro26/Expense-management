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

document.addEventListener("DOMContentLoaded", function () {
  const storedUser = JSON.parse(localStorage.getItem("users"));
  if (storedUser) {
    const displayName = document.querySelector(".info-user");
    if (displayName) {
      displayName.textContent =
        storedUser.firstName + " " + storedUser.lastName;
    } else {
      console.log("Không tìm thấy thông tin người dùng!");
    }
  }
});

// Xử lý tải dữ liệu người dùng từ localStorage
function loadUserData() {
  console.log("Đang tải dữ liệu người dùng...");

  const userTableBody = document.getElementById("userTableBody");
  if (!userTableBody) {
    console.error("Không tìm thấy bảng userTableBody!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  //   localStorage.setItem("users", JSON.stringify([]));
  userTableBody.innerHTML = ""; // Xóa dữ liệu cũ

  if (users.length === 0) {
    console.log("Không có dữ liệu người dùng!");
    return;
  }

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.firstName || "N/A"} ${user.lastName || "N/A"}</td>
            <td>${user.email || "N/A"}</td>
            <td>${user.phone || "N/A"}</td>
            <td>${user.address || "N/A"}</td>
            <td>${user.role || "N/A"}</td>
        `;
    userTableBody.appendChild(row);
  });
}

// Gọi hàm loadUserData() khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", loadUserData);

document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript đã tải thành công!");

  // Xử lý chuyển tab
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
