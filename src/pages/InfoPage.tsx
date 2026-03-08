import React from "react";
import infoImg from "../assets/info.png";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-20 flex flex-col" style={{ position: "relative" }}>
      <AppHeader />

      <div className="bg-card border-b border-border px-4 py-3">
        <h1 className="text-xl font-semibold text-foreground">About Us</h1>
      </div>

      <main className="flex flex-col items-center justify-center w-full px-4 py-8 flex-1">
        <img src={infoImg} alt="Info" className="w-24 h-24 mb-8 mx-auto" style={{ objectFit: 'contain' }} />
        <div className="max-w-xl w-full text-center mx-auto">
          <p className="text-lg mb-8 text-foreground">
            This is a recipes application. Anyone can submit their recipes. App helps in finding best recipes based on ingredients available.
          </p>
          <p className="text-lg mb-2 text-foreground">
            For any queries if you want to sell anything thru us contact us on
          </p>
          <p className="text-lg font-medium text-primary">john@example.com</p>
          <p className="text-lg font-medium text-primary">1123456678</p>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
