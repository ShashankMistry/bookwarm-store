# Bookworm Store

A modern bookstore storefront built with React and Vite. The app includes browsing, filtering, search, wishlist management, cart updates, checkout flow, order history, and a polished UI inspired by premium e-commerce experiences.

## Features

- Book catalog with category filters and search
- Product detail pages with rating, reviews, and description
- Wishlist and cart interactions
- Checkout with order confirmation flow
- My Orders and Buy It Again experiences
- Responsive dark-themed storefront UI
- Local persistence for wishlist, orders, and cart-like session state
- Registration and login UI for storefront flow
- Toast-style feedback for user actions

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Lucide React icons
- JavaScript / JSX

## Project Structure

```bash
.
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── assets/
├── public/
├── tests/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── PROGRESS.md
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev -- --host 0.0.0.0 --port 5174
```

3. Open the app in your browser at:

```text
http://localhost:5174/
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

- The app is designed as a frontend storefront demo and stores user-facing state locally in the browser for a realistic shopping flow.
- This project is intended for learning, portfolio, and capstone-style storefront presentation work.

## Repository

- GitHub: https://github.com/ShashankMistry/bookwarm-store
