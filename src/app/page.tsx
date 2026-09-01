
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Cursor } from "@/components/cursor";
import Hero from "@/components/hero";
import { Reveal, Magnetic } from "@/components/motion";
import Link from "next/link";
import ProjectsSection from "@/components/projects/ProjectsSection";
import About from "@/components/about/About";
import ServicesSection from "@/components/services/ServicesSection";

export default async function Home() {


    return (
        <>
            {/* =====================================================
          HEADER
      ====================================================== */}

            <Header />

            {/* =====================================================
          CUSTOM CURSOR
      ====================================================== */}

            <Cursor />

            <main>
                {/* =====================================================
            HERO
        ====================================================== */}

                <Hero />

                {/* =====================================================
            SERVICES
        ====================================================== */}


                {/* =====================================================
            SELECTED WORK
        ====================================================== */}

                <ProjectsSection />
                <About />
                <ServicesSection />



            </main>
        </>
    );
}