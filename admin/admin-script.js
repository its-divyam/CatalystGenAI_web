// ===================================
// CATALYST GEN AI ADMIN DASHBOARD
// Main JavaScript with Full CRUD
// ===================================

// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    initializeApp();
});

// Data Storage Keys
const STORAGE_KEYS = {
    events: 'catalyst_events',
    pastEvents: 'catalyst_past_events',
    projects: 'catalyst_projects',
    testimonials: 'catalyst_testimonials',
    resources: 'catalyst_resources',
    blog: 'catalyst_blog'
};

// Initialize Application
function initializeApp() {
    // Initialize data if not exists
    Object.values(STORAGE_KEYS).forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify([]));
        }
    });
    
    // Load all data
    loadAllData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update dashboard stats
    updateDashboardStats();
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
            
            // Update active nav
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Mobile toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    mobileToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
    
    // Form submissions
    document.getElementById('eventForm')?.addEventListener('submit', handleEventSubmit);
    document.getElementById('pastEventForm')?.addEventListener('submit', handlePastEventSubmit);
    document.getElementById('projectForm')?.addEventListener('submit', handleProjectSubmit);
    document.getElementById('testimonialForm')?.addEventListener('submit', handleTestimonialSubmit);
    document.getElementById('resourceForm')?.addEventListener('submit', handleResourceSubmit);
    document.getElementById('blogForm')?.addEventListener('submit', handleBlogSubmit);
}

// Show Section
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId)?.classList.add('active');
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal?.classList.add('active');
    feather.replace();
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal?.classList.remove('active');
    
    // Reset form
    const form = modal?.querySelector('form');
    form?.reset();
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    if (type === 'error') {
        toast.style.background = 'var(--danger)';
    } else {
        toast.style.background = 'var(--success)';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
    
    feather.replace();
}

// ===================================
// EVENTS MANAGEMENT
// ===================================

function handleEventSubmit(e) {
    e.preventDefault();
    
    const event = {
        id: Date.now(),
        name: document.getElementById('eventName').value,
        date: document.getElementById('eventDate').value,
        location: document.getElementById('eventLocation').value,
        type: document.getElementById('eventType').value,
        description: document.getElementById('eventDescription').value,
        image: document.getElementById('eventImage').value || 'images/default-event.jpg'
    };
    
    const events = getStorageData(STORAGE_KEYS.events);
    events.push(event);
    setStorageData(STORAGE_KEYS.events, events);
    
    closeModal('eventModal');
    loadEvents();
    updateDashboardStats();
    showToast('Event added successfully!');
}

function loadEvents() {
    const events = getStorageData(STORAGE_KEYS.events);
    const tbody = document.getElementById('eventsTableBody');
    
    if (!tbody) return;
    
    if (events.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    <i data-feather="calendar"></i>
                    <h3>No upcoming events</h3>
                    <p>Add your first event to get started</p>
                </td>
            </tr>
        `;
        feather.replace();
        return;
    }
    
    tbody.innerHTML = events.map(event => `
        <tr>
            <td><strong>${event.name}</strong></td>
            <td>${formatDate(event.date)}</td>
            <td>${event.location}</td>
            <td><span class="event-type ${event.type.toLowerCase().replace(/\s/g, '-')}">${event.type}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon" onclick="editEvent(${event.id})" title="Edit">
                        <i data-feather="edit-2"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteEvent(${event.id})" title="Delete">
                        <i data-feather="trash-2"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    feather.replace();
}

function deleteEvent(id) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    const events = getStorageData(STORAGE_KEYS.events);
    const filtered = events.filter(event => event.id !== id);
    setStorageData(STORAGE_KEYS.events, filtered);
    
    loadEvents();
    updateDashboardStats();
    showToast('Event deleted successfully!');
}

// ===================================
// PAST EVENTS MANAGEMENT
// ===================================

function handlePastEventSubmit(e) {
    e.preventDefault();
    
    const pastEvent = {
        id: Date.now(),
        name: document.getElementById('pastEventName').value,
        image: document.getElementById('pastEventImage').value,
        date: document.getElementById('pastEventDate').value,
        description: document.getElementById('pastEventDescription').value
    };
    
    const pastEvents = getStorageData(STORAGE_KEYS.pastEvents);
    pastEvents.push(pastEvent);
    setStorageData(STORAGE_KEYS.pastEvents, pastEvents);
    
    closeModal('pastEventModal');
    loadPastEvents();
    showToast('Past event added successfully!');
}

