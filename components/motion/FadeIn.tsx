"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"

interface FadeInVerticalProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}
interface FadeInHorizontalProps {
  children: ReactNode
  className?: string
  delay?: number
  x?: number
}

// Wrap any section:
// ...

// Fires once when ~15% scrolled into view, never replays.
export function FadeInVertical({
  children,
  className,
  delay = 0,
  y = 24,
}: FadeInVerticalProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
export function FadeInHorizontal({
  children,
  className,
  delay = 0,
  x = 24,
}: FadeInHorizontalProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
