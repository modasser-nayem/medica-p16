"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/shared/PageHeader";

const ContactPage = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleInputChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
   ) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
   };

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <PageHeader
            title="Contact US"
            description="Get in touch with our healthcare team. We're here to help."
         />

         <div className="container py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="card">
                  <div className="card-header">
                     <h2 className="text-2xl font-display font-semibold text-gray-900">
                        Send us a Message
                     </h2>
                  </div>
                  <div className="card-body">
                     <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="form-group">
                              <label
                                 htmlFor="name"
                                 className="form-label"
                              >
                                 Full Name *
                              </label>
                              <input
                                 type="text"
                                 id="name"
                                 name="name"
                                 value={formData.name}
                                 onChange={handleInputChange}
                                 required
                                 className="input"
                              />
                           </div>
                           <div className="form-group">
                              <label
                                 htmlFor="email"
                                 className="form-label"
                              >
                                 Email Address *
                              </label>
                              <input
                                 type="email"
                                 id="email"
                                 name="email"
                                 value={formData.email}
                                 onChange={handleInputChange}
                                 required
                                 className="input"
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="form-group">
                              <label
                                 htmlFor="phone"
                                 className="form-label"
                              >
                                 Phone Number
                              </label>
                              <input
                                 type="tel"
                                 id="phone"
                                 name="phone"
                                 value={formData.phone}
                                 onChange={handleInputChange}
                                 className="input"
                              />
                           </div>
                           <div className="form-group">
                              <label
                                 htmlFor="subject"
                                 className="form-label"
                              >
                                 Subject *
                              </label>
                              <select
                                 id="subject"
                                 name="subject"
                                 value={formData.subject}
                                 onChange={handleInputChange}
                                 required
                                 className="input"
                              >
                                 <option value="">Select a subject</option>
                                 <option value="general">
                                    General Inquiry
                                 </option>
                                 <option value="appointment">
                                    Appointment Booking
                                 </option>
                                 <option value="billing">
                                    Billing Question
                                 </option>
                                 <option value="technical">
                                    Technical Support
                                 </option>
                              </select>
                           </div>
                        </div>

                        <div className="form-group">
                           <label
                              htmlFor="message"
                              className="form-label"
                           >
                              Message *
                           </label>
                           <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              required
                              rows={6}
                              className="input resize-none"
                           />
                        </div>

                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className="btn btn-primary w-full text-lg py-3"
                        >
                           {isSubmitting ? (
                              "Sending..."
                           ) : (
                              <div className="flex items-center">
                                 <Send className="mr-2 h-5 w-5" />
                                 Send Message
                              </div>
                           )}
                        </button>
                     </form>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="card">
                     <div className="card-header">
                        <h3 className="text-xl font-display font-semibold text-gray-900">
                           Contact Information
                        </h3>
                     </div>
                     <div className="card-body">
                        <div className="space-y-6">
                           <div className="flex items-start space-x-4">
                              <div className="p-2 rounded-lg bg-primary-100 text-primary-600">
                                 <Phone className="h-5 w-5" />
                              </div>
                              <div>
                                 <h4 className="font-semibold text-gray-900 mb-1">
                                    Phone
                                 </h4>
                                 <p className="text-gray-600">
                                    +1 (555) 123-4567
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-start space-x-4">
                              <div className="p-2 rounded-lg bg-secondary-100 text-secondary-600">
                                 <Mail className="h-5 w-5" />
                              </div>
                              <div>
                                 <h4 className="font-semibold text-gray-900 mb-1">
                                    Email
                                 </h4>
                                 <p className="text-gray-600">
                                    info@medica.com
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-start space-x-4">
                              <div className="p-2 rounded-lg bg-success-100 text-success-600">
                                 <MapPin className="h-5 w-5" />
                              </div>
                              <div>
                                 <h4 className="font-semibold text-gray-900 mb-1">
                                    Address
                                 </h4>
                                 <p className="text-gray-600">
                                    123 Medical Center Dr
                                 </p>
                                 <p className="text-gray-600">
                                    Healthcare City, HC 12345
                                 </p>
                              </div>
                           </div>

                           <div className="flex items-start space-x-4">
                              <div className="p-2 rounded-lg bg-warning-100 text-warning-600">
                                 <Clock className="h-5 w-5" />
                              </div>
                              <div>
                                 <h4 className="font-semibold text-gray-900 mb-1">
                                    Hours
                                 </h4>
                                 <p className="text-gray-600">
                                    Mon-Fri: 8:00 AM - 8:00 PM
                                 </p>
                                 <p className="text-gray-600">
                                    Sat-Sun: 9:00 AM - 6:00 PM
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="card border-error-200 bg-error-50">
                     <div className="card-body">
                        <div className="flex items-start space-x-4">
                           <div className="p-2 rounded-lg bg-error-100 text-error-600">
                              <Phone className="h-5 w-5" />
                           </div>
                           <div>
                              <h4 className="font-semibold text-error-900 mb-1">
                                 Emergency Contact
                              </h4>
                              <p className="text-error-700 font-medium">
                                 +1 (555) 911-0000
                              </p>
                              <p className="text-sm text-error-600 mt-1">
                                 Available 24/7 for emergencies
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactPage;
