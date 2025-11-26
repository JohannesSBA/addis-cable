"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#markets", label: "Markets" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#04070f]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/10 p-4 rounded-2xl md:mt-2 shadow-[0_18px_60px_rgba(0,0,0,0.28)] border border-white/10">
        <div className="flex items-center justify-between h-16 text-white">
          <div className="flex items-center gap-8">
            <div className="relative flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent/80 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                animate={{ rotate: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <span className="text-white font-bold text-sm">AC</span>
              </motion.div>
              <div className="flex flex-col -space-y-2">
                <span className="font-semibold uppercase tracking-[0.3em] text-xs text-white/70">
                  Addis
                </span>
                <span className="text-lg font-semibold leading-tight">
                  Cable
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-2 py-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-1.5 rounded-full text-sm text-white hover:text-white hover:bg-white/10 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-primary-foreground hover:bg-white/10"
            >
              Download Catalog
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary via-accent to-primary text-white border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              Get Quote
            </Button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "md:hidden bg-[#050a14]/95 border-t border-white/10 text-white backdrop-blur-xl",
              scrolled
                ? "bg-[#04070f]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                : "bg-transparent border-transparent",
            )}
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg px-3 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-white hover:bg-white/10"
                >
                  Download Catalog
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
