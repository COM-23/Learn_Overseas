import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBlogs, saveBlog, deleteBlog, getEvents, saveEvent, deleteEvent } from '../utils/adminStore';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginCreds, setLoginCreds] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('blog'); // 'blog' or 'event'
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setBlogs(getBlogs());
    setEvents(getEvents());
  }, []);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id, type) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (type === 'blog') {
        deleteBlog(id);
        setBlogs(getBlogs());
      } else {
        deleteEvent(id);
        setEvents(getEvents());
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'blog') {
      saveBlog(formData);
      setBlogs(getBlogs());
    } else {
      // Tags need to be an array
      const tagsArray = typeof formData.tags === 'string' 
        ? formData.tags.split(',').map(t => t.trim())
        : (formData.tags || []);
      
      saveEvent({ ...formData, tags: tagsArray });
      setEvents(getEvents());
    }
    
    // Reset form
    setEditingId(null);
    setFormData({});
    alert("Saved successfully!");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginCreds.user === 'admin' && loginCreds.pass === 'learn123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      // Basic image compression using canvas to avoid blowing up localStorage
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let scaleSize = 1;
        if (img.width > MAX_WIDTH) {
          scaleSize = MAX_WIDTH / img.width;
        }
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        const name = activeTab === 'blog' ? 'img' : 'image';
        setFormData(prev => ({ ...prev, [name]: dataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#020205',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-sans)', position: 'relative', zIndex: 100,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
            padding: 40, borderRadius: 16, width: '100%', maxWidth: 400, color: '#fff',
            textAlign: 'center'
          }}
        >
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 10 }}>Admin Login</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 30 }}>Secure access required</p>
          
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input 
              type="text" 
              placeholder="Username" 
              value={loginCreds.user} 
              onChange={e => setLoginCreds({...loginCreds, user: e.target.value})}
              style={inputStyle}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={loginCreds.pass} 
              onChange={e => setLoginCreds({...loginCreds, pass: e.target.value})}
              style={inputStyle}
              required 
            />
            {loginError && <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem' }}>{loginError}</div>}
            <button
              type="submit"
              style={{
                marginTop: 10, padding: '14px', background: 'var(--accent-gold)', color: '#000',
                border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020205',
      color: '#fff',
      padding: '160px 5vw 60px',
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      zIndex: 100,
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', marginBottom: '10px' }}>Admin Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>Internal Use Only. Manage Blogs and Events.</p>

        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          <button
            onClick={() => { setActiveTab('blog'); setEditingId(null); setFormData({}); }}
            style={{
              padding: '12px 24px', borderRadius: 8,
              background: activeTab === 'blog' ? 'rgba(249,212,64,0.2)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'blog' ? 'var(--accent-gold)' : '#fff',
              border: `1px solid ${activeTab === 'blog' ? 'var(--accent-gold)' : 'transparent'}`,
              cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s',
            }}
          >
            Manage Blogs
          </button>
          <button
            onClick={() => { setActiveTab('event'); setEditingId(null); setFormData({}); }}
            style={{
              padding: '12px 24px', borderRadius: 8,
              background: activeTab === 'event' ? 'rgba(249,212,64,0.2)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'event' ? 'var(--accent-gold)' : '#fff',
              border: `1px solid ${activeTab === 'event' ? 'var(--accent-gold)' : 'transparent'}`,
              cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s',
            }}
          >
            Manage Events
          </button>
        </div>

        {/* ─── FORM ─── */}
        <motion.div
          key={activeTab + (editingId || 'new')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 40, marginBottom: 40
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: 24, fontWeight: 500 }}>
            {editingId ? `Edit ${activeTab === 'blog' ? 'Blog' : 'Event'}` : `Add New ${activeTab === 'blog' ? 'Blog' : 'Event'}`}
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            <div style={{ display: 'flex', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 2 }}>
                <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Title</label>
                <input type="text" name="title" required value={formData.title || ''} onChange={handleChange}
                  style={inputStyle} placeholder="Enter title..." />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Date</label>
                <input type="text" name="date" required value={formData.date || ''} onChange={handleChange}
                  style={inputStyle} placeholder="e.g. Aug 28, 2026" />
              </div>
            </div>

            {activeTab === 'blog' ? (
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Category</label>
                  <input type="text" name="cat" required value={formData.cat || ''} onChange={handleChange}
                    style={inputStyle} placeholder="e.g. Admissions" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Read Time</label>
                  <input type="text" name="readTime" required value={formData.readTime || ''} onChange={handleChange}
                    style={inputStyle} placeholder="e.g. 4 min read" />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Location</label>
                  <input type="text" name="location" required value={formData.location || ''} onChange={handleChange}
                    style={inputStyle} placeholder="e.g. Virtual, London" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Time</label>
                  <input type="text" name="time" required value={formData.time || ''} onChange={handleChange}
                    style={inputStyle} placeholder="e.g. 10:00 AM - 4:00 PM" />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Description / Excerpt</label>
              <textarea name={activeTab === 'blog' ? 'excerpt' : 'description'} required
                value={activeTab === 'blog' ? (formData.excerpt || '') : (formData.description || '')} 
                onChange={handleChange} rows={4} style={{...inputStyle, resize: 'vertical'}}
                placeholder="Write the details here..." />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Image (URL or Upload)</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input type="text" name={activeTab === 'blog' ? 'img' : 'image'} required
                  value={activeTab === 'blog' ? (formData.img || '') : (formData.image || '')} 
                  onChange={handleChange} style={{...inputStyle, flex: 1}} placeholder="https://..." />
                
                <label style={{
                  padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap'
                }}>
                  Upload File
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {activeTab === 'event' && (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                 <label style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Tags (Comma separated)</label>
                 <input type="text" name="tags" required value={Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '')} 
                   onChange={handleChange} style={inputStyle} placeholder="e.g. STEM, Scholarships" />
               </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button
                type="submit"
                style={{
                  padding: '12px 24px', background: 'var(--accent-gold)', color: '#000',
                  border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
                }}
              >
                {editingId ? 'Update Item' : 'Add New Item'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setFormData({}); }}
                  style={{
                    padding: '12px 24px', background: 'transparent', color: '#fff',
                    border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* ─── LIST ─── */}
        <h2 style={{ fontSize: '1.5rem', marginBottom: 20, fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 10 }}>
          Existing {activeTab === 'blog' ? 'Blogs' : 'Events'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(activeTab === 'blog' ? blogs : events).map(item => (
            <div key={item.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: 12,
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>{item.date}</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button 
                  onClick={() => handleEdit(item)}
                  style={{ padding: '6px 12px', background: 'var(--accent-blue)', border: 'none', borderRadius: 6, color: '#000', cursor: 'pointer', fontWeight: 600 }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id, activeTab)}
                  style={{ padding: '6px 12px', background: 'rgba(255,50,50,0.8)', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer', fontWeight: 600 }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {(activeTab === 'blog' ? blogs : events).length === 0 && (
            <div style={{ color: 'rgba(255,255,255,0.5)' }}>No items found.</div>
          )}
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '12px 16px',
  borderRadius: 8,
  color: '#fff',
  outline: 'none',
};
