"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, MapPin, DollarSign, Calendar, Clock, Users, Star, Send, Mail, Phone, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface JobListing {
  id: string
  title: string
  department: string
  experience: string
  salary: string
  type: "Full-time" | "Internship"
  location: string
  description: string
  responsibilities: string[]
  gradient: string
  icon: React.ReactNode
}


const jobListings: JobListing[] = [
  {
    id: "bde-sales",
    title: "Business Development Executive – Sales",
    department: "Sales",
    experience: "1–2 Years",
    salary: "₹20,000 – ₹25,000",
    type: "Full-time",
    location: "Office",
    description: "Generate qualified leads and drive sales growth through client relationships and strategic pitching.",
    responsibilities: [
      "Generate and follow up on qualified leads",
      "Pitch services to potential clients via calls and meetings",
      "Conduct online demos and presentations",
      "Achieve monthly and quarterly sales targets",
      "Maintain CRM records accurately",
      "Build long-term client relationships",
      "Coordinate with marketing for campaign support",
      "Assist in market research and competitor analysis",
      "Manage post-sale follow-ups and support",
      "Represent the brand professionally at all times"
    ],
    gradient: "from-blue-500/20 to-blue-600/10",
    icon: <Users className="h-6 w-6" />
  },
  {
    id: "bdm-sales",
    title: "Business Development Manager – Sales",
    department: "Sales",
    experience: "3–7 Years",
    salary: "₹50,000 – ₹75,000",
    type: "Full-time",
    location: "Office",
    description: "Lead sales teams and develop strategic initiatives to drive revenue growth across multiple verticals.",
    responsibilities: [
      "Lead and mentor a team of 6–10 sales executives",
      "Develop and implement sales strategies",
      "Drive revenue growth across assigned verticals",
      "Monitor sales pipeline and performance metrics",
      "Conduct team training and performance reviews",
      "Identify and close key business opportunities",
      "Collaborate with marketing on lead generation",
      "Manage client relationships and escalations",
      "Analyze sales data for forecasting",
      "Report progress to leadership team"
    ],
    gradient: "from-green-500/20 to-green-600/10",
    icon: <Star className="h-6 w-6" />
  },
  {
    id: "ops-exec-visa",
    title: "Operations Executive – Visa Documentation Expert",
    department: "Operations",
    experience: "1–2 Years",
    salary: "₹20,000 – ₹25,000",
    type: "Full-time",
    location: "Office",
    description: "Handle visa documentation processes and ensure compliance with country-specific requirements.",
    responsibilities: [
      "Assist clients with visa documentation process",
      "Ensure document accuracy and completeness",
      "Coordinate with embassies and consulates",
      "Maintain timely updates to clients",
      "Manage digital records and filing",
      "Understand country-specific visa requirements",
      "Respond to client queries promptly",
      "Follow up for pending documents",
      "Support operations manager with daily tasks",
      "Adhere to compliance and regulatory standards"
    ],
    gradient: "from-purple-500/20 to-purple-600/10",
    icon: <Briefcase className="h-6 w-6" />
  },
  {
    id: "ops-mgr-visa",
    title: "Operations Manager – Visa Documentation Expert",
    department: "Operations",
    experience: "3–7 Years",
    salary: "₹60,000 – ₹80,000",
    type: "Full-time",
    location: "Office",
    description: "Lead visa documentation teams and streamline operational processes for maximum efficiency.",
    responsibilities: [
      "Lead the visa documentation and compliance team",
      "Streamline operational processes",
      "Manage escalated client cases",
      "Ensure accuracy and compliance with visa rules",
      "Train and monitor junior team members",
      "Oversee timely application submissions",
      "Liaise with embassies and partners",
      "Maintain documentation quality control",
      "Generate weekly operational reports",
      "Innovate and improve process efficiency"
    ],
    gradient: "from-orange-500/20 to-orange-600/10",
    icon: <Star className="h-6 w-6" />
  },
  {
    id: "digital-marketing-mgr",
    title: "Digital Marketing Manager",
    department: "Marketing",
    experience: "3–5 Years",
    salary: "₹50,000 – ₹80,000",
    type: "Full-time",
    location: "Office",
    description: "Drive digital marketing initiatives and manage performance campaigns across multiple channels.",
    responsibilities: [
      "Create and manage digital marketing campaigns",
      "Lead performance marketing and paid ads",
      "Plan SEO and SEM strategies",
      "Optimize landing pages and conversion funnels",
      "Oversee email, WhatsApp, and automation tools",
      "Analyze KPIs and track performance metrics",
      "Collaborate with content and design teams",
      "Manage marketing budget and ROI",
      "Stay updated with digital trends",
      "Coordinate with sales for lead nurturing"
    ],
    gradient: "from-pink-500/20 to-pink-600/10",
    icon: <Users className="h-6 w-6" />
  },
  {
    id: "crm-manager",
    title: "Customer Relationship Manager (CRM)",
    department: "Customer Success",
    experience: "2–4 Years",
    salary: "₹30,000",
    type: "Full-time",
    location: "Office",
    description: "Build strong client relationships and ensure exceptional customer experience throughout the journey.",
    responsibilities: [
      "Build and maintain strong client relationships",
      "Handle post-sales support and engagement",
      "Resolve customer queries promptly",
      "Maintain CRM records and follow-ups",
      "Upsell services when appropriate",
      "Track client satisfaction and feedback",
      "Coordinate with internal teams for service delivery",
      "Ensure timely updates and documentation",
      "Conduct regular check-ins with clients",
      "Promote customer retention and loyalty"
    ],
    gradient: "from-teal-500/20 to-teal-600/10",
    icon: <Users className="h-6 w-6" />
  },
  {
    id: "content-writer",
    title: "Content Writer",
    department: "Marketing",
    experience: "4–5 Years",
    salary: "₹60,000",
    type: "Full-time",
    location: "Office",
    description: "Create compelling content across multiple channels to engage and educate our study abroad audience.",
    responsibilities: [
      "Create content for website, blogs, and brochures",
      "Write SEO-optimized articles and landing pages",
      "Research topics and trends in the study abroad space",
      "Collaborate with marketing and SEO teams",
      "Proofread and edit content for clarity",
      "Develop email and ad copy",
      "Follow content calendar and deadlines",
      "Maintain tone and brand consistency",
      "Repurpose content for multiple channels",
      "Analyze performance of published content"
    ],
    gradient: "from-indigo-500/20 to-indigo-600/10",
    icon: <Briefcase className="h-6 w-6" />
  },
  {
    id: "seo-manager",
    title: "SEO Manager",
    department: "Marketing",
    experience: "4–5 Years",
    salary: "₹50,000",
    type: "Full-time",
    location: "Office",
    description: "Drive organic growth through comprehensive SEO strategies and technical optimization.",
    responsibilities: [
      "Lead all SEO efforts (on-page & off-page)",
      "Conduct keyword research and site audits",
      "Optimize web content for ranking and performance",
      "Track search performance metrics",
      "Manage backlinks and outreach",
      "Collaborate with content and tech teams",
      "Ensure mobile and technical SEO best practices",
      "Stay updated with Google algorithm updates",
      "Use tools like Google Analytics, SEMrush, etc.",
      "Report weekly SEO progress and insights"
    ],
    gradient: "from-cyan-500/20 to-cyan-600/10",
    icon: <Star className="h-6 w-6" />
  },
  {
    id: "intl-recruiter",
    title: "International Recruiter",
    department: "HR",
    experience: "2–3 Years",
    salary: "₹25,000 – ₹30,000",
    type: "Full-time",
    location: "Office",
    description: "Source and recruit international talent while managing global recruitment partnerships.",
    responsibilities: [
      "Source international candidates across platforms",
      "Screen and shortlist profiles",
      "Schedule interviews and follow up",
      "Coordinate with overseas partners and agencies",
      "Maintain recruitment databases",
      "Draft and post job ads",
      "Understand international hiring norms",
      "Manage offer rollouts and documentation",
      "Maintain candidate engagement",
      "Support recruitment campaigns and drives"
    ],
    gradient: "from-emerald-500/20 to-emerald-600/10",
    icon: <Users className="h-6 w-6" />
  },
  {
    id: "ops-intern",
    title: "Operations Interns",
    department: "Operations",
    experience: "Freshers",
    salary: "₹5,000 – ₹8,000/month",
    type: "Internship",
    location: "Office",
    description: "3-month internship program with potential for full-time conversion. Learn operations and visa processes.",
    responsibilities: [
      "Support operations team with daily tasks",
      "Assist in visa documentation work",
      "Handle data entry and client records",
      "Learn internal systems and tools",
      "Follow up with clients and collect documents",
      "Coordinate with various departments",
      "Attend team training sessions",
      "Maintain confidentiality and accuracy",
      "Participate in feedback and reporting",
      "Show proactiveness and commitment"
    ],
    gradient: "from-amber-500/20 to-amber-600/10",
    icon: <Clock className="h-6 w-6" />
  }
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Join Our Team
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Join India's top immigration consultancy and help candidates turn their dream of settling abroad into a reality.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Multiple Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10+ Open Positions</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Growth Opportunities</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:gap-8">
            {jobListings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-2xl transition-all duration-500"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${job.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-white/20 transition-colors duration-300">
                          {job.icon}
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-foreground dark:group-hover:text-white transition-colors duration-300 mb-2">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary" className="group-hover:bg-white/20 group-hover:text-foreground dark:group-hover:text-white transition-colors duration-300">
                              {job.department}
                            </Badge>
                            <Badge variant={job.type === "Internship" ? "destructive" : "default"} className="group-hover:bg-white/20 group-hover:text-foreground dark:group-hover:text-white transition-colors duration-300">
                              {job.type}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-white/80 transition-colors duration-300 mb-4 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-white/70 transition-colors duration-300" />
                          <span className="text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-white/80 transition-colors duration-300">
                            {job.experience}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-white/80 transition-colors duration-300">
                            Monthly CTC: {job.salary}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-white/70 transition-colors duration-300" />
                          <span className="text-muted-foreground group-hover:text-muted-foreground dark:group-hover:text-white/80 transition-colors duration-300">
                            {job.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:items-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="group-hover:bg-white/20 group-hover:text-foreground dark:group-hover:text-white group-hover:border-white/30 transition-all duration-300"
                            onClick={() => setSelectedJob(job)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                      
                      <Button 
                        className="bg-primary hover:bg-primary/90 group-hover:bg-white group-hover:text-primary transition-all duration-300"
                        asChild
                      >
                        <Link href="/contact">
                          <Send className="h-4 w-4 mr-2" />
                          Contact Us
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-6">
            <DialogHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedJob.gradient}`}>
                  {selectedJob.icon}
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">{selectedJob.title}</DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">{selectedJob.department} • {selectedJob.type}</p>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-6 px-1">
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-foreground">Job Description</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedJob.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-sm font-medium">{selectedJob.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly CTC</p>
                    <p className="text-sm font-medium">{selectedJob.salary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{selectedJob.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium">{selectedJob.type}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-semibold mb-4 text-foreground">Key Responsibilities</h4>
                <ul className="space-y-3">
                  {selectedJob.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  className="flex-1"
                  asChild
                >
                  <Link href="/contact">
                    <Send className="h-4 w-4 mr-2" />
                    Apply Now
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setSelectedJob(null)} className="px-6">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Mission?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for helping students achieve their international education dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <span>careers@indiansabroad.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}