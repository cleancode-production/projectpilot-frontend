"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LoginCardProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  error: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
};

export default function LoginCard({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  showPassword,
  setShowPassword,
  error,
  onSubmit: handleSubmit,
}: LoginCardProps) {
  return (
    <Card className="bg-card border-gray-800 shadow-2xl backdrop-blur-sm">
      <CardHeader className="text-center pb-8 pt-8">
        <CardTitle className="text-3xl font-bold bg-foreground bg-clip-text text-transparent">
          Willkommen zurück
        </CardTitle>
        <CardDescription className="text-lg text-gray-300 mt-2">
          Melden Sie sich in Ihrem ProjectPilot Konto an
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-200 flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-gold" />
              E-Mail-Adresse
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="max@beispiel.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="h-12 !bg-input border-gray-700 text-white focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-200 flex items-center gap-2"
            >
              <Lock className="h-4 w-4 text-gold" />
              Passwort
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ihr Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="h-12 pr-12 !bg-input border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-gray-800"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-400 text-sm bg-red-950 border border-red-800 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-gold to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={loading || !email || !password}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Wird angemeldet...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" />
                Anmelden
              </>
            )}
          </Button>

          {/* Link */}
          <div className="text-center pt-4">
            <p className="text-gray-300">
              Noch kein Konto?{" "}
              <Link
                href="/register"
                className="font-semibold text-gold hover:text-yellow-300 hover:underline transition-colors"
              >
                Jetzt registrieren
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
