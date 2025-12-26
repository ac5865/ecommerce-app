const express = require("express");
const router = express.Router();
const PRODUCTS = require("../data/products");

// GET /api/products - Get all products
router.get("/", (req, res) => {
  try {
    // Optional query parameters for filtering
    const { category } = req.query;

    let filteredProducts = PRODUCTS;

    // Filter by category if provided
    if (category) {
      filteredProducts = PRODUCTS.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// GET /api/products/:id - Get single product by ID
router.get("/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = PRODUCTS.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Add description and condition to the product details
    const productWithDetails = {
      ...product,
      description: `This is a high-quality ${product.name.toLowerCase()} in excellent condition. Perfect for anyone looking for sustainable fashion choices. Each item has been carefully inspected and is ready for its next home.`,
      condition: "Excellent",
    };

    res.json({
      success: true,
      data: productWithDetails,
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
