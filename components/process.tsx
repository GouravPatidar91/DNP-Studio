'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into understanding your brand, goals, and target audience to craft the perfect strategy',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Developing comprehensive creative strategies tailored to your unique market position',
  },
  {
    number: '03',
    title: 'Creation',
    description: 'Bringing ideas to life with our team of talented designers, developers, and creators',
  },
  {
    number: '04',
    title: 'Optimization',
    description: 'Testing, refining, and optimizing every element to ensure maximum impact and performance',
  },
]

export default function Process() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden px-4 py-20"
    >
      {/* Animated background */}
      <motion.div
        className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-secondary/8 blur-3xl"
        animate={{ y: [0, 100, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A proven methodology designed to deliver exceptional results every single time
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              {/* Connection line */}
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-24 hidden h-0.5 w-8 bg-gradient-to-r from-primary to-transparent lg:block" />
              )}

              <div className="glass-effect rounded-2xl p-8 transition-all duration-300 hover:border-primary/60">
                <motion.div
                  className="mb-4 inline-block rounded-full bg-gradient-to-br from-primary to-secondary p-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="text-2xl font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </motion.div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
