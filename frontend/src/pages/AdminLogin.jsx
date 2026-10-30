import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { loginAdmin } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginAdmin(email, password);
      login(response.admin, response.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B171B] px-4 py-10 text-[#E7F0EF]">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#087F78]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[#168C83]/10 blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#315052] bg-[#142A2F] shadow-2xl shadow-black/30 lg:grid-cols-2">
        {/* Left branding panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#12443F] via-[#103B3B] to-[#10272D] p-12 lg:flex">
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-[#70D6C7]/10" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 rounded-full border border-[#70D6C7]/10" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087F78] shadow-lg shadow-black/20">
                <GraduationCap size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  K12 <span className="text-[#70D6C7]">Hunar</span>
                </h1>
                <p className="text-[10px] tracking-[3px] text-[#A4C8C0]">
                  EDUCATION ECOSYSTEM
                </p>
              </div>
            </div>

            <div className="mt-24">
              <p className="text-xs font-bold tracking-[3px] text-[#70D6C7]">
                ADMINISTRATION PORTAL
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight">
                Manage connections.
                <span className="mt-2 block font-serif italic text-[#70D6C7]">
                  Create opportunities.
                </span>
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#B2C9C5]">
                A centralized workspace to manage student, parent and school
                inquiries with clarity and efficiency.
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-3 border-t border-[#70D6C7]/20 pt-6">
            <ShieldCheck size={20} className="text-[#70D6C7]" />
            <p className="text-xs text-[#B2C9C5]">
              Secure access for authorized administrators
            </p>
          </div>
        </div>

        {/* Login panel */}
        <div className="flex items-center justify-center p-7 sm:p-12 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-9 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#087F78]">
                  <GraduationCap size={25} className="text-white" />
                </div>
                <h1 className="text-xl font-bold">
                  K12 <span className="text-[#70D6C7]">Hunar</span>
                </h1>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-4 inline-flex rounded-lg border border-[#3A6861] bg-[#1A3A39] px-3 py-1.5 text-xs font-semibold text-[#70D6C7]">
                ADMIN ACCESS
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#9EB5B3]">
                Sign in to access your inquiry management dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#D9E6E4]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#789B96]"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    autoComplete="username"
                    required
                    className="w-full rounded-xl border border-[#3B575A] bg-[#102328] py-3.5 pl-11 pr-4 text-sm text-[#E7F0EF] outline-none transition placeholder:text-[#78908E] focus:border-[#55C7AE] focus:ring-2 focus:ring-[#55C7AE]/15"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#D9E6E4]">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#789B96]"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-[#3B575A] bg-[#102328] py-3.5 pl-11 pr-12 text-sm text-[#E7F0EF] outline-none transition placeholder:text-[#78908E] focus:border-[#55C7AE] focus:ring-2 focus:ring-[#55C7AE]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#789B96] transition hover:text-[#70D6C7]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#087F78] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#087F78]/20 transition hover:bg-[#09968C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In to Dashboard"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-9 flex items-center justify-center gap-2 border-t border-[#345052] pt-6 text-xs text-[#829B99]">
              <ShieldCheck size={15} className="text-[#70D6C7]" />
              Protected administrator access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
