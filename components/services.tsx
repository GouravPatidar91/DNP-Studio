'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    icon: '🎨',
    title: 'Logo Design',
    description: 'Iconic brand identities that resonate and remain timeless in the minds of your audience',
    features: ['Brand Strategy', 'Visual Identity', 'Color Theory'],
  },
  {
    icon: '💻',
    title: 'Website Development',
    description: 'High-performance web experiences built with cutting-edge technology and design principles',
    features: ['Responsive Design', 'Web Performance', 'UX Optimization'],
  },
  {
    icon: '🎬',
    title: 'Video Editing',
    description: 'Compelling visual stories that capture attention and drive engagement across platforms',
    features: ['Motion Graphics', 'Color Grading', 'Sound Design'],
  },
  {
    icon: '📈',
    title: 'Digital Marketing',
    description: 'Strategic campaigns that elevate your brand and convert audiences into loyal customers',
    features: ['Content Strategy', 'Social Media', 'Analytics'],
  },
]

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="services"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden px-4 py-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comprehensive creative solutions designed to elevate your brand and achieve exceptional results
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-effect h-full rounded-2xl p-6 transition-all duration-300 hover:border-primary/60">
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  {service.features.map((feature, j) => (
                    <div key={j} className="text-xs text-primary">
                      ✓ {feature}
                    </div>
                  ))}
                </motion.div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/10 group-hover:to-secondary/10 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
