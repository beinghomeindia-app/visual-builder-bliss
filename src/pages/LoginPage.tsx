import React, { useState } from "react";
import CountryCodeSelector from "../components/ui/CountryCodeSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { AuthService } from "@/api/auth";
import { toast } from "sonner";
import cookingThemeImg from "@/assets/cooking-theme-login.jpg";
import beingHomeLogo from "/beinghomelogo.jpeg";

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
    if (value.length === 0) setPhoneError("");
    else if (value.length < 10) setPhoneError("Phone number must be exactly 10 digits");
    else setPhoneError("");
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
      {/* Hero Section - Large food image */}
      <div className="relative w-full h-[40vh] min-h-[240px] max-h-[360px]">
        <img
          src={cookingThemeImg}
          alt="Fresh cooking ingredients and spices"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

        {/* Back button */}
        <Link to="/" className="absolute top-4 left-4 z-10">
          <button className="p-2.5 rounded-full bg-background/70 backdrop-blur-md shadow-sm">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </Link>

        {/* Branding on image */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          <img
            src={beingHomeLogo}
            alt="Being Home Foods"
            className="h-10 w-10 rounded-full border-2 border-background shadow-md object-cover"
          />
          <span className="text-base font-bold text-white drop-shadow-lg tracking-tight">
            Being Home Foods
          </span>
        </div>
      </div>

      {/* Form Card - overlaps hero */}
      <div className="relative -mt-8 z-10 flex-1">
        <div className="bg-card rounded-t-3xl shadow-lg px-6 pt-8 pb-6 min-h-full">
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome Back 👋</h1>
          <p className="text-muted-foreground text-sm mb-7">
            Sign in to discover & share delicious recipes
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number */}
            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="flex gap-2">
                <CountryCodeSelector
                  value={countryCode}
                  onChange={setCountryCode}
                  className="flex-shrink-0"
                />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                  disabled={isLoading}
                  className={`flex-1 h-11 ${phoneError ? "border-destructive" : ""}`}
                  maxLength={10}
                />
              </div>
              {phoneError && (
                <p className="text-xs text-destructive">{phoneError}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <a href="#" className="text-xs text-primary font-medium hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 pr-12"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Register link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            New to Being Home Foods?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create Account
            </Link>
          </div>

          {/* Terms */}
          <div className="mt-4 text-center text-xs text-muted-foreground leading-relaxed">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">Terms</Link>
            {" & "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
