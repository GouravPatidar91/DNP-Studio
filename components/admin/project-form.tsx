'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

interface ProjectFormProps {
  project?: any
  onClose: () => void
  onSuccess: () => void
}

export default function ProjectForm({
  project,
  onClose,
  onSuccess,
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image_url: '',
    project_url: '',
    tags: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        image_url: project.image_url,
        project_url: project.project_url || '',
        tags: project.tags?.join(', ') || '',
      })
    }
  }, [project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const tags = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0)

      const projectData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        image_url: formData.image_url,
        project_url: formData.project_url || null,
        tags,
      }

      if (project) {
        // Update existing project
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id)

        if (updateError) throw updateError
      } else {
        // Create new project
        const { error: insertError } = await supabase
          .from('projects')
          .insert([projectData])

        if (insertError) throw insertError
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      console.error('Error saving project:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-2xl rounded-2xl border border-primary/20 bg-background p-8 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                  placeholder="Project title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option value="Logo Design">Logo Design</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                placeholder="Project description"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Project URL (Optional)</label>
              <input
                type="url"
                name="project_url"
                value={formData.project_url}
                onChange={handleChange}
                className="w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                placeholder="e.g., Branding, Design, 2024"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-primary/20 px-4 py-2 font-medium text-foreground transition-all hover:bg-primary/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
