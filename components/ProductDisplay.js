app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :src="image" alt="product image" />
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>
            <ul>
              <li v-for="(detail, index) in details" :key="index">
                {{detail}}
              </li>
            </ul>
            <div
              v-for="(variant, index) in variants"
              :key="variant.id"
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{backgroundColor:variant.color}"
            ></div>
            <button
              class="button"
              :class="{ disabledButton: updateInventory <= 0}"
              :disabled="updateInventory <= 0"
              @click="addToCart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>`,
  data() {
    return {
      cart: 0,
      product: "Socks",
      brand: "Vue Mastery",
      inventory: 0,
      onSale: true,
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 3,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 0,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    updateInventory() {
      return (this.inventory = this.variants[this.selectedVariant].quantity);
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
