import { Calendar, Video, TestTube, Shield, Heart, Users } from "lucide-react";

export const FeaturesSection = () => {
   const features = [
      {
         icon: Calendar,
         title: "Smart Appointment Booking",
         description:
            "Book appointments with your preferred doctors in just a few clicks. Get instant confirmations and reminders.",
         color: "primary",
         gradient: "from-primary-500 to-primary-600",
      },
      {
         icon: Video,
         title: "Virtual Consultations",
         description:
            "Connect with doctors via secure video, voice, or chat consultations from the comfort of your home.",
         color: "success",
         gradient: "from-success-500 to-success-600",
      },
      {
         icon: TestTube,
         title: "Digital Lab Services",
         description:
            "Request lab tests online and receive results digitally. Track your health metrics over time.",
         color: "secondary",
         gradient: "from-secondary-500 to-secondary-600",
      },
      {
         icon: Shield,
         title: "Secure Health Records",
         description:
            "Your medical records are encrypted and secure. Access your complete health history anytime.",
         color: "warning",
         gradient: "from-warning-500 to-warning-600",
      },
      {
         icon: Heart,
         title: "Personalized Care",
         description:
            "Get personalized treatment plans and health recommendations based on your medical history.",
         color: "error",
         gradient: "from-error-500 to-error-600",
      },
      {
         icon: Users,
         title: "Expert Care Team",
         description:
            "Access to a network of qualified doctors, specialists, and healthcare professionals.",
         color: "primary",
         gradient: "from-primary-500 to-primary-600",
      },
   ];

   return (
      <section
         id="features"
         className="py-20 bg-gray-50"
      >
         <div className="container">
            <div className="text-center mb-16">
               <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                  Comprehensive Healthcare Services
               </h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We provide a full range of medical services to meet all your
                  healthcare needs with cutting-edge technology and
                  compassionate care.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                     <div
                        key={index}
                        className="group bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-6 border-2 border-t-4 border-t-primary-600 border-gray-100 hover:border-t-primary-600 hover:border-primary-200"
                     >
                        <div
                           className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-200`}
                        >
                           <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                           {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                           {feature.description}
                        </p>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
};
