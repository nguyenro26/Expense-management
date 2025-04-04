// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("product-modal");
  const closeModal = document.querySelector(".close");
  const productName = document.getElementById("product-name");
  const productImage = document.getElementById("product-image");
  const productPrice = document.getElementById("product-price");
  const quantityInput = document.getElementById("quantity");
  const totalPrice = document.getElementById("total-price");
  const confirmPurchase = document.getElementById("confirm-purchase");
  const uncofirmPurchase = document.getElementById("unconfirm-purchase");
  const confirmPopup = document.getElementById("confirm-popup");
  const confirmYes = document.getElementById("confirm-yes");
  const confirmNo = document.getElementById("confirm-no");

  const customerName = document.getElementById("customer-name");
  const customerPhone = document.getElementById("customer-phone");
  const customerAddress = document.getElementById("customer-address");

  let currentUser = null;

  // Kiểm tra trạng thái đăng nhập
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser = user;
      await loadUserData(user.uid);
    } else {
      currentUser = null;
      customerName.value = "";
      customerPhone.value = "";
      customerAddress.value = "";
    }
  });

  // Lấy dữ liệu người dùng từ Firestore
  async function loadUserData(uid) {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        customerName.value = userData.firstName + " " + userData.lastName || "";
        customerPhone.value = userData.phone || "";
        customerAddress.value = userData.address || "";
      }
    } catch (error) {
      console.error("Lỗi lấy dữ liệu người dùng:", error);
    }
  }

  // Xử lý sự kiện khi nhấn nút "Mua"
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("buy-button")) {
      console.log("Nút mua hàng được nhấn!");
      const product = event.target.closest(".product");
      if (!product) return;

      const name = product.querySelector("h4").innerText;
      const image = product.querySelector("img").src;
      const price = parseInt(
        product.querySelector(".price").innerText.replace(/\D/g, ""),
        10
      );

      productName.innerText = name;
      productImage.src = image;
      productPrice.innerText = `Giá: ${price.toLocaleString()} đ`;
      quantityInput.value = 1;
      totalPrice.innerText = `${price.toLocaleString()} đ`;

      modal.style.display = "flex";

      if (!currentUser) {
        customerName.value = "";
        customerPhone.value = "";
        customerAddress.value = "";
      }
    }
  });

  // Cập nhật tổng tiền khi số lượng thay đổi
  quantityInput.addEventListener("input", function () {
    const price = parseInt(productPrice.innerText.replace(/\D/g, ""), 10);
    const total = price * parseInt(this.value, 10);
    totalPrice.innerText = `${total.toLocaleString()} đ`;
  });

  // Đóng modal khi bấm nút "X"
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Xác nhận mua hàng
  confirmPurchase.addEventListener("click", function () {
    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();
    const address = customerAddress.value.trim();
    const quantity = quantityInput.value;
    const total = totalPrice.innerText;

    if (!name || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    alert(
      `Xác nhận đơn hàng:\n\nSản phẩm: ${productName.innerText}\nSố lượng: ${quantity}\nTổng tiền: ${total}\n\nNgười nhận: ${name}\nSố điện thoại: ${phone}\nĐịa chỉ: ${address}`
    );
    modal.style.display = "none";
  });

  // Hủy đơn hàng
  uncofirmPurchase.addEventListener("click", function () {
    alert("Cảm ơn quý khách đã xem qua Mộc Nhiên SHOP");
    modal.style.display = "none";
  });

  // Đóng modal khi click ra ngoài
  //   window.addEventListener("click", function (event) {
  //     if (event.target === modal) {
  //       modal.style.display = "none";
  //     }
  //   });

  closeModal.addEventListener("click", function () {
    confirmPopup.style.display = "block"; // Hiện popup xác nhận
    modal.style.display = "block"; // Hiện nền tối
  });

  // Nếu chọn "Yes" => Ẩn cả modal và popup xác nhận
  confirmYes.addEventListener("click", function () {
    modal.style.display = "none";
    confirmPopup.style.display = "none";
    overlay.style.display = "none";
  });

  // Nếu chọn "No" => Ẩn popup nhưng giữ modal mở
  confirmNo.addEventListener("click", function () {
    confirmPopup.style.display = "none";
    overlay.style.display = "none";
  });
});

// Hanlde filter
document.addEventListener("DOMContentLoaded", function () {
  const filterCheckboxes = document.querySelectorAll(".filter-category input");
  const products = document.querySelectorAll(".product");

  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
  });

  function filterProducts() {
    const selectedCategories = Array.from(filterCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id.trim());

    products.forEach((product) => {
      const productCategoryAttr = product.getAttribute("data-category") || "";
      const productCategories = productCategoryAttr
        .split(" ")
        .map((item) => item.trim());

      // Nếu không có filter nào được chọn thì hiển thị tất cả
      if (selectedCategories.length === 0) {
        product.style.display = "block";
        return;
      }

      // Hiển thị sản phẩm nếu có ít nhất một category khớp
      const isMatch = selectedCategories.some((cat) =>
        productCategories.includes(cat)
      );

      product.style.display = isMatch ? "block" : "none";
    });
  }
});

// Hanlde danh mục
document.querySelectorAll(".category-item").forEach((item) => {
  item.addEventListener("click", function () {
    const selectedCategory = this.getAttribute("data-category");

    document.querySelectorAll(".product").forEach((product) => {
      const productCategories = product
        .getAttribute("data-category")
        .split(" "); // Chia thành mảng danh mục

      if (productCategories.includes(selectedCategory)) {
        product.style.display = "block"; // Hiển thị nếu sản phẩm thuộc danh mục đã chọn
      } else {
        product.style.display = "none"; // Ẩn nếu không thuộc danh mục
      }
    });
  });
});

// Handle when user click on logo
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("logo");

  logo.addEventListener("click", function () {
    if (logo) {
      window.location.href = "daugoi.html";
      console.log("Click success");
    } else {
      console.log("Click failed please check");
    }
  });
});

// Hanlde search box
document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.querySelector(".search-box");
  const products = document.querySelectorAll(".product");

  searchBox.addEventListener("input", function () {
    const keyword = searchBox.value.trim().toLowerCase();
    products.forEach((product) => {
      const productName = product.querySelector("h4").innerText.toLowerCase();
      if (productName.includes(keyword)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});
