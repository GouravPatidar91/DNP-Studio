'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import ContactModal from './contact-modal'

export default function CTA() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      <section className="relative min-h-screen w-full overflow-hidden px-4 py-20">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        </motion.div>

        <motion.div
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl"
            >
              Ready to Transform
              <br />
              <span className="gradient-text">Your Vision?</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mb-12 text-lg text-muted-foreground md:text-xl"
            >
              Let's collaborate and create something extraordinary together. Connect with our team today and let's discuss how we can elevate your brand to new heights.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <motion.button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-10 py-4 text-lg font-semibold text-primary-foreground transition-all hover:shadow-2xl glow-primary"
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0, 212, 255, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
              </motion.button>

              <motion.button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full border-2 border-primary px-10 py-4 text-lg font-semibold text-primary transition-all hover:bg-primary/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-col items-center gap-4 pt-8 sm:flex-row sm:justify-center"
            >
              <span className="text-sm text-muted-foreground">🚀 Trusted by leading brands worldwide</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
