import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

try {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
} catch (error) {
	console.error("Failed to render the application:", error);
}