"use client";

import React from "react";
import Link from "next/link";
import {
   Stethoscope,
   Phone,
   Mail,
   MapPin,
   Clock,
   Facebook,
   Twitter,
   Instagram,
   Linkedin,
   Youtube,
} from "lucide-react";

const PublicFooter = () => {
   const currentYear = new Date().getFullYear();

   const footerLinks = {
      services: [
         { name: "General Consultation", href: "/services" },
         { name: "Cardiology", href: "/services" },
         { name: "Neurology", href: "/services" },
         { name: "Pediatrics", href: "/services" },
         { name: "Laboratory Tests", href: "/services" },
      ],
      company: [
         { name: "About Us", href: "/about" },
         { name: "Our Doctors", href: "/doctors" },
         { name: "Careers", href: "/careers" },
         { name: "News & Updates", href: "/news" },
         { name: "Contact Us", href: "/contact" },
      ],
      support: [
         { name: "Help Center", href: "/help" },
         { name: "Patient Portal", href: "/portal" },
         { name: "Insurance", href: "/insurance" },
         { name: "Privacy Policy", href: "/privacy" },
         { name: "Terms of Service", href: "/terms" },
      ],
   };

   const socialLinks = [
      { name: "Facebook", icon: Facebook, href: "#" },
      { name: "Twitter", icon: Twitter, href: "#" },
      { name: "Instagram", icon: Instagram, href: "#" },
      { name: "LinkedIn", icon: Linkedin, href: "#" },
      { name: "YouTube", icon: Youtube, href: "#" },
   ];

   return (
      <footer className="bg-gray-900 text-white">
         {/* Main Footer Content */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
               {/* Company Info */}
               <div className="lg:col-span-2">
                  <div className="flex items-center space-x-3 mb-6">
                     <Stethoscope className="h-8 w-8 text-primary-400" />
                     <span className="text-2xl font-display font-bold">
                        Medica HMS
                     </span>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                     Providing world-class healthcare services with cutting-edge
                     technology and compassionate care. Your health is our
                     priority, and we're committed to delivering exceptional
                     medical care to our community.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3">
                     <div className="flex items-center text-gray-300">
                        <Phone className="h-4 w-4 mr-3 text-primary-400" />
                        <span>+1 (555) 123-4567</span>
                     </div>
                     <div className="flex items-center text-gray-300">
                        <Mail className="h-4 w-4 mr-3 text-primary-400" />
                        <span>info@medica.com</span>
                     </div>
                     <div className="flex items-center text-gray-300">
                        <MapPin className="h-4 w-4 mr-3 text-primary-400" />
                        <span>
                           123 Medical Center Dr, Healthcare City, HC 12345
                        </span>
                     </div>
                     <div className="flex items-center text-gray-300">
                        <Clock className="h-4 w-4 mr-3 text-primary-400" />
                        <span>Mon-Fri: 8:00 AM - 8:00 PM</span>
                     </div>
                  </div>
               </div>

               {/* Services */}
               <div>
                  <h3 className="text-lg font-semibold mb-6">Services</h3>
                  <ul className="space-y-3">
                     {footerLinks.services.map((link) => (
                        <li key={link.name}>
                           <Link
                              href={link.href}
                              className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                           >
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Company */}
               <div>
                  <h3 className="text-lg font-semibold mb-6">Company</h3>
                  <ul className="space-y-3">
                     {footerLinks.company.map((link) => (
                        <li key={link.name}>
                           <Link
                              href={link.href}
                              className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                           >
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Support */}
               <div>
                  <h3 className="text-lg font-semibold mb-6">Support</h3>
                  <ul className="space-y-3">
                     {footerLinks.support.map((link) => (
                        <li key={link.name}>
                           <Link
                              href={link.href}
                              className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                           >
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Social Media & Newsletter */}
            <div className="border-t border-gray-800 mt-12 pt-8">
               <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  {/* Social Media */}
                  <div className="flex space-x-4">
                     {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                           <a
                              key={social.name}
                              href={social.href}
                              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors duration-200"
                              aria-label={social.name}
                           >
                              <Icon className="h-5 w-5" />
                           </a>
                        );
                     })}
                  </div>

                  {/* Newsletter Signup */}
                  <div className="flex items-center space-x-4">
                     <span className="text-gray-300 text-sm">
                        Subscribe to our newsletter
                     </span>
                     <div className="flex">
                        <input
                           type="email"
                           placeholder="Enter your email"
                           className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 transition-colors duration-200">
                           Subscribe
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-gray-400 text-sm">
                     © {currentYear} Medica HMS. All rights reserved.
                  </div>
                  <div className="flex space-x-6 text-sm">
                     <Link
                        href="/privacy"
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                     >
                        Privacy Policy
                     </Link>
                     <Link
                        href="/terms"
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                     >
                        Terms of Service
                     </Link>
                     <Link
                        href="/cookies"
                        className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                     >
                        Cookie Policy
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default PublicFooter;
