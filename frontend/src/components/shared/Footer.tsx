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
import { Input } from "@/components/ui/input";

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
      <footer className="py-10 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
         </div>

         {/* Main Footer Content */}
         <div className="container py-12 text-primary-foreground/80 relative z-40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
               {/* Company Info */}
               <div className="lg:col-span-2">
                  <div className="flex items-center space-x-3 mb-6">
                     <Stethoscope className="h-8 w-8" />
                     <span className="text-2xl font-display font-bold">
                        Medica HMS
                     </span>
                  </div>
                  <p className="mb-6 leading-relaxed">
                     Providing world-class healthcare services with cutting-edge
                     technology and compassionate care. Your health is our
                     priority, and we're committed to delivering exceptional
                     medical care to our community.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3">
                     <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3" />
                        <span>+1 (555) 123-4567</span>
                     </div>
                     <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3" />
                        <span>info@medica.com</span>
                     </div>
                     <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-3" />
                        <span>
                           123 Medical Center Dr, Healthcare City, HC 12345
                        </span>
                     </div>
                     <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-3" />
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
                              className="hover:text-primary-900 hover:underline transition-colors duration-200"
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
                              className="hover:text-primary-900 hover:underline transition-colors duration-200"
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
                              className="hover:text-primary-900 hover:underline transition-colors duration-200"
                           >
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Social Media & Newsletter */}
            <div className="border-t mt-12 pt-8">
               <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  {/* Social Media */}
                  <div className="flex space-x-4">
                     {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                           <a
                              key={social.name}
                              href={social.href}
                              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-800 hover:text-primary-foreground transition-colors duration-200"
                              aria-label={social.name}
                           >
                              <Icon className="h-5 w-5" />
                           </a>
                        );
                     })}
                  </div>

                  {/* Newsletter Signup */}
                  <div className="flex items-center space-x-4">
                     <span className="text-sm">
                        Subscribe to our newsletter
                     </span>
                     <div className="flex">
                        <Input
                           type="email"
                           placeholder="Enter your email"
                           className="input rounded-r-none"
                        />
                        <button className="px-4 py-2 bg-primary-foreground text-primary hover:bg-primary-800 hover:text-primary-foreground border rounded-r-md transition-colors duration-200">
                           Subscribe
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="container py-5 border-t text-primary-foreground/70">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
               <div className="text-sm">
                  © {currentYear} Medica. All rights reserved.
               </div>
               <div className="flex space-x-6 text-sm">
                  <Link
                     href="/privacy"
                     className="hover:text-primary-400 transition-colors duration-200"
                  >
                     Privacy Policy
                  </Link>
                  <Link
                     href="/terms"
                     className="hover:text-primary-400 transition-colors duration-200"
                  >
                     Terms of Service
                  </Link>
                  <Link
                     href="/cookies"
                     className="hover:text-primary-400 transition-colors duration-200"
                  >
                     Cookie Policy
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default PublicFooter;
