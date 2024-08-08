import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from "./App.jsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Configuration, OpenAIApi } from "openai";

const firebaseConfig = {
  apiKey: "AIzaSyBaMsvZCdwFLWgTUZsTZlScUzDNc_WvyCQ",
  authDomain: "auto-vision-pro-v2.firebaseapp.com",
  databaseURL: "https://auto-vision-pro-v2-default-rtdb.firebaseio.com",
  projectId: "auto-vision-pro-v2",
  storageBucket: "auto-vision-pro-v2.appspot.com",
  messagingSenderId: "933665969916",
  appId: "1:933665969916:web:05125fb12becda84102979",
  measurementId: "G-E6T63XT8CV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
