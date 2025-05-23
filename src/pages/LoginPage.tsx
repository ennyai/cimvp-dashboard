import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '../hooks/useAuth'; // Changed path alias to relative
import { toast } from "sonner"; // Assuming this alias works despite linter
import ChangeInfluenceLogo from "@/assets/ChangeInfluence-logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithPassword } = useAuth(); // Use the hook
  const navigate = useNavigate(); // Get the navigate function


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await signInWithPassword({ email, password }); // Call Supabase sign in
      if (error) throw error; // Throw if Supabase returns an error
      // onAuthStateChange in useAuth will handle setting state and redirect
      toast.success("Login Successful", { description: "Redirecting..." });
      navigate('/', { replace: true }); // <-- NAVIGATE HERE on success
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error("Login Failed", { description: error.message || "Invalid credentials" });
    } finally {
      setLoading(false); // Ensure loading is always reset
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <img src={ChangeInfluenceLogo} alt="Change Influence Logo" className="mb-20 h-16" />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <div className="text-sm text-right">
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <div className="text-sm text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 