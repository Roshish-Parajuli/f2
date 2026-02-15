'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <article className="w-full min-h-screen px-6 py-12 md:px-12 md:py-20 flex flex-col justify-center items-center">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center w-full max-w-4xl"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Hi, I'm <span className="text-gradient">Roshish Parajuli</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 font-light">
          Data Engineer · Systems Architect · Automation Specialist
        </p>
      </motion.header>

      {/* Intro */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-4xl text-center shadow-2xl shadow-indigo-500/10"
      >
        <p className="mb-6 text-gray-300 text-base md:text-lg leading-relaxed">
          I am a <strong>Data Engineer</strong> with hands-on experience designing, building, and maintaining scalable 
          <strong> ETL/ELT pipelines</strong> for transforming unstructured and semi-structured data into structured, 
          analytics-ready datasets.
        </p>
        <p className="mb-6 text-gray-300 text-base md:text-lg leading-relaxed">
          My expertise lies in <strong>Python, SQL, and workflow automation</strong>, with proven experience developing 
          QA tools and internal widgets to automate daily operational tasks, improve data quality, and enhance delivery efficiency. 
          I am adept at cloud-based data processing, validation, and cross-functional collaboration in fast-paced environments.
        </p>
        
        <div className="mt-8 flex justify-center gap-4">
          <Link 
            href="/portfolio"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all hover:scale-105"
          >
            View Projects
          </Link>
          <Link 
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all hover:scale-105"
          >
            Contact Me
          </Link>
        </div>
      </motion.section>

    </article>
  )
}