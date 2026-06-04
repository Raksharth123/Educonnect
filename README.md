# EduConnect

EduConnect is a MERN (MongoDB, Express, React, Node.js) stack platform designed for educational institutions, tutors, and students to streamline skill learning and class management. It provides dynamic dashboards for different user roles and a responsive design to ensure accessibility on all devices.

## Features

### **General Features**

- User authentication and role-based access control (students, tutors, and admins).
- Secure private and protected routes.
- Notifications for important updates.
- Fully responsive design for all devices.

### **Admin Dashboard**

- Approve or reject submitted classes by tutors.
- Monitor class enrollments and student participation.
- View and manage all users.

### **Tutor Dashboard**

- Create, update, and delete classes.
- Add assignments and resources to classes.
- Monitor class progress and student engagement.

### **Student Dashboard**

- Browse available classes and enroll.
- Submit assignments and view grades.
- Track progress through personalized dashboards.

### **Dynamic Pages**

- Class details with information on assignments, schedule, and progress.
- Enrollment management for admins and tutors.

### **Data Management**

- CRUD operations for managing classes, users, and assignments.
- Real-time data fetching and updates with TanStack Query.

### **AI Integration**

- **Gemini AI Bot**: EduConnect includes a smart assistant powered by Google’s Gemini AI. This chatbot helps users—students, tutors, and admins—by answering questions, assisting with navigation, and providing educational support based on user queries. The integration enhances interactivity and improves the overall user experience.

### **Optional Advanced Features**

- Dark/light theme toggle.
- Charts and analytics for admins and tutors to visualize performance and progress.

## Technologies Used

### **Frontend**

- React.js
- Tailwind CSS for styling
- Context API for state management

### **Backend**

- Node.js with Express.js
- MongoDB as the database
- Firebase Authentication for user login and registration
- JWT (JSON Web Token) for secure route access

### **Other Tools & Libraries**

- Axios for API requests
- TanStack Query for data fetching and caching
- SweetAlert2 for elegant notifications
- Cloudinary for image storage
- **Gemini AI API** for chatbot functionality

## Project Requirements

- Use of private and protected routes for secure access.
- Notifications for CRUD operations and system updates.
- Role-based functionality for different user types (admin, tutor, student).
- Responsiveness for seamless use across devices.
- GitHub commits showcasing project development stages.
- Integration of advanced features such as analytics and theming (optional).

---

## Running the Project Locally

Follow these steps to run the project on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/educonnect.git
   cd educonnect
   ```

2. Install the dependencies:

   **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

   **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file in the `backend` directory and add the following variables:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Run the backend server:

   ```bash
   cd backend
   npm start
   ```

5. Run the frontend server:

   ```bash
   cd ../frontend
   npm start
   ```

6. Access the project:  
   Open your browser and navigate to `https://edu-connect-server-ebon.vercel.app`

---

## Live Project Links & Resources

- **Live Project:** [Live-Link](https://educonnect-5a40e.web.app/)
- **Frontend Repository:** GitHub - [EduConnect Frontend](https://github.com/imroknujjamanrony/edu-connect-client)
- **Backend Repository:** GitHub - [EduConnect Backend](https://github.com/imroknujjamanrony/edu-connect-server)
- **Documentation:** [EduConnect Docs](https://docs.google.com/document/d/1KLILVYU1j9hfFoING-O37VTesxbzEnBuJC0_trBIx2I/edit?pli=1&tab=t.0)

---

EduConnect aims to simplify and optimize the education management system, offering a collaborative and interactive platform for users. For any questions or support, feel free to contact the development team.

---
