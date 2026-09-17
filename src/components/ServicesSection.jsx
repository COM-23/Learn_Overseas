import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FileText, Compass, HeartHandshake, Briefcase, ChevronRight } from 'lucide-react';
import './ServicesSection.css';

const services = [
  { id: 'counseling', title: 'Profile Evaluation', desc: 'Deep dive into your academic background to find the perfect fit.', icon: <Compass size={32} />, color: '#FC7133' },
  { id: 'applications', title: 'Application Strategy', desc: 'Crafting compelling SOPs and ensuring flawless submissions.', icon: <FileText size={32} />, color: '#F9D440' },
  { id: 'visas', title: 'Visa Processing', desc: 'End-to-end assistance with complex visa documentation.', icon: <Briefcase size={32} />, color: '#7DC1B1' },
  { id: 'support', title: 'Post-Landing Support', desc: 'Accommodation, local banking, and networking in your new country.', icon: <HeartHandshake size={32} />, color: '#BBCDE2' },
];

const TiltCard = ({ service, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="service-tilt-card"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="tilt-card-content" style={{ transform: "translateZ(50px)" }}>
        <div className="service-icon-wrapper" style={{ background: `${service.color}15`, color: service.color }}>
          {service.icon}
        </div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.desc}</p>
        <div className="service-arrow">
          <ChevronRight size={20} />
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  return (
    <section className="services-section">
      <div className="container">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Our Core <span className="text-gradient">Services</span></h2>
          <p>Comprehensive support for your entire study abroad journey.</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <TiltCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
