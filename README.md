# 🚀 Getting Started

## 1. Clone the Repository

       git clone https://github.com/dhirukumar/projects.git
       
## 2. Navigate to the Project

     cd ShortURL
     
## 🔧 Backend Setup (Cloudflare Workers)

## 3. Go to the Backend Directory

     cd backend
     
## 4. Install Dependencies

    npm install
    
## 5. Login to Cloudflare

### .Make sure you have a Cloudflare account. Then:

      wrangler login
      
## 6. Deploy the Worker

    npm run deploy
    # or
     wrangler deploy
     
## ✅ After deployment, you'll receive a public https:// link for your backend Worker API.

## 🌐 Connect Frontend to Backend

## 7. Copy the backend URL and update it here: frontend/src/component/backendurl.jsx Replace the existing URL in that file with your Cloudflare Worker URL.

## 🎨 Frontend Setup

## 8. Go to the Frontend Directory

     cd ../frontend
     
## 9. Install Frontend Dependencies

     npm install
     
## 10. Start the Development Server

     npm run dev
     
# 🥳 You’ll get a local link like http://localhost:5173. Open it in your browser and start shortening URLs!

