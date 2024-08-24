// Load menu items on page load
document.addEventListener("DOMContentLoaded", getMenu);

function getMenu() {
    fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
        .then(response => response.json())
        .then(data => {

           
            const menuItemsContainer = document.getElementById("menu-items");
            data.forEach(item => {
                const menuItem = document.createElement("div");
                menuItem.classList.add("menu-item");
                menuItem.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>$${item.price}/-</p>
                    <button class="add-to-cart-btn">+</button>
                `;
                menuItemsContainer.appendChild(menuItem);
            });
        })
        .catch(error => console.error("Error fetching menu:", error));
}

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ["Burger 1", "Burger 2", "Burger 3"];
            const selectedBurgers = [];
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * burgers.length);
                selectedBurgers.push(burgers[randomIndex]);
            }
            resolve(selectedBurgers);
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankYou() {
    alert("Thank you for eating with us today!");
}

// Chaining the promises
takeOrder()
    .then(order => {
        console.log("Order taken:", order);
        return orderPrep();
    })
    .then(status => {
        console.log("Order prepared:", status);
        return payOrder();
    })
    .then(paymentStatus => {
        console.log("Payment status:", paymentStatus);
        if (paymentStatus.paid) {
            thankYou();
        }
    })
    .catch(error => console.error("Error:", error));
