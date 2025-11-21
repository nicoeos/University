# Too Crous To Go 🎓🥗

A React-based web application connecting students with university restaurants (Crous) to reduce food waste by selling surplus food as "Mystery Bags".

## 🛠 Tech Stack

*   **Frontend:** React 18 (TypeScript)
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Charts:** Recharts
*   **Build Tool:** Vite (implied environment)
*   **AI Integration:** Google Gemini API (for smart tag suggestions and descriptions)

## 📂 Project Structure

```
/
├── components/
│   ├── CartDrawer.tsx        # Slide-out view for purchased orders
│   ├── Header.tsx            # Main navigation and role switching
│   ├── OfferCard.tsx         # Individual food item display
│   ├── PaymentModal.tsx      # Checkout simulation (Izly, Card, Apple Pay)
│   ├── RestaurantDashboard.tsx # Admin interface for Crous managers
│   └── StudentProfile.tsx    # User settings and impact stats
├── services/
│   └── geminiService.ts      # AI helper functions
├── types.ts                  # TypeScript interfaces and enums
├── App.tsx                   # Main application logic and routing
└── index.tsx                 # Entry point
```

## ✨ Features by Role

### 🎒 Student Portal
*   **Location Based:** Filter offers by specific Strasbourg Crous locations.
*   **Dietary Filters:** Toggle between All, Vegetarian, Halal, Meals, or Snacks.
*   **Profile System:** Track "Meals Saved", set degree/formation info, and preferred restaurant.
*   **Cart & Orders:** View active reservations and pickup details.
*   **Checkout:** Mock integration with Izly payment flow.

### 👨‍🍳 Crous Portal (Restaurant Admin)
*   **Quick Upload:** Streamlined form to publish "Mystery Bags" in seconds.
*   **Inventory Management:** Control quantity, price (€1-€3), and pickup windows.
*   **Analytics:** Dashboard visualizing weekly stats on meals saved and money collected.
*   **Image Automation:** Automatic image selection based on offer category.

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Ensure you have a valid API key for Google Gemini if enabling AI features.
    ```env
    API_KEY=your_google_api_key
    ```

3.  **Run the Application**
    ```bash
    npm start
    ```

## 🎨 Design System
The app uses a clean, student-friendly aesthetic:
*   **Primary Color:** Crous Red (`#D62828`)
*   **Typography:** Inter (Google Fonts)
*   **Layout:** Responsive grid system compatible with mobile and desktop.
