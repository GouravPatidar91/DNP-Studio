'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { createClient } from '@/lib/supabase/client'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            message: formData.message,
          },
        ])

      if (error) {
        setErrorMessage('Failed to send message. Please try again.')
        console.error('Error:', error)
      } else {
        setSuccessMessage('Thank you! We received your message and will get back to you soon.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        })
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <section className="relative w-full overflow-hidden px-4 py-20">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
            }}
          />

          <div className="relative z-10 mx-auto max-w-5xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-16 text-center"
            >
              <motion.h1
                variants={itemVariants}
                className="mb-6 text-5xl font-bold md:text-7xl"
              >
                Get in <span className="gradient-text">Touch</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground md:text-2xl"
              >
                Have a project in mind? Let's discuss how we can help bring your vision to life.
              </motion.p>
            </motion.div>

            <div className="grid gap-16 md:grid-cols-2">
              {/* Contact Information */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="rounded-lg border border-primary/30 bg-primary/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-primary">Email</h3>
                  <p className="text-muted-foreground">hello@dynamicnewproduction.com</p>
                </motion.div>

                <motion.div variants={itemVariants} className="rounded-lg border border-primary/30 bg-primary/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-primary">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </motion.div>

                <motion.div variants={itemVariants} className="rounded-lg border border-primary/30 bg-primary/5 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-primary">Location</h3>
                  <p className="text-muted-foreground">123 Creative Street, Design City, DC 12345</p>
                </motion.div>

                <motion.div variants={itemVariants} className="rounded-lg border border-primary/30 bg-primary/5 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-primary">Follow Us</h3>
                  <div className="flex gap-4">
                    {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(social => (
                      <a
                        key={social}
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="rounded-lg border border-primary/30 bg-primary/5 p-8"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-medium text-foreground">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-medium text-foreground">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="+1 (555) 000-0000"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-medium text-foreground">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your company"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="mb-2 block text-sm font-medium text-foreground">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>

                  {successMessage && (
                    <motion.div variants={itemVariants} className="rounded-lg bg-green-500/20 p-4 text-sm text-green-400">
                      {successMessage}
                    </motion.div>
                  )}

                  {errorMessage && (
                    <motion.div variants={itemVariants} className="rounded-lg bg-red-500/20 p-4 text-sm text-red-400">
                      {errorMessage}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    variants={itemVariants}
                    className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-primary-foreground transition-all disabled:opacity-50 hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
