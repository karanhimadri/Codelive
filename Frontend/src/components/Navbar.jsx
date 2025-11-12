import { useState, useEffect, useContext } from "react";
import { Menu, X, Code2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContextProvider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");
  const navigate = useNavigate();

  const { setSignupState, setLoginState, user, logout } = useContext(authContext);
  const currentUser = user ? user.username : "";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update activeRoute if the URL changes externally (optional)
  useEffect(() => {
    setActiveRoute(window.location.pathname);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact" }
  ];

  const handleLogInBtn = () => {
    setLoginState(true);
    setSignupState(false);
  };

  const handleSignUpBtn = () => {
    setSignupState(true);
    setLoginState(false);
  };

  const handleNavClick = (path) => {
    navigate(path);           // <-- Navigate to the route
    setActiveRoute(path);     // <-- Update active route for styling
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 ${isScrolled
          ? "bg-white border-b border-green-200"
          : "bg-white border-b border-green-100"
          }`}
      >
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick("/")}>
              <div className="w-10 h-10 bg-white border border-green-700 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-green-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-green-800 tracking-tight">CodeLive</span>
                <span className="text-xs text-gray-600 -mt-1">
                  Real-time coding
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className={`px-10 py-2 font-medium transition-colors border-b-2 ${activeRoute === item.path
                        ? "text-green-700 border-green-700"
                        : "text-gray-800 border-transparent hover:text-green-700 hover:border-green-300"
                        }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsUserDropdownOpen(!isUserDropdownOpen)
                    }
                    className="flex items-center space-x-3 px-3 py-2 hover:bg-green-50 transition border border-green-100"
                  >
                    <img
                      className="w-8 h-8 rounded-full ring-2 ring-green-100"
                      src={currentUser.profile_picture || "data:image/png;base64,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"}
                      alt="Profile"
                      referrerPolicy="no-referrer"
                    />
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-green-900">
                        Hi, {currentUser}
                      </p>
                      <p className="text-xs text-gray-600">Welcome back</p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-green-600 transition-transform ${isUserDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isUserDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-fadeIn"
                    >
                      <button
                        onClick={() => { logout(); setIsUserDropdownOpen(false)}}
                        className="w-full px-4 py-2 text-sm text-red-600 text-left hover:bg-red-50 hover:text-red-700 transition duration-150"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-3">
                  <button
                    onClick={handleLogInBtn}
                    className="px-6 py-2 text-green-800 font-medium border border-green-700 hover:bg-green-700 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUpBtn}
                    className="px-6 py-2 bg-green-700 text-white font-medium border border-green-700 hover:bg-white hover:text-green-800 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-green-50"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-green-100 bg-white">
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full text-left px-4 py-3 font-medium transition-colors border-l-4 ${activeRoute === item.path
                      ? "text-green-700 bg-green-50 border-green-700"
                      : "text-gray-800 hover:text-green-700 hover:bg-green-50 border-transparent"
                      }`}
                  >
                    {item.name}
                  </button>
                ))}

                {!currentUser ? (
                  <div className="pt-4 border-t border-green-100 space-y-3">
                    <button
                      onClick={handleLogInBtn}
                      className="w-full px-6 py-3 text-green-800 font-medium border border-green-700 hover:bg-green-700 hover:text-white transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleSignUpBtn}
                      className="w-full px-6 py-3 bg-green-700 text-white font-medium border border-green-700 hover:bg-white hover:text-green-800 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-green-100">
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <img
                        className="w-10 h-10 rounded-full ring-2 ring-green-100"
                        src={currentUser.profile_picture}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-medium text-green-900">
                          Hi, {currentUser.given_name}
                        </p>
                        <p className="text-sm text-gray-600">Welcome back</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-green-50">
                        Profile Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-green-50">
                        My Projects
                      </button>
                      <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>
      </div>


    </>
  );
};

export default Navbar;
