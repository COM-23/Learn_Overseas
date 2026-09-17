import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, PhoneCall, Mail, MapPin } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', destination: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('http://localhost:3000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact-section" id="contact">
      <motion.div
        className="contact-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-info">
          <h2>Ready to fly?</h2>
          <p>Get in touch with our experts today. We'll help you map out your global journey.</p>

          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <PhoneCall size={20} color="var(--primary)" />
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>+91 98765 43210</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Mail size={20} color="var(--primary)" />
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>info@learnoverseas.com</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <MapPin size={20} color="var(--primary)" />
              <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>Bangalore, India</span>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91" />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <select name="destination" value={formData.destination} onChange={handleChange} required>
                  <option value="">Select a country</option>
                  <option value="UK">United Kingdom</option>
                  <option value="USA">United States</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Message (Optional)</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about your goals..."></textarea>
            </div>

            <motion.button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : (
                <>Submit Inquiry <Send size={18} /></>
              )}
            </motion.button>

            {status === 'success' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="success-msg">Thanks! We'll be in touch soon.</motion.p>}
            {status === 'error' && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-msg">Failed to send. Please try again.</motion.p>}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm;
