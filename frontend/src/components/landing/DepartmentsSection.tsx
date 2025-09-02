import { Heart, Users, Clock } from "lucide-react";

export const DepartmentsSection = () => {
    const departments = [
      { name: 'Cardiology', icon: Heart, description: 'Heart and cardiovascular care' },
      { name: 'Neurology', icon: Users, description: 'Brain and nervous system' },
      { name: 'Orthopedics', icon: Users, description: 'Bones and joints' },
      { name: 'Pediatrics', icon: Heart, description: 'Children\'s healthcare' },
      { name: 'Dermatology', icon: Users, description: 'Skin conditions' },
      { name: 'Oncology', icon: Heart, description: 'Cancer treatment' },
      { name: 'Surgery', icon: Users, description: 'Surgical procedures' },
      { name: 'Emergency', icon: Clock, description: '24/7 emergency care' },
    ];
  
    return (
      <section id="departments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              Our Medical Departments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access specialized care across multiple medical departments with our team of expert healthcare professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 hover:shadow-soft transition-all duration-200 cursor-pointer"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4 group-hover:bg-primary-200 transition-colors duration-200">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {dept.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };