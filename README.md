# Deep Sagar Karay - Personal Portfolio

A modern, responsive personal portfolio website built with **React** and **Vite**, featuring a glassmorphism design and smooth animations.

## 🚀 Features
- **Modern UI/UX**: Dark mode, glassmorphism, and responsive design.
- **Tech Stack**: React, Vite, Framer Motion, Lucide React.
- **Components**:
  - **Hero**: Dynamic introduction with 3D-style abstract elements.
  - **About**: Profile summary and certifications.
  - **Projects**: Showcase of key DevOps implementations with screenshots and links.
  - **Experience**: Vertical timeline of professional history.
  - **Skills**: Categorized technical skills (Cloud, DevOps, etc.).
  - **Blog**: Technical articles and insights with grid layout.
  - **Contact**: Interactive contact form and details.
- **Dockerized**: specific production-ready Dockerfile using Nginx.

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd personal-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## 🐳 Docker Support

Build and run the application in a lightweight Nginx container without installing Node.js locally.

### Build Image
```bash
docker build -t portfolio-app .
```

### Run Container
```bash
docker run -d -p 8080:80 --name my-portfolio portfolio-app
```

Access the site at `http://localhost:8080`.

## 📂 Project Structure

```
/src
  /components    # Reusable UI components (Navbar, Hero, etc.)
  /data          # Content data (Resume info, Skills list)
  /assets        # Images and icons
  App.jsx        # Main layout and routing
  main.jsx       # Entry point
/public          # Static assets
Dockerfile       # Multi-stage production build
nginx.conf       # Nginx configuration for SPA routing
```

## 📄 License
This project is for personal use.
