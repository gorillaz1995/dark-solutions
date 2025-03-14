"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const Footer: React.FC = () => {
  // Get current year for copyright
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Update year if component stays mounted across year change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000 * 60 * 60 * 24); // Check once per day

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gradient text-white/80 border-t border-neutral-800/30 backdrop-blur-sm w-full">
      <div className="max-w-[90%] xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[5%] lg:gap-[5%] items-center">
          {/* About section */}
          <div className="space-y-4 md:w-[100%] text-center">
            <h3 className="text-xl md:text-2xl lg:text-8xl font-bold text-[#8997A6] tracking-tight">
              DARK Solutions
            </h3>
            <p className="text-sm md:text-base lg:text-2xl leading-relaxed mx-auto text-[#D5DADF]">
              Wizards of advertising making the impossible a daily routine. We
              transform brands through innovative digital strategies and
              creative solutions.
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-4 md:w-[100%] flex flex-col items-center text-center">
            <h3 className="text-lg md:text-xl lg:text-4xl font-semibold text-[#8997A6]">
              Ready to Transform Your Brand?
            </h3>
            <p className="text-sm md:text-base lg:text-xl leading-relaxed text-[#D5DADF]">
              Lets create something extraordinary together. Our team of experts
              is ready to elevate your digital presence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-3 mt-2 text-sm md:text-base font-medium text-black bg-[#AEFC00] rounded-lg hover:bg-[#ffc300] transition-colors duration-300"
            >
              Get Started
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4 md:w-[100%] text-center">
            <h3 className="text-lg md:text-xl font-semibold text-[#8997A6] lg:text-5xl">
              Connect With Us
            </h3>
            <p className="text-sm md:text-base lg:text-3xl flex items-center justify-center text-[#D5DADF]">
              <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />{" "}
              contact@drksolutions.com
            </p>

            {/* Social media links */}
            <div className="flex space-x-4 mt-4 justify-center">
              {[
                { icon: Twitter, href: "https://twitter.com/drksolutions" },
                { icon: Facebook, href: "https://facebook.com/drksolutions" },
                { icon: Instagram, href: "https://instagram.com/drksolutions" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/company/drksolutions",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-800 p-2 md:p-3 rounded-full hover:bg-[#AEFC00] hover:text-black transition-colors duration-300"
                  aria-label={`Visit our ${social.icon.name} page`}
                >
                  <social.icon className="h-5 w-5 md:h-6 md:w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar with copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-800/30 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <p className="text-sm md:text-base lg:text-lg text-neutral-400 text-center">
            © {currentYear} DRK Solutions. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm md:text-base lg:text-lg text-neutral-400">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
