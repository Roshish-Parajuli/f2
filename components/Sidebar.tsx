'use client'

import { useState } from 'react'
import {
  FiMail,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiFileText,
  FiBriefcase,
  FiImage,
  FiMessageSquare,
  FiPenTool
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'About', icon: <FiUser />, path: '/' },
    { name: 'Resume', icon: <FiFileText />, path: '/resume' },
    { name: 'Portfolio', icon: <FiBriefcase />, path: '/portfolio' },
    { name: 'Blog', icon: <FiPenTool />, path: '/blog' },
    { name: 'Gallery', icon: <FiImage />, path: '/gallery' },
    { name: 'Contact', icon: <FiMessageSquare />, path: '/contact' }
  ]

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`
        relative h-screen
        transition-all duration-500 ease-in-out
        border-r border-white/10
        glass-panel
        flex flex-col
        z-50
        ${collapsed ? 'w-20' : 'w-72'}
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute -right-3 top-8
          w-6 h-6 rounded-full
          bg-indigo-600 text-white
          flex items-center justify-center
          shadow-lg shadow-indigo-500/40
          hover:scale-110 transition-transform
          z-50
        "
        aria-label="Toggle sidebar"
      >
        {collapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
      </button>

      {/* Profile Section */}
      <Link href="/" className="group">
        <div className={`p-6 flex flex-col items-center transition-all duration-500 ${collapsed ? 'py-8' : ''}`}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <figure className={`relative rounded-full overflow-hidden border-2 border-black transition-all duration-500 ${collapsed ? 'w-10 h-10' : 'w-24 h-24'}`}>
              <img 
                src="/me.jpeg" 
                alt="Roshish Parajuli" 
                className="w-full h-full object-cover"
              />
            </figure>
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center mt-4 overflow-hidden"
              >
                <h1 className="text-xl font-bold text-white font-merriweather tracking-tight group-hover:text-indigo-400 transition-colors">
                  Roshish Parajuli
                </h1>
                <p className="text-xs text-indigo-400 font-mono mt-1 uppercase tracking-widest">
                  Data Engineer
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2">
          {navItems.map(item => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`
                    w-full flex items-center
                    ${collapsed ? 'justify-center' : 'justify-start'}
                    gap-4 px-4 py-3 rounded-xl
                    text-sm font-medium
                    transition-all duration-300
                    group relative overflow-hidden
                    ${isActive
                      ? 'text-white bg-indigo-600/20 border border-indigo-500/30 shadow-inner'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                  title={collapsed ? item.name : ''}
                >
                  <span className={`text-xl transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400'}`}>
                    {item.icon}
                  </span>
                  
                  {!collapsed && (
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                      {item.name}
                    </span>
                  )}
                  
                  {isActive && !collapsed && (
                     <motion.div 
                       layoutId="active-nav"
                       className="absolute inset-0 bg-indigo-600/10 rounded-xl" 
                       transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                     />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        {!collapsed ? (
          <div className="text-xs text-gray-500 flex flex-col gap-3">
             <div className="flex items-center gap-3 hover:text-indigo-400 transition-colors cursor-pointer">
              <FiMail className="text-lg" />
              <span className="truncate">contact@roshish.com.np</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="text-lg text-emerald-500" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex gap-4 mt-2 justify-center">
              <a href="https://np.linkedin.com/in/roshish-parajuli-60abb7210" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-indigo-600 hover:text-white transition-all">
                <FiLinkedin size={16} />
              </a>
              <a href="https://github.com/Roshish-Parajuli" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-gray-700 hover:text-white transition-all">
                <FiGithub size={16} />
              </a>
            </div>
          </div>
        ) : (
           <div className="flex flex-col items-center gap-4 text-gray-500">
             <FiMail className="hover:text-indigo-400 cursor-pointer" />
             <FiGithub className="hover:text-white cursor-pointer" />
           </div>
        )}
      </div>
    </motion.aside >
  )
}