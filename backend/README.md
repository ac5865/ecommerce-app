# Thrift Shop Backend API

A RESTful API for managing thrift shop products.

## Installation

```bash
npm install
```

## Running the Server

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Get All Products

- **URL:** `/api/products`
- **Method:** `GET`
- **Query Parameters:**
  - `category` (optional) - Filter by category (e.g., "Clothing", "Footwear", "Accessories")
- **Success Response:**
  ```json
  {
    "success": true,
    "count": 8,
    "data": [
      {
        "id": 1,
        "name": "Vintage Denim Jacket",
        "price": "$45",
        "category": "Clothing",
        "imgUrl": "url"
      }
    ]
  }
  ```

### Get Single Product

- **URL:** `/api/products/:id`
- **Method:** `GET`
- **Success Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Vintage Denim Jacket",
      "price": "$45",
      "category": "Clothing",
      "imgUrl": "url"
    }
  }
  ```

## Example Usage

```bash
# Get all products
curl http://localhost:3000/api/products

# Filter by category
curl http://localhost:3000/api/products?category=Clothing

# Get product by ID
curl http://localhost:3000/api/products/1
```
