"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Star,
  Globe,
  Code,
  Smartphone,
  Database,
  Cloud,
  BarChart3,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

const services = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Web Development",
    description:
      "Custom web applications built with cutting-edge technologies for optimal performance and user experience.",
    features: ["React & Next.js", "Full-Stack Solutions", "API Integration", "Performance Optimization"],
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
  },
  {
    icon: <Cloud className="h-8 w-8" />,
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and deployment solutions to ensure your applications run smoothly at any scale.",
    features: ["AWS & Azure", "DevOps", "Microservices", "Auto-scaling"],
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Data Analytics",
    description:
      "Transform your data into actionable insights with our comprehensive analytics and business intelligence solutions.",
    features: ["Data Visualization", "Machine Learning", "Real-time Analytics", "Custom Dashboards"],
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards.",
    features: ["Security Audits", "Penetration Testing", "Compliance", "24/7 Monitoring"],
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Digital Strategy",
    description: "Strategic consulting to help you leverage technology for business growth and competitive advantage.",
    features: ["Technology Roadmap", "Digital Transformation", "Process Optimization", "ROI Analysis"],
  },
]

const clients = [
  {
    name: "AI Capital",
    logo: "/placeholder.svg?height=60&width=120&text=AI+Capital",
    description: "Leading AI investment firm",
  },
  {
    name: "Johns Hopkins Medicine",
    logo: "/placeholder.svg?height=60&width=120&text=Johns+Hopkins",
    description: "World-renowned medical institution",
  },
  {
    name: "TechCorp Global",
    logo: "/placeholder.svg?height=60&width=120&text=TechCorp",
    description: "Fortune 500 technology company",
  },
  {
    name: "InnovateLab",
    logo: "/placeholder.svg?height=60&width=120&text=InnovateLab",
    description: "Research and development leader",
  },
  {
    name: "FinanceFirst",
    logo: "/placeholder.svg?height=60&width=120&text=FinanceFirst",
    description: "Premier financial services",
  },
  {
    name: "HealthTech Solutions",
    logo: "/placeholder.svg?height=60&width=120&text=HealthTech",
    description: "Healthcare technology innovator",
  },
]

const stats = [
  { number: "500+", label: "Projects Delivered" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "24/7", label: "Support Available" },
  { number: "50+", label: "Expert Team Members" },
]

