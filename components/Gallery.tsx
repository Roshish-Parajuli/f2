'use client'

import { motion } from 'framer-motion'
import { FiImage, FiExternalLink } from 'react-icons/fi'

export default function Gallery() {
  const images = [
    { id: 1, title: 'Data Viz Dashboard', desc: 'Real-time monitoring system', src: 'https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Cloud Infrastructure', desc: 'Highly available AWS setup', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'System Architecture', desc: 'Blueprint for scalable systems', src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Network Operations', desc: 'SLA monitoring and NOC', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Edge Computing', desc: 'Distributing compute power', src: 'https://images.unsplash.com/photo-1517433445984-df81a67c97b1?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Database Design', desc: 'Optimal schema for big data', src: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800' },
  ]

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
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient font-merriweather">
          Pixels & Passion
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Visual glimpses into the projects, architectures, and data engineering concepts I explore.
        </p>
      </motion.header>

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {images.map(image => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            className="group relative glass-panel rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="mb-2 bg-indigo-600/20 p-2 rounded-lg w-fit text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FiImage size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
              <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {image.desc}
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-indigo-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                Explore context <FiExternalLink />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </article>
  )
}
