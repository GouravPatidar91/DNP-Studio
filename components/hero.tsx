'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import ContactModal from './contact-modal'

export default function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden pt-20 sm:pt-24 md:pt-32"
        style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)' }}
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
            animate={{ y: ['0%', '-50px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <motion.div
          className="absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl sm:right-10% sm:top-20% sm:h-64 sm:w-64"
          style={{
            background: 'linear-gradient(to bottom right, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.2))',
          }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-40 w-40 rounded-full blur-3xl sm:bottom-20% sm:left-10% sm:h-80 sm:w-80"
          style={{
            background: 'linear-gradient(to bottom right, rgba(255, 0, 110, 0.15), rgba(0, 212, 255, 0.15))',
          }}
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            <motion.div
              variants={itemVariants}
              className="mb-4 sm:mb-6 inline-block rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold backdrop-blur-sm"
              style={{
                border: '1px solid rgba(0, 212, 255, 0.3)',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                color: '#00d4ff',
              }}
            >
              ✨ Welcome to Innovation
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-4 sm:mb-6 text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight sm:leading-tight"
            >
              <span className="gradient-text">Dynamic</span>
              <br className="hidden sm:block" />
              <span className="sm:inline" style={{ color: '#f5f7fa' }}>
                New Production
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-6 sm:mb-8 text-sm sm:text-lg md:text-xl lg:text-2xl px-2 sm:px-0"
              style={{ color: '#94a3b8' }}
            >
              Crafting extraordinary digital experiences through design, strategy, and innovation
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center px-2 sm:px-0"
            >
              <motion.button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all glow-primary"
                style={{
                  background: 'linear-gradient(to right, #00d4ff, #8b5cf6)',
                  color: '#0a0e27',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 212, 255, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>

              <motion.button
                className="rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all"
                style={{
                  border: '2px solid #00d4ff',
                  color: '#00d4ff',
                  backgroundColor: 'transparent',
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 212, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Work
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 transform hidden sm:block"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs sm:text-sm" style={{ color: '#94a3b8' }}>Scroll to explore</p>
                <motion.div 
                  className="h-8 w-0.5 rounded-full" 
                  style={{
                    background: 'linear-gradient(to bottom, #00d4ff, transparent)',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