function loadPastEvents() {
    const pastEvents = getStorageData(STORAGE_KEYS.pastEvents);
    const grid = document.getElementById('pastEventsGrid');
    
    if (!grid) return;
    
    if (pastEvents.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i data-feather="award"></i>
                <h3>No past events</h3>
                <p>Add past events to showcase your achievements</p>
            </div>
        `;
        feather.replace();
        return;
    }
    
    grid.innerHTML = pastEvents.map(event => `
        <div class="content-card">
            <img src="${event.image}" alt="${event.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%231e1e38%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%236b6b8f%22 font-size=%2216%22%3E${event.name}%3C/text%3E%3C/svg%3E'">
            <div class="content-card-body">
                <h3 class="content-card-title">${event.name}</h3>
                ${event.date ? `<p class="content-card-meta"><i data-feather="calendar"></i> ${formatDate(event.date)}</p>` : ''}
                ${event.description ? `<p class="content-card-text">${event.description}</p>` : ''}
            </div>
            <div class="content-card-actions">
                <button class="btn-icon" onclick="deletePastEvent(${event.id})" title="Delete">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    feather.replace();
}

function deletePastEvent(id) {
    if (!confirm('Are you sure you want to delete this past event?')) return;
    
    const pastEvents = getStorageData(STORAGE_KEYS.pastEvents);
    const filtered = pastEvents.filter(event => event.id !== id);
    setStorageData(STORAGE_KEYS.pastEvents, filtered);
    
    loadPastEvents();
    showToast('Past event deleted successfully!');
}

// ===================================
// PROJECTS MANAGEMENT
// ===================================

function handleProjectSubmit(e) {
    e.preventDefault();
    
    const project = {
        id: Date.now(),
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        github: document.getElementById('projectGithub').value,
        tags: document.getElementById('projectTags').value.split(',').map(tag => tag.trim()),
        icon: document.getElementById('projectIcon').value || 'code'
    };
    
    const projects = getStorageData(STORAGE_KEYS.projects);
    projects.push(project);
    setStorageData(STORAGE_KEYS.projects, projects);
    
    closeModal('projectModal');
    loadProjects();
    updateDashboardStats();
    showToast('Project added successfully!');
}

function loadProjects() {
    const projects = getStorageData(STORAGE_KEYS.projects);
    const grid = document.getElementById('projectsGrid');
    
    if (!grid) return;
    
    if (projects.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i data-feather="code"></i>
                <h3>No projects</h3>
                <p>Add projects to showcase your work</p>
            </div>
        `;
        feather.replace();
        return;
    }
    
    grid.innerHTML = projects.map(project => `
        <div class="content-card">
            <div class="content-card-body">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2)); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-light);">
                        <i data-feather="${project.icon}"></i>
                    </div>
                    <a href="${project.github}" target="_blank" rel="noopener" style="color: var(--text-secondary); transition: var(--transition);">
                        <i data-feather="github"></i>
                    </a>
                </div>
                <h3 class="content-card-title">${project.title}</h3>
                <p class="content-card-text">${project.description}</p>
                <div style="margin-top: 1rem;">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="content-card-actions">
                <button class="btn-icon" onclick="deleteProject(${project.id})" title="Delete">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    feather.replace();
}

function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const projects = getStorageData(STORAGE_KEYS.projects);
    const filtered = projects.filter(project => project.id !== id);
    setStorageData(STORAGE_KEYS.projects, filtered);
    
    loadProjects();
    updateDashboardStats();
    showToast('Project deleted successfully!');
}

// ===================================
// TESTIMONIALS MANAGEMENT
// ===================================

function handleTestimonialSubmit(e) {
    e.preventDefault();
    
    const testimonial = {
        id: Date.now(),
        name: document.getElementById('testimonialName').value,
        role: document.getElementById('testimonialRole').value,
        text: document.getElementById('testimonialText').value,
        image: document.getElementById('testimonialImage').value || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%234f46e5%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2240%22%3E' + document.getElementById('testimonialName').value.charAt(0) + '%3C/text%3E%3C/svg%3E'
    };
    
    const testimonials = getStorageData(STORAGE_KEYS.testimonials);
    testimonials.push(testimonial);
    setStorageData(STORAGE_KEYS.testimonials, testimonials);
    
    closeModal('testimonialModal');
    loadTestimonials();
    updateDashboardStats();
    showToast('Testimonial added successfully!');
}

