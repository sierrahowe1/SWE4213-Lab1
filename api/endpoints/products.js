// Create the following endpoints: 
// - POST /products
// - DELETE /products/:id
// - GET /products/user/:userId

const express = require("express");
const authcheck = require("../middleware/authcheck");
const router = express.Router();

const products = [
    { id: 1, title: "iPad (9th Gen) 64GB Wi-Fi", price: 220, image_url: "https://picsum.photos/seed/unb1/400/400", email: "eeddy@unb.ca" },
    { id: 2, title: "Calculus Textbook", price: 45, image_url: "https://picsum.photos/seed/unb2/400/400", email: "student@unb.ca" },
    { id: 3, title: "Dorm Desk Lamp", price: 15, image_url: "https://picsum.photos/seed/unb3/400/400", email: "unbuser@unb.ca" },
    { id: 4, title: "UNB Hoodie (Large)", price: 30, image_url: "https://picsum.photos/seed/unb4/400/400", email: "test@unb.ca" },
    { id: 5, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 6, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 7, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 8, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 9, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 10, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 11, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 12, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 13, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" },
    { id: 14, title: "Scientific Calculator", price: 25, image_url: "https://picsum.photos/seed/unb5/400/400", email: "eeddy@unb.ca" }
];

router.get("/products", authcheck, (req, res) => {
    res.json(products);
});

router.get("/products/mylistings", authcheck, (req, res) => {
    const userEmail = req.user.email;
    const userProducts = products.filter(product => product.email === userEmail);
    res.json(userProducts);
});

router.post("/products", authcheck, (req, res) => {
    const { title, price, image_url } = req.body;
    const newProduct = {
        id: products.length + 1,
        title,
        price,
        image_url,
        email: req.user.email
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

module.exports = router;