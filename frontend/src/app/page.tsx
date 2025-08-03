"use client";

import React from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { DepartmentsSection } from "@/components/home/DepartmentsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const HomePage = () => {
   return (
      <div className="min-h-screen bg-white">
         <PublicHeader />
         <main>
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <DepartmentsSection />
            <TestimonialsSection />
            <CTASection />
         </main>
         <PublicFooter />
      </div>
   );
};

export default HomePage;
