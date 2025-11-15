'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function AboutPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

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

  const values = [
    {
      title: 'Innovation',
      description: 'We push boundaries and embrace cutting-edge technologies to deliver exceptional results.',
      icon: '🚀',
    },
    {
      title: 'Excellence',
      description: 'Quality is never compromised. Every project is crafted with meticulous attention to detail.',
      icon: '⭐',
    },
    {
      title: 'Collaboration',
      description: 'We believe in true partnership, working closely with our clients to understand their vision.',
      icon: '🤝',
    },
    {
      title: 'Creativity',
      description: 'Our creative minds transform ideas into stunning visual and interactive experiences.',
      icon: '🎨',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative min-h-screen w-full overflow-hidden px-4 py-20">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
            }}
          />

          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="mb-6 text-5xl font-bold md:text-7xl"
              >
                <span className="gradient-text">About Dynamic</span>
                <br />
                <span style={{ color: '#f5f7fa' }}>New Production</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mb-12 text-xl text-muted-foreground md:text-2xl"
              >
                We are a team of creative professionals dedicated to transforming brands and bringing visions to life through exceptional digital design and production.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="relative w-full overflow-hidden px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-100px' }}
              className="grid gap-12 md:grid-cols-2 md:gap-20"
            >
              <div>
                <h2 className="mb-6 text-4xl font-bold">Our Story</h2>
                <p className="mb-4 text-muted-foreground">
                  Founded with a vision to revolutionize the creative industry, Dynamic New Production has been at the forefront of digital innovation for years.
                </p>
                <p className="mb-4 text-muted-foreground">
                  We started with a simple belief: great design and production can transform businesses and create lasting impacts. Today, we partner with leading brands worldwide to bring their boldest ideas to life.
                </p>
                <p className="text-muted-foreground">
                  Our team brings together experts in logo design, web development, video production, and digital marketing to create comprehensive solutions tailored to your needs.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
                  <h3 className="mb-2 text-2xl font-bold">100+</h3>
                  <p className="text-muted-foreground">Projects Completed</p>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
                  <h3 className="mb-2 text-2xl font-bold">50+</h3>
                  <p className="text-muted-foreground">Happy Clients</p>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
                  <h3 className="mb-2 text-2xl font-bold">10+</h3>
                  <p className="text-muted-foreground">Years of Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative w-full overflow-hidden px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12 text-center text-4xl font-bold"
            >
              Our <span className="gradient-text">Core Values</span>
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg border border-primary/30 bg-primary/5 p-8 hover:border-primary/60 hover:bg-primary/10 transition-all"
                >
                  <div className="mb-4 text-4xl">{value.icon}</div>
                  <h3 className="mb-2 text-2xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="relative w-full overflow-hidden px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12 text-center text-4xl font-bold"
            >
              What We <span className="gradient-text">Offer</span>
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                { title: 'Logo Design', description: 'Unique and memorable brand identities that capture your essence.' },
                { title: 'Website Making', description: 'Stunning, functional websites that convert visitors into customers.' },
                { title: 'Video Editing', description: 'Professional video production and editing for all your content needs.' },
                { title: 'Digital Marketing', description: 'Strategic campaigns that elevate your brand and drive results.' },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg border border-secondary/30 bg-secondary/5 p-8"
                >
                  <h3 className="mb-2 text-2xl font-bold text-secondary">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
