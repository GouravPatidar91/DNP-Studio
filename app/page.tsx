'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import Process from '@/components/process'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <main ref={containerRef} className="relative bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <CTA />
      <Footer />
    </main>
  )
}
