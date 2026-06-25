import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LuChevronDown,
  LuFileText,
  LuUser,
  LuAlertTriangle,
  LuShield,
  LuGlobe,
  LuArrowLeft,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const TermsandConditions = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState(new Set(["intro"]));
  const [activeSection, setActiveSection] = useState("intro");

  const toggleSection = (id) => {
    const newSet = new Set(openSections);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setOpenSections(newSet);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px -20% 0px" },
    );

    const sections = document.querySelectorAll(".policy-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const sectionsData = [
    {
      id: "intro",
      title: "Introduction",
      icon: <LuFileText className="w-5 h-5" />,
    },
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: <LuUser className="w-5 h-5" />,
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      icon: <LuUser className="w-5 h-5" />,
    },
    {
      id: "use-of-service",
      title: "Use of Service",
      icon: <LuGlobe className="w-5 h-5" />,
    },
    {
      id: "prohibited",
      title: "Prohibited Conduct",
      icon: <LuAlertTriangle className="w-5 h-5" />,
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: <LuShield className="w-5 h-5" />,
    },
    {
      id: "termination",
      title: "Termination",
      icon: <LuAlertTriangle className="w-5 h-5" />,
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <LuShield className="w-5 h-5" />,
    },
    {
      id: "governing",
      title: "Governing Law",
      icon: <LuGlobe className="w-5 h-5" />,
    },
    {
      id: "changes",
      title: "Changes to Terms",
      icon: <LuFileText className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full pt-6 px-6">
        <div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-8 py-4"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/PrepPilot-Logo.png" alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-xl">
              PrepPilot <span className="text-violet-400">AI</span>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm px-6 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition-all"
          >
            <LuArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>
        </div>
      </header>

      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 flex gap-12">
        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-28">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <LuFileText className="text-violet-400" />
                Table of Contents
              </h2>
            </div>

            <nav className="space-y-1">
              {sectionsData.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-3 text-sm transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-violet-500/10 text-violet-300 border border-violet-500/30"
                      : "hover:bg-white/5 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <span className="text-violet-400 opacity-70">
                    {section.icon}
                  </span>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>

            <div className="mt-10 pt-6 border-t border-white/10 text-xs text-gray-500">
              Last Updated: June 20, 2026
            </div>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1 max-w-3xl">
          <div className="mb-16 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full mb-6">
              <LuFileText className="text-violet-400" />
              <span className="uppercase tracking-widest text-sm font-semibold text-violet-300">
                Legal
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Terms and Conditions
            </h1>
            <p className="text-xl text-gray-400 mt-6">
              Please read these Terms and Conditions carefully before using
              PrepPilot AI.
            </p>
          </div>

          <div className="space-y-8">
            {sectionsData.map((sec) => (
              <div
                id={sec.id}
                key={sec.id}
                className="policy-section border border-white/10 rounded-3xl overflow-hidden bg-gray-900/50 backdrop-blur-sm scroll-mt-24"
              >
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-violet-400">{sec.icon}</div>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {sec.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openSections.has(sec.id) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LuChevronDown className="w-6 h-6 text-gray-400" />
                  </motion.div>
                </button>

                {openSections.has(sec.id) && (
                  <div className="px-8 pb-8 text-[15.2px] leading-relaxed text-gray-300">
                    {getSectionContent(sec.id)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final Note */}
          <div className="mt-20 bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Questions?</h3>
            <p className="text-gray-400 mb-8">
              If you have any questions about these Terms, please contact us.
            </p>
            <a
              href="mailto:legal@preppilot.ai"
              className="inline-block px-10 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} PrepPilot AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Section Content
const getSectionContent = (id) => {
  switch (id) {
    case "intro":
      return (
        <p>
          These Terms and Conditions govern your use of PrepPilot AI and its
          services. By accessing or using our platform, you agree to be bound by
          these terms.
        </p>
      );
    case "acceptance":
      return (
        <p>
          By creating an account or using PrepPilot AI, you confirm that you
          have read, understood, and agree to these Terms and Conditions, as
          well as our Privacy Policy.
        </p>
      );
    case "user-accounts":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You must provide accurate and complete information when creating an
            account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            You must notify us immediately of any unauthorized use of your
            account.
          </li>
        </ul>
      );
    case "use-of-service":
      return (
        <p>
          PrepPilot AI is intended for personal and professional interview
          preparation. You may not use the service for any unlawful purpose or
          in violation of these terms.
        </p>
      );
    case "prohibited":
      return (
        <ul className="list-disc pl-6 space-y-2">
          <li>Sharing or selling access to your account</li>
          <li>Attempting to reverse engineer or scrape the platform</li>
          <li>Using the service to harass, abuse, or harm others</li>
          <li>Uploading malicious code or content</li>
        </ul>
      );
    case "intellectual":
      return (
        <p>
          All content, features, and functionality on PrepPilot AI are owned by
          us and protected by copyright, trademark, and other intellectual
          property laws.
        </p>
      );
    case "termination":
      return (
        <p>
          We reserve the right to suspend or terminate your account at our
          discretion if you violate these terms.
        </p>
      );
    case "liability":
      return (
        <p>
          PrepPilot AI is provided "as is". We are not liable for any indirect,
          incidental, or consequential damages arising from your use of the
          service.
        </p>
      );
    case "governing":
      return (
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of India.
        </p>
      );
    case "changes":
      return (
        <p>
          We may update these Terms from time to time. Continued use of the
          service after changes constitutes acceptance of the new terms.
        </p>
      );
    default:
      return <p>Content coming soon.</p>;
  }
};

export default TermsandConditions;
