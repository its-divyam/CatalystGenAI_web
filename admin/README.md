# Catalyst Gen AI - Admin Dashboard

A powerful, modern admin dashboard for managing the Catalyst Gen AI website content. Built with vanilla JavaScript, featuring a sleek dark theme and complete CRUD functionality.

## 🚀 Features

### ✨ Complete Content Management
- **Events Management**: Schedule upcoming events with calendar integration
- **Past Events**: Showcase achievements and event history
- **Projects**: Display GitHub repositories and project showcases
- **Testimonials**: Manage student and faculty feedback
- **Resources**: Organize learning materials and links
- **Blog**: Create and publish articles with rich content

### 🎨 Modern UI/UX
- Sleek dark theme with tech-focused design
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Real-time data updates
- Toast notifications for user feedback

### 💾 Data Management
- Local storage persistence
- Export/Import functionality (JSON)
- Bulk data operations
- Data validation

### 🔗 Website Integration
- Simple JavaScript integration
- Real-time sync capabilities
- Auto-rendering functions
- Minimal setup required

## 📁 Project Structure

```
catalyst-admin/
├── admin-dashboard.html      # Main dashboard HTML
├── admin-styles.css         # Dashboard styling
├── admin-script.js          # Dashboard functionality
├── admin-integration.js     # Website integration script
└── README.md               # This file
```

## 🛠️ Setup Instructions

### 1. Dashboard Setup

1. **Upload Files**: Upload all admin dashboard files to your server
   ```
   your-domain.com/admin/
   ├── admin-dashboard.html
   ├── admin-styles.css
   ├── admin-script.js
   └── admin-integration.js
   ```

2. **Access Dashboard**: Navigate to `your-domain.com/admin/admin-dashboard.html`

3. **Start Managing**: Begin adding content through the intuitive interface

### 2. Website Integration

Add this code to your main website to display admin-managed content:

#### Step 1: Include the Integration Script

Add this to your website's HTML (before closing `</body>` tag):

```html
<!-- Catalyst Admin Integration -->
<script src="/admin/admin-integration.js"></script>
```

#### Step 2: Initialize (Optional)

Add this script to configure the integration:

```html
<script>
  // Initialize with custom settings
  CatalystAdmin.init({
    autoSync: true,
    syncInterval: 60000 // Sync every minute
  });
</script>
```

#### Step 3: Render Content

**Option A: Auto-Render All Content**
```html
<script>
  // Automatically render all content on page load
  document.addEventListener('DOMContentLoaded', () => {
    CatalystAdmin.renderAll();
  });
</script>
```

**Option B: Manual Rendering (Recommended)**
```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Render specific sections
    CatalystAdmin.renderUpcomingEvents('events-grid');
    CatalystAdmin.renderPastEvents('past-events-gallery');
    CatalystAdmin.renderProjects('projects-grid');
    CatalystAdmin.renderTestimonials('testimonials-slider');
    CatalystAdmin.renderResources('resources-grid');
    CatalystAdmin.renderBlogPosts('blog-grid', 3); // Show latest 3 posts
  });
</script>
```

### 3. HTML Container Setup

Ensure your website has these container elements with matching IDs:

```html
<!-- Events Section -->
<div class="events-grid" id="events-grid">
  <!-- Events will be populated here -->
</div>

<!-- Past Events Section -->
<div class="past-events-gallery" id="past-events-gallery">
  <!-- Past events will be populated here -->
</div>

<!-- Projects Section -->
<div class="projects-grid" id="projects-grid">
  <!-- Projects will be populated here -->
</div>

<!-- Testimonials Section (with Swiper) -->
<div class="testimonials-slider swiper" id="testimonials-slider">
  <div class="swiper-wrapper">
    <!-- Testimonials will be populated here -->
  </div>
  <div class="swiper-pagination"></div>
</div>

<!-- Resources Section -->
<div class="resources-grid" id="resources-grid">
  <!-- Resources will be populated here -->
</div>

<!-- Blog Section -->
<div class="blog-grid" id="blog-grid">
  <!-- Blog posts will be populated here -->
</div>
```

## 📋 Usage Guide

### Managing Events

1. Navigate to **Events** section
2. Click **Add Event** button
3. Fill in event details:
   - Event Name
   - Date
   - Location
   - Type (Workshop, Hackathon, etc.)
   - Description
   - Optional: Image URL
4. Click **Save Event**

The event will automatically appear on your website in the upcoming events section.

### Managing Past Events

1. Go to **Past Events & Highlights**
2. Click **Add Past Event**
3. Provide:
   - Event Name
   - Image URL (required)
   - Date (optional)
   - Description (optional)
4. Click **Save Event**

### Adding Projects

1. Navigate to **Projects Showcase**
2. Click **Add Project**
3. Enter:
   - Project Title
   - Description
   - GitHub Repository URL
   - Technologies (comma-separated)
   - Icon name (from Feather Icons)
4. Click **Save Project**

### Adding Testimonials

1. Go to **Testimonials** section
2. Click **Add Testimonial**
3. Fill in:
   - Student/Faculty Name
   - Role (e.g., "Final Year, AIML")
   - Testimonial Text
   - Profile Image URL (optional)
