import { Star } from "lucide-react";

export const TestimonialsSection = () => {
    const testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'Patient',
        content: 'The online consultation feature saved me so much time. The doctor was professional and the prescription was ready immediately.',
        rating: 5,
        avatar: '/api/placeholder/60/60'
      },
      {
        name: 'Dr. Michael Chen',
        role: 'Cardiologist',
        content: 'This platform has streamlined my practice significantly. The patient management tools are intuitive and efficient.',
        rating: 5,
        avatar: '/api/placeholder/60/60'
      },
      {
        name: 'Emily Rodriguez',
        role: 'Patient',
        content: 'Booking appointments is so easy now. I love getting reminders and being able to access my medical records anytime.',
        rating: 5,
        avatar: '/api/placeholder/60/60'
      }
    ];
  
    return (
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what patients and doctors are saying about our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-soft p-6 hover:shadow-medium transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };