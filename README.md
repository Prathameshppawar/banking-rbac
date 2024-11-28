
# **RBAC Authentication and Authorization System (Next.js)**

## **Overview**

This project is a full-stack **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** system built using **Next.js (App Router)** and **MongoDB**. It features secure user management, role-based access controls, and provides an **Admin Panel** where admins can manage users, view logs, and monitor transactions.

The system ensures that users are authenticated securely, authorized based on their roles, and granted access to only those resources they are permitted to access.

---

## **Features**

### **Core Features**
1. **Authentication**  
   - Secure user registration with hashed passwords using **bcrypt**.  
   - Login and logout functionality using **JWT** (JSON Web Tokens).  
   - JWT-based session management (stored in **localStorage**).

2. **Authorization & RBAC**  
   - Role-based access control (RBAC) with different roles (e.g., **Admin**, **User**).  
   - Each role has specific permissions to access protected routes or resources.  
   - Integration of role management in API routes using middleware.

3. **Admin Panel**  
   - Admins can view and manage user accounts, including role assignments.  
   - Logs and transaction monitoring are available to track user actions.

4. **Logs & Transactions**  
   - **Logs**: Keep track of all the transactions.  
   - **Transactions**: Record user-specific or system-wide activities for auditing purposes.

### **Security Features**
- **Password Hashing**: Passwords are securely hashed with **bcrypt**.  
- **JWT**: Used for secure session management. Tokens are stored in **localStorage** for client-side persistence.  
- **Middleware**: Protects routes and resources based on user roles. 
- **Input Validation**: Prevents potential injection attacks and ensures secure data handling.

---

## **Technologies Used**

- **Next.js** with the **App Router** for building the application.  
- **MongoDB** for data storage, with **Mongoose** for schema management.  
- **JWT** (JSON Web Tokens) for authentication.  
- **bcrypt** for password hashing.  
- **Tailwind CSS** for styling.

---

## **System Architecture**

1. **Authentication**:
   - Users register and log in via secure API routes.
   - Upon login, a JWT is generated and stored in **localStorage** to manage sessions.

2. **Role-Based Access Control (RBAC)**:
   - Middleware checks the JWT to verify the user's role and access permissions.
   - Different roles (Admin, User, etc.) are assigned different access levels to resources.

3. **Admin Panel**:
   - Admin users can manage regular users, assign roles, and track activities like login attempts, role changes, etc.

4. **Logs and Transactions**:
   - Logs track key actions such as login attempts, successful logins, role updates, etc.
   - Transactions capture any user or system activity for auditing purposes.

---

## **Setup Instructions**

### **Requirements**
- Node.js (v16 or higher)
- MongoDB
- npm or yarn package manager

### **Installation**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rbac-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file in the root directory and include the following:
   ```env
   # MongoDB
   MONGO_URI=mongodb+srv://admin:passkey@cluster0.aaepb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

   # JWT
   JWT_SECRET=jwtsecret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## **Usage**

### **User Panel**
- Register and log in to the system.  
- Perform actions based on your role (User, Moderator, Admin).  
- Access your profile and transaction history.

### **Admin Panel**
- Log in with an admin account.  
- Manage user accounts, assign roles, and monitor system activity via logs and transactions.

### **Protected Routes**
- Routes are protected using JWT-based role checks, ensuring users only access what they are authorized to.

---

## **Folder Structure**

```plaintext
rbac-nextjs/
│
├── app/                    # Next.js App Router
│   ├── api/                # API routes (auth, users, logs, etc.)
│   ├── components/         # UI components (forms, modals, etc.)
│   ├── layouts/            # Layout components for user/admin panels
│   ├── pages/              # Pages for user/admin views
│   └── middleware/         # JWT and role-based middleware
│
├── models/                 # Mongoose models (User, Logs, Transactions)
├── public/                 # Static files (icons, images)
├── styles/                 # Tailwind CSS configuration
├── .env                    # Environment variables (MongoDB URI, JWT secret)
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---



## **Security Considerations**

- Ensure that your **JWT_SECRET** is stored securely in the environment file and is never exposed publicly.
- Protect sensitive routes using middleware to verify user roles.
- Always hash user passwords and never store them as plain text.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

---

