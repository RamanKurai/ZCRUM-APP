# ZCrum App

## 🚀 Project Overview
ZCrum is a **Next.js** application that integrates **Clerk authentication**, **Prisma database**, and **drag-and-drop functionality** using **@hello-pangea/dnd**. It also utilizes **TailwindCSS** for styling and **React Hook Form** for form handling.

---

## 📌 Features
- **User Authentication** (Clerk)
- **Database Management** (Prisma & PostgreSQL)
- **Drag and Drop** (hello-pangea/dnd)
- **Dark Mode Support** (next-themes)
- **Markdown Editor** (react-md-editor)
- **State Management** (React Hook Form & Zod)
- **Animations** (Radix UI & Tailwind CSS Animate)

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Prisma, PostgreSQL
- **Authentication:** Clerk
- **UI Components:** Radix UI, Lucide Icons
- **State Management:** React Hook Form, Zod
- **Drag & Drop:** @hello-pangea/dnd
- **Markdown Editor:** @uiw/react-md-editor

---

## 📂 Project Structure
```
ZCrum-App/
│── prisma/                 # Prisma schema & migrations
│── public/                 # Static assets
│── src/
│   ├── app/                # Next.js App Router (pages if older version)
│   ├── components/         # Reusable UI components
│   ├── styles/             # Global styles
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page-based routing (for older Next.js versions)
│── .env                    # Environment variables
│── package.json            # Dependencies & scripts
│── next.config.js          # Next.js configuration
│── tailwind.config.js      # Tailwind CSS configuration
│── tsconfig.json           # TypeScript configuration (if applicable)
```

---

## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/zcrum-app.git
cd zcrum-app
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env** file in the root directory and add:
```env
DATABASE_URL=your_postgres_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4️⃣ Run Database Migrations
```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Development Server
```sh
npm run dev
```

---

## 🚀 Deployment
### **🔹 Deploy on Vercel**
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Login to Vercel:
   ```sh
   vercel login
   ```
3. Deploy:
   ```sh
   vercel
   ```
4. Set **Root Directory** to where `package.json` is located.

---

## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Added feature X'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a **Pull Request** 🚀

---

## 📜 License
This project is **MIT Licensed**.

---

## 📞 Contact
- **Author:** Raman Kurai
- **GitHub:** [your-github](https://github.com/RamanKurai)
- **Twitter:** [your-twitter](https://twitter.com/RamanKurai)

