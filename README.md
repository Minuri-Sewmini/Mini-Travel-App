# 🌍 Mini-Travel: Global Travel Community

A full-stack travel experience sharing platform built with the **MERN Stack** and **Supabase**. This project was developed as part of a 24-hour development challenge.

## 🚀 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion (Animations)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (User & Post Data)
- **Object Storage:** Supabase Storage (Image Uploads)
- **Authentication:** JWT (JSON Web Tokens)

---

## 🏗️ Architecture & Key Decisions

### 1. Hybrid Storage Strategy (MongoDB + Supabase)
Instead of storing heavy image files directly in MongoDB or locally, I implemented **Supabase Storage**. 
- **Decision:** MongoDB stores the image URLs and metadata, while Supabase handles the actual file hosting.
- **Benefit:** This ensures high scalability, faster image loading via CDN, and prevents the database from becoming bloated.

### 2. Decoupled Authentication
I used **JWT-based authentication** stored in `localStorage`. 
- **Decision:** This allows for a stateless backend, making the API more efficient and easier to scale in a production environment.

### 3. Component-Based UI Architecture
- **Decision:** Created reusable components like `AuthNavbar`, `Footer`, and `ListingCard`.
- **Benefit:** Ensures UI consistency across Login, Register, and Feed pages while making the codebase maintainable.

---

## 💡 Product Thinking: Improving User Retention

To keep users coming back to **Mini-Travel**, I propose the following features based on user behavior analysis:

1. **Gamified Rewards (Travel Badges):** Introduce a system where users earn badges (e.g., "Mountain Explorer", "Beach Bum") for posting in specific categories. Gamification triggers a dopamine response, encouraging frequent posting.

2. **Personalized "For You" Feed:**
   Implement a recommendation algorithm based on the user's past likes and saved listings. Showing relevant content immediately upon login reduces "scroll fatigue" and increases daily active usage.

3. **Interactive Maps:**
   Allowing users to see their shared experiences on a personal "World Map" creates a sense of achievement and a digital scrapbooking effect, making the app indispensable for long-term travelers.

---

## 🛠️ Setup Instructions

1. **Clone the repository**
2. **Setup Backend:**
   - Navigate to `/backend`
   - Create a `.env` file and add: `MONGO_URI`, `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_KEY`.
   - Run `npm install` then `npm start`.
3. **Setup Frontend:**
   - Navigate to `/frontend`
   - Create a `.env` file and add: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
   - Run `npm install` then `npm run dev`.

---

**Developed by Minuri Sewmini** ```



---
