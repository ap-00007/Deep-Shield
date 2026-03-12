import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Detect", path: "/detect" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Insights", path: "/insights" },
  { label: "API", path: "/api" },
  { label: "About", path: "/about" },
];

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };
const springGentle = { type: "spring" as const, stiffness: 300, damping: 28 };

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const openMenu = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ─── Desktop Floating Nav ─── */}
      <nav
        ref={navRef}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        onFocus={openMenu}
        onBlur={(e) => {
          if (!navRef.current?.contains(e.relatedTarget as Node)) closeMenu();
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Glow ring behind logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            animate={
              isOpen
                ? { width: 64, height: 64, opacity: 0.5 }
                : { width: 48, height: 48, opacity: 0.25 }
            }
            transition={spring}
            style={{
              background:
                "radial-gradient(circle, rgba(154,166,178,0.5) 0%, rgba(188,204,220,0.2) 60%, transparent 100%)",
              filter: "blur(10px)",
            }}
          />

          {/* Floating Logo / Pill */}
          <motion.div
            layout
            animate={
              isOpen
                ? { borderRadius: 22, width: 360 }
                : { borderRadius: 9999, width: 180 }
            }
            transition={spring}
            className="relative overflow-hidden cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(188,204,220,0.45)",
              boxShadow:
                "0 4px 24px -4px rgba(154,166,178,0.25), 0 0 0 1px rgba(217,234,253,0.15)",
            }}
          >
            {/* Logo row */}
            <motion.div
              layout="position"
              className="flex items-center justify-center"
              animate={isOpen ? { height: 48 } : { height: 48 }}
              transition={spring}
            >
              {/* Breathing logo */}
              <motion.div
                animate={
                  isOpen
                    ? { scale: 1 }
                    : {
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          "0 0 0px rgba(154,166,178,0)",
                          "0 0 14px rgba(154,166,178,0.45)",
                          "0 0 0px rgba(154,166,178,0)",
                        ],
                      }
                }
                transition={
                  isOpen
                    ? spring
                    : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                }
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9AA6B2] to-[#BCCCDC] flex items-center justify-center flex-shrink-0"
              >
                <Shield className="w-4 h-4 text-white" />
              </motion.div>

              {/* Brand text — always visible */}
              <span className="ml-2.5 font-display font-bold text-sm text-[#2a3444] whitespace-nowrap">
                DeepShield AI
              </span>
            </motion.div>

            {/* Dropdown nav items */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={springGentle}
                  className="overflow-hidden"
                >
                  <div className="px-2 pb-2 pt-0.5">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#BCCCDC]/50 to-transparent mb-1.5" />
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ delay: i * 0.04, ...springGentle }}
                      >
                        <Link
                          to={link.path}
                          className={`group flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            location.pathname === link.path
                              ? "bg-[#D9EAFD]/60 text-[#2a3444]"
                              : "text-[#5a6a7a] hover:text-[#2a3444] hover:bg-[#D9EAFD]/35"
                          }`}
                        >
                          <motion.span
                            whileHover={{ x: 3 }}
                            transition={spring}
                          >
                            {link.label}
                          </motion.span>
                          {location.pathname === link.path && (
                            <motion.div
                              layoutId="nav-indicator"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-[#9AA6B2]"
                              transition={spring}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </nav>

      {/* ─── Mobile Floating Logo ─── */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <motion.button
          onClick={() => setMobileOpen(true)}
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 0px rgba(154,166,178,0)",
              "0 0 14px rgba(154,166,178,0.45)",
              "0 0 0px rgba(154,166,178,0)",
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9AA6B2] to-[#BCCCDC] flex items-center justify-center"
          style={{
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(188,204,220,0.45)",
            boxShadow: "0 4px 24px -4px rgba(154,166,178,0.3)",
          }}
          aria-label="Open navigation menu"
        >
          <Shield className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* ─── Mobile Fullscreen Panel ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden"
            style={{
              background: "rgba(248,250,252,0.92)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={spring}
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 border border-[#BCCCDC]/30 flex items-center justify-center text-[#5a6a7a]"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="flex flex-col items-center justify-center h-full gap-3 px-8">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...spring, delay: 0.1 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9AA6B2] to-[#BCCCDC] flex items-center justify-center mb-6 shadow-lg"
              >
                <Shield className="w-7 h-7 text-white" />
              </motion.div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.15 + i * 0.06, ...springGentle }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-center text-2xl font-display font-semibold py-2 px-8 rounded-2xl transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-[#2a3444] bg-[#D9EAFD]/50"
                        : "text-[#5a6a7a] hover:text-[#2a3444]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
