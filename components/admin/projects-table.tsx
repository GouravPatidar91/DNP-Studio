'use client'

import { motion } from 'framer-motion'

interface ProjectsTableProps {
  projects: any[]
  onEdit: (project: any) => void
  onDelete: (id: string) => void
}

export default function ProjectsTable({
  projects,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20 bg-primary/10">
              <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Tags</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  No projects yet. Create your first project!
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-primary/10 hover:bg-primary/5"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <span className="font-medium">{project.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {project.category}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/20 px-2 py-1 text-xs text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 2 && (
                        <span className="px-2 py-1 text-xs text-muted-foreground">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(project)}
                        className="rounded px-3 py-1 text-sm font-medium text-primary transition-all hover:bg-primary/10"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (
                            confirm('Are you sure you want to delete this project?')
                          ) {
                            onDelete(project.id)
                          }
                        }}
                        className="rounded px-3 py-1 text-sm font-medium text-red-400 transition-all hover:bg-red-400/10"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
