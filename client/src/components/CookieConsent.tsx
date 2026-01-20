import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "wouter";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    localStorage.setItem("cookieConsentDate", new Date().toISOString());
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#B89C5B] shadow-2xl z-50">
      <div className="container py-4 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-[#1A2D40] mb-2">Consentimento de Cookies</h3>
            <p className="text-sm text-gray-600">
              Usamos cookies para melhorar sua experiência e analisar o uso do site. Ao continuar navegando, você concorda com nossa{" "}
              <Link href="/privacy-policy" className="text-[#B89C5B] hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={handleReject}
              variant="outline"
              className="border-[#1A2D40] text-[#1A2D40] hover:bg-gray-100 w-full sm:w-auto"
            >
              Rejeitar
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-[#B89C5B] hover:bg-[#A68B4F] text-white w-full sm:w-auto"
            >
              Aceitar
            </Button>
          </div>

          {/* Close Button */}
          <button
            onClick={handleReject}
            className="text-gray-400 hover:text-gray-600 self-start sm:self-center"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
