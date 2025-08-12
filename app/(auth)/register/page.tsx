"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, UserPlus, Mail, User, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein");
      return;
    }

    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen lang sein");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Registrierung fehlgeschlagen");
        return;
      }

      router.push("/login");
    } catch (error) {
      setError("Serverfehler - Bitte versuche es später erneut");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Register Form Card */}
        <Card className="bg-gray-950 border-gray-800 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Willkommen bei ProjectPilot
            </CardTitle>
            <CardDescription className="text-lg text-gray-300 mt-2">
              Erstellen Sie Ihr Konto und starten Sie noch heute
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-200 flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-yellow-400" />
                    Vorname
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Max"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-200 flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-yellow-400" />
                    Nachname
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Mustermann"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-200 flex items-center gap-2"
                >
                  <User className="h-4 w-4 text-yellow-400" />
                  Benutzername
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="maxmustermann"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                  className="h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-200 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-yellow-400" />
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
                  className="h-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-200 flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4 text-yellow-400" />
                    Passwort
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mindestens 6 Zeichen"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12 pr-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
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

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-200 flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4 text-yellow-400" />
                    Passwort bestätigen
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Passwort wiederholen"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="h-12 pr-12 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-gray-800"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={loading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-950 border border-red-800 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={
                  loading ||
                  !firstName ||
                  !lastName ||
                  !username ||
                  !email ||
                  !password ||
                  !confirmPassword
                }
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Konto wird erstellt...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    Konto erstellen
                  </>
                )}
              </Button>

              <div className="text-center pt-4">
                <p className="text-gray-300">
                  Bereits ein Konto?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
                  >
                    Jetzt anmelden
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Logo Card */}
        <Card className="bg-gray-950 border-gray-800 shadow-2xl backdrop-blur-sm">
          <CardContent className="flex items-center justify-center h-full min-h-[600px] p-12">
            <div className="text-center">
              <div className="mx-auto w-32 h-32 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-8">
                <UserPlus className="h-16 w-16 text-black" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                ProjectPilot
              </h1>
              <p className="text-gray-300 text-lg">
                Ihr Projektmanagement-Tool der nächsten Generation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
