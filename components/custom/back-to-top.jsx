"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpFromDot } from 'lucide-react'

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      const toggleVisibility = () => {
        if (window.scrollY > 100) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
  
      window.addEventListener('scroll', toggleVisibility)
      return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  
    return (
      <>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ 
                type:'spring',
                stiffness:100,
                damping:25,
                delay:0.3,
                duration:1.2
            }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-violet-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-violet-700 transition duration-300"
          >
            {/* ↑ */}
            
            <ArrowUpFromDot size={18} />
          </motion.button>
        )}
      </>
    )
}

export default BackToTop



  