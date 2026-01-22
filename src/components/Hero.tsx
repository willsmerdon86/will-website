"use client";

import Image from "next/image";
import { ArrowDown, MapPin, Briefcase } from "lucide-react";

export default function Hero(): JSX.Element {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-teal-100/40 to-emerald-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100/40 to-cyan-100/40 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Profile photo */}
        <div className="mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
            <Image
              src="/will-smerdon.png"
              alt="Will Smerdon"
              fill
              className="rounded-full object-cover shadow-lg ring-4 ring-white"
              priority
            />
          </div>
        </div>

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200 shadow-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          <span className="text-sm text-neutral-600">Building at Cursor</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="gradient-text">Will Smerdon</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-neutral-600 mb-6 max-w-2xl mx-auto leading-relaxed">
          Solving complex problems at the intersection of{" "}
          <span className="text-neutral-900 font-medium">accounting</span>,{" "}
          <span className="text-neutral-900 font-medium">operations</span>, and{" "}
          <span className="text-neutral-900 font-medium">technology</span>
        </p>

        {/* Philosophy */}
        <p className="text-base text-neutral-500 mb-10 max-w-3xl mx-auto leading-relaxed">
          I lead revenue accounting and operations functions that connect people, processes, 
          and systems to drive scale and reliability. My approach blends accounting depth with 
          a builder's mindset—using automation, data, and cross-functional alignment to simplify 
          complexity and create leverage for the business.
        </p>

        {/* Quick info */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-neutral-500">
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>Seattle, WA</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={18} />
            <span>14+ Years Experience</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
          <a
            href="#about"
            className="px-8 py-3 bg-white text-neutral-900 rounded-full font-medium border border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