4. Click **Save Testimonial**

### Adding Resources

1. Navigate to **Learning Resources**
2. Click **Add Resource**
3. Provide:
   - Resource Title
   - Description
   - Resource URL (link to material)
   - Icon name
4. Click **Save Resource**

### Publishing Blog Posts

1. Go to **Blog & Articles**
2. Click **Write Article**
3. Enter:
   - Title
   - Category (Tutorial, AI News, Research, etc.)
   - Content (main article text)
   - Read Time (minutes)
   - Featured Image URL (optional)
4. Click **Publish Article**

## 🔄 Data Management

### Export Data

1. Go to **Settings** section
2. Click **Export All Data**
3. A JSON file will be downloaded with all your content

### Import Data

1. Go to **Settings**
2. Click **Import Data**
3. Select your exported JSON file
4. All data will be restored

### Clear All Data

1. Navigate to **Settings**
2. Click **Clear All Data**
3. Confirm the action (⚠️ This cannot be undone!)

## 🎯 API Reference

### Available Functions

```javascript
// Get data
CatalystAdmin.getUpcomingEvents()      // Returns array of upcoming events
CatalystAdmin.getPastEvents()          // Returns array of past events
CatalystAdmin.getProjects()            // Returns array of projects
CatalystAdmin.getTestimonials()        // Returns array of testimonials
CatalystAdmin.getResources()           // Returns array of resources
CatalystAdmin.getBlogPosts(limit)      // Returns array of blog posts

// Render to website
CatalystAdmin.renderUpcomingEvents(containerId)
CatalystAdmin.renderPastEvents(containerId)
CatalystAdmin.renderProjects(containerId)
CatalystAdmin.renderTestimonials(containerId)
CatalystAdmin.renderResources(containerId)
CatalystAdmin.renderBlogPosts(containerId, limit)

// Utility
CatalystAdmin.updateEventStats()       // Updates stat counters
CatalystAdmin.renderAll()              // Renders all content
```

### Example: Custom Integration

```javascript
// Get upcoming events and create custom HTML
const events = CatalystAdmin.getUpcomingEvents();

events.forEach(event => {
  console.log(`Event: ${event.name} on ${event.date}`);
  // Create your own custom rendering logic here
});
```

## 🔧 Customization

### Changing Colors

Edit `admin-styles.css` and modify the CSS variables:

```css
:root {
    --primary: #6366f1;        /* Primary color */
    --secondary: #8b5cf6;      /* Secondary color */
    --accent: #ec4899;         /* Accent color */
    --bg-primary: #0f0f1e;     /* Background */
    /* ... */
}
```

### Adding Custom Fields

1. Update the modal form in `admin-dashboard.html`
2. Modify the submit handler in `admin-script.js`
3. Update the render function to display new fields

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu with slide-out navigation

## 🔒 Security Considerations

### Current Implementation (LocalStorage)
- ✅ Perfect for single-user admin
- ✅ Fast and simple
- ✅ No server required
- ⚠️ Data stored in browser
- ⚠️ Not suitable for multi-user environments

### Recommended for Production

For multi-user or production environments:

1. **Add Authentication**: Implement login system
2. **Use Backend API**: Replace localStorage with database
3. **Add Validation**: Server-side data validation
4. **Implement Roles**: Admin, Editor, Viewer permissions
5. **Enable HTTPS**: Secure data transmission

Example backend integration:

```javascript
// Replace localStorage with API calls
async function saveEvent(eventData) {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventData)
  });
  return response.json();
}
```

## 🐛 Troubleshooting

### Content Not Appearing on Website

1. **Check container IDs**: Ensure HTML element IDs match
2. **Verify script inclusion**: Check admin-integration.js is loaded
3. **Check browser console**: Look for JavaScript errors
4. **Check localStorage**: Open DevTools → Application → LocalStorage

### Data Not Saving

1. **Check browser support**: Ensure localStorage is enabled
2. **Check quota**: LocalStorage has ~5-10MB limit
3. **Try different browser**: Test in incognito mode

### Icons Not Showing

1. **Verify Feather Icons**: Ensure feather-icons script is loaded
2. **Call feather.replace()**: After dynamic content loads
3. **Check icon names**: Use valid Feather icon names

## 📞 Support

For issues or questions:
- Email: catalyst.genai@jemtec.edu.in
- Instagram: @catalyst_gen.ai
- Create an issue in your repository

## 🎓 Tips for Best Results

1. **Use High-Quality Images**: Optimize images before uploading
2. **Write Clear Descriptions**: Make content engaging and informative
3. **Regular Backups**: Export data regularly
4. **Test on Mobile**: Always check mobile responsiveness
5. **Keep URLs Valid**: Verify all links work correctly
6. **Consistent Formatting**: Maintain consistent style across entries

## 📝 License

Created for Catalyst Gen AI - JIMS Engineering Management Technical Campus

---

**Built with ❤️ by Catalyst Gen AI Team**

*Version 1.0.0 - February 2026*
