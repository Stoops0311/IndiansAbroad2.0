export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Indians Abroad",
  "url": "https://www.indiansabroad.in",
  "logo": "https://www.indiansabroad.in/Logo.png",
  "description": "Expert immigration consultants helping Indians work and settle abroad with visa services, study abroad guidance, and PR applications.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressLocality": "India"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9999999999",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.facebook.com/indiansabroad",
    "https://www.linkedin.com/company/indiansabroad",
    "https://www.instagram.com/indiansabroad"
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "India"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "MARA",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Migration Agents Registration Authority"
      }
    },
    {
      "@type": "EducationalOccupationalCredential", 
      "credentialCategory": "RCIC",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Regulated Canadian Immigration Consultant"
      }
    }
  ]
};

export const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Immigration and Visa Consulting Services",
  "description": "Comprehensive immigration consulting services including visa applications, PR processing, and study abroad guidance.",
  "provider": {
    "@type": "Organization",
    "name": "Indians Abroad"
  },
  "areaServed": ["Canada", "Australia", "USA", "Germany", "UK"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Immigration Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Canada PR Visa",
          "description": "Permanent Residency application assistance for Canada"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Australia PR Visa",
          "description": "Permanent Residency application assistance for Australia"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Study Abroad Consultation",
          "description": "University admissions and student visa guidance"
        }
      }
    ]
  }
};