import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </HelmetProvider>,
);
