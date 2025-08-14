import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Lenis from 'lenis'
import gsap from 'gsap'
import emailjs from 'emailjs-com'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const getInTouchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // GSAP animations
    const tl = gsap.timeline()
    
    if (logoRef.current) {
      tl.fromTo(logoRef.current, 
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
    }
    
    const heroTitle = heroRef.current?.querySelector('h1')
    if (heroTitle) {
      tl.fromTo(heroTitle, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5"
      )
    }
    
    const heroParagraph = heroRef.current?.querySelector('p')
    if (heroParagraph) {
      tl.fromTo(heroParagraph, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6"
      )
    }
    
    if (getInTouchRef.current) {
      tl.fromTo(getInTouchRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4"
      )
    }
    
    if (formRef.current) {
      tl.fromTo(formRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4"
      )
    }
    
    if (contactInfoRef.current) {
      tl.fromTo(contactInfoRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2"
      )
    }

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_kev5nsn',
        'template_himcnwi',
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message
        },
        'zfVOZ1IbvH0zDE2JY'
      );

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Email failed to send:', error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="section-padding py-6">
          <div ref={logoRef} className="flex items-center">
            <img 
              src="/logo.png" 
              alt="VisionLab Technologies Logo" 
              className="h-12 w-auto rounded-lg shadow-md object-contain"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section ref={heroRef} className="section-padding text-center mb-20 mt-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            We're Under Maintenance
          </h1>
          <p className="text-xl md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We’re currently updating our website to bring you a faster, more reliable, refreshed experience. 
            Our team is working carefully to enhance navigation, improve content, and ensure everything runs smoothly. 
            The updated site will be live soon, thank you for your patience.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="section-padding max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
            <div ref={getInTouchRef} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                While we're working on our website, we're still here to help. 
                Send us a message and we'll get back to you as soon as possible.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 focus:border-black focus:outline-none transition-all duration-300 rounded-lg bg-gray-50 focus:bg-white shadow-sm focus:shadow-md"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 focus:border-black focus:outline-none transition-all duration-300 rounded-lg bg-gray-50 focus:bg-white shadow-sm focus:shadow-md"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 focus:border-black focus:outline-none transition-all duration-300 rounded-lg bg-gray-50 focus:bg-white shadow-sm focus:shadow-md"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 border border-gray-200 focus:border-black focus:outline-none transition-all duration-300 rounded-lg bg-gray-50 focus:bg-white shadow-sm focus:shadow-md resize-none"
                  placeholder="Tell us about your project or how we can help..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {submitSuccess && (
              <div className="mt-6 p-6 bg-green-50 border border-green-200 text-green-800 rounded-xl shadow-lg animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="font-medium">Thank you for your message! We'll get back to you soon.</p>
                </div>
              </div>
            )}

            {submitError && (
              <div className="mt-6 p-6 bg-red-50 border border-green-200 text-red-800 rounded-xl shadow-lg animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="font-medium">Your message was not sent. Please try again.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Information */}
        <section ref={contactInfoRef} className="section-padding max-w-4xl mx-auto mt-16">
                      <div className="grid md:grid-cols-3 gap-12 text-center">
              <a href="mailto:contact@visionlab.ae" className="group cursor-pointer block">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-black group-hover:text-gray-700 transition-colors duration-300">Email</h3>
                <p className="text-gray-500 text-lg group-hover:text-black transition-colors duration-300 font-medium">contact@visionlab.ae</p>
              </a>
              
              <a href="tel:+251963978798" className="group cursor-pointer block">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-black group-hover:text-gray-700 transition-colors duration-300">Phone</h3>
                <p className="text-gray-500 text-lg group-hover:text-black transition-colors duration-300 font-medium">+251 963978798</p>
              </a>
            
            <div className="group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-black group-hover:text-gray-700 transition-colors duration-300">Location</h3>
              <p className="text-gray-500 text-lg group-hover:text-black transition-colors duration-300 font-medium">Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="section-padding text-center">
          <p className="text-gray-600 font-medium">
            © 2025 VisionLab Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
