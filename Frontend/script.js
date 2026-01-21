/*
   HOME PAGE – SMOOTH SCROLL FOR NAV LINKS*/

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* Q5: Hide/Show a section (Portfolio) */
var togglePortfolioBtn = document.getElementById("togglePortfolioBtn");
var portfolioSection = document.getElementById("portfolio");
if (togglePortfolioBtn && portfolioSection) {
  togglePortfolioBtn.addEventListener("click", function () {
    // Toggle display between "none" and default ("")
    if (portfolioSection.style.display === "none") {
      portfolioSection.style.display = "";
    } else {
      portfolioSection.style.display = "none";
    }
  });
}


/* 
   HOME PAGE – HERO BUTTON SCROLL */

var btn = document.getElementById("btn");
if (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    var section = document.getElementById("design");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
}


/*
   HOME PAGE – BOOKING FORM VALIDATION*/

var bookingForm = document.getElementById("booking");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var email = document.getElementById("email").value.trim();
    var response = document.getElementById("responsemsg");

    response.textContent = "";

    if (name === "" || phone === "" || email === "") {
      response.style.color = "red";
      response.textContent = "Please fill out all fields";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      response.style.color = "red";
      response.textContent = "Enter a valid email";
      return;
    }

    var phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      response.style.color = "red";
      response.textContent = "Enter a valid phone number";
      return;
    }

    response.style.color = "green";
    response.textContent = "Booking Confirmed! We will contact you shortly.";
    alert("Booking Confirmed! We will contact you shortly.");

    bookingForm.reset();
  });
}

/*Feedback Form Validation*/
var feedbackForm = document.getElementById("feedback");
/* Q4: Clear form button + thank-you message (JS action on click) */
var clearFeedbackBtn = document.getElementById("clearFeedbackBtn");
if (clearFeedbackBtn && feedbackForm) {
  clearFeedbackBtn.addEventListener("click", function () {
    feedbackForm.reset();
    var msg = document.getElementById("feedbackmsg");
    if (msg) {
      msg.className = "success";
      msg.textContent = "Thank you! The form has been cleared.";
    }
  });
}

if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("feedback-name").value.trim();
    var phone = document.getElementById("feedback-phone").value.trim();
    var email = document.getElementById("feedback-email").value.trim();
    var message = document.getElementById("feedback-message").value.trim();
    var response = document.getElementById("feedbackmsg");

    response.textContent = "";
    response.className = ""; // Reset classes

    // Name validation
    if (name === "") {
      response.className = "error";
      response.textContent = "Please enter your name";
      return;
    }
    var nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      response.className = "error";
      response.textContent = "Name should contain only letters and spaces";
      return;
    }

    // Phone validation
    if (phone === "") {
      response.className = "error";
      response.textContent = "Please enter your phone number";
      return;
    }
    var phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      response.className = "error";
      response.textContent = "Enter a valid 10-digit phone number starting with 6-9";
      return;
    }

    // Email validation
    if (email === "") {
      response.className = "error";
      response.textContent = "Please enter your email";
      return;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      response.className = "error";
      response.textContent = "Enter a valid email address";
      return;
    }

    // Message validation
    if (message === "") {
      response.className = "error";
      response.textContent = "Please enter your message";
      return;
    }

    response.className = "success";
    response.textContent = "Thank You!! For your feedback.";
    /*
      Q7: Save feedback to backend file and show success on front-end.
      - Requires running backend/server.js (Node + Express).
      - If backend is not running, we still show a message (so the UI doesn't break).
    */
    fetch("http://localhost:3001/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, message })
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.ok) {
          response.className = "success";
          response.textContent = "Feedback saved successfully (stored in backend/feedback.txt).";
          feedbackForm.reset();
        } else {
          response.className = "error";
          response.textContent = "Feedback not saved (backend error).";
        }
      })
      .catch(() => {
        response.className = "error";
        response.textContent = "Backend server not running. Start backend/server.js to save feedback.";
      });
  });
}

/*
   CART DATA – COLOR / MATERIAL*/

var color_material = [
  { id: 1, name: "Warm White", price: 320 },
  { id: 2, name: "Sage Green", price: 520 },
  { id: 3, name: "Charcoal Gray", price: 420 },
  { id: 4, name: "Navy Blue", price: 650 },
  { id: 5, name: "Terracotta", price: 380 },
  { id: 6, name: "Pastel Peach", price: 450 },
  { id: 7, name: "Olive Green", price: 550 },
  { id: 8, name: "Dusty Blue", price: 550 },

  { id: 9, name: "Marble", price: 450 },
  { id: 10, name: "Oak Wood", price: 300 },
  { id: 11, name: "Granite", price: 700 },
  { id: 12, name: "Porcelain Tile", price: 180 },
  { id: 13, name: "Walnut Wood", price: 500 },
  { id: 14, name: "Slate Tile", price: 280 },
  { id: 15, name: "Travertine", price: 250 },
  { id: 16, name: "Polished Concrete", price: 200 },
  /* Q1: New product/service added and included in total cost calculation */
  { id: 17, name: "Acoustic Wall Panels", price: 600 }
];


/*CART DATA – FURNITURE / DECOR*/

