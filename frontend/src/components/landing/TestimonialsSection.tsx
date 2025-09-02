import { PROFILE_IMAGE } from "@/constant";
import { Star } from "lucide-react";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const TestimonialsSection = () => {
   const testimonials = [
      {
         name: "Sarah Johnson",
         role: "Patient",
         content:
            "The online consultation feature saved me so much time. The doctor was professional and the prescription was ready immediately.",
         rating: 5,
         avatar: PROFILE_IMAGE(1),
      },
      {
         name: "Dr. Michael Chen",
         role: "Cardiologist",
         content:
            "This platform has streamlined my practice significantly. The patient management tools are intuitive and efficient.",
         rating: 5,
         avatar: PROFILE_IMAGE(2, "women"),
      },
      {
         name: "Emily Rodriguez",
         role: "Patient",
         content:
            "Booking appointments is so easy now. I love getting reminders and being able to access my medical records anytime.",
         rating: 5,
         avatar: PROFILE_IMAGE(3),
      },
      {
         name: "Smith Toile",
         avatar: PROFILE_IMAGE(4, "women"),
         rating: 4,
         role: "Product Manager",
         content:
            "The UI is clean, intuitive, and makes my work so much easier! The UI is clean, intuitive, and makes my work so much easier!",
      },
      {
         name: "Michael Brown",
         avatar: PROFILE_IMAGE(5),
         rating: 5,
         role: "UX Designer",
         content:
            "A fantastic experience — it feels built for real users, not just developers. The UI is clean, intuitive, and makes my work so much easier!",
      },
   ];

   return (
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
         <div className="container">
            <div className="text-center mb-16">
               <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                  What Our Users Say
               </h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Don't just take our word for it. Here's what patients and
                  doctors are saying about our platform.
               </p>
            </div>

            <div className="px-10">
               <Carousel>
                  <CarouselContent className="-ml-2">
                     {testimonials.map(
                        ({ name, avatar, rating, role, content }, i) => (
                           <CarouselItem
                              key={i}
                              className="pl-2 md:basis-1/2 lg:basis-1/3"
                           >
                              <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
                                 <CardHeader className="pb-2">
                                    <div className="flex space-x-1">
                                       {[...Array(rating)].map((_, idx) => (
                                          <Star
                                             key={idx}
                                             className="w-5 h-5 text-yellow-400 fill-yellow-400"
                                          />
                                       ))}
                                    </div>
                                 </CardHeader>
                                 <CardContent>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                       “{content}”
                                    </p>
                                    <div className="flex items-center">
                                       <img
                                          src={avatar}
                                          alt={name}
                                          className="w-12 h-12 rounded-full mr-4"
                                       />
                                       <div>
                                          <div className="font-semibold text-gray-900">
                                             {name}
                                          </div>
                                          <div className="text-sm text-gray-600">
                                             {role}
                                          </div>
                                       </div>
                                    </div>
                                 </CardContent>
                              </Card>
                           </CarouselItem>
                        )
                     )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
               </Carousel>
            </div>
         </div>
      </section>
   );
};
