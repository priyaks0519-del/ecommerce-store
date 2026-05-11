# E-Commerce Frontend

React-based frontend for the E-Commerce Store application.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at: `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   │   ├── Auth/        # Login & Register
│   │   ├── Products/    # Product pages
│   │   ├── Cart/        # Shopping cart
│   │   ├── Checkout/    # Checkout page
│   │   ├── Orders/      # Order history
│   │   └── Admin/       # Admin dashboard
│   ├── services/        # API services
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # TailwindCSS config
└── package.json         # Dependencies
```

## 📦 Features

- ✅ User Authentication (Register/Login)
- ✅ Product Listing & Search
- ✅ Product Details
- ✅ Shopping Cart
- ✅ Checkout
- ✅ Order History
- ✅ Admin Dashboard (Add Products)
- ✅ Responsive Design
- ✅ TailwindCSS Styling

## 🔗 API Integration

The frontend connects to the backend API at `http://localhost:8080/api`

**Ensure the backend is running before starting the frontend!**

## 🛠 Tech Stack

- **React** 18
- **React Router** v6
- **Axios** for API calls
- **TailwindCSS** for styling
- **Vite** for build tooling

## 📝 Environment Variables

Create `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8080/api
```

## 🚀 Deployment

1. Build the project
   ```bash
   npm run build
   ```

2. Deploy `dist/` folder to your hosting service

## 📱 Pages

- `/` - Home (Product Listing)
- `/login` - User Login
- `/register` - User Registration
- `/product/:id` - Product Details
- `/cart` - Shopping Cart
- `/checkout` - Checkout
- `/orders` - Order History
- `/admin` - Admin Dashboard

## 🤝 Contributing

Feel free to submit issues and enhancement requests.

## 📄 License

MIT License