function loadTestimonials() {
    const testimonials = getStorageData(STORAGE_KEYS.testimonials);
    const grid = document.getElementById('testimonialsGrid');
    
    if (!grid) return;
    
    if (testimonials.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i data-feather="message-square"></i>
                <h3>No testimonials</h3>
                <p>Add testimonials from students and faculty</p>
            </div>
        `;
        feather.replace();
        return;
    }
    
    grid.innerHTML = testimonials.map(testimonial => `
        <div class="content-card">
            <div class="content-card-body">
                <div style="margin-bottom: 1rem; color: var(--primary-light);">
                    <i data-feather="quote"></i>
                </div>
                <p class="content-card-text" style="font-style: italic; margin-bottom: 1.5rem;">"${testimonial.text}"</p>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="${testimonial.image}" alt="${testimonial.name}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">
                    <div>
                        <h4 style="font-weight: 600; margin-bottom: 0.25rem;">${testimonial.name}</h4>
                        <p style="color: var(--text-muted); font-size: 0.875rem;">${testimonial.role}</p>
                    </div>
                </div>
            </div>
            <div class="content-card-actions">
                <button class="btn-icon" onclick="deleteTestimonial(${testimonial.id})" title="Delete">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    feather.replace();
}

function deleteTestimonial(id) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    const testimonials = getStorageData(STORAGE_KEYS.testimonials);
    const filtered = testimonials.filter(testimonial => testimonial.id !== id);
    setStorageData(STORAGE_KEYS.testimonials, filtered);
    
    loadTestimonials();
    updateDashboardStats();
    showToast('Testimonial deleted successfully!');
}

// ===================================
// RESOURCES MANAGEMENT
// ===================================

function handleResourceSubmit(e) {
    e.preventDefault();
    
    const resource = {
        id: Date.now(),
        title: document.getElementById('resourceTitle').value,
        description: document.getElementById('resourceDescription').value,
        url: document.getElementById('resourceURL').value,
        icon: document.getElementById('resourceIcon').value || 'book-open'
    };
    
    const resources = getStorageData(STORAGE_KEYS.resources);
    resources.push(resource);
    setStorageData(STORAGE_KEYS.resources, resources);
    
    closeModal('resourceModal');
    loadResources();
    showToast('Resource added successfully!');
}

function loadResources() {
    const resources = getStorageData(STORAGE_KEYS.resources);
    const grid = document.getElementById('resourcesGrid');
    
    if (!grid) return;
    
    if (resources.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i data-feather="book-open"></i>
                <h3>No resources</h3>
                <p>Add learning resources for students</p>
            </div>
        `;
        feather.replace();
        return;
    }
    
    grid.innerHTML = resources.map(resource => `
        <div class="content-card">
            <div class="content-card-body">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2)); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-light); margin-bottom: 1rem;">
                    <i data-feather="${resource.icon}"></i>
                </div>
                <h3 class="content-card-title">${resource.title}</h3>
                <p class="content-card-text">${resource.description}</p>
                <a href="${resource.url}" target="_blank" rel="noopener" style="color: var(--primary-light); text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 500;">
                    <span>Access Resource</span>
                    <i data-feather="arrow-right"></i>
                </a>
            </div>
            <div class="content-card-actions">
                <button class="btn-icon" onclick="deleteResource(${resource.id})" title="Delete">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    feather.replace();
}

function deleteResource(id) {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    
    const resources = getStorageData(STORAGE_KEYS.resources);
    const filtered = resources.filter(resource => resource.id !== id);
    setStorageData(STORAGE_KEYS.resources, filtered);
    
    loadResources();
    showToast('Resource deleted successfully!');
}

// ===================================
// BLOG MANAGEMENT
// ===================================

function handleBlogSubmit(e) {
    e.preventDefault();
    
    const blog = {
        id: Date.now(),
        title: document.getElementById('blogTitle').value,
        category: document.getElementById('blogCategory').value,
        content: document.getElementById('blogContent').value,
        readTime: document.getElementById('blogReadTime').value || '5',
        image: document.getElementById('blogImage').value || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%231e1e38%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%236b6b8f%22 font-size=%2216%22%3EBlog%20Post%3C/text%3E%3C/svg%3E',
        date: new Date().toISOString()
    };
    
    const blogs = getStorageData(STORAGE_KEYS.blog);
    blogs.push(blog);
    setStorageData(STORAGE_KEYS.blog, blogs);
    
    closeModal('blogModal');
    loadBlogs();
    updateDashboardStats();
    showToast('Blog post published successfully!');
}

