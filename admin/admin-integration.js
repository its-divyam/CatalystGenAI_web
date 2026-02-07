// ===================================
// CATALYST ADMIN INTEGRATION
// Website Integration Script
// ===================================

const CatalystAdmin = (function() {
    'use strict';
    
    // Configuration
    let config = {
        apiEndpoint: null,
        autoSync: true,
        syncInterval: 60000, // 1 minute
        storagePrefix: 'catalyst_'
    };
    
    // Storage Keys (must match admin dashboard)
    const STORAGE_KEYS = {
        events: 'catalyst_events',
        pastEvents: 'catalyst_past_events',
        projects: 'catalyst_projects',
        testimonials: 'catalyst_testimonials',
        resources: 'catalyst_resources',
        blog: 'catalyst_blog'
    };
    
    /**
     * Initialize the integration
     * @param {Object} options - Configuration options
     */
    function init(options = {}) {
        config = { ...config, ...options };
        
        if (config.autoSync) {
            syncData();
            setInterval(syncData, config.syncInterval);
        }
        
        console.log('Catalyst Admin Integration initialized');
    }
    
    /**
     * Sync data from admin dashboard
     */
    function syncData() {
        // In a production environment, this would fetch from an API
        // For now, it uses localStorage (same domain) or postMessage (cross-domain)
        console.log('Syncing data...');
    }
    
    /**
     * Get upcoming events
     * @returns {Array} Array of upcoming events
     */
    function getUpcomingEvents() {
        const events = getStorageData(STORAGE_KEYS.events);
        const today = new Date();
        return events.filter(event => new Date(event.date) >= today)
                    .sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    /**
     * Get past events
     * @returns {Array} Array of past events
     */
    function getPastEvents() {
        return getStorageData(STORAGE_KEYS.pastEvents);
    }
    
    /**
     * Get all projects
     * @returns {Array} Array of projects
     */
    function getProjects() {
        return getStorageData(STORAGE_KEYS.projects);
    }
    
    /**
     * Get all testimonials
     * @returns {Array} Array of testimonials
     */
    function getTestimonials() {
        return getStorageData(STORAGE_KEYS.testimonials);
    }
    
    /**
     * Get all resources
     * @returns {Array} Array of learning resources
     */
    function getResources() {
        return getStorageData(STORAGE_KEYS.resources);
    }
    
    /**
     * Get all blog posts
     * @param {Number} limit - Optional limit for number of posts
     * @returns {Array} Array of blog posts
     */
    function getBlogPosts(limit = null) {
        const blogs = getStorageData(STORAGE_KEYS.blog);
        const sorted = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        return limit ? sorted.slice(0, limit) : sorted;
    }
    
    /**
     * Render upcoming events to the website
     * @param {String} containerId - ID of the container element
     */
    function renderUpcomingEvents(containerId = 'events-grid') {
        const events = getUpcomingEvents();
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        if (events.length === 0) {
            container.innerHTML = '<p>No upcoming events at the moment.</p>';
            return;
        }
        
        container.innerHTML = events.map(event => `
            <div class="event-card" data-aos="fade-up">
                <div class="event-tag">${event.type}</div>
                <div class="event-icon">
                    <i data-feather="${getEventIcon(event.type)}"></i>
                </div>
                ${event.image !== 'images/default-event.jpg' ? `
                    <div class="timeline-image">
                        <img src="${event.image}" alt="${event.name}">
                    </div>
                ` : ''}
                <h3 class="event-title">${event.name}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <span><i data-feather="calendar"></i> ${formatDate(event.date)}</span>
                    <span><i data-feather="map-pin"></i> ${event.location}</span>
                </div>
            </div>
        `).join('');
        
        // Reinitialize feather icons if available
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    /**
     * Render past events to the website
     * @param {String} containerId - ID of the container element
     */
    function renderPastEvents(containerId = 'past-events-gallery') {
        const pastEvents = getPastEvents();
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        container.innerHTML = pastEvents.map(event => `
            <div class="past-event-card">
                <div class="past-event-image" style="background-image: url('${event.image}')"></div>
                <h4>${event.name}</h4>
            </div>
        `).join('');
    }
    
    /**
     * Render projects to the website
     * @param {String} containerId - ID of the container element
     */
    function renderProjects(containerId = 'projects-grid') {
        const projects = getProjects();
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        container.innerHTML = projects.map(project => `
            <div class="project-card" data-aos="fade-up">
                <div class="project-header">
                    <div class="project-icon">
                        <i data-feather="${project.icon}"></i>
                    </div>
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener">
                        <i data-feather="github"></i>
                    </a>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    /**
     * Render testimonials to the website
     * @param {String} containerId - ID of the container element (Swiper wrapper)
     */
    function renderTestimonials(containerId = 'testimonials-slider') {
        const testimonials = getTestimonials();
        const container = document.querySelector(`#${containerId} .swiper-wrapper`);
        
        if (!container) {
            console.error(`Container #${containerId} .swiper-wrapper not found`);
            return;
        }
        
        container.innerHTML = testimonials.map(testimonial => `
            <div class="swiper-slide">
                <div class="testimonial-card">
                    <div class="testimonial-quote">
                        <i data-feather="quote"></i>
                    </div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <div class="testimonial-author">
                        <div class="author-image" style="background-image: url('${testimonial.image}')"></div>
                        <div class="author-info">
                            <h4>${testimonial.name}</h4>
                            <p>${testimonial.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        // Reinitialize Swiper if available
        if (typeof Swiper !== 'undefined') {
            new Swiper(`#${containerId}`, {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 5000
                }
            });
        }
    }
    
    /**
     * Render resources to the website
     * @param {String} containerId - ID of the container element
     */
    function renderResources(containerId = 'resources-grid') {
        const resources = getResources();
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        container.innerHTML = resources.map(resource => `
            <div class="resource-card" data-aos="fade-up">
                <div class="resource-icon">
                    <i data-feather="${resource.icon}"></i>
                </div>
                <h3>${resource.title}</h3>
                <p>${resource.description}</p>
                <a href="${resource.url}" class="resource-link" target="_blank" rel="noopener">
                    <span>Access Resource</span>
                    <i data-feather="arrow-right"></i>
                </a>
            </div>
        `).join('');
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    /**
     * Render blog posts to the website
     * @param {String} containerId - ID of the container element
     * @param {Number} limit - Optional limit for number of posts
     */
    function renderBlogPosts(containerId = 'blog-grid', limit = null) {
        const blogs = getBlogPosts(limit);
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        container.innerHTML = blogs.map(blog => `
            <article class="blog-card" data-aos="fade-up">
                <div class="blog-image" style="background-image: url('${blog.image}')">
                    <div class="blog-category">${blog.category}</div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i data-feather="calendar"></i> ${formatDate(blog.date)}</span>
                        <span><i data-feather="clock"></i> ${blog.readTime} min read</span>
                    </div>
                    <h3>${blog.title}</h3>
                    <p>${blog.content.substring(0, 150)}...</p>
                    <a href="#" class="blog-link">
                        <span>Read More</span>
                        <i data-feather="arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
    
    /**
     * Update event statistics on the website
     */
    function updateEventStats() {
        const events = getUpcomingEvents();
        const pastEvents = getPastEvents();
        const projects = getProjects();
        const testimonials = getTestimonials();
        
        // Update stats if elements exist
        updateElement('totalEvents', events.length);
        updateElement('totalPastEvents', pastEvents.length);
        updateElement('totalProjects', projects.length);
        updateElement('totalTestimonials', testimonials.length);
    }
    
    /**
     * Render all content automatically
     */
    function renderAll() {
        renderUpcomingEvents();
        renderPastEvents();
        renderProjects();
        renderTestimonials();
        renderResources();
        renderBlogPosts();
        updateEventStats();
        
        console.log('All content rendered from admin data');
    }
    
    // ===================================
    // HELPER FUNCTIONS
    // ===================================
    
    function getStorageData(key) {
        try {
            return JSON.parse(localStorage.getItem(key) || '[]');
        } catch (error) {
            console.error(`Error reading ${key}:`, error);
            return [];
        }
    }
    
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }
    
    function getEventIcon(type) {
        const icons = {
            'Workshop': 'terminal',
            'Hackathon': 'cpu',
            'Guest Lecture': 'mic',
            'Seminar': 'users',
            'Competition': 'award'
        };
        return icons[type] || 'calendar';
    }
    
    function updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    // Public API
    return {
        init,
        getUpcomingEvents,
        getPastEvents,
        getProjects,
        getTestimonials,
        getResources,
        getBlogPosts,
        renderUpcomingEvents,
        renderPastEvents,
        renderProjects,
        renderTestimonials,
        renderResources,
        renderBlogPosts,
        updateEventStats,
        renderAll
    };
})();

// Auto-initialize if included in page
if (typeof window !== 'undefined') {
    window.CatalystAdmin = CatalystAdmin;
    
    // Auto-render on page load if data exists
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (localStorage.getItem('catalyst_events')) {
                console.log('Auto-rendering Catalyst Admin content...');
                // Uncomment the next line to enable auto-rendering
                // CatalystAdmin.renderAll();
            }
        });
    }
}
