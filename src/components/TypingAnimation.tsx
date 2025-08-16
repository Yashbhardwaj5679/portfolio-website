import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation: React.FC = () => {
  const phrases = [
    "Full-Stack Development",
    "Artificial Intelligence & Machine Learning",
    "Scalable Cloud Systems",
    "Real-Time Applications"
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <div className="h-8 flex items-center">
      <span className="text-xl md:text-2xl font-light bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {currentText}
      </span>
      <motion.span
        className="ml-1 w-0.5 h-6 bg-blue-400"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default TypingAnimation;