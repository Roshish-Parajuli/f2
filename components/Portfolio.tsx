'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import TerminalPortfolio from './TerminalPortfolio'
import projects from '@/data/projects.json'

function NormalPortfolioView() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.ul 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-2 w-full max-w-6xl"
    >
      {projects.map(project => (
        <motion.li
          key={project.id}
          variants={itemVariants}
          className="group glass-panel p-8 rounded-3xl hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              {project.name}
            </h3>
            <div className="bg-indigo-600/20 p-2 rounded-lg text-indigo-400">
               <FiBriefcase size={20} />
            </div>
          </div>
          
          <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="bg-white/5 text-indigo-200 text-xs font-mono px-3 py-1 rounded-full border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 text-indigo-400 font-semibold hover:text-white transition-colors">
            Explore Project Details <span>→</span>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}

import { FiBriefcase, FiTerminal, FiLayout } from 'react-icons/fi'

export default function Portfolio() {
  const [view, setView] = useState<'normal' | 'terminal'>('normal')

  return (
    <article className="w-full min-h-screen px-6 py-10 md:px-12 md:py-16 flex flex-col items-center gap-12">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center w-full max-w-4xl"
      >
        <p className="text-gray-400 text-lg mb-8">
          Switch to Terminal view for a different experience.
        </p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setView('normal')}
            className={`flex items-center gap-2 py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-300 ${view === 'normal'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            <FiLayout /> Normal View
          </button>
          <button
            onClick={() => setView('terminal')}
            className={`flex items-center gap-2 py-3 px-6 rounded-2xl text-sm font-bold transition-all duration-300 ${view === 'terminal'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            <FiTerminal /> Terminal View
          </button>
        </div>
      </motion.header>

      {/* Content */}
      <div className="w-full flex justify-center mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full flex justify-center"
          >
            {view === 'normal' ? <NormalPortfolioView /> : <TerminalPortfolio />}
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  )
}
