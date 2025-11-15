'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Project {
  id: string
  title: string
  category: string
  description: string
  image_url: string
  project_url?: string
  tags: string[]
}

export default function Portfolio() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('order_index', { ascending: true })

        if (error) throw error
        setProjects(data || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
        // Fallback to empty array if fetch fails
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden px-4 py-20"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-accent/8 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A showcase of our most impactful projects and transformative client partnerships
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
            <p className="text-muted-foreground">
              No projects available yet. Check back soon!
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid gap-8 md:grid-cols-2"
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl"
                whileHover={{ y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <div className="glass-effect relative aspect-video overflow-hidden rounded-2xl border border-primary/20">
                  <motion.img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-transparent to-transparent p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, j) => (
                          <motion.span
                            key={j}
                            className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            transition={{ delay: j * 0.1 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                      {project.project_url && (
                        <motion.a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Project →
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