// 3D Cube Animation Component
function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [currentWord, setCurrentWord] = useState(0)
  const [showCube, setShowCube] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const words = ["great", "awesome", "terrific"]

  useEffect(() => {
    // Show cube after initial delay
    const showCubeTimer = setTimeout(() => {
      setShowCube(true)
    }, 500)

    // Start word cycling
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => {
        if (prev < words.length - 1) {
          return prev + 1
        } else {
          // Start fade out after showing "terrific"
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onComplete, 1000)
          }, 1500)
          clearInterval(wordInterval)
          return prev
        }
      })
    }, 1000) // Change word every 1 second

    return () => {
      clearTimeout(showCubeTimer)
      clearInterval(wordInterval)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* 3D Cube */}
        <div
          className={`mb-8 transition-all duration-1000 ${showCube ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          style={{
            perspective: "1000px",
          }}
        >
          <div
            className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64"
            style={{
              transformStyle: "preserve-3d",
              transform: showCube ? "rotateX(-15deg) rotateY(25deg)" : "rotateX(0deg) rotateY(0deg)",
              transition: "transform 2s ease-in-out",
            }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 border border-blue-700 flex items-center justify-center"
              style={{
                transform: "translateZ(64px)",
              }}
            >
              <div className="text-white font-bold text-lg md:text-2xl lg:text-3xl text-center">
                <span>{"It's"}</span>
                <br />
                <span
                  className={`inline-block transition-all duration-300 ${
                    showCube ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                >
                  {words[currentWord]}
                </span>
              </div>
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800"
              style={{
                transform: "translateZ(-64px) rotateY(180deg)",
              }}
            />

            {/* Right face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-950 border border-blue-700"
              style={{
                transform: "rotateY(90deg) translateZ(64px)",
              }}
            />

            {/* Left face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700"
              style={{
                transform: "rotateY(-90deg) translateZ(64px)",
              }}
            />

            {/* Top face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-800 border border-blue-600"
              style={{
                transform: "rotateX(90deg) translateZ(64px)",
              }}
            />

            {/* Bottom face */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-950 to-blue-900 border border-blue-800"
              style={{
                transform: "rotateX(-90deg) translateZ(64px)",
              }}
            />
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex space-x-3">
          {words.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentWord ? "bg-blue-400 scale-110" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TerrificSolutionsWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem("terrificsolutions-visited")
    if (visited) {
      setShowIntro(false)
      setHasVisited(true)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setHasVisited(true)
    localStorage.setItem("terrificsolutions-visited", "true")
  }

  if (showIntro && !hasVisited) {
    return <IntroAnimation onComplete={handleIntroComplete} />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-white">Terrific</span>
                <span className="text-blue-600">Solutions</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-white hover:text-blue-400 transition-colors">
                  Home
                </a>
                <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Services
                </a>
                <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About
                </a>
                <a href="#clients" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Clients
                </a>
                <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-white hover:text-blue-400">
                Home
              </a>
              <a href="#services" className="block px-3 py-2 text-gray-300 hover:text-blue-400">
                Services
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-blue-400">
                About
              </a>
              <a href="#clients" className="block px-3 py-2 text-gray-300 hover:text-blue-400">
                Clients
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-blue-400">
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-black via-gray-900 to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-600/20 text-blue-400 border-blue-600/30">Premium Technology Solutions</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Terrific</span> <span className="text-blue-600">Solutions</span>
              <br />
              <span className="text-gray-300 text-3xl md:text-4xl lg:text-5xl">for Modern Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              We deliver cutting-edge technology solutions with unmatched speed and quality. Transform your business
              with our expert team and proven methodologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg bg-transparent"
              >
                View Our Work
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-600/30">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Comprehensive</span>{" "}
              <span className="text-blue-600">Technology Solutions</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From concept to deployment, we provide end-to-end technology services that drive innovation and accelerate
              your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-black border-gray-800 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/10"
              >
                <CardHeader>
                  <div className="text-blue-400 mb-4">{service.icon}</div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About/Why Choose Us Section */}
      <section id="about" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-600/30">Why Choose Us</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Fast Delivery,</span>
                <br />
                <span className="text-blue-600">Exceptional Quality</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                At Terrific Solutions, we combine speed with precision to deliver technology solutions that exceed
                expectations. Our commitment to excellence has made us the trusted partner for leading organizations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Lightning-Fast Delivery</h3>
                    <p className="text-gray-400">
                      We pride ourselves on rapid project turnaround without compromising quality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Uncompromising Quality</h3>
                    <p className="text-gray-400">
                      Every solution undergoes rigorous testing and quality assurance processes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Expert Team</h3>
                    <p className="text-gary-400">
                      Our seasoned professionals bring years of experience across diverse industries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600/20 to-transparent p-8 rounded-2xl border border-blue-600/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white mb-2">48hrs</div>
                    <div className="text-gray-400">Average Response Time</div>
                  </div>
                  <div className="text-center">
                    <Star className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white mb-2">5.0</div>
                    <div className="text-gray-400">Client Rating</div>
                  </div>
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white mb-2">25+</div>
                    <div className="text-gray-400">Countries Served</div>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white mb-2">100%</div>
                    <div className="text-gray-400">Project Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-600/30">Trusted Partners</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Notable</span> <span className="text-blue-600">Clients</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're proud to work with industry leaders and innovative organizations who trust us with their most
              critical technology initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <Card
                key={index}
                className="bg-black border-gray-800 hover:border-blue-600/50 transition-all duration-300 text-center p-6"
              >
                <div className="mb-6">
                  <img
                    src={client.logo || "/placeholder.svg"}
                    alt={client.name}
                    className="h-16 mx-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{client.name}</h3>
                <p className="text-gray-400 text-sm">{client.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Join our growing list of satisfied clients</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Become a Client
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-600/30">Get In Touch</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ready to Start Your</span>
              <br />
              <span className="text-blue-600">Next Project?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Let's discuss how we can help transform your business with our cutting-edge technology solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-400">hello@terrificsolutions.tech</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <div className="text-gray-400">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-gray-400">Global Remote Team</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Send us a message</CardTitle>
                <CardDescription className="text-gray-400">We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:border-blue-600 focus:outline-none"
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">Terrific</span>
                <span className="text-blue-600">Solutions</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Delivering cutting-edge technology solutions with unmatched speed and quality. Your trusted partner for
                digital transformation.
              </p>
              <div className="text-sm text-gray-500">© 2024 Terrific Solutions. All rights reserved.</div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Cloud Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Data Analytics
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
