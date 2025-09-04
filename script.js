// Base User class
class User {
  getDetails() { return ""; }
  doAction() { return ""; }
  getIcon() { return "❓"; }
}

// Concrete Products
class Customer extends User {
  getDetails() { return "👤 Customer"; }
  doAction() { return "Browsing menu and placing an order."; }
  getIcon() { return "👤"; }
}
class DeliveryPartner extends User {
  getDetails() { return "🚴 Delivery Partner"; }
  doAction() { return "Delivering food to customer."; }
  getIcon() { return "🚴"; }
}
class Restaurant extends User {
  getDetails() { return "🏪 Restaurant"; }
  doAction() { return "Preparing meals and updating the menu."; }
  getIcon() { return "🏪"; }
}
class PremiumCustomer extends User {
  getDetails() { return "🌟 Premium Customer"; }
  doAction() { return "Enjoying faster delivery and premium support."; }
  getIcon() { return "🌟"; }
}

// Factory with registry
class UserFactory {
  static registry = {};

  static register(type, clazz) {
    this.registry[type] = clazz;
  }

  static create(type) {
    const Clazz = this.registry[type];
    if (!Clazz) throw new Error("Unknown type: " + type);
    return new Clazz();
  }

  static getTypes() {
    return Object.keys(this.registry);
  }
}

// Register roles
UserFactory.register("customer", Customer);
UserFactory.register("deliverypartner", DeliveryPartner);
UserFactory.register("restaurant", Restaurant);
UserFactory.register("premiumcustomer", PremiumCustomer);

// Client
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("userType");
  UserFactory.getTypes().forEach(type => {
    const opt = document.createElement("option");
    opt.value = type;
    opt.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    select.appendChild(opt);
  });

  document.getElementById("createBtn").addEventListener("click", () => {
    const type = select.value;
    const user = UserFactory.create(type);

    const output = document.getElementById("output");
    output.innerHTML = `
      <div class="role-icon" style="font-size:2rem">${user.getIcon()}</div>
      <strong>${user.getDetails()}</strong><br>
      ${user.doAction()}
    `;
    output.classList.add("show");
  });
});

