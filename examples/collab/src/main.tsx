import { createRoot } from "react-dom/client";
import App from "./App";
import "./app.css";

// No service worker: this example keeps nothing between visits, so there is
// nothing to serve offline.
createRoot(document.getElementById("root")!).render(<App />);