function loadBlogs() {
    const blogs = getStorageData(STORAGE_KEYS.blog);
    const grid = document.getElementById('blogGrid');
    
    if (!grid) return;
    
    if (blogs.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i data-feather="file-text"></i>
                <h3>No blog posts</h3>
                <p>Write your first article to get started</p>
            </div>
        `;
        feather.replace();
        return;
    }
    
    grid.innerHTML = blogs.map(blog => `
        <div class="content-card">
            <img src="${blog.image}" alt="${blog.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%231e1e38%22 width=%22400%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%236b6b8f%22 font-size=%2216%22%3E${blog.title}%3C/text%3E%3C/svg%3E'">
            <div class="content-card-body">
                <span class="tag">${blog.category}</span>
                <h3 class="content-card-title">${blog.title}</h3>
                <p class="content-card-text">${blog.content.substring(0, 120)}...</p>
                <div class="content-card-meta">
                    <span><i data-feather="calendar"></i> ${formatDate(blog.date)}</span>
                    <span><i data-feather="clock"></i> ${blog.readTime} min read</span>
                </div>
            </div>
            <div class="content-card-actions">
                <button class="btn-icon" onclick="deleteBlog(${blog.id})" title="Delete">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    feather.replace();
}

function deleteBlog(id) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    const blogs = getStorageData(STORAGE_KEYS.blog);
    const filtered = blogs.filter(blog => blog.id !== id);
    setStorageData(STORAGE_KEYS.blog, filtered);
    
    loadBlogs();
    updateDashboardStats();
    showToast('Blog post deleted successfully!');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function getStorageData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

// Add this helper function after setStorageData()
function setStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    // Trigger storage event manually for same-tab updates
    window.dispatchEvent(new StorageEvent('storage', {
        key: key,
        newValue: JSON.stringify(data),
        url: window.location.href
    }));
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function updateDashboardStats() {
    document.getElementById('totalEvents').textContent = getStorageData(STORAGE_KEYS.events).length;
    document.getElementById('totalProjects').textContent = getStorageData(STORAGE_KEYS.projects).length;
    document.getElementById('totalTestimonials').textContent = getStorageData(STORAGE_KEYS.testimonials).length;
    document.getElementById('totalBlogs').textContent = getStorageData(STORAGE_KEYS.blog).length;
}

function loadAllData() {
    loadEvents();
    loadPastEvents();
    loadProjects();
    loadTestimonials();
    loadResources();
    loadBlogs();
}

// ===================================
// DATA EXPORT/IMPORT
// ===================================

function exportAllData() {
    const allData = {
        events: getStorageData(STORAGE_KEYS.events),
        pastEvents: getStorageData(STORAGE_KEYS.pastEvents),
        projects: getStorageData(STORAGE_KEYS.projects),
        testimonials: getStorageData(STORAGE_KEYS.testimonials),
        resources: getStorageData(STORAGE_KEYS.resources),
        blog: getStorageData(STORAGE_KEYS.blog),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `catalyst-admin-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showToast('Data exported successfully!');
}



function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            // Validate data structure
            if (!data.events || !data.projects) {
                throw new Error('Invalid data format');
            }
            
            // Import all data
            Object.keys(STORAGE_KEYS).forEach(key => {
                const storageKey = STORAGE_KEYS[key];
                const dataKey = key;
                if (data[dataKey]) {
                    setStorageData(storageKey, data[dataKey]);
                }
            });
            
            loadAllData();
            updateDashboardStats();
            showToast('Data imported successfully!');
        } catch (error) {
            showToast('Error importing data: Invalid file format', 'error');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (!confirm('Are you sure you want to clear ALL data? This action cannot be undone!')) return;
    
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.setItem(key, JSON.stringify([]));
    });
    
    loadAllData();
    updateDashboardStats();
    showToast('All data cleared successfully!');
}

function copyIntegrationCode() {
    const code = document.getElementById('integrationCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Integration code copied to clipboard!');
    });
}

// Export data button
document.getElementById('exportData')?.addEventListener('click', exportAllData);


