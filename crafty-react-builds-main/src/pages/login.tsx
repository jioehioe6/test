import React, { useState } from "react";
import api from "@/lib/api"; // Axios instance
import { useNavigate } from "react-router-dom";

// -------------------- SVG Icons --------------------

const ListifyLogo = () => (
  <svg
    className="w-8 h-8 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    ></path>
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="w-6 h-6 text-blue-800"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const AppleIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.296 16.037c-.63 1.83-2.037 3.01-3.488 3.01-1.353 0-1.89-.88-3.402-.88-1.512 0-2.115.86-3.425.88-1.375.02-2.62-1.12-3.465-2.99-.88-1.95-1.46-5.46.2-7.81 1.02-1.47 2.83-2.43 4.68-2.47 1.31-.03 2.5.82 3.3.82.78 0 2.25-1.01 3.78-.91 1.43.09 3.25.56 4.39 2.21.43.64.63 1.29.66 1.95-.02.09-1.45.6-1.45 2.08 0 1.9 1.94 2.62 2.02 2.64-.1.32-.24.63-.42.92zm-4.553-11.23c.88-.99 1.48-2.34 1.31-3.72-.94.06-2.33.68-3.23 1.65-.8.86-1.59 2.24-1.38 3.56.96.13 2.42-.51 3.3-1.49z" />
  </svg>
);

// -------------------- Shared Components --------------------

const WaveBackground = () => (
  <div className="absolute bottom-0 left-0 w-full h-1/3 sm:h-1/2 z-0 overflow-hidden">
    <svg
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <path
        fill="#e0f2fe"
        fillOpacity="0.7"
        d="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,176C672,149,768,107,864,112C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
      <path
        fill="#bae6fd"
        fillOpacity="0.6"
        d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
);

const Header = () => (
  <header className="w-full">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <a href="#" className="flex items-center space-x-2">
        <ListifyLogo />
        <span className="text-2xl font-bold text-gray-800">Listify</span>
      </a>
      <div className="flex items-center space-x-8">
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          About us
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Contacts
        </a>
      </div>
    </nav>
  </header>
);

const SocialLogins = () => (
  <div className="flex justify-center space-x-6 my-8">
    <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
      <FacebookIcon />
    </button>
    <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
      <GoogleIcon />
    </button>
    <button className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
      <AppleIcon />
    </button>
  </div>
);

// -------------------- Login Page --------------------

interface LoginPageProps {
  switchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const navigate = useNavigate(); 
 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
   // 🔹 get navigate function

    try {
      const response = await api.post("/login", { email, password });
      console.log("Login Success:", response.data);
      alert("Login successful!");
      navigate("/main");
      // TODO: redirect to dashboard/home
    } catch (err: any) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">Login</h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Please sign in to your account.
        </p>
      </div>
      <SocialLogins />
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/50 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/50 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white py-3 mt-4 border border-gray-300 rounded-lg text-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      <div className="text-center text-gray-500 mt-6">
        <p>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              switchToRegister();
            }}
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

// -------------------- Register Page --------------------

interface RegisterPageProps {
  switchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
      });
      console.log("Register Success:", response.data);
      alert("Registration successful! Please login.");
      switchToLogin(); // switch to login page
    } catch (err: any) {
      console.error("Register Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">Register</h1>
        <p className="text-gray-500 mt-2">
          Welcome! Sign in using your social account or email to continue.
        </p>
      </div>
      <SocialLogins />
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/50 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
        </div>
        <div>
          <input
            type="email"
            name="email-register"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/50 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
        </div>
        <div>
          <input
            type="password"
            name="password-register"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/50 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white py-3 mt-4 border border-gray-300 rounded-lg text-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      <div className="text-center text-gray-500 mt-6">
        <p>
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              switchToLogin();
            }}
            className="text-blue-600 hover:underline font-semibold"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

// -------------------- Main App --------------------

export default function App() {
  const [page, setPage] = useState<"login" | "register">("register");

  const switchToLogin = () => setPage("login");
  const switchToRegister = () => setPage("register");

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      <WaveBackground />
      <div className="relative min-h-screen flex flex-col z-10">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          {page === "register" ? (
            <RegisterPage switchToLogin={switchToLogin} />
          ) : (
            <LoginPage switchToRegister={switchToRegister} />
          )}
        </main>
      </div>
    </div>
  );
}
