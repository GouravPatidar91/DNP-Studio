'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import ContactModal from './contact-modal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20 },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-effect mx-4 mt-4 rounded-full md:mx-auto md:max-w-7xl">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <motion.div
              className="text-xl sm:text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              asChild
            >
              <Link href="/">Dynamic</Link>
            </motion.div>

            {/* Desktop menu */}
            <div className="hidden gap-8 md:flex items-center">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      className="relative text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  )}
                </motion.div>
              ))}
              
              <motion.button
                onClick={() => setIsContactOpen(true)}
                className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg glow-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
              </motion.button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile menu button */}
              <motion.button
                className="p-2"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
              >
                <div className="space-y-1.5">
                  <motion.div
                    className="h-0.5 w-6 bg-primary"
                    animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  />
                  <motion.div
                    className="h-0.5 w-6 bg-primary"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  />
                  <motion.div
                    className="h-0.5 w-6 bg-primary"
                    animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass-effect mx-4 mt-2 rounded-2xl md:hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-4">
                {navItems.map((item, i) => (
                  <motion.div key={item.label} variants={menuItemVariants}>
                    {item.href.startsWith('#') ? (
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                
                <motion.button
                  variants={menuItemVariants}
                  onClick={() => {
                    setIsContactOpen(true)
                    setIsOpen(false)
                  }}
                  className="mt-2 w-full rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg glow-primary"
                >
                  Let's Talk
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
