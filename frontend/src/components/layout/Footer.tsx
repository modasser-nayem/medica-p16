import { Mail, MapPin, Phone, Stethoscope } from "lucide-react";
import Link from "next/link";

export const Footer = () => (
<footer id="contact" className="bg-gray-900 text-white py-16">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    <div>
      <div className="flex items-center mb-4">
        <Stethoscope className="h-8 w-8 text-blue-400 mr-3" />
        <h3 className="text-xl font-bold">Medica HMS</h3>
      </div>
      <p className="text-gray-400">
        Providing comprehensive healthcare solutions for better patient outcomes.
      </p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-gray-400">
        <li>
          <a href="#services" className="hover:text-white">
            Services
          </a>
        </li>
        <li>
          <a href="#doctors" className="hover:text-white">
            Doctors
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-white">
            About
          </a>
        </li>
        <li>
          <Link href="/auth/register" className="hover:text-white">
            Register
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-4">Services</h4>
      <ul className="space-y-2 text-gray-600">
        <li>Online Consultations</li>
        <li>Appointment Scheduling</li>
        <li>Lab Test Management</li>
        <li>Electronic Health Records</li>
        <li>Secure Messaging</li>
        <li>Payment Processing</li>
      </ul>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-4">Contact</h4>
      <div className="space-y-2 text-gray-400">
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          <span>info@medicahms.com</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          <span>123 Medical Center Dr, City, State</span>
        </div>
      </div>
    </div>
  </div>
  <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
    <p>&copy; 2024 Medica HMS. All rights reserved.</p>
  </div>
</div>
</footer>
);