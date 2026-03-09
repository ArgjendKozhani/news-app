import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const categories = [
  { id: "home", label: "Home" },
  { id: "general", label: "General" },
  { id: "health", label: "Health" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "science", label: "Science" },
];

function Navbar({ changeCategory, activeCategory }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (id) => {
    changeCategory(id);
    setOpen(false);
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-brand">
        <span className="brand-icon">⚡</span>
        Blitz News
      </div>

      {/* Desktop links */}
      <ul className="navbar-links">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className={activeCategory === cat.id ? "active" : ""}
              onClick={() => handleSelect(cat.id)}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="menu-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <ul className="mobile-links">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={activeCategory === cat.id ? "active" : ""}
                onClick={() => handleSelect(cat.id)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
