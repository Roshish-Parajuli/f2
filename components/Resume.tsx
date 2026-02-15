'use client'

import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import { prefix } from '@/lib/utils'

export default function Resume() {
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
    <article className="w-full min-h-screen px-6 py-10 md:px-12 md:py-16 flex flex-col items-center gap-12">

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center w-full max-w-4xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
          Career Trajectory
        </h2>
        <div className="flex justify-center">
          <a
            href={prefix("/Roshish_Parajuli_CV.docx")}
            download="Roshish_Parajuli_CV.docx"
            className="group flex items-center gap-2 py-3 px-8 rounded-full text-sm font-semibold transition-all duration-300 bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            <FiDownload className="group-hover:animate-bounce" />
            Download CV
          </a>
        </div>
      </motion.header>

      {/* Experience Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        <div className="flex items-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-xl mr-4 text-white shadow-lg shadow-indigo-500/20">💼</div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">Professional Experience</h3>
        </div>

        <div className="relative border-l-2 border-indigo-500/30 ml-4 space-y-12">
          {/* Grepsr */}
          <motion.div variants={itemVariants} className="ml-8 relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-indigo-600 rounded-full border-4 border-black" />
            <div className="glass-panel p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white">Associate Delivery Engineer</h4>
                  <p className="text-indigo-400 font-medium">Grepsr | Kathmandu, Nepal</p>
                </div>
                <span className="text-sm text-gray-400 mt-1 md:mt-0 font-mono bg-white/5 px-3 py-1 rounded-full h-fit w-fit">Apr 2024 — Present</span>
              </div>
              <ul className="space-y-3 text-gray-300 text-sm md:text-base list-disc list-inside marker:text-indigo-500">
                <li>Develop and maintain data extraction and ETL workflows for international clients, ensuring high accuracy.</li>
                <li>Build scalable pipelines to collect, transform, and deliver large datasets through APIs and cloud storage (AWS S3).</li>
                <li>Collaborate with internal QA and engineering teams to ensure quality assurance and timely delivery.</li>
                <li>Automate repetitive workflows to reduce turnaround time and improve team productivity.</li>
                <li>Developed internal QA tools and lightweight widgets to automate daily operational tasks including data validation, error detection, and retry handling.</li>
              </ul>
            </div>
          </motion.div>

          {/* Aqore */}
          <motion.div variants={itemVariants} className="ml-8 relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-purple-600 rounded-full border-4 border-black" />
            <div className="glass-panel p-6 rounded-2xl hover:border-purple-500/50 transition-colors">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white">Full Stack Developer</h4>
                  <p className="text-purple-400 font-medium">Aqore | Kathmandu, Nepal</p>
                </div>
                <span className="text-sm text-gray-400 mt-1 md:mt-0 font-mono bg-white/5 px-3 py-1 rounded-full h-fit w-fit">Sept 2023 — Mar 2024</span>
              </div>
              <ul className="space-y-3 text-gray-300 text-sm md:text-base list-disc list-inside marker:text-purple-500">
                <li>Developed and maintained web applications, focusing on backend logic and data integration.</li>
                <li>Worked with SQL databases and API endpoints for real-time data handling.</li>
                <li>Collaborated with cross-functional teams to build secure and efficient solutions.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        <div className="flex items-center mb-8">
          <div className="bg-emerald-600 p-3 rounded-xl mr-4 text-white shadow-lg shadow-emerald-500/20">🎓</div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">Education</h3>
        </div>

        <div className="relative border-l-2 border-emerald-500/30 ml-4">
          <motion.div variants={itemVariants} className="ml-8 relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-emerald-600 rounded-full border-4 border-black" />
            <div className="glass-panel p-6 rounded-2xl hover:border-emerald-500/50 transition-colors">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h4 className="text-xl font-bold text-white">Bachelor's in Computer Engineering</h4>
                <span className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-full h-fit w-fit">2018 — 2023</span>
              </div>
              <p className="text-emerald-400 font-medium">Khwopa Engineering College</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-4xl"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Technical Arsenal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { category: "Languages", items: ["Python", "SQL", "JavaScript", "TypeScript", "PHP"] },
            { category: "Data Engineering", items: ["ETL/ELT", "Web Scraping", "Data Modeling", "Pipeline Orchestration"] },
            { category: "Databases", items: ["PostgreSQL", "MySQL", "SQL Server"] },
            { category: "Tools & Cloud", items: ["AWS (S3)", "Git", "Docker", "Linux", "Postman"] }
          ].map((skillGroup, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-colors"
            >
              <h4 className="text-lg font-bold text-indigo-400 mb-4 border-b border-white/10 pb-2">{skillGroup.category}</h4>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map(skill => (
                  <span key={skill} className="bg-white/10 hover:bg-white/20 text-indigo-100 text-sm px-3 py-1 rounded-md transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </article>
  )
}
