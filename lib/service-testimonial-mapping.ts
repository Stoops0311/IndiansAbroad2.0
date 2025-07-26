/**
 * Service to Testimonial Mapping Utility
 * Maps service IDs to their corresponding testimonial service values for filtering
 */

export interface ServiceTestimonialMapping {
  serviceId: string;
  testimonialServiceValues: string[];
  displayName: string;
}

export const serviceTestimonialMappings: ServiceTestimonialMapping[] = [
  {
    serviceId: "global-career-evaluator",
    testimonialServiceValues: ["Global Career Evaluator"],
    displayName: "Global Career Evaluator"
  },
  {
    serviceId: "pr-canada", 
    testimonialServiceValues: ["Permanent Residency Canada", "PR Consulting"],
    displayName: "Canada PR"
  },
  {
    serviceId: "pr-australia",
    testimonialServiceValues: ["Permanent Residency Australia", "PR Consulting"], 
    displayName: "Australia PR"
  },
  {
    serviceId: "work-visa",
    testimonialServiceValues: ["Work Visa"],
    displayName: "Work Visa"
  },
  {
    serviceId: "german-opportunity-card",
    testimonialServiceValues: ["German Opportunity Card"],
    displayName: "German Opportunity Card"
  },
  {
    serviceId: "study-abroad", 
    testimonialServiceValues: ["Study Abroad"],
    displayName: "Study Abroad"
  },
  {
    serviceId: "language-training",
    testimonialServiceValues: ["Language Training"],
    displayName: "Language Training"
  }
];

/**
 * Get testimonial service values for a given service ID
 */
export function getTestimonialServiceValues(serviceId: string): string[] {
  const mapping = serviceTestimonialMappings.find(m => m.serviceId === serviceId);
  return mapping?.testimonialServiceValues || [];
}

/**
 * Get display name for a service ID
 */
export function getServiceDisplayName(serviceId: string): string {
  const mapping = serviceTestimonialMappings.find(m => m.serviceId === serviceId);
  return mapping?.displayName || serviceId;
}

/**
 * Check if a testimonial service value matches any service
 */
export function findMatchingServiceId(testimonialService: string): string | null {
  const mapping = serviceTestimonialMappings.find(m => 
    m.testimonialServiceValues.some(value => 
      value.toLowerCase() === testimonialService.toLowerCase()
    )
  );
  return mapping?.serviceId || null;
}

/**
 * Get all testimonial service values (useful for validation)
 */
export function getAllTestimonialServiceValues(): string[] {
  return serviceTestimonialMappings.flatMap(m => m.testimonialServiceValues);
}