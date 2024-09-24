// next.config.js
module.exports = {
    reactStrictMode: true, // Enable React Strict Mode for highlighting potential problems in the application
    env: {
      DATABASE_URL: process.env.DATABASE_URL, // Ensure that environment variables are exposed to the frontend
      JWT_SECRET: process.env.JWT_SECRET,     // Add any other environment variables you need
    },
    // You can add more configurations here if needed
  };