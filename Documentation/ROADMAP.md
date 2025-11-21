# 🗺️ Product Roadmap

## Phase 1: MVP (Current Status) ✅
*   [x] dual-interface architecture (Student vs. Restaurant).
*   [x] Core "Mystery Bag" creation and browsing flow.
*   [x] filtering system (Location, Diet).
*   [x] UI/UX design aligned with Crous branding.
*   [x] Mock payment integration (Izly UI).
*   [x] Student Profile with "Meals Saved" impact tracking.

## Phase 2: Backend & Authentication (Next Steps) 🚧
*   **User Auth:** Implement real authentication (SSO with University login / Mon Compte Crous).
*   **Database:** Migrate mock data to a persistent database (PostgreSQL or Firebase).
*   **Real-time Inventory:** WebSockets to update "Remaining quantity" instantly across all clients.
*   **Geo-location:** "Near Me" feature using the device's GPS.

## Phase 3: Payments & Notifications 💳
*   **Izly API Integration:** Real connection to the Crous payment system.
*   **Push Notifications:** Alert students when their favorite cafeteria posts a bag.
*   **QR Code Generation:** Generate actual unique QR codes for order validation at pickup.

## Phase 4: Community & Expansion 🚀
*   **Leaderboards:** Gamify the experience by showing top food rescuers by Campus/Formation.
*   **Recipe Suggestions:** Use Gemini AI to suggest recipes based on the contents of the mystery bag.
*   **Expansion:** Roll out to other student cities (Paris, Lyon, Bordeaux).
*   **Mobile App:** Port the React codebase to React Native for iOS and Android App Stores.

## 🐛 Known Issues / Todo
*   *Form Validation:* Add stricter validation on the Crous Upload form (e.g., end time cannot be before start time).
*   *Accessibility:* Improve ARIA labels for screen readers.
*   *Dark Mode:* Implement a system-wide dark mode preference.