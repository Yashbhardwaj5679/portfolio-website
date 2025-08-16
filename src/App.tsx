import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Download, Mail, Phone, Github, Linkedin, 
  Menu, X, Code, Database, Brain, Server, Cpu, 
  Calendar, MapPin, GraduationCap, Award
} from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import TypingAnimation from './components/TypingAnimation';
import GlassCard from './components/GlassCard';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import  Mypic from './assets/mypic.jpg';
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setShowEasterEgg(true);
      }
      if (e.key === 'Escape') {
        setShowEasterEgg(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    { name: 'Python', proficiency: 90, icon: <Code size={24} /> },
    { name: 'JavaScript', proficiency: 85, icon: <Code size={24} /> },
    { name: 'React.js', proficiency: 88, icon: <Server size={24} /> },
    { name: 'Node.js', proficiency: 82, icon: <Server size={24} /> },
    { name: 'Machine Learning', proficiency: 80, icon: <Brain size={24} /> },
    { name: 'MongoDB', proficiency: 75, icon: <Database size={24} /> },
    { name: 'Java', proficiency: 78, icon: <Code size={24} /> },
    { name: 'C/C++', proficiency: 80, icon: <Cpu size={24} /> }
  ];

  if (isLoading) {
    return (
      <AnimatePresence>
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-x-hidden">
      <ParticleBackground darkMode={darkMode} />
      <ScrollProgress />

      {/* Easter Egg Search */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Quick Search</h3>
              <input
                type="text"
                placeholder="Search skills, projects..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <p className="text-gray-400 text-sm mt-2">Press Ctrl+K to open, Escape to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-40 backdrop-blur-lg bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-white"
            >
              Yash Bhardwaj
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 relative ${
                    activeSection === item.id
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg backdrop-blur-lg bg-white/10 text-yellow-400 hover:bg-white/20 transition-all"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg backdrop-blur-lg bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden backdrop-blur-lg bg-white/5 border-t border-white/10"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === item.id
                        ? 'text-blue-400 bg-blue-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Animated Avatar */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative mx-auto w-40 h-40"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 flex items-center justify-center text-white text-5xl font-bold shadow-2xl relative overflow-hidden">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 40px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                />
                YB
              </div>
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-4 text-white"
              >
                Yash Bhardwaj
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl mb-6 text-gray-300"
              >
                B.Tech Student | Full-Stack Developer | AI/ML Enthusiast
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mb-8"
              >
                <TypingAnimation />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-400 mb-8"
              >
                Passionate about building scalable, user-focused solutions and solving real-world problems through clean code and innovation.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-2xl hover:shadow-blue-500/25"
              >
                <Download className="mr-2" size={20} />
                Download Resume
              </motion.a>
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 backdrop-blur-lg bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all shadow-2xl border border-white/20"
              >
                <Mail className="mr-2" size={20} />
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard delay={0.2}>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <GraduationCap className="text-blue-400 mr-3" size={28} />
                  <h3 className="text-2xl font-bold text-white">Education</h3>
                </div>
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="border-l-4 border-blue-400 pl-4"
                  >
                    <h4 className="text-lg font-semibold text-blue-400">
                      B.Tech in Electronics & Communication Engineering
                    </h4>
                    <p className="text-gray-300">Minor in AI/ML • VIT-AP University (2023–2027)</p>
                    <div className="flex items-center mt-2">
                      <Award className="text-yellow-400 mr-2" size={16} />
                      <span className="text-yellow-400 font-medium">GPA: 8.15</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="border-l-4 border-purple-400 pl-4"
                  >
                    <h4 className="text-lg font-semibold text-purple-400">
                      Senior Secondary Education
                    </h4>
                    <p className="text-gray-300">Non-Medical • Aggarsain Public School (2022–2023)</p>
                    <div className="flex items-center mt-2">
                      <Award className="text-yellow-400 mr-2" size={16} />
                      <span className="text-yellow-400 font-medium">GPA: 81%</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </GlassCard>

            <GlassCard delay={0.4}>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Soft Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Problem-solving', 'Analytical Thinking', 'Creativity', 'Self-Motivation'].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-center border border-blue-500/30"
                    >
                      <span className="font-medium text-blue-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            Technical Arsenal
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill.name}
                proficiency={skill.proficiency}
                icon={skill.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title="PollIt++ — Real-Time Polling Platform"
              description="Engineered a scalable real-time polling application with microservice architecture, handling 10k+ concurrent users with sub-200ms latency."
              longDescription="A comprehensive real-time polling platform built with modern microservice architecture. Features include live vote streaming, event-driven architecture with Kafka, containerized deployment with Docker & Kubernetes, and comprehensive CI/CD pipeline. The system is optimized for high concurrency and low latency, with advanced caching strategies and load balancing."
              technologies={['Node.js', 'Express', 'Socket.IO', 'Kafka', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'GitHub Actions']}
              githubUrl="https://github.com/Yashbhardwaj5679"
              delay={0.2}
            />
            <ProjectCard
              title="Advanced Todo List Web Application"
              description="Full-stack task manager with responsive UI, drag-and-drop functionality, category filtering, offline support, and real-time synchronization."
              longDescription="A feature-rich task management application showcasing modern web development practices. Includes drag-and-drop task organization, offline functionality with service workers, real-time updates, advanced filtering and search capabilities, and responsive design optimized for all devices. Deployed with automated CI/CD pipeline."
              technologies={['React.js', 'JavaScript', 'CSS3', 'Service Workers', 'GitHub Pages', 'Responsive Design']}
              githubUrl="https://github.com/Yashbhardwaj5679/TodoList.git"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            Experience & Leadership
          </motion.h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <div className="space-y-12">
              {[
                {
                  title: "Machine Learning Club, VIT-AP",
                  role: "Event Management Member",
                  period: "Nov 2024 – Present",
                  description: "Organized ML workshops and contests for 100+ participants, fostering learning and collaboration in the AI/ML community.",
                  icon: <Brain size={24} />
                },
                {
                  title: "IETE Student Chapter, VIT-AP",
                  role: "Event Management Member", 
                  period: "Jun 2024 – Present",
                  description: "Spearheaded planning and execution of tech events and workshops, enhancing the technical community experience.",
                  icon: <Cpu size={24} />
                }
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <GlassCard hover={false}>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <div className="text-blue-400 mr-3">{exp.icon}</div>
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        </div>
                        <p className="text-blue-400 font-medium mb-2">{exp.role}</p>
                        <div className="flex items-center text-gray-400 text-sm mb-3">
                          <Calendar size={14} className="mr-1" />
                          {exp.period}
                        </div>
                        <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                      </div>
                    </GlassCard>
                  </div>
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900"
                    />
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            Let's Connect
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard delay={0.2}>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Mail size={24} />, text: "yash.23bec7036@vitapstudent.ac.in", href: "mailto:yash.23bec7036@vitapstudent.ac.in" },
                    { icon: <Phone size={24} />, text: "+91 98137 78404", href: "tel:+919813778404" },
                    { icon: <Linkedin size={24} />, text: "LinkedIn Profile", href: "https://www.linkedin.com/in/yash-bhardwaj-b28828290" },
                    { icon: <Github size={24} />, text: "GitHub Profile", href: "https://github.com/Yashbhardwaj5679" }
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-blue-400/50"
                    >
                      <div className="text-blue-400 mr-4 group-hover:text-cyan-400 transition-colors">
                        {contact.icon}
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {contact.text}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </GlassCard>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-gray-400"
          >
            © 2024 Yash Bhardwaj. Crafted with React, Framer Motion & Modern Web Technologies.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-sm mt-2"
          >
            Press Ctrl+K for quick search
          </motion.p>
        </div>
      </footer>
    </div>
  );
}

export default App;