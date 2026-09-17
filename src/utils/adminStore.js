// src/utils/adminStore.js

const INITIAL_BLOGS = [
  {
    id: 1,
    date: 'Sep 01, 2026',
    readTime: '4 min read',
    cat: 'Admissions',
    catColor: 'var(--accent-gold)',
    title: "Harvard Reports Record International Student Enrollment for Class of 2030",
    excerpt: "Over 23% of incoming freshmen hail from outside the US, marking the highest international representation in the university's 390-year history.",
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=90&w=1400',
    featured: true,
  },
  {
    id: 2,
    date: 'Aug 28, 2026',
    readTime: '3 min read',
    cat: 'Policy',
    catColor: '#6c91e0',
    title: "Australia Updates Skilled Migration Points System",
    excerpt: "Critical skill shortages drive sweeping changes to the 189 and 190 visa categories, with STEM graduates now receiving a 15-point bonus.",
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=90&w=800',
    featured: false,
  },
  {
    id: 3,
    date: 'Aug 25, 2026',
    readTime: '5 min read',
    cat: 'Scholarships',
    catColor: '#52c78a',
    title: "New $50M Fund Opens for Tech Graduates Worldwide",
    excerpt: "The Luminary Tech Foundation launches a landmark scholarship for international students pursuing AI, robotics, and green energy degrees.",
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=90&w=800',
    featured: false,
  },
  {
    id: 4,
    date: 'Aug 20, 2026',
    readTime: '6 min read',
    cat: 'Campus Life',
    catColor: '#e07c6c',
    title: "Top 10 Safest University Cities in Europe Ranked for 2026",
    excerpt: "Copenhagen, Vienna, and Zürich lead the pack as students increasingly prioritise safety and quality of life when choosing their destination.",
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=90&w=800',
    featured: false,
  },
  {
    id: 5,
    date: 'Aug 18, 2026',
    readTime: '3 min read',
    cat: 'Visa',
    catColor: '#c47ed4',
    title: "Canada Adjusts Study Permit Cap — Here's What It Means for You",
    excerpt: "IRCC announces new province-specific permit allocations for 2027, significantly affecting Ontario and British Columbia intake numbers.",
    img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=90&w=800',
    featured: false,
  },
];

const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Ivy League Admissions Summit 2026',
    date: 'Oct 15, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Virtual',
    type: 'Summit',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Join former admissions officers from Harvard, Yale, and Princeton for an exclusive deep dive into crafting the perfect application strategy.',
    tags: ['Admissions', 'Ivy League', 'Strategy'],
  },
  {
    id: 2,
    title: 'London Calling: UK University Fair',
    date: 'Nov 05, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'Taj West End, Bengaluru',
    type: 'Fair',
    image: 'https://images.unsplash.com/photo-1513622470522-26c314a85ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Meet delegates from Oxford, Cambridge, LSE, and Imperial College. On-the-spot profile evaluations available for registered attendees.',
    tags: ['UK', 'Networking', 'Profile Evaluation'],
  },
  {
    id: 3,
    title: 'STEM Scholarships Masterclass',
    date: 'Nov 20, 2026',
    time: '6:00 PM - 8:00 PM',
    location: 'Virtual',
    type: 'Webinar',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Learn how to secure fully-funded master\'s degrees and PhDs in the US and Canada for Artificial Intelligence and Robotics.',
    tags: ['STEM', 'Scholarships', 'USA'],
  },
  {
    id: 4,
    title: 'Canada Student Visa Bootcamp',
    date: 'Dec 08, 2026',
    time: '11:00 AM - 2:00 PM',
    location: 'Virtual',
    type: 'Webinar',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'A step-by-step walkthrough of the Canadian student visa process, common rejection reasons, and how to build an airtight application.',
    tags: ['Canada', 'Visa', 'Immigration'],
  },
  {
    id: 5,
    title: 'Europe Bound: Masters Fair',
    date: 'Jan 12, 2027',
    time: '10:00 AM - 5:00 PM',
    location: 'The Leela, Mumbai',
    type: 'Fair',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Connect with representatives from TU Munich, ETH Zurich, and top Dutch and French universities. Scholarship and funding sessions included.',
    tags: ['Europe', 'Masters', 'Scholarships'],
  },
];

const BLOGS_KEY = 'learn_overseas_blogs';
const EVENTS_KEY = 'learn_overseas_events';

function getStored(key, initial) {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored data', e);
    }
  }
  return initial;
}

function setStored(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---------------- BLOGS ----------------
export function getBlogs() {
  return getStored(BLOGS_KEY, INITIAL_BLOGS);
}

export function saveBlog(blog) {
  let blogs = getBlogs();
  if (blog.id) {
    // Update
    blogs = blogs.map(b => (b.id === blog.id ? blog : b));
  } else {
    // Add
    blog.id = Date.now(); // mock ID
    blogs.unshift(blog);
  }
  setStored(BLOGS_KEY, blogs);
}

export function deleteBlog(id) {
  let blogs = getBlogs();
  blogs = blogs.filter(b => b.id !== id);
  setStored(BLOGS_KEY, blogs);
}

// ---------------- EVENTS ----------------
export function getEvents() {
  return getStored(EVENTS_KEY, INITIAL_EVENTS);
}

export function saveEvent(event) {
  let events = getEvents();
  if (event.id) {
    // Update
    events = events.map(e => (e.id === event.id ? event : e));
  } else {
    // Add
    event.id = Date.now();
    events.unshift(event);
  }
  setStored(EVENTS_KEY, events);
}

export function deleteEvent(id) {
  let events = getEvents();
  events = events.filter(e => e.id !== id);
  setStored(EVENTS_KEY, events);
}
