'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Mail } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of patients and healthcare professionals who trust our platform for their medical needs. 
            Experience seamless healthcare management today.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/register">
              <button className="btn bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 transition-all duration-200 font-semibold">
                Sign In
              </button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-primary-100">
              <Phone className="h-5 w-5" />
              <span className="text-lg">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-primary-100">
              <Mail className="h-5 w-5" />
              <span className="text-lg">support@medica.com</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-primary-500">
            <p className="text-primary-200 text-sm mb-4">Trusted by healthcare professionals worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-primary-200 text-xs font-medium">HIPAA Compliant</div>
              <div className="text-primary-200 text-xs font-medium">ISO 27001 Certified</div>
              <div className="text-primary-200 text-xs font-medium">24/7 Support</div>
              <div className="text-primary-200 text-xs font-medium">99.9% Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
  