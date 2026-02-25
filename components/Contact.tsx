'use client'

import { motion, Variants } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

export default function Contact() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants: Variants = {
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
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient font-merriweather">
          Let's Connect
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and data challenges.
        </p>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {/* Contact Info Cards */}
        <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center group hover:border-indigo-500/50 transition-colors">
          <div className="bg-indigo-600/20 p-4 rounded-2xl text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <FiMail size={24} />
          </div>
          <h4 className="text-white font-bold mb-2">Email</h4>
          <a href="mailto:contact@roshish.com.np" className="text-gray-400 hover:text-indigo-400 transition-colors break-all text-sm md:text-base">
            contact@roshish.com.np
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center group hover:border-emerald-500/50 transition-colors">
          <div className="bg-emerald-600/20 p-4 rounded-2xl text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <FiPhone size={24} />
          </div>
          <h4 className="text-white font-bold mb-2">Phone</h4>
          <a href="tel:+9779810126471" className="text-gray-400 hover:text-emerald-400 transition-colors">
            +977 9810126471
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center group hover:border-purple-500/50 transition-colors">
          <div className="bg-purple-600/20 p-4 rounded-2xl text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <FiMapPin size={24} />
          </div>
          <h4 className="text-white font-bold mb-2">Location</h4>
          <p className="text-gray-400">Kathmandu, Nepal</p>
        </motion.div>
      </motion.div>

      {/* Map Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl rounded-3xl overflow-hidden glass-panel p-2 shadow-2xl"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0666763573093!2d85.29172681500904!3d27.67498338279152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1903d63b80b1%3A0xf1d20822d6e0f829!2sLalitpur%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
          width="100%"
          height="400"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.2)' }}
          allowFullScreen={false}
          loading="lazy"
          className="rounded-2xl"
        ></iframe>
      </motion.section>
    </article>
  )
}