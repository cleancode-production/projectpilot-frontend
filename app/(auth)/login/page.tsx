"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import LoginCard from "@/components/auth/LoginCard";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form Card */}
        <LoginCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          error={error}
          handleSubmit={handleSubmit}
        />

        {/* Logo Card */}
        <Card className="bg-card border-gray-800 shadow-2xl backdrop-blur-sm">
          <CardContent className="flex items-center justify-center h-full min-h-[600px] p-12">
            <div className="text-center">
              <div className="mx-auto w-32 h-32 bg-gradient-to-r from-gold to-yellow-700 rounded-full flex items-center justify-center mb-8">
                <Layers className="h-16 w-16 text-black" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gold to-yellow-700 bg-clip-text text-transparent mb-4">
                Project-Pilot
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
