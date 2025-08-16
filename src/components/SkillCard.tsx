import React from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  skill: string;
  proficiency: number;
  icon: React.ReactNode;
  delay: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, proficiency, icon, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
      }}
      className="group relative"
    >
      <div className="backdrop-blur-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl p-6 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="text-blue-400 group-hover:text-cyan-400 transition-colors duration-300">
            {icon}
          </div>
          <span className="text-sm font-medium text-blue-400">{proficiency}%</span>
        </div>
        <h3 className="text-white font-semibold mb-3">{skill}</h3>
        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            transition={{ duration: 1, delay: delay + 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;