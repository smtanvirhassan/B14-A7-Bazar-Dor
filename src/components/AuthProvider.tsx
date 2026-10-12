"use client";
import { Toaster } from "react-hot-toast";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      {children} 
    </>
  );
}
