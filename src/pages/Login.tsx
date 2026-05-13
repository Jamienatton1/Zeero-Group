import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import loginDashboard from "@/assets/login-dashboard.png";
import t4tLogo from "@/assets/T4Tlogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState<"login" | "forgot" | "signup">("login");
  const [resetEmail, setResetEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Login successful", description: "Redirecting to dashboard..." });
    navigate("/");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }
    toast({ title: "Reset link sent", description: "Check your inbox for a password reset link." });
    setView("login");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword || !signupConfirm) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    if (signupPassword !== signupConfirm) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    toast({ title: "Account created", description: "Welcome to Zeero Group!" });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-10 text-primary-foreground relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(178 47% 25%), hsl(178 49% 54%))" }}
      >
        <div>
          <img src={t4tLogo} alt="T4T Logo" className="h-12 w-auto" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-8">
          <p className="text-primary-foreground/90 text-lg font-medium text-center">
            Measure, reduce & offset your carbon footprint
          </p>
          <img
            src={loginDashboard}
            alt="Zeero Group Dashboard"
            className="w-full rounded-xl shadow-2xl border border-primary-foreground/10"
          />
        </div>

        <div className="text-sm text-primary-foreground/60">
          Trusted by 200+ organisations worldwide
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm space-y-6">
          {/* Mobile logo */}
          <div className="flex flex-col items-center gap-2 lg:hidden">
            <img src={t4tLogo} alt="T4T Logo" className="h-12 w-auto invert" />
          </div>

          {view === "login" && (
            <>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
                <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" onClick={() => setView("forgot")} className="text-xs text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full">Sign in</Button>
              </form>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <button type="button" onClick={() => setView("signup")} className="text-primary hover:underline font-medium">
                  Create account
                </button>
              </p>
            </>
          )}

          {view === "forgot" && (
            <>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground">Reset password</h2>
                <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link</p>
              </div>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input id="reset-email" type="email" placeholder="you@example.com" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">Send reset link</Button>
              </form>
              <button type="button" onClick={() => setView("login")} className="text-sm text-primary hover:underline block mx-auto">
                Back to sign in
              </button>
            </>
          )}

          {view === "signup" && (
            <>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground">Create account</h2>
                <p className="text-sm text-muted-foreground">Get started with Zeero Group</p>
              </div>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full name</Label>
                  <Input id="signup-name" type="text" placeholder="John Doe" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="you@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input id="signup-password" type={showSignupPassword ? "text" : "password"} placeholder="••••••••" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm password</Label>
                  <Input id="signup-confirm" type="password" placeholder="••••••••" value={signupConfirm} onChange={(e) => setSignupConfirm(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">Create account</Button>
              </form>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <button type="button" onClick={() => setView("login")} className="text-primary hover:underline font-medium">
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
