"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
   return (
      <section className="container py-20">
         <div className="text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-display font-bold mb-6">
               Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
               Join thousands of patients and healthcare professionals who trust
               our platform for their medical needs. Experience seamless
               healthcare management today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
               <Link href="/register">
                  <Button className="border-2 border-primary px-6 py-6 text-base font-semibold">
                     Create Account
                     <ArrowRight className="ml-1 h-5 w-5" />
                  </Button>
               </Link>
               <Link href="/login">
                  <Button
                     variant={"outline"}
                     className="border-2 border-primary px-6 py-6 text-base font-semibold text-primary"
                  >
                     Login <LogIn className="ml-1 h-5 w-5" />
                  </Button>
               </Link>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
               <div className="flex items-center justify-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span className="text-lg">+1 (555) 123-4567</span>
               </div>
               <div className="flex items-center justify-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span className="text-lg">support@medica.com</span>
               </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t">
               <p className="text-sm mb-4">
                  Trusted by healthcare professionals worldwide
               </p>
               <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  <div className="text-xs font-medium">HIPAA Compliant</div>
                  <div className="text-xs font-medium">ISO 27001 Certified</div>
                  <div className="text-xs font-medium">24/7 Support</div>
                  <div className="text-xs font-medium">99.9% Uptime</div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CTASection;
