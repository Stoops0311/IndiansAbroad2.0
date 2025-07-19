"use client";

import CoreServices from "@/components/CoreServices";

export default function Services() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[120px]">
        <CoreServices />
      </div>
    </section>
  );
}