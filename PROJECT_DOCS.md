# Shikho-Tailwind Project Documentation

## 1. Technology Stack

### Frontend
- **Framework**: [React](https://react.dev/) (v18) - A JavaScript library for building user interfaces.
- **Build Tool**: [Vite](https://vitejs.dev/) - A fast build tool and development server.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Adds static typing to JavaScript for better developer experience and code quality.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - A utility-first CSS framework (latest version).
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development.
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and node.js.
- **Forms**: [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation library.

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 engine.
- **Framework**: [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- **Database**: [MongoDB](https://www.mongodb.com/) - A source-available cross-platform document-oriented database program.
- **ODM**: [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js.
- **Authentication**: JWT (JSON Web Tokens) & HTTP-only Cookies.

## 2. Project Strategy & Architecture

### Architecture Pattern
The project follows a **Client-Server Architecture** (also known as detailed MERN stack implementation):
- **Client (SPA)**: Handles UI, user interactions, and presentation logic. It communicates with the server via RESTful APIs.
- **Server (API)**: Handles business logic, data persistence, authentication, and security.

### Key Design Decisions
1.  **Redux for State**: Used for managing global state like User Authentication (`authSlice`) and Design Data (`designsSlice`). This prevents prop-drilling and makes state predictable.
2.  **Tailwind CSS v4**: Adopted the newest version of Tailwind for better performance and modern CSS features (like `bg-linear-to-r`).
3.  **Token-Based Auth with Cookies**: Security-first approach. Instead of storing tokens in `localStorage` (vulnerable to XSS), we store the Refresh Token in an HTTP-only cookie and the Access Token in memory.
4.  **Component Modularity**: UI is broken down into reusable components (`DesignList`, `DesignEditor`, `ConfirmModal`, `Profile`) to ensure maintainability.
5.  **DangerouslySetInnerHTML for Preview**: Deliberately used to render the user's HTML design code for the live preview feature. Functional usage with proper context.

### Development Workflow
1.  **Iterative Development**: Started with basic CRUD, then added Auth, then refined UI/UX (e.g., Modals, Search).
2.  **Linting & Typing**: Strict TypeScript usage to catch errors at compile time.

## 3. Interview Questions & Answers

### Frontend (React/Redux/Tailwind)

**Q1: Why did you choose Redux Toolkit over React Context API?**
> **Answer**: While Context is great for low-frequency updates (like theme or locale), Redux Toolkit provides a more robust solution for complex state logic, middleware support (like `createAsyncThunk` for API calls), and DevTools integration. It handles the "loading/success/error" states of async operations much better out of the box.

**Q2: How does Tailwind CSS v4 differ from previous versions?**
> **Answer**: Tailwind v4 is a significant update that moves to a generic CSS-first configuration. It replaces the JavaScript configuration (`tailwind.config.js`) with CSS variables and uses a new high-performance engine (Oxide). Syntax changes include new gradient utilities like `bg-linear-to-r` instead of `bg-gradient-to-r`.

**Q3: Explain how the "Live Preview" feature works in this app.**
> **Answer**: The app takes the HTML string stored in the state (from the user input) and renders it using React's `dangerouslySetInnerHTML` prop. This allows the browser to parse and display the raw HTML string as actual DOM elements within the preview container.

### Backend (Node/Express/Mongo)

**Q4: How are you handling User Passwords?**
> **Answer**: Passwords are never stored in plain text. We use a Mongoose `pre('save')` hook to intercept the save operation. If the password has been modified, we use `bcryptjs` to hash it with a salt before storing it in the MongoDB database.

**Q5: What is the difference between PUT and PATCH?**
> **Answer**: In our API design, we use `PUT` for updating designs. `PUT` typically implies replacing the entire resource, while `PATCH` implies partial updates. However, Mongoose's `findByIdAndUpdate` is flexible enough to handle both depending on how the update object is structured.

**Q6: Why do you use HTTP-only cookies for the Refresh Token?**
> **Answer**: Storing sensitive tokens in `localStorage` makes them accessible to JavaScript, meaning any XSS vulnerability could leak the user's session. HTTP-only cookies cannot be accessed by client-side JavaScript, significantly reducing the risk of token theft.

### General / System Design

**Q7: How would you scale this application if you had 100,000 users?**
> **Answer**:
> 1.  **Database**: Add indexing to frequently queried fields (like `userId` and `title`) in MongoDB.
> 2.  **Caching**: Implement Redis to cache frequent API responses (e.g., getting public designs).
> 3.  **CDN**: Serve static assets (React build files) via a CDN (like Cloudflare or Vercel Edge Network).
> 4.  **Load Balancing**: Run multiple instances of the backend server behind a load balancer (like Nginx).
