export interface University {
  name: string;
  ranking: number;
  image?: string;
}

export interface Course {
  field: string;
  courses: string[];
}

export interface SalaryData {
  field: string;
  bachelors: string;
  masters: string;
}

export interface CostBreakdown {
  accommodation: string;
  food: string;
  lifestyle: string;
  total: string;
  partTimeEarning: string;
  balance: string;
}

export interface CountryData {
  id: string;
  name: string;
  flag: string;
  overview: {
    description: string;
    capital?: string;
    population?: string;
    keyFacts: string[];
  };
  education: {
    description: string;
    universities: number;
    programs: number;
    internationalStudents: string;
    globalRanking: string;
    facts: string[];
  };
  topUniversities: University[];
  topCourses: Course[];
  placement: {
    averageSalary: string;
    entryLevel: string;
    experienced: string;
    salaryData: SalaryData[];
  };
  cost: {
    roi: string;
    costBreakdown: CostBreakdown;
  };
  lifestyle: {
    fullTimeSalary: string;
    partTimeSalary: string;
    workPermission: string;
    savings: string;
    description: string;
    benefits: string[];
  };
  citizenship: {
    description: string;
    requirements?: string[];
    processingTime?: string;
  };
}

export const studyAbroadCountries: CountryData[] = [
  {
    id: "usa",
    name: "USA",
    flag: "🇺🇸",
    overview: {
      description: "USA is the fourth largest country in the world with a population of around 33 million. Moreover, USA is the second largest country in North America. The capital of USA is Washington.\n\nIt is one of the most industrialized and a developed countries of the world. Advances in the past hundred years have established America as a world leader economically, militarily and technologically. The USA's important exports include petroleum products, aircrafts, vehicle parts and medical equipment, and the country's big imports include cars, industrial machinery, computers and crude oil.",
      capital: "Washington",
      population: "33 million",
      keyFacts: [
        "World leader in technology and innovation",
        "Major exports: petroleum products, aircrafts, vehicle parts",
        "Top destination for international students"
      ]
    },
    education: {
      description: "Education in USA is generally funded and managed by the Federal Governments. States contribute a total of $357.0 billion to K-12 public education or $7,058 per student. Majorly there are 4 types of institutes in USA: Public universities, Community Colleges, Private Colleges and research Universities.",
      universities: 1626,
      programs: 20000,
      internationalStudents: "1 million",
      globalRanking: "50+ colleges in top 500",
      facts: [
        "More than 1626 public and private universities",
        "Offers more than 20,000 programs covering all fields",
        "Hosts 1 million international students annually",
        "Voted as top destination to study abroad"
      ]
    },
    topUniversities: [
      { name: "Massachusetts Institute of Technology (MIT)", ranking: 1, image: "/universities/MIT.webp" },
      { name: "Stanford University", ranking: 2, image: "/universities/Stanford University.webp" },
      { name: "Harvard University", ranking: 5, image: "/universities/Harvard University.webp" },
      { name: "California Institute of Technology (Caltech)", ranking: 6, image: "/universities/California Institute of Technology.jpeg" },
      { name: "University of Chicago", ranking: 10, image: "/universities/University of Chicago.jpg" },
      { name: "University of Pennsylvania", ranking: 13, image: "/universities/University of Pennsylvania.webp" },
      { name: "Princeton University", ranking: 16, image: "/universities/Princeton University.jpg" },
      { name: "Yale University", ranking: 18, image: "/universities/Yale University.avif" },
      { name: "Cornell University", ranking: 20, image: "/universities/Cornell University.jpeg" },
      { name: "Columbia University", ranking: 22, image: "/universities/Columbia University.jpeg" }
    ],
    topCourses: [
      {
        field: "Business and Finance",
        courses: ["Finance", "Business Administration", "Economics", "Supply Chain Management"]
      },
      {
        field: "Computer Science and IT",
        courses: ["Data Science", "Project Management", "Artificial Intelligence", "Cloud Computing"]
      },
      {
        field: "Engineering",
        courses: ["Chemical Engineering", "Software Engineering", "Electrical Engineering"]
      },
      {
        field: "Health and Medicine",
        courses: ["Pharmacy", "Nursing and Paramedical", "Health Studies", "Master of Surgery (CM)"]
      },
      {
        field: "Media and Journalism",
        courses: ["Journalism", "Communication Studies", "Advertising and Marketing", "Contemporary Journalism"]
      }
    ],
    placement: {
      averageSalary: "$54,132",
      entryLevel: "$40,153",
      experienced: "$73,564",
      salaryData: [
        { field: "Business and Finance", bachelors: "$ 61,289 (₹48 lakhs)", masters: "$ 68,928 (₹56 lakhs)" },
        { field: "Computer Science and IT", bachelors: "$63,000 (₹51.6 lakhs)", masters: "$118,000 (₹96 lakhs)" },
        { field: "Engineering", bachelors: "$68,000 (₹55 lakhs)", masters: "$100,000 (₹81 lakhs)" },
        { field: "Health and Medicine", bachelors: "$63,000 (₹51 lakhs)", masters: "$130,000 (₹1.2 crore)" },
        { field: "Media and Journalism", bachelors: "$32,000 (₹26 lakhs)", masters: "$57,000 (₹46 lakhs)" }
      ]
    },
    cost: {
      roi: "12 months (compared to 6 years in India)",
      costBreakdown: {
        accommodation: "₹66,000",
        food: "₹20,000",
        lifestyle: "₹25,000",
        total: "₹1,11,000",
        partTimeEarning: "₹1,25,000",
        balance: "₹14,000"
      }
    },
    lifestyle: {
      fullTimeSalary: "$ 73,892 to 241,659 per year (59 lacs per year)",
      partTimeSalary: "$13 per hour ($350 per week - 28,000 rs per week)",
      workPermission: "20 hours per week during studies, 35 hours during vacation",
      savings: "₹50,000 per month",
      description: "Ranked the 4th best country in the world to settle down - A peaceful life - safe and secure for family, zero crime, racism and political fiascos. It also offers an affordable living with an economically and politically stable economy.",
      benefits: [
        "Plethora of employment opportunities",
        "Excellent healthcare system - Nominal or free public medical care",
        "World class education system - Free public schooling",
        "Vibrant country with 4 different seasons",
        "Ability to afford house, cars, exotic holidays within few years"
      ]
    },
    citizenship: {
      description: "The United States has a well defined immigration process that attracts thousands of applications every year. Immigration has been a major source of population growth and cultural change throughout much of the history of the United States.",
      requirements: [
        "Petition must be authorized by USCIS",
        "Non-immigrant visa application submission",
        "Processing time varies for Indian applicants"
      ]
    }
  },
  {
    id: "uk",
    name: "UK",
    flag: "🇬🇧",
    overview: {
      description: "UK is one of the largest countries in the world with a population of around 63 million. The capital of UK is London which is the largest city in England.\n\nUK is one of the most industrialized and developed countries of the world. The top exports of United Kingdom are Cars, Packaged Medicaments, Gas Turbines, Gold, and Crude Petroleum.",
      capital: "London",
      population: "63 million",
      keyFacts: [
        "Major exports: Cars, Packaged Medicaments, Gas Turbines",
        "London is the largest city in England",
        "One of the most industrialized countries"
      ]
    },
    education: {
      description: "Education in UK generally includes two main elements of public spending on higher education – direct funding through the funding councils for teaching and research and student loans for maintenance and fees.",
      universities: 130,
      programs: 10000,
      internationalStudents: "50 thousand",
      globalRanking: "45+ colleges in top 500",
      facts: [
        "More than 130 public and private universities",
        "Offers more than 10,000 programs covering all fields",
        "Hosts 50,000+ international students annually",
        "One of the top destinations to study abroad"
      ]
    },
    topUniversities: [
      { name: "University of Cambridge", ranking: 2, image: "/universities/University of Cambridge.jpeg" },
      { name: "University of Oxford", ranking: 4, image: "/universities/University of Oxford.webp" },
      { name: "Imperial College London", ranking: 6, image: "/universities/Imperial College London.jpg" },
      { name: "UCL", ranking: 8, image: "/universities/UCL.jpeg" },
      { name: "The University of Edinburgh", ranking: 15, image: "/universities/The University of Edinburgh.jpeg" },
      { name: "The University of Manchester", ranking: 28, image: "/universities/The University of Manchester.jpg" },
      { name: "King's College London", ranking: 37, image: "/universities/King's College London.png" },
      { name: "The London School of Economics and Political Science (LSE)", ranking: 56, image: "/universities/The London School of Economics and Political Science.jpeg" },
      { name: "University of Bristol", ranking: 61, image: "/universities/University of Bristol.jpg" }
    ],
    topCourses: [
      {
        field: "Business and Finance",
        courses: ["Finance", "Business Administration", "Economics", "Supply Chain Management"]
      },
      {
        field: "Computer Science and IT",
        courses: ["Data Science", "Project Management", "Artificial Intelligence", "Cloud Computing"]
      },
      {
        field: "Engineering",
        courses: ["Chemical Engineering", "Software Engineering", "Electrical Engineering"]
      },
      {
        field: "Health and Medicine",
        courses: ["Pharmacy", "Nursing and Paramedical", "Health Studies", "Master of Surgery (CM)"]
      },
      {
        field: "Media and Journalism",
        courses: ["Journalism", "Communication Studies", "Advertising and Marketing", "Contemporary Journalism"]
      }
    ],
    placement: {
      averageSalary: "£45,380",
      entryLevel: "$32,153",
      experienced: "$72,564",
      salaryData: [
        { field: "Business and Finance", bachelors: "$ 39,289 (₹32 lakhs)", masters: "$ 50,000 (₹40 lakhs)" },
        { field: "Computer Science and IT", bachelors: "$50,000 (₹40.99 lakhs)", masters: "$102,397 (₹84 lakhs)" },
        { field: "Engineering", bachelors: "$48,000 (₹39.3 lakhs)", masters: "$59,000 (₹48 lakhs)" },
        { field: "Health and Medicine", bachelors: "$53,000 (₹43 lakhs)", masters: "$ 121,300 (₹1.3 crore)" },
        { field: "Media and Journalism", bachelors: "$ 43,000 (₹35 lakhs)", masters: "$52,000 (₹55 lakhs)" }
      ]
    },
    cost: {
      roi: "12 months (compared to 4 years in India)",
      costBreakdown: {
        accommodation: "₹49,000",
        food: "₹20,000",
        lifestyle: "₹20,000",
        total: "₹89,000",
        partTimeEarning: "₹1,00,000",
        balance: "₹11,000"
      }
    },
    lifestyle: {
      fullTimeSalary: "$ 43,383 to $131,667 per year (45 lacs per year)",
      partTimeSalary: "$12.5 per hour ($300 per week - 24,594 rs per week)",
      workPermission: "18 hours per week during studies, 35 hours during vacation",
      savings: "₹45,000 per month",
      description: "Ranked as one of the best countries in the world to settle down - A peaceful life - safe and secure for family, zero crime, racism and political fiascos. It also offers an affordable living with an economically and politically stable economy.",
      benefits: [
        "Plethora of employment opportunities",
        "Excellent healthcare system - Free public medical care",
        "World class education system",
        "4 different seasons to experience",
        "Ability to afford various amenities within few years"
      ]
    },
    citizenship: {
      description: "The UK draws businesspeople from all over the world since it has one of the greatest financial centres. British citizenship gives you the right to live and work in the UK permanently, without any immigration restrictions.",
      requirements: [
        "Fulfill specific conditions based on circumstances",
        "Easier if spouse/partner is British citizen",
        "Different requirements for EU/EEA/Swiss citizens"
      ]
    }
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    overview: {
      description: "Germany is one of the largest countries in the world with a population of around 83 million. Germany is a great place to study abroad due to a number of reasons, including its higher degree and level of living, affordable cost of living, and attractive culture and history. The capital of Germany is Berlin.\n\nGermany shares borders with nine other countries. Denmark, Poland, the Czech Republic, Austria, Switzerland, France, Belgium, Luxembourg and the Netherlands. Every year, tens of thousands of foreign students go to Germany, creating a thriving international student community.",
      capital: "Berlin",
      population: "83 million",
      keyFacts: [
        "Borders nine other countries",
        "Attractive culture and history",
        "Affordable cost of living",
        "Thriving international student community"
      ]
    },
    education: {
      description: "Higher education in Germany is mostly funded by the government and that is the reason why there are almost zero or low tuition fees for both domestic and international students in Germany. The German higher education system is governed by the rules and regulations of the Grundgesetz.",
      universities: 400,
      programs: 15000,
      internationalStudents: "400,000",
      globalRanking: "30+ colleges in top 500",
      facts: [
        "400 public universities attended by 95% of students",
        "State-funded institutions with minimal fees",
        "120 private institutions available",
        "One of the top 5 destinations to study abroad"
      ]
    },
    topUniversities: [
      { name: "Technische Universität München", ranking: 50, image: "/universities/Technische Universität München.jpeg" },
      { name: "Ludwig-Maximilians-Universität München", ranking: 63, image: "/universities/Ludwig-Maximilians-Universität München.jpeg" },
      { name: "Ruprecht-Karls-Universität Heidelberg", ranking: 64, image: "/universities/Ruprecht-Karls-Universität Heidelberg.jpeg" },
      { name: "Humboldt-Universität zu Berlin", ranking: 117, image: "/universities/Humboldt-Universität zu Berlin.jpeg" },
      { name: "Freie Universität Berlin", ranking: 130, image: "/universities/Freie Universität Berlin.jpg" },
      { name: "KIT, Karlsruher Institut für Technologie", ranking: 131, image: "/universities/KIT, Karlsruher Institut für Technologie.jpeg" },
      { name: "Rheinisch-Westfälische Technische Hochschule Aachen", ranking: 145, image: "/universities/Rheinisch-Westfälische Technische Hochschule Aachen.jpeg" },
      { name: "Technische Universität Berlin", ranking: 148, image: "/universities/Technische Universität Berlin.jpeg" },
      { name: "Technische Universität Dresden", ranking: 173, image: "/universities/Technische Universität Dresden.jpeg" },
      { name: "Eberhard Karls Universität Tübingen", ranking: 175, image: "/universities/Eberhard Karls Universität Tübingen.jpeg" }
    ],
    topCourses: [
      {
        field: "Business and Finance",
        courses: ["Finance", "Business Administration", "Economics", "Supply Chain Management"]
      },
      {
        field: "Computer Science and IT",
        courses: ["Data Science", "Project Management", "Artificial Intelligence", "Cloud Computing"]
      },
      {
        field: "Engineering",
        courses: ["Chemical Engineering", "Software Engineering", "Electrical Engineering"]
      },
      {
        field: "Health and Medicine",
        courses: ["Pharmacy", "Nursing and Paramedical", "Health Studies", "Master of Surgery (CM)"]
      },
      {
        field: "Creative arts, Humanities and Arts",
        courses: ["Humanities", "Fine Arts", "Political Science", "Media and Journalism"]
      }
    ],
    placement: {
      averageSalary: "$44,000",
      entryLevel: "$50,153",
      experienced: "$80,000",
      salaryData: [
        { field: "Business and Finance", bachelors: "$ 54,000 (₹44 lakhs)", masters: "$ 61,928 (₹50 lakhs)" },
        { field: "Computer Science and IT", bachelors: "$63,000 (₹51.6 lakhs)", masters: "$118,000 (₹96 lakhs)" },
        { field: "Engineering", bachelors: "$50,000 (₹40 lakhs)", masters: "$73,000 (₹60 lakhs)" },
        { field: "Health and Medicine", bachelors: "$45,000 (₹36 lakhs)", masters: "$ 110,000 (₹1.02 crore)" },
        { field: "Creative arts, Humanities and Arts", bachelors: "$ 32,000 (₹26 lakhs)", masters: "$ 43,000 (₹35 lakhs)" }
      ]
    },
    cost: {
      roi: "8 months (compared to 6 years in India)",
      costBreakdown: {
        accommodation: "₹80,000",
        food: "₹13,000",
        lifestyle: "₹20,000",
        total: "₹1,13,000",
        partTimeEarning: "₹1,25,000",
        balance: "₹12,000"
      }
    },
    lifestyle: {
      fullTimeSalary: "$ 73,892 to 241,659 per year (59 lacs per year)",
      partTimeSalary: "$13 per hour ($350 per week - 28,000 rs per week)",
      workPermission: "20 hours per week during studies, 35 hours during vacation",
      savings: "₹45,000 per month",
      description: "Germany is a country rich in history and culture. It also offers an affordable living with an economically and politically stable economy.",
      benefits: [
        "Low Cost of Living compared to other popular destinations",
        "Travel Europe on a Student Visa - visit any Schengen country",
        "Opportunity to Learn a New Language - bilingual employment advantages",
        "Rich history and culture",
        "Economically and politically stable"
      ]
    },
    citizenship: {
      description: "Germany has been ranked as the fifth best nation to relocate to. Its successful economy, educational system, and employment possibilities account for this favorability. Immigration has been a major source of population growth and cultural change throughout much of the history of Germany.",
      requirements: [
        "Demonstrate financial ability to support yourself",
        "Meet specific immigration purpose requirements",
        "Initial finances to cover expenses until salary"
      ],
      processingTime: "Processing time varies for Indian applicants"
    }
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    overview: {
      description: "Canada is the second largest country in the world with an area of 99 lakh square kilometers and a population of around 36 million. Moreover, Canada is the largest country in North America with 10 provinces and 3 territories. The capital of Canada is Ottawa.\n\nIt is one of the most industrialized countries of the world. Northern Canada is known for gas and oil exploration while Eastern Canada is known for agriculture, forestry and fisheries. Canada is a world leader in Aerospace, Pharmaceuticals, Telecommunication and Biotechnology.",
      capital: "Ottawa",
      population: "36 million",
      keyFacts: [
        "Second largest country in the world",
        "10 provinces and 3 territories",
        "World leader in Aerospace, Pharmaceuticals, Telecommunication",
        "Known for gas, oil, agriculture, forestry and fisheries"
      ]
    },
    education: {
      description: "Education in Canada is generally funded and managed by the Provincial Governments of Canada. Majorly there are 3 types of institutes in Canada: Community Colleges, Private Colleges and Universities.",
      universities: 223,
      programs: 15000,
      internationalStudents: "400,000 to 650,000",
      globalRanking: "48 colleges in top 200",
      facts: [
        "223 public and private universities",
        "213 public colleges and institutes",
        "Offers more than 15,000 programs",
        "Education standard among top 5 destinations globally"
      ]
    },
    topUniversities: [
      { name: "McGill University", ranking: 31, image: "/universities/McGill University.jpg" },
      { name: "University of Toronto", ranking: 34, image: "/universities/University of Toronto.jpeg" },
      { name: "University of British Columbia", ranking: 47, image: "/universities/University of British Columbia.jpeg" },
      { name: "University of Alberta", ranking: 110, image: "/universities/University of Alberta.jpeg" },
      { name: "University of Montreal", ranking: 116, image: "/universities/University of Montreal.jpg" },
      { name: "McMaster University", ranking: 152, image: "/universities/McMaster University.jpeg" },
      { name: "University of Waterloo", ranking: 154, image: "/universities/University of Waterloo.jpeg" },
      { name: "Western University", ranking: 172, image: "/universities/Western University.jpeg" },
      { name: "University of Ottawa", ranking: 237, image: "/universities/University of Ottawa.png" },
      { name: "University of Calgary", ranking: 242, image: "/universities/University of Calgary.jpeg" }
    ],
    topCourses: [
      {
        field: "Business and Finance",
        courses: ["Finance", "Business Administration", "Economics", "Supply Chain Management"]
      },
      {
        field: "Computer Science and IT",
        courses: ["Data Science", "Project Management", "Artificial Intelligence", "Cloud Computing"]
      },
      {
        field: "Engineering",
        courses: ["Chemical Engineering", "Software Engineering", "Electrical Engineering"]
      },
      {
        field: "Health and Medicine",
        courses: ["Pharmacy", "Nursing and Paramedical", "Health Studies", "Master of Surgery (CM)"]
      },
      {
        field: "Media and Journalism",
        courses: ["Journalism", "Communication Studies", "Advertising and Marketing", "Contemporary Journalism"]
      }
    ],
    placement: {
      averageSalary: "$50,765 or $26.03 per hour",
      entryLevel: "$39,000",
      experienced: "$73,564",
      salaryData: [
        { field: "Business and Finance", bachelors: "CAD 55,000 (₹24 lakhs)", masters: "CAD 83,000 (₹51 lakhs)" },
        { field: "Computer Science and IT", bachelors: "CAD 90,000 (₹55 lakhs)", masters: "CAD 150,000 (₹92 lakhs)" },
        { field: "Engineering", bachelors: "CAD 50,000 (₹31 lakhs)", masters: "CAD 140,000 (₹86 lakhs)" },
        { field: "Health and Medicine", bachelors: "CAD 46,000 (₹28 lakhs)", masters: "CAD 350,000 (₹2.15 crore)" },
        { field: "Media and Journalism", bachelors: "CAD 34,000 (₹20 lakhs)", masters: "CAD 50,000 (₹30 lakhs)" }
      ]
    },
    cost: {
      roi: "8 months (compared to 6 years for MBA in India)",
      costBreakdown: {
        accommodation: "₹46,000",
        food: "₹10,000",
        lifestyle: "₹20,000",
        total: "₹76,000",
        partTimeEarning: "₹96,000",
        balance: "₹20,000"
      }
    },
    lifestyle: {
      fullTimeSalary: "CAD 54,630 to 350,000 per year (34 lacs per year)",
      partTimeSalary: "15 CAD per hour (300 CAD per week - 18,000 rs per week)",
      workPermission: "20 hours per week during studies, 40 hours during vacation",
      savings: "₹50,000 per month",
      description: "Ranked the 5th best country in the world to settle down - A peaceful life - safe and secure for family, zero crime, racism and political fiascos. It also offers an affordable living with an economically and politically stable economy.",
      benefits: [
        "Plethora of employment opportunities",
        "Excellent healthcare system - Free public medical care",
        "World class education system - Free public schooling",
        "Beautiful country with 4 different seasons",
        "Ability to afford house, car, exotic holidays within a year"
      ]
    },
    citizenship: {
      description: "Canada has the most organized immigration system without any grey area. Canada gives special preference to students and those with work experience after doing a degree from here. After completing 1 year of working in Canada most students apply for the PR process and are able to get PR within 6 months.",
      requirements: [
        "Complete 1 year of work experience in Canada",
        "Apply for PR process after graduation",
        "Special preference for students with Canadian education"
      ],
      processingTime: "PR within 6 months after work experience"
    }
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    overview: {
      description: "Australia is one of the most popular study abroad destinations for international students. With a population of around 25 million, Australia has climbed up the ladder of one of the most sought after study abroad destinations. Australia is known as the Island nation and is known for coral reefs, kangaroos and exquisite wildlife.\n\nAustralia's universities encourage innovation, creativity, and independent thinking. International students studying and living in Australia quickly discover that their education is challenging, enjoyable, and rewarding.",
      population: "25 million",
      keyFacts: [
        "Island nation known for coral reefs and wildlife",
        "Universities encourage innovation and creativity",
        "Education is challenging, enjoyable, and rewarding",
        "Most sought after study abroad destination"
      ]
    },
    education: {
      description: "The Australian Qualifications Framework (AQF), a national framework for regulated qualifications throughout schools, vocational education and training (VET), and higher education, is the foundation of Australia's integrated educational system.",
      universities: 50,
      programs: 22000,
      internationalStudents: "Various",
      globalRanking: "37 universities in top 1000",
      facts: [
        "50+ universities with 37 in top 1000 globally",
        "Offers more than 22,000 courses",
        "Top 3 destination to study abroad",
        "Monthly stipend and up to 75% course fee reduction available"
      ]
    },
    topUniversities: [
      { name: "The Australian National University", ranking: 30, image: "/universities/The Australian National University.jpeg" },
      { name: "The University of Melbourne", ranking: 33, image: "/universities/The University of Melbourne.jpeg" },
      { name: "The University of Sydney", ranking: 41, image: "/universities/The University of Sydney.png" },
      { name: "The University of New South Wales", ranking: 45, image: "/universities/The University of New South Wales.jpeg" },
      { name: "The University of Queensland", ranking: 50, image: "/universities/The University of Queensland.jpeg" }
    ],
    topCourses: [
      {
        field: "Business Analytics",
        courses: ["Accounting & Finance", "Business Administration", "Economics", "Supply Chain Management"]
      },
      {
        field: "Computer Science and IT",
        courses: ["Data Science", "Software Engineering", "Machine Learning", "Artificial Intelligence", "Cloud Computing"]
      },
      {
        field: "Engineering",
        courses: ["Chemical Engineering", "Civil and Structural Engineering", "Electrical Engineering", "Aeronautical Engineering"]
      },
      {
        field: "Health and Medicine",
        courses: ["Pharmacy", "Nursing and Paramedical", "Health Studies", "Master of Surgery (CM)"]
      },
      {
        field: "Social Sciences",
        courses: ["Humanities", "Sociology", "Political Science", "Media and Journalism", "Statistics & operational research"]
      }
    ],
    placement: {
      averageSalary: "$68,420",
      entryLevel: "$56,338",
      experienced: "$102,409",
      salaryData: [
        { field: "Business Analytics", bachelors: "$ 74,000 (₹60 lakhs)", masters: "$ 104,000 (₹85 lakhs)" },
        { field: "Computer Science and IT", bachelors: "$87,000 (₹71.3 lakhs)", masters: "$120,000 (₹98 lakhs)" },
        { field: "Engineering", bachelors: "$86,000 (₹70 lakhs)", masters: "$81,000 (₹66 lakhs)" },
        { field: "Health and Medicine", bachelors: "$95,000 (₹77 lakhs)", masters: "$ 138,000 (₹1.13 crore)" },
        { field: "Social Sciences", bachelors: "$ 46,000 (₹37 lakhs)", masters: "$ 60,000 (₹50 lakhs)" }
      ]
    },
    cost: {
      roi: "12 months (compared to 4 years in India)",
      costBreakdown: {
        accommodation: "₹90,000",
        food: "₹20,000",
        lifestyle: "₹25,000",
        total: "₹1,35,000",
        partTimeEarning: "₹1,50,000",
        balance: "₹15,000"
      }
    },
    lifestyle: {
      fullTimeSalary: "$ 68,892 to $113,659 per year (65 lacs per year)",
      partTimeSalary: "$20 per hour ($450 per week - 36,000 rs per week)",
      workPermission: "20 hours per week during studies, 40 hours during vacation",
      savings: "₹50,000 per month",
      description: "As an international student in Australia, you can expect to live, grow, and learn in a young, friendly, and opportunity-rich country. International students who successfully complete their degrees will soon discover that they are competitive in today's global job market.",
      benefits: [
        "High scholarship opportunities - 300 million+ AUD investment",
        "Excellent student support system",
        "79% of graduates find employment after programs",
        "Stunning natural beauty",
        "Competitive in global job market"
      ]
    },
    citizenship: {
      description: "Australia has been ranked as one of the top nations for Indians to relocate. To apply for citizenship, applicants must have resided in Australia for at least nine out of twelve months prior to applying and have been a permanent resident for at least a year.",
      requirements: [
        "Reside in Australia for 9 out of 12 months before applying",
        "Be a permanent resident for at least one year",
        "Privileges include voting, Parliament eligibility, public service work"
      ],
      processingTime: "Around 19 months for citizenship processing"
    }
  }
];

export type Country = typeof studyAbroadCountries[0];