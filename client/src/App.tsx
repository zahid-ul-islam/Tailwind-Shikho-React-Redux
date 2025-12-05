import "./index.css";
import { useState, useEffect } from "react";
import DesignConsole from "./components/DesignConsole";
import AuthModal from "./components/Auth/AuthModal";
import Profile from "./components/Profile";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { refreshToken } from "./store/authSlice";
import { fetchDesigns } from "./store/designsSlice";

function App() {
  const [view, setView] = useState<"console" | "profile">("console");
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Refresh token on app load to restore session
  useEffect(() => {
    const initAuth = async () => {
      try {
        await dispatch(refreshToken()).unwrap();
        // If refresh succeeds, fetch user's designs
        await dispatch(fetchDesigns());
      } catch {
        // Refresh token failed or doesn't exist, user stays logged out
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🎨</div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      {isAuthenticated && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <button
              onClick={() => setView("console")}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                view === "console"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              🎨 Console
            </button>
            <button
              onClick={() => setView("profile")}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                view === "profile"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="w-6 h-6 bg-linear-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              Profile
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={isAuthenticated ? "pt-16" : ""}>
        {view === "console" ? <DesignConsole /> : <Profile />}
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm bg-gray-900 border-t border-gray-800">
        <p>&copy; 2025 Zahidul Islam. All Rights Reserved.</p>
      </footer>

      <AuthModal />
    </>
  );
}

export default App;
