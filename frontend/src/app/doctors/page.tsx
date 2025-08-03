"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
   Search,
   Star,
   MapPin,
   Clock,
   Calendar,
   Phone,
   Mail,
   ArrowRight,
   Heart,
   Brain,
   Baby,
   Eye,
   Bone,
   Stethoscope,
} from "lucide-react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

const DoctorsPage = () => {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedDepartment, setSelectedDepartment] = useState("");
   const [selectedRating, setSelectedRating] = useState("");

   const departments = [
      { id: "", name: "All Departments", icon: Stethoscope },
      { id: "cardiology", name: "Cardiology", icon: Heart },
      { id: "neurology", name: "Neurology", icon: Brain },
      { id: "pediatrics", name: "Pediatrics", icon: Baby },
      { id: "ophthalmology", name: "Ophthalmology", icon: Eye },
      { id: "orthopedics", name: "Orthopedics", icon: Bone },
   ];

   const doctors = [
      {
         id: "1",
         name: "Dr. Sarah Johnson",
         specialization: "Cardiology",
         department: "cardiology",
         experience: 12,
         rating: 4.9,
         totalReviews: 156,
         image: "/api/placeholder/150/150",
         location: "Main Hospital",
         availability: "Mon-Fri, 9:00 AM - 5:00 PM",
         phone: "+1 (555) 123-4001",
         email: "sarah.johnson@medica.com",
         description:
            "Board-certified cardiologist with expertise in interventional cardiology and heart failure management.",
         languages: ["English", "Spanish"],
         education: [
            "MBBS - Harvard Medical School",
            "MD Cardiology - Johns Hopkins",
         ],
         consultationFee: "$150",
      },
      {
         id: "2",
         name: "Dr. Michael Chen",
         specialization: "Neurology",
         department: "neurology",
         experience: 8,
         rating: 4.8,
         totalReviews: 89,
         image: "/api/placeholder/150/150",
         location: "Neurology Center",
         availability: "Mon-Thu, 8:00 AM - 4:00 PM",
         phone: "+1 (555) 123-4002",
         email: "michael.chen@medica.com",
         description:
            "Specialist in neurological disorders with focus on stroke treatment and prevention.",
         languages: ["English", "Mandarin"],
         education: ["MBBS - Stanford University", "MD Neurology - UCLA"],
         consultationFee: "$180",
      },
      {
         id: "3",
         name: "Dr. Emily Rodriguez",
         specialization: "Pediatrics",
         department: "pediatrics",
         experience: 6,
         rating: 4.9,
         totalReviews: 203,
         image: "/api/placeholder/150/150",
         location: "Children's Wing",
         availability: "Mon-Fri, 9:00 AM - 6:00 PM",
         phone: "+1 (555) 123-4003",
         email: "emily.rodriguez@medica.com",
         description:
            "Dedicated pediatrician providing comprehensive care for children from birth to adolescence.",
         languages: ["English", "Spanish"],
         education: [
            "MBBS - Yale University",
            "MD Pediatrics - Boston Children's Hospital",
         ],
         consultationFee: "$120",
      },
      {
         id: "4",
         name: "Dr. David Kim",
         specialization: "Ophthalmology",
         department: "ophthalmology",
         experience: 15,
         rating: 4.7,
         totalReviews: 134,
         image: "/api/placeholder/150/150",
         location: "Eye Care Center",
         availability: "Tue-Sat, 8:00 AM - 5:00 PM",
         phone: "+1 (555) 123-4004",
         email: "david.kim@medica.com",
         description:
            "Expert ophthalmologist specializing in cataract surgery and retinal disorders.",
         languages: ["English", "Korean"],
         education: [
            "MBBS - Columbia University",
            "MD Ophthalmology - Wills Eye Hospital",
         ],
         consultationFee: "$160",
      },
      {
         id: "5",
         name: "Dr. Lisa Thompson",
         specialization: "Orthopedics",
         department: "orthopedics",
         experience: 10,
         rating: 4.8,
         totalReviews: 98,
         image: "/api/placeholder/150/150",
         location: "Orthopedic Center",
         availability: "Mon-Fri, 7:00 AM - 3:00 PM",
         phone: "+1 (555) 123-4005",
         email: "lisa.thompson@medica.com",
         description:
            "Orthopedic surgeon with expertise in joint replacement and sports medicine.",
         languages: ["English"],
         education: ["MBBS - Duke University", "MD Orthopedics - Mayo Clinic"],
         consultationFee: "$200",
      },
      {
         id: "6",
         name: "Dr. James Wilson",
         specialization: "Cardiology",
         department: "cardiology",
         experience: 18,
         rating: 4.9,
         totalReviews: 267,
         image: "/api/placeholder/150/150",
         location: "Main Hospital",
         availability: "Mon-Thu, 8:00 AM - 4:00 PM",
         phone: "+1 (555) 123-4006",
         email: "james.wilson@medica.com",
         description:
            "Senior cardiologist with extensive experience in complex cardiac procedures.",
         languages: ["English", "French"],
         education: [
            "MBBS - Oxford University",
            "MD Cardiology - Cleveland Clinic",
         ],
         consultationFee: "$180",
      },
   ];

   const filteredDoctors = useMemo(() => {
      return doctors.filter((doctor) => {
         const matchesSearch =
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization
               .toLowerCase()
               .includes(searchTerm.toLowerCase());
         const matchesDepartment =
            !selectedDepartment || doctor.department === selectedDepartment;
         const matchesRating =
            !selectedRating || doctor.rating >= parseFloat(selectedRating);

         return matchesSearch && matchesDepartment && matchesRating;
      });
   }, [searchTerm, selectedDepartment, selectedRating]);

   const renderStars = (rating: number) => {
      return Array.from({ length: 5 }, (_, i) => (
         <Star
            key={i}
            className={`h-4 w-4 ${
               i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
            }`}
         />
      ));
   };

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <PublicHeader />

         <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <div className="text-center">
                  <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
                     Our Doctors
                  </h1>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                     Meet our team of experienced and qualified healthcare
                     professionals dedicated to providing the best care.
                  </p>
               </div>
            </div>
         </div>

         {/* Search and Filters */}
         <section className="py-8 bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="md:col-span-2">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                           type="text"
                           placeholder="Search doctors by name or specialization..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="input pl-10 w-full"
                        />
                     </div>
                  </div>

                  {/* Department Filter */}
                  <div>
                     <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="input"
                     >
                        <option value="">All Departments</option>
                        {departments.slice(1).map((dept) => (
                           <option
                              key={dept.id}
                              value={dept.id}
                           >
                              {dept.name}
                           </option>
                        ))}
                     </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                     <select
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                        className="input"
                     >
                        <option value="">All Ratings</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4.0">4.0+ Stars</option>
                        <option value="3.5">3.5+ Stars</option>
                     </select>
                  </div>
               </div>
            </div>
         </section>

         {/* Doctors Grid */}
         <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="mb-8">
                  <p className="text-gray-600">
                     Showing {filteredDoctors.length} of {doctors.length}{" "}
                     doctors
                  </p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredDoctors.map((doctor) => (
                     <div
                        key={doctor.id}
                        className="card hover:shadow-lg transition-shadow duration-300"
                     >
                        <div className="card-body">
                           <div className="flex items-start space-x-6">
                              {/* Doctor Image */}
                              <div className="flex-shrink-0">
                                 <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-24 h-24 rounded-full object-cover"
                                 />
                              </div>

                              {/* Doctor Info */}
                              <div className="flex-1 min-w-0">
                                 <div className="flex items-start justify-between mb-2">
                                    <div>
                                       <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                          {doctor.name}
                                       </h3>
                                       <p className="text-primary-600 font-medium">
                                          {doctor.specialization}
                                       </p>
                                    </div>
                                    <div className="text-right">
                                       <div className="flex items-center mb-1">
                                          {renderStars(doctor.rating)}
                                          <span className="ml-1 text-sm text-gray-600">
                                             ({doctor.totalReviews})
                                          </span>
                                       </div>
                                       <p className="text-lg font-semibold text-primary-600">
                                          {doctor.consultationFee}
                                       </p>
                                    </div>
                                 </div>

                                 <p className="text-gray-600 text-sm mb-4">
                                    {doctor.description}
                                 </p>

                                 {/* Details */}
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center text-gray-600">
                                       <MapPin className="h-4 w-4 mr-2" />
                                       {doctor.location}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                       <Clock className="h-4 w-4 mr-2" />
                                       {doctor.availability}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                       <Phone className="h-4 w-4 mr-2" />
                                       {doctor.phone}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                       <Mail className="h-4 w-4 mr-2" />
                                       {doctor.email}
                                    </div>
                                 </div>

                                 {/* Languages */}
                                 <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-1">
                                       Languages:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                       {doctor.languages.map(
                                          (language, index) => (
                                             <span
                                                key={index}
                                                className="badge badge-gray text-xs"
                                             >
                                                {language}
                                             </span>
                                          )
                                       )}
                                    </div>
                                 </div>

                                 {/* Action Buttons */}
                                 <div className="flex gap-3 mt-6">
                                    <Link
                                       href={`/appointments?doctor=${doctor.id}`}
                                    >
                                       <button className="btn btn-primary">
                                          Book Appointment
                                          <Calendar className="ml-2 h-4 w-4" />
                                       </button>
                                    </Link>
                                    <Link href={`/doctors/${doctor.id}`}>
                                       <button className="btn btn-outline">
                                          View Profile
                                          <ArrowRight className="ml-2 h-4 w-4" />
                                       </button>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {filteredDoctors.length === 0 && (
                  <div className="text-center py-12">
                     <p className="text-gray-600 text-lg">
                        No doctors found matching your criteria.
                     </p>
                     <button
                        onClick={() => {
                           setSearchTerm("");
                           setSelectedDepartment("");
                           setSelectedRating("");
                        }}
                        className="btn btn-primary mt-4"
                     >
                        Clear Filters
                     </button>
                  </div>
               )}
            </div>
         </section>

         {/* Footer */}
         <PublicFooter />
      </div>
   );
};

export default DoctorsPage;
