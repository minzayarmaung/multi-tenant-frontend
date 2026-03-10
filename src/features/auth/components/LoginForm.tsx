/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAuth } from "../../../security/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
    const { login }  = useAuth();
    const navigate   = useNavigate();

    const [email,    setEmail]    = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading,  setLoading]  = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await login(email, password);

            if (res.success === 1) {
                toast.success(res.message || "Welcome back!");
                navigate("/dashboard");
            } else {
                toast.error(res.message); // banned / invalid / other backend messages
            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                    Email Address
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="bg-slate-700/50 border border-slate-600 text-white
                               placeholder-slate-400 rounded-lg px-4 py-2.5 text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500
                               focus:border-transparent transition-all duration-200"
                />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 text-white
                                   placeholder-slate-400 rounded-lg px-4 py-2.5 text-sm pr-11
                                   focus:outline-none focus:ring-2 focus:ring-blue-500
                                   focus:border-transparent transition-all duration-200"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                                   text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        {showPass ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full bg-blue-600 hover:bg-blue-500
                           disabled:opacity-60 disabled:cursor-not-allowed
                           text-white font-semibold py-2.5 rounded-lg text-sm
                           transition-all duration-200 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                    stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Signing in...
                    </>
                ) : "Sign In"}
            </button>
        </form>
    );
};

// ── Icons ──────────────────────────────────────────────
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268
                 2.943 9.542 7-1.274 4.057-5.064 7-9.542
                 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478
                 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3
                 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88
                 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59
                 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943
                 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
    </svg>
);

export default LoginForm;