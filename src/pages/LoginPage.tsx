import React, { useState } from "react";
import InfoIconButton from "../components/ui/InfoIconButton";
import CountryCodeSelector from "../components/ui/CountryCodeSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Eye, EyeOff, ChefHat } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { AuthService } from "@/api/auth";
import { toast } from "sonner";
import cookingThemeImg from "@/assets/cooking-theme-login.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !/^\d*$/.test(value)) {
      setPhoneError("Only numeric characters (0-9) are allowed");
      return;
    }
    if (value.length > 10) {
      setPhoneError("Phone number cannot exceed 10 digits");
      return;
    }
    setPhoneNumber(value);
    if (value.length === 0) {
      setPhoneError("");
    } else if (value.length < 10) {
      setPhoneError("Phone number must be exactly 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !password.trim()) {
      toast.error("Please fill in all fields", { position: "top-center", duration: 4000 });
      return;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Phone number must be exactly 10 digits", { position: "top-center", duration: 4000 });
      return;
    }
    setIsLoading(true);
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber.trim()}`;
      const response = await AuthService.login(fullPhoneNumber, password);
      if (response.success) {
        toast.success("Login successful!", { position: "top-center", duration: 3000 });
        navigate("/");
      } else {
        toast.error(response.message || "Login failed", { position: "top-center", duration: 5000 });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { position: "top-center", duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-20 flex flex-col">
      {/* Hero image section */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden">
        <img
          src={cookingThemeImg}
          alt="Fresh cooking ingredients and spices"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
        
        {/* Back button overlay */}
        <div className="absolute top-4 left-4 z-10">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2 bg-card/80 backdrop-blur-sm hover:bg-card/90 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Button>
          </Link>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-card/80 backdrop-blur-sm rounded-full">
            <InfoIconButton />
          </div>
        </div>

        {/* Floating logo badge */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
          <div className="bg-primary rounded-full p-4 shadow-lg border-4 border-background">
            <ChefHat className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Login form */}
      <main className="flex flex-1 flex-col items-center w-full px-4 pt-10 pb-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-1 text-foreground">Welcome Back</h1>
          <p className="text-center text-muted-foreground text-sm mb-6">Sign in to explore delicious recipes</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <CountryCodeSelector
                  value={countryCode}
                  onChange={setCountryCode}
                  className="flex-shrink-0"
                />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                  disabled={isLoading}
                  className={`flex-1 ${phoneError ? "border-destructive" : ""}`}
                  maxLength={10}
                />
              </div>
              {phoneError ? (
                <p className="text-xs text-destructive">{phoneError}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Enter your 10-digit phone number without the country code
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-right text-sm">
              <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            New to Being Home Foods?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create Account
            </Link>
          </div>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            By logging in, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms and Conditions
            </Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
