# 🧳 Ferot - Lost & Found System

The **Lost & Found System** is a web-based platform that enables users to report lost items, find returned belongings, verify ownership, and connect with others to reclaim their items. Designed with trust, transparency, and user experience in mind, this system also incorporates real-time communication, optional rewards, and donation-based support.
<a href="https://retrievify-cdb75.web.app/">📱Live Visit This Project</a>

---

## 📌 Features & Functionality

### 🛠️ Core Features
- **Lost Item Addition** – Report lost items with location, description, and images.
- **Search System** – Filter items by name, category, and location.
- **Item Verification** – Upload proof (receipts, images) to verify ownership.
- **Real-time Chat** – WebSocket-based chat system for direct communication.
- **Trust Score System** – Gain scores based on honesty and successful claims.
- **Reward System** – Optional rewards for helpful users.
- **Donation & Payment System** – Support the platform via integrated payments.

### 🔥 Additional Features
- **Admin Panel** – Manage disputes, reports, and fraud detection.
- **Notification System** – Get instant alerts for matches and messages.
- **User Profiles** – View reports, claims, trust score, and interactions.

---

## 🧱 Tech Stack

### Frontend
- **React.js** – UI development
- **Tailwind CSS** & **DaisyUI** – Styling
- **React Router** – Navigation
- **Axios** – API communication
- **Tanstack Query** – State and cache management

### Backend
- **Node.js** & **Express.js** – Server-side development
- **MongoDB** – Database

### Other Services
- **Firebase Authentication** – Secure user auth
- **WebSockets + OpenAI** – Real-time chat with AI moderation
- **Cloudinary/S3** – Image storage
- **Stripe / PayPal / SSLCOMMERZ** – Payment gateways

---

## 🗺️ Development Roadmap

### ✅ Phase 1: Planning & Setup
- Define database schema (Users, Items, Messages, Reports, Transactions)
- Frontend setup with React & Tailwind CSS
- Backend setup with Express.js & MongoDB
- Firebase Authentication configured

### ✅ Phase 2: Core Features Implementation
- Lost Item Addition
- Search System with filters
- Item Verification system
- Real-time Chat System
- Trust Score & Reward integration

### ✅ Phase 3: Enhancements & Optimization
- Notifications & Real-time updates
- Payment & Donation system
- Admin Panel
- UI/UX Optimization

### ✅ Phase 4: Testing & Deployment
- Unit & integration testing
- Deployment (Vercel/Render/MongoDB Atlas)
- Launch & feedback collection

---

## 🧩 System Architecture

### Frontend (React)
- Item Report & Search Forms
- Filters & Sorting
- Chat Interface
- User Profiles & Trust Score Display

### Backend (Node.js/Express)
- REST API endpoints
- Real-time WebSocket handling
- Payment Integration
- User Authentication

### Database (MongoDB)
- **Users:** id, name, email, trust score, items posted
- **Items:** id, name, description, images, location, owner_id
- **Chats:** sender_id, receiver_id, messages, timestamps
- **Payments:** user_id, amount, transaction_id

---

## 🚀 Future Improvements
- AI-powered image recognition for verification
- Blockchain-based trust score tracking
- Mobile app version using React Native

---

## ✅ Conclusion

The **Lost & Found System** is a secure, scalable, and user-friendly platform designed to help individuals recover lost items efficiently. Built with modern technologies and a modular architecture, it is ready for future enhancements and widespread adoption.

---

> 💬 Feel free to contribute, suggest features, or report issues to help improve this project!
