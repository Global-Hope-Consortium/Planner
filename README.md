# Financial Planner Web App

## Overview
This Financial Planner Web App is a comprehensive tool designed for multi-service individuals or companies to plan their finances over a 5-year period. It allows users to input values related to their plans and goals, generate income and expenditure sheets, manage affirmations, and visualize financial data. The app uses Next.js to provide a seamless full-stack experience, combining both frontend and backend logic within a single codebase.

## Key Features
1. **User Input for Plans and Goals**: Input and track financial plans for a 5-year period, detailing fund utilization for each service.
2. **Income and Expenditure Sheets**: Generate downloadable sheets summarizing income and expenditures.
3. **Affirmations Section**: A dedicated section to input affirmations related to financial goals.
4. **Unified View**: Consolidated display of plans and affirmations on a single page.
5. **Visualization**: Visualize financial data with enhanced visualizations using libraries like Recharts.
6. **Budget Analysis**: Analyze financial health over time with detailed insights.
7. **Reminders and Notifications**: Set up reminders for financial goals and upcoming expenditures.
8. **Multi-Currency Support**: Support for multiple currencies with real-time exchange rates.
9. **Data Export**: Export financial data in various formats (CSV, PDF).
10. **Authentication**: Secure user authentication using JWT.
11. **Error Handling**: Robust error handling across the application.
12. **Responsive Design**: Mobile-friendly and responsive UI.
13. **API Documentation**: Documented API endpoints using Swagger.

## Tech Stack
- **Frontend**: React (via Next.js)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Visualization**: Recharts, Chart.js
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest, React Testing Library

## Project Structure
```
financial-planner/
├── models/
│   ├── Affirmation.js                    # Affirmation model (database structure for affirmations)
│   ├── Plan.js                           # Plan model (database structure for financial plans)
│   ├── User.js                           # User model (database structure for users)
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js                  # User login logic
│   │   │   ├── register.js               # User registration logic
│   │   │   ├── requestPasswordReset.js   # Request password reset logic
│   │   │   ├── resetPassword.js          # Password reset logic
│   │   ├── plans/
│   │   │   ├── index.js                  # CRUD operations for plans
│   │   ├── affirmations/
│   │   │   ├── index.js                  # Affirmations API endpoint
│   │   ├── analysis/
│   │   │   ├── budget.js                 # Budget analysis API endpoint
│   │   ├── notifications/
│   │   │   ├── reminders.js              # Reminders API endpoint
│   ├── index.js                          # Home page (displays welcome and login)
│   ├── plans.js                          # Plans page (displays user plans, adds logout and password reset)
│   ├── affirmations.js                   # Display user affirmations
│   ├── unified-view.js                   # Unified view component
│   ├── budget-analysis.js                # Budget analysis page
│   ├── reminders.js                      # Reminders page
├── components/
│   ├── Home.js                           # Home component (landing page structure)
│   ├── Plans.js                          # Plans component (displays and handles plans)
│   ├── Affirmations.js                   # Affirmations component (displays affirmations)
│   ├── UnifiedView.js                    # Unified view component for dashboard
│   ├── Navbar.js                         # Navbar component (navigation)
│   ├── FinancialChart.js                 # Component to display financial charts
│   ├── BudgetAnalysis.js                 # Budget analysis component
│   ├── ReminderSetup.js                  # Setup reminders component
│   ├── MultiCurrencySupport.js           # Component to handle multi-currency financial plans
│   ├── ExportData.js                     # Component to export user data
│   ├── UserForm.js                       # Form component for user input
│   ├── ErrorBoundary.js                  # Global error handler component
├── public/
│   ├── favicon.ico                       # Favicon
│   ├── images/                           # Publicly accessible images
│   ├── assets/                           # Publicly accessible assets
├── styles/
│   ├── App.css                           # Global CSS file for the application
│   ├── Responsive.css                    # CSS file for responsive design
│   ├── Theme.css                         # CSS file for theme-specific styles
├── middleware/
│   ├── auth.js                           # JWT token verification middleware
│   ├── errorHandler.js                   # Error handling middleware
│   ├── csrfProtection.js                 # Middleware to handle CSRF protection
├── config/
│   ├── db.js                             # Database connection logic (Sequelize instance)
│   ├── jwtConfig.js                      # JWT configuration (secret, token expiration)
│   ├── environment.js                    # Configuration for environment variables
├── tests/
│   ├── api/
│   │   ├── plans.test.js                 # Tests for plans API
│   │   ├── affirmations.test.js          # Tests for affirmations API
│   │   ├── auth.test.js                  # Tests for authentication API
│   ├── components/
│   │   ├── Plans.test.js                 # Tests for the Plans component
│   │   ├── Affirmations.test.js          # Tests for the Affirmations component
│   │   ├── UnifiedView.test.js           # Tests for Unified View component
├── utils/
│   ├── validators/
│   │   ├── formValidator.js              # Utility for form validation
│   ├── helpers/
│   │   ├── dataExport.js                 # Helper for exporting user data
│   │   ├── notificationHelper.js         # Helper for notifications
│   ├── visualizations/
│   │   ├── chartConfig.js                # Helper for chart configuration and rendering
│   ├── sendEmail.js                      # Utility for sending emails (password reset)
├── .env.local                            # Environment variables (e.g., DATABASE_URL, JWT_SECRET)
├── next.config.js                        # Next.js configuration file (React strict mode, env vars)
├── jest.config.js                        # Configuration for Jest (testing framework)
├── package.json                          # Project dependencies and scripts (npm)
├── README.md                             # Documentation for the project

## Setup Instructions

### Prerequisites
- Node.js
- PostgreSQL

### Environment Variables
Create a `.env.local` file in the root directory and add the following:
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Database Setup
1. Create a PostgreSQL database.
2. Update `DATABASE_URL` in the `.env.local` file with your PostgreSQL connection string.
3. Run database migrations if required.

### Installation and Running the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/financial-planner.git
   cd financial-planner
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm run dev
   ```

4. **Navigate to** `http://localhost:3000` to view the app.

### Testing
1. **Run tests**:
   ```bash
   npm test
   ```

## Usage
- Navigate to `http://localhost:3000`.
- Register or log in to access the financial planning features.
- Input financial plans, goals, and affirmations.
- View visualizations, budget analysis, and set reminders.
- Export financial data and manage multi-currency settings.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the Apache 2.0 License 
