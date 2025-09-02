"use client";

import React from "react";
import PublicHeader from "@/components/shared/Header";
import PublicFooter from "@/components/shared/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DepartmentsSection } from "@/components/landing/DepartmentsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";

const HomePage = () => {
   return (
      <div className="min-h-screen bg-white">
         <PublicHeader />
         <main>
            <HeroSection />
            <StatsSection />
            <DepartmentsSection />
            <FeaturesSection />
            <TestimonialsSection />
            <CTASection />
         </main>
         <PublicFooter />
      </div>
   );
};

export default HomePage;
