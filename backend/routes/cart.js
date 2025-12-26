const express = require("express");
const router = express.Router();
const CART = require("../data/cart");
const PRODUCTS = require("../data/products");

// POST /api/cart/add - Add item to cart
router.post("/add", (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;

    // Validate input
    if (!productId || !quantity || !userId) {
      return res.status(400).json({
        success: false,
        message: "productId, quantity, and userId are required",
      });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    // Check if product exists
    const product = PRODUCTS.find((p) => p.id === parseInt(productId));
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Initialize cart for user if doesn't exist
    if (!CART[userId]) {
      CART[userId] = [];
    }

    // Check if product already in cart
    const existingItem = CART[userId].find(
      (item) => item.productId === parseInt(productId)
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += parseInt(quantity);
      existingItem.updatedAt = new Date().toISOString();
    } else {
      // Add new item
      CART[userId].push({
        productId: parseInt(productId),
        quantity: parseInt(quantity),
        addedAt: new Date().toISOString(),
      });
    }

    res.json({
      success: true,
      message: "Item added to cart successfully",
      data: {
        cartItems: CART[userId].length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// GET /api/cart/:userId - Get user's cart items
router.get("/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Get cart items for user
    const cartItems = CART[userId] || [];

    // Enrich cart items with product details
    const enrichedCart = cartItems.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return {
        ...item,
        product: product || null,
      };
    });

    // Calculate total
    const total = enrichedCart.reduce((sum, item) => {
      if (item.product) {
        return sum + item.product.price * item.quantity;
      }
      return sum;
    }, 0);

    res.json({
      success: true,
      data: {
        items: enrichedCart,
        totalItems: cartItems.length,
        totalPrice: total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// DELETE /api/cart/remove - Remove item from cart
router.delete("/remove", (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({
        success: false,
        message: "productId and userId are required",
      });
    }

    if (!CART[userId]) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove item from cart
    CART[userId] = CART[userId].filter(
      (item) => item.productId !== parseInt(productId)
    );

    res.json({
      success: true,
      message: "Item removed from cart successfully",
      data: {
        cartItems: CART[userId].length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// DELETE /api/cart/clear/:userId - Clear user's cart
router.delete("/clear/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    if (CART[userId]) {
      CART[userId] = [];
    }

    res.json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
