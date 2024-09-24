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
│   ├── Affirmation.js
│   ├── Plan.js
│   ├── User.js
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js                    # User login logic
│   │   │   ├── register.js                 # User registration logic
│   │   │   ├── requestPasswordReset.js     # Request password reset logic (added)
│   │   │   ├── resetPassword.js            # Password reset logic (added)
│   │   ├── plans/
│   │   │   ├── index.js                    # CRUD operations for plans
│   │   ├── affirmations/
│   │   │   ├── index.js                    # Affirmations management
│   │   ├── analysis/
│   │   │   ├── budget.js                   # Budget analysis
│   │   ├── notifications/
│   │   │   ├── reminders.js                # Reminders
│   ├── index.js                            # Home page (updated for welcome message and login redirect)
│   ├── plans.js                            # Plans page (with logout, added password reset)
│   ├── affirmations.js
│   ├── unified-view.js
│   ├── budget-analysis.js
│   ├── reminders.js
├── components/
│   ├── Home.js                             # Home component for landing page
│   ├── Plans.js                            # Plans component
│   ├── Affirmations.js                     # Affirmations component
│   ├── UnifiedView.js
│   ├── Navbar.js                           # Navbar component
│   ├── FinancialChart.js                   # Chart component for financial visuals
│   ├── BudgetAnalysis.js
│   ├── ReminderSetup.js
│   ├── MultiCurrencySupport.js
│   ├── ExportData.js                       # For exporting user data
│   ├── UserForm.js
│   ├── ErrorBoundary.js                    # Error handling
├── public/
│   ├── favicon.ico
│   ├── images/
│   ├── assets/
├── styles/
│   ├── App.css                             # Main stylesheet
│   ├── Responsive.css
│   ├── Theme.css
├── middleware/
│   ├── auth.js                             # Token verification middleware
│   ├── errorHandler.js                     # Global error handler
│   ├── csrfProtection.js                   # CSRF protection
├── config/
│   ├── db.js                               # Database connection logic
│   ├── jwtConfig.js                        # JWT configuration (added for token handling)
│   ├── environment.js                      # Environment variables
├── tests/
│   ├── api/
│   │   ├── plans.test.js                   # Tests for plans API
│   │   ├── affirmations.test.js
│   │   ├── auth.test.js                    # Tests for auth API
│   ├── components/
│   │   ├── Plans.test.js                   # Tests for Plans component
│   │   ├── Affirmations.test.js
│   │   ├── UnifiedView.test.js
├── utils/
│   ├── validators/
│   │   ├── formValidator.js                # Form validation utility
│   ├── helpers/
│   │   ├── dataExport.js                   # Helper for data export
│   │   ├── notificationHelper.js           # Helper for notifications
│   ├── visualizations/
│   │   ├── chartConfig.js                  # Chart configuration
│   ├── sendEmail.js                        # Utility for sending emails (added for password reset)
├── .env.local                              # Environment variables (database URL, JWT secret)
├── next.config.js                          # Next.js configuration
├── jest.config.js                          # Jest configuration for testing
├── package.json                            # Dependencies and scripts
├── README.md                               # Project documentation

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
