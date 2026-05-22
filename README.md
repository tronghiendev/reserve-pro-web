# ReservePro Web — Frontend Client Application

ReservePro Web is the responsive client-side interface for the ReservePro co-working space booking manager. Built as a decoupled single-page application (SPA), it interfaces with the ReservePro API to allow users to explore meeting rooms, review schedule timelines, and reserve or delete room bookings in real-time.

---

## 1. Technical Version Stack

* **Framework**: React v19.x (Single-Page Application setup)
* **Language Runtime**: TypeScript v6.0 / Node.js v18+
* **Routing**: React Router v7.x (declarative client-side routing)
* **UI Components**: Ant Design (antd) v6.x (leveraging CSS-in-JS design tokens)
* **Bundler & Dev Server**: Vite v8.x
* **State Management & Data Fetching**: TanStack React Query v5.x (server state caching)
* **HTTP Client**: Axios v1.x (with request/response interceptors)
* **Testing Framework**: Vitest v3.x & React Testing Library

---

## 2. Architecture & Directory Structure

The frontend application is structured around **Atomic Design** principles, separating components by complexity and reusable scopes.

```text
d:/Projects/fenix/reserve-pro/reserve-pro-web/
├── public/                   # Static assets (favicons, manifest, etc.)
├── src/
│   ├── assets/               # Local images, SVG icons, and styles
│   ├── components/           # Component library based on Atomic Design
│   │   ├── atoms/            # Basic building blocks (LoadingSpinner, buttons)
│   │   ├── molecules/        # Combined components (RoomHeroBanner, user cards)
│   │   ├── organisms/        # Complex UI modules (BookingTable, BookingFormSection)
│   │   └── templates/        # Page layout grids (DashboardLayout)
│   ├── contexts/             # Global contexts (AuthContext, UIContext)
│   ├── hooks/                # Custom React/Query hooks (useRooms, useCreateBooking)
│   ├── lib/                  # Library initializations (axios.ts API client)
│   ├── pages/                # High-level route views (DashboardPage, LoginPage)
│   ├── router/               # Route declarations & protection guards
│   ├── services/             # Direct API communication layer (room.service.ts)
│   ├── test/                 # Vitest environmental setups
│   ├── types/                # Shared TypeScript models and interface scopes
│   ├── App.tsx               # Main provider wrapper configuration
│   └── main.tsx              # Application entry point mounting to DOM
└── package.json              # Direct dependency and script definitions
```

---

## 3. Getting Started & Local Installation

Ensure you have Node.js (v18+) and yarn installed on your machine.

### 💻 Step-by-Step Setup

1. **Install Node Packages**:
   Install all dependencies matching `package.json`:
   ```bash
   yarn install
   ```
2. **Configure Environment Variables**:
   Copy the environment configuration template to construct a local configuration:
   ```bash
   cp .env.example .env.local
   ```
3. **Verify API Connection Endpoint**:
   Open `.env.local` and ensure `VITE_API_BASE_URL` points directly to your backend API. Reference the CORS Matrix below for exact URL matching.
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```
4. **Boot Development Server**:
   Start Vite to serve the application locally:
   ```bash
   yarn dev
   ```
   *The client interface is now available in your browser at `http://localhost:5173` (or the console printed port).*

---

### 🔌 Zero-CORS-Friction Connection Matrix

To ensure the frontend communicates seamlessly with your backend without incurring CORS or connection failures, ensure your local configuration matches:

| Backend Service Method | Backend Target URL | Frontend `VITE_API_BASE_URL` |
| :--- | :--- | :--- |
| **Laravel Sail (Docker)** | `http://localhost` | `http://localhost/api` |
| **Artisan Serve (Local PHP)** | `http://127.0.0.1:8000` | `http://127.0.0.1:8000/api` |
| **Laravel Herd** | `http://reserve-pro-api.test` | `http://reserve-pro-api.test/api` |

---

## 4. Key Highlights & Critical Implementations

* **Axios Bearer Injection & Auth Interceptor**:
  Automatically intercepts outgoing HTTP calls to attach the Sanctum bearer token (`Authorization: Bearer <token>`). Also intercepts incoming responses; if a `401 Unauthorized` is detected (outside login calls), it automatically clears stale local credentials and redirects the user to `/login`.
* **Form Validation & Conflict Alert Banner**:
  If the API returns a validation conflict (422 Unprocessable Entity - such as overlapping booking conflicts), the error messages are parsed and rendered inside an explicit `<Alert>` banner directly above the form fields.

---

## 5. Performance Optimizations

* **Server State Management (TanStack Query)**:
  Uses `@tanstack/react-query` to decouple server-side state from local UI state. Enforces background refetching, caching, and auto-synchronization of room availability.

---

## 🔑 Default Test Accounts (Shared Password: `password`)

Use the following pre-seeded user accounts to authenticate into the system:

| Name | Email Address | Assigned Username | Role |
| :--- | :--- | :--- | :--- |
| **Admin User** | `admin@reserve-pro.test` | `admin` | Administrator |
| **Alice Johnson** | `alice@reserve-pro.test` | `alice` | Regular User |
| **Bob Smith** | `bob@reserve-pro.test` | `bob` | Regular User |
| **Carol White** | `carol@reserve-pro.test` | `carol` | Regular User |

*Note: Deletion actions on bookings are authorized only if you are logged in as the user who originally created that booking (validated on the backend by matching user ID).*
