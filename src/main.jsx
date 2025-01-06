import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Route";
import AuthProvider from "./Providers/AuthProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider
          future={{
            v7_startTransition: true,
          }}
          router={router}
        />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
