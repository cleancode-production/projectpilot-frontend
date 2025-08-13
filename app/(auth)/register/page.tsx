"use client";
import RegisterCard from "@/components/auth/RegisterCard";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useRegister } from "@/hooks/useRegister";
import { UserPlus } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerMutation = useRegister();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await registerMutation.mutateAsync({ firstName, lastName, username, email, password });
      router.push("/");
    } catch (error) {
      console.log("error beim registrieren: ", error);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Register Form Card */}
        <RegisterCard 
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onSubmit={handleSubmit}
          loading={registerMutation.isPending}
          error={
            registerMutation.isError ? (registerMutation.error as Error).message : ""
          }
        />

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
