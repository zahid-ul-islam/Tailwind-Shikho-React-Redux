import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, register, hideAuthModal } from "../../store/authSlice";
import { saveDesign } from "../../store/designsSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    showAuthModal: show,
    loading,
    error,
    pendingDesign,
  } = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);

  const {
    register: registerField,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegisterField,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginData) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result) && pendingDesign) {
      // Save pending design after successful login
      await dispatch(saveDesign(pendingDesign));
    }
    resetLogin();
  };

  const onRegister = async (data: RegisterData) => {
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result) && pendingDesign) {
      // Save pending design after successful registration
      await dispatch(saveDesign(pendingDesign));
    }
    resetRegister();
  };

  const handleClose = () => {
    dispatch(hideAuthModal());
    resetLogin();
    resetRegister();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-gray-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white mb-6 text-center bg-clip-text text-transparent bg-linear-to-r from-pink-300 via-purple-300 to-indigo-400">
          {isLogin ? "Welcome Back!" : "Join Tailwind Shikho"}
        </h2>

        <div className="flex gap-2 mb-6 bg-gray-800/50 p-1 rounded-lg">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md transition-all font-medium ${
              isLogin
                ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md transition-all font-medium ${
              !isLogin
                ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                {...registerField("email")}
                type="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="your@email.com"
              />
              {loginErrors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {loginErrors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                {...registerField("password")}
                type="password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="••••••••"
              />
              {loginErrors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {loginErrors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "🚀 Login"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleRegisterSubmit(onRegister)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                {...registerRegisterField("name")}
                type="text"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="John Doe"
              />
              {registerErrors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {registerErrors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                {...registerRegisterField("email")}
                type="email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="your@email.com"
              />
              {registerErrors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {registerErrors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                {...registerRegisterField("password")}
                type="password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="••••••••"
              />
              {registerErrors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {registerErrors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "✨ Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
