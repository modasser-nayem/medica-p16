import { Users, Heart, Clock, Stethoscope } from "lucide-react";

export const StatsSection = () => {
   const stats = [
      { number: "50+", label: "Expert Doctors", icon: Users },
      { number: "10K+", label: "Happy Patients", icon: Heart },
      { number: "24/7", label: "Emergency Care", icon: Clock },
      { number: "15+", label: "Specialties", icon: Stethoscope },
   ];

   return (
      <section className="py-16 bg-white">
         <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                     <div
                        key={index}
                        className="text-center group"
                     >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors duration-200">
                           <Icon className="w-8 h-8 text-primary-600" />
                        </div>
                        <div className="text-3xl lg:text-4xl font-display font-bold text-primary-600 mb-2">
                           {stat.number}
                        </div>
                        <div className="text-gray-600 font-medium">
                           {stat.label}
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
};
