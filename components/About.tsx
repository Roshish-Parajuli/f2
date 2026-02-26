'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiCode, FiDatabase, FiCpu, FiZap, FiGlobe, FiLayers } from 'react-icons/fi'
import { prefix } from '@/lib/utils'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut' as const,
      onUpdate: (v: number) => setCount(Math.floor(v)),
    })
    return () => controls.stop()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

const techStack = [
  { icon: <FiCode />, name: 'Python', level: 95 },
  { icon: <FiDatabase />, name: 'SQL', level: 92 },
  { icon: <FiGlobe />, name: 'JavaScript / TS', level: 90 },
  { icon: <FiLayers />, name: 'React / Next.js', level: 88 },
  { icon: <FiCpu />, name: 'Data Engineering', level: 93 },
  { icon: <FiZap />, name: 'Automation', level: 95 },
]

const services = [
  {
    icon: <FiDatabase className="text-indigo-400" size={28} />,
    title: 'Data Engineering',
    desc: 'Scalable ETL pipelines, data lakes, and real-time streaming architectures.',
  },
  {
    icon: <FiGlobe className="text-emerald-400" size={28} />,
    title: 'Full Stack Development',
    desc: 'Modern web apps with React, Next.js, Node.js, and cloud-native backends.',
  },
  {
    icon: <FiZap className="text-amber-400" size={28} />,
    title: 'Web Scraping & Automation',
    desc: 'Production-grade crawlers, proxy management, and anti-detection systems.',
  },
  {
    icon: <FiCpu className="text-purple-400" size={28} />,
    title: 'AI & ML Integration',
    desc: 'Intelligent document processing, NLP pipelines, and AI-powered tools.',
  },
]

export default function About() {
  return (
    <article className="w-full min-h-screen px-6 py-12 md:px-12 md:py-20 flex flex-col items-center gap-20 relative overflow-hidden">

      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/8 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[120px] -z-10" />

      {/* Hero Section */}
      <div className="w-full max-w-5xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-60 animate-pulse" />
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-3 border-black">
            <img
              src={prefix("/me.jpeg")}
              alt="Roshish Parajuli — Full Stack Developer & Data Engineer"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-gray-500/10 border border-gray-400/20 text-gray-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-gray-400 rounded-full" />
            Currently unavailable for new projects
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Hi, I'm{' '}
            <span className="text-gradient">Roshish</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed mb-4">
            Full Stack Developer · Data Engineer · Product Builder
          </p>

          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            I architect scalable data systems, build beautiful web applications,
            and automate everything in between. Based in Kathmandu, Nepal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/portfolio"
            className="group px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all hover:shadow-xl hover:shadow-indigo-500/25 flex items-center gap-2"
          >
            View My Work
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/blog"
            className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10 hover:border-white/20"
          >
            Read My Blog
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all border border-white/10 hover:border-white/20"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* Stats Strip */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: 3, suffix: '+', label: 'Years Experience' },
            { value: 20, suffix: '+', label: 'Projects Delivered' },
            { value: 5, suffix: 'M+', label: 'Data Points Processed' },
            { value: 100, suffix: '%', label: 'Client Satisfaction' },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-6 rounded-2xl text-center hover:border-indigo-500/30 transition-all group"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs md:text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 md:p-12 rounded-3xl w-full max-w-4xl shadow-2xl shadow-indigo-500/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600/5 blur-[100px] -z-10" />

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-merriweather">
          About Me
        </h2>

        <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed">
          <p>
            I don't just write code; <strong className="text-white">I build complete solutions.</strong> From crafting stunning
            front-end interfaces to architecting robust back-end systems and
            optimizing complex data pipelines, I have the full-stack expertise to turn ideas into reality.
          </p>
          <p>
            Whether it's scraping millions of data points, building scalable SaaS platforms, or automating tedious workflows,
            I bring a <strong className="text-white">"can-do" attitude</strong> to every challenge. I leverage modern tech stacks to deliver
            high-performance, reliable, and user-centric products. <strong className="text-white">If you can imagine it, I can build it.</strong>
          </p>
          <p>
            Currently working as an <strong className="text-white">Associate Delivery Engineer at Grepsr</strong>, where I build
            data extraction and ETL workflows for international clients.
          </p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-merriweather text-center">
          What I Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-3xl hover:border-indigo-500/30 transition-all group"
            >
              <div className="bg-white/5 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-merriweather text-center">
          Tech Stack
        </h2>
        <div className="grid gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-panel p-5 rounded-2xl flex items-center gap-4 group hover:border-indigo-500/20 transition-all"
            >
              <span className="text-indigo-400 text-xl">{tech.icon}</span>
              <span className="text-white font-medium w-40 text-sm">{tech.name}</span>
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
              <span className="text-xs text-gray-500 font-mono w-10 text-right">{tech.level}%</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl text-center py-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-merriweather">
          Let's Build Something <span className="text-gradient">Amazing</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Got a project in mind? I'm open to discussing new opportunities and ideas.
        </p>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all hover:shadow-xl hover:shadow-indigo-500/25 text-lg"
        >
          Get In Touch
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.section>

    </article>
  )
}