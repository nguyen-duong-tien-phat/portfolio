"use client";

import { motion, Variants } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./styles/markdown-dark.css";
import "./styles/markdown-light.css";

type MarkdownContentProps = {
  content: string;
  repoBaseUrl: string;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.02 + index * 0.05, ease: "easeOut" },
  }),
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.985,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: 0.02 + index * 0.05, ease: "easeOut" },
  }),
};

export default function MarkdownContent({
  content,
  repoBaseUrl,
}: MarkdownContentProps) {
  let index = 0;

  const getIndex = () => index++;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <motion.h1
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="mt-0!"
          >
            {children}
          </motion.h1>
        ),

        h2: ({ children }) => (
          <motion.h2
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.h2>
        ),

        h3: ({ children }) => (
          <motion.h3
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.h3>
        ),

        h4: ({ children }) => (
          <motion.h4
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.h4>
        ),

        h5: ({ children }) => (
          <motion.h5
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.h5>
        ),

        h6: ({ children }) => (
          <motion.h6
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.h6>
        ),

        p: ({ children }) => (
          <motion.p
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.p>
        ),

        ul: ({ children }) => (
          <motion.ul
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.ul>
        ),

        ol: ({ children }) => (
          <motion.ol
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.ol>
        ),

        blockquote: ({ children }) => (
          <motion.blockquote
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.blockquote>
        ),

        pre: ({ children }) => (
          <motion.pre
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.pre>
        ),

        table: ({ children }) => (
          <motion.table
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {children}
          </motion.table>
        ),

        hr: () => (
          <motion.hr
            custom={getIndex()}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          />
        ),

        img: ({ src, alt }) => {
          if (!src || typeof src !== "string") return null;

          const imageSrc = src.startsWith("http")
            ? src
            : `${repoBaseUrl}/${src.replace(/^\.?\//, "")}`;

          return (
            <motion.img
              custom={getIndex()}
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              src={imageSrc}
              alt={alt ?? ""}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