var furniture_decor = [
  { id: 101, name: "Modern Sofa", price: 45000 },
  { id: 102, name: "Accent Chair", price: 18000 },
  { id: 103, name: "Coffee Table", price: 12000 },
  { id: 104, name: "Dining Table Set", price: 40000 },
  { id: 105, name: "Bed Frame", price: 45000 },
  { id: 106, name: "Bookshelf Unit", price: 25000 },
  { id: 107, name: "TV Unit", price: 30000 },
  { id: 108, name: "Ottoman Stool", price: 10000 },

  { id: 109, name: "Wall Art", price: 12000 },
  { id: 110, name: "Rugs & Carpets", price: 25000 },
  { id: 111, name: "Indoor Plants", price: 6000 },
  { id: 112, name: "Decor Lighting", price: 20000 },
  { id: 113, name: "Decor Mirrors", price: 15000 },
  { id: 114, name: "Cushions & Throws", price: 6000 },
  { id: 115, name: "Decor Vases", price: 5000 },
  { id: 116, name: "Decor Accessories", price: 4000 }
];



/*FIND PRODUCT*/

function findProduct(id) {
  for (var i = 0; i < color_material.length; i++) {
    if (color_material[i].id === id) {
      return color_material[i];
    }
  }

  for (var j = 0; j < furniture_decor.length; j++) {
    if (furniture_decor[j].id === id) {
      return furniture_decor[j];
    }
  }

  return null;
}
/*CART LOGIC - CLIENT SIDE ONLY*/
var cart = [];

// Load cart from localStorage on page load
function loadCart() {
  var savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  } else {
    cart = [];
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  var product = findProduct(id);
  if (!product) return;

  var existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, name: product.name, qty: 1 });
  }

  saveCart();
  displayCart();
}

function increaseQty(id) {
  var item = cart.find(item => item.id === id);
  if (item) {
    item.qty += 1;
    saveCart();
    displayCart();
  }
}

function decreaseQty(id) {
  var item = cart.find(item => item.id === id);
  if (item) {
    item.qty -= 1;
    if (item.qty <= 0) {
      removeItem(id);
    } else {
      saveCart();
      displayCart();
    }
  }
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  displayCart();
}

function getDiscountRate(id) {
  if (id >= 101 && id <= 108) {
    return 0.10; // 10% furniture
  }
  if (id >= 109 && id <= 116) {
    return 0.05; // 5% decor
  }
  return 0; // no discount
}

/*DISPLAY CART*/
function displayCart() {
  var cartDiv = document.getElementById("cart");
  if (!cartDiv) return;

  cartDiv.innerHTML = "<div class='cart-grid'></div>";
  var grid = cartDiv.querySelector(".cart-grid");

  if (cart.length === 0) {
    grid.innerHTML = "<p>No items added yet.</p>";
    displayBooking(cart);
    return;
  }

  var total = 0;

  cart.forEach(item => {
    var product = findProduct(item.id);
    if (!product) return;

    var discountRate = getDiscountRate(item.id);
    var discountedPrice = product.price - (product.price * discountRate);
    var itemTotal = discountedPrice * item.qty;

    total += itemTotal;

    grid.innerHTML += `
      <div class="cart-item">
        <strong>${product.name}</strong><br>

        ${
          discountRate > 0
            ? `<del>₹${product.price}</del> <strong>₹${discountedPrice}</strong>`
            : `₹${product.price}`
        }
        × ${item.qty} = <strong>₹${itemTotal}</strong><br><br>

        <button onclick="decreaseQty(${item.id})">−</button>
        <span style="margin:0 10px;font-weight:bold;">${item.qty}</span>
        <button onclick="increaseQty(${item.id})">+</button><br><br>

        <button onclick="removeItem(${item.id})" style="color:red;">Remove</button>
      </div>
    `;
  });

  /*
    Q6: Discount logic
    - If total is more than 1000, apply 10% off on the final total.
  */
  var discount = 0;
  if (total > 1000) {
    discount = total * 0.10;
  }
  var finalTotal = total - discount;

  cartDiv.innerHTML += `<hr><strong>Subtotal: ₹${total.toFixed(2)}</strong>`;
  if (discount > 0) {
    cartDiv.innerHTML += `<br><strong>Discount (10%): -₹${discount.toFixed(2)}</strong>`;
  }
  cartDiv.innerHTML += `<br><strong>Total: ₹${finalTotal.toFixed(2)}</strong>`;
  displayBooking(cart);
}

/* DISPLAY BOOKING SUMMARY */
function displayBooking(cart) {
  var booking = document.getElementById("bookingCart");
  if (!booking) return;

  booking.innerHTML = "<h2>Your Selected Items</h2>";

  if (cart.length === 0) {
    booking.innerHTML += "<p>No items selected.</p>";
    return;
  }

  var total = 0;

  cart.forEach(item => {
    var product = findProduct(item.id);
    if (!product) return;

    var discountRate = getDiscountRate(item.id);
    var discountedPrice = product.price - (product.price * discountRate);
    var itemTotal = discountedPrice * item.qty;

    total += itemTotal;

    booking.innerHTML += `
      <p>
        ${product.name} × ${item.qty}
        = ₹${itemTotal}
      </p>
    `;
  });

  booking.innerHTML += `<hr><strong>Total Amount: ₹${total}</strong>`;
}

/* INIT */
document.addEventListener("DOMContentLoaded", function () {
  loadCart();
  displayCart();
});
