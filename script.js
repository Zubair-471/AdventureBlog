// Blog post data
const posts = [
    {
        id: 1,
        title: 'The Future of Artificial Intelligence in 2024',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        description: 'Explore the latest developments in AI technology and how they\'re shaping our digital future.',
        date: '2024-01-15',
        category: 'tech',
        readTime: '5 min read',
        author: 'Sarah Chen'
    },
    {
        id: 2,
        title: 'Hidden Gems: A Journey Through Southeast Asia',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        description: 'Discover the lesser-known destinations in Southeast Asia that will take your breath away.',
        date: '2024-01-12',
        category: 'travel',
        readTime: '8 min read',
        author: 'Mike Rodriguez'
    },
    {
        id: 3,
        title: 'The Art of French Pastry: Croissants at Home',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop',
        description: 'Master the delicate art of making authentic French croissants in your own kitchen.',
        date: '2024-01-10',
        category: 'food',
        readTime: '12 min read',
        author: 'Emma Laurent'
    },
    {
        id: 4,
        title: 'Web Development Trends That Will Dominate 2024',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
        description: 'Stay ahead of the curve with these emerging web development technologies.',
        date: '2024-01-08',
        category: 'tech',
        readTime: '6 min read',
        author: 'David Kim'
    },
    {
        id: 5,
        title: 'Adventure in the Swiss Alps: A Hiker\'s Paradise',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        description: 'Experience the breathtaking beauty of the Swiss Alps through this hiking guide.',
        date: '2024-01-05',
        category: 'travel',
        readTime: '10 min read',
        author: 'Lisa Thompson'
    },
    {
        id: 6,
        title: 'Mediterranean Diet: Healthy and Delicious Recipes',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
        description: 'Explore the health benefits of Mediterranean cuisine with authentic recipes.',
        date: '2024-01-03',
        category: 'food',
        readTime: '7 min read',
        author: 'Maria Santos'
    },
    {
        id: 7,
        title: 'Cybersecurity Essentials for Small Businesses',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
        description: 'Protect your business with these essential cybersecurity practices.',
        date: '2023-12-28',
        category: 'tech',
        readTime: '9 min read',
        author: 'Alex Johnson'
    },
    {
        id: 8,
        title: 'Exploring Japan: From Tokyo to Kyoto',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
        description: 'A comprehensive travel guide to Japan\'s most iconic cities.',
        date: '2023-12-25',
        category: 'travel',
        readTime: '11 min read',
        author: 'Yuki Tanaka'
    },
    {
        id: 9,
        title: 'Plant-Based Cooking: Delicious Vegan Recipes',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
        description: 'Discover the joy of plant-based cooking with these vegan recipes.',
        date: '2023-12-22',
        category: 'food',
        readTime: '8 min read',
        author: 'Sophie Green'
    },
    {
        id: 10,
        title: 'The Rise of Edge Computing in IoT',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
        description: 'Understand how edge computing is transforming the Internet of Things.',
        date: '2023-12-20',
        category: 'tech',
        readTime: '7 min read',
        author: 'Robert Chen'
    },
    {
        id: 11,
        title: 'Safari Adventure in Kenya: Wildlife Photography',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&h=400&fit=crop',
        description: 'Capture the magic of African wildlife through your lens.',
        date: '2023-12-18',
        category: 'travel',
        readTime: '9 min read',
        author: 'James Wilson'
    },
    {
        id: 12,
        title: 'Artisan Bread Making: From Sourdough to Baguettes',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
        description: 'Master the art of bread making with traditional techniques.',
        date: '2023-12-15',
        category: 'food',
        readTime: '15 min read',
        author: 'Pierre Dubois'
    }
];

// Configuration
const POSTS_PER_PAGE = 6;
let currentPage = 1;
let currentCategory = 'all';
let searchQuery = '';

// DOM Elements
const blogPosts = document.getElementById('blog-posts');
const loadMoreBtn = document.getElementById('load-more');
const categoryBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const resultsCount = document.getElementById('results-count');
const loadingSpinner = document.getElementById('loading-spinner');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const scrollProgress = document.getElementById('scroll-progress');

// Create preloader
const preloader = document.createElement('div');
preloader.className = 'content-preloader';
preloader.innerHTML = '<div class="preloader-spinner"></div>';
document.body.appendChild(preloader);

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Simple scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Update scroll progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading states
function showLoading() {
    loadingSpinner.style.display = 'flex';
    loadMoreBtn.style.display = 'none';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
    loadMoreBtn.style.display = 'inline-flex';
}

// Update results count
function updateResultsCount(filteredPosts, totalPosts) {
    if (searchQuery && currentCategory !== 'all') {
        resultsCount.textContent = `Showing ${filteredPosts.length} of ${totalPosts} posts (filtered by "${currentCategory}" and "${searchQuery}")`;
    } else if (searchQuery) {
        resultsCount.textContent = `Showing ${filteredPosts.length} of ${totalPosts} posts (filtered by "${searchQuery}")`;
    } else if (currentCategory !== 'all') {
        resultsCount.textContent = `Showing ${filteredPosts.length} of ${totalPosts} posts (filtered by "${currentCategory}")`;
    } else {
        resultsCount.textContent = `Showing ${filteredPosts.length} of ${totalPosts} posts`;
    }
}

// Show empty state
function showEmptyState() {
    blogPosts.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-search"></i>
            <h3>No posts found</h3>
            <p>Try adjusting your search terms or category filter</p>
        </div>
    `;
}

// Image loading
function handleImageLoad(img) {
    img.classList.remove('loading');
    img.classList.add('loaded');
}

function handleImageError(img) {
    img.onerror = null;
    img.src = `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop&crop=center`;
    img.alt = 'Image not available';
    img.classList.remove('loading');
    img.classList.add('loaded');
}

// Load images
function loadImages() {
    const images = document.querySelectorAll('.post-image');
    images.forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', () => handleImageLoad(img));
        img.addEventListener('error', () => handleImageError(img));
    });
}

// Main render function
function renderPosts() {
    showLoading();
    
    setTimeout(() => {
        const filteredPosts = posts.filter(post => {
            const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                post.author.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        const start = (currentPage - 1) * POSTS_PER_PAGE;
        const end = start + POSTS_PER_PAGE;
        const paginatedPosts = filteredPosts.slice(0, end);

        updateResultsCount(paginatedPosts, filteredPosts.length);

        if (paginatedPosts.length === 0) {
            showEmptyState();
        } else {
            blogPosts.innerHTML = paginatedPosts.map(post => `
                <article class="post-card" data-category="${post.category}">
                    <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
                    <div class="post-content">
                        <span class="post-category ${post.category}">${post.category}</span>
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-description">${post.description}</p>
                        <div class="post-meta">
                            <span class="post-date">
                                <i class="fas fa-calendar-alt"></i>
                                ${formatDate(post.date)}
                            </span>
                            <span class="read-time">
                                <i class="fas fa-clock"></i>
                                ${post.readTime}
                            </span>
                        </div>
                        <div class="post-author">
                            <i class="fas fa-user"></i>
                            ${post.author}
                        </div>
                    </div>
                </article>
            `).join('');
        }

        loadMoreBtn.style.display = (end < filteredPosts.length) ? 'inline-flex' : 'none';
        
        hideLoading();
        loadImages();
    }, 200);
}

// Event Listeners
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentCategory = btn.dataset.category;
        currentPage = 1;
        
        scrollToTop();
        renderPosts();
    });
});

// Search functionality
const debouncedSearch = debounce((query) => {
    searchQuery = query;
    currentPage = 1;
    renderPosts();
}, 300);

searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    debouncedSearch(query);
    clearSearchBtn.style.display = query ? 'block' : 'none';
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    currentPage = 1;
    clearSearchBtn.style.display = 'none';
    renderPosts();
});

// Load more
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    renderPosts();
    
    setTimeout(() => {
        const newPosts = blogPosts.children[blogPosts.children.length - POSTS_PER_PAGE];
        if (newPosts) {
            newPosts.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 300);
});

// Keyboard navigation
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchInput.value = '';
        searchQuery = '';
        currentPage = 1;
        clearSearchBtn.style.display = 'none';
        renderPosts();
    }
});

// Click interactions
document.addEventListener('click', (e) => {
    if (e.target.closest('.post-card')) {
        const card = e.target.closest('.post-card');
        const title = card.querySelector('.post-title').textContent;
        
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        console.log(`Clicked on: ${title}`);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.classList.contains('filter-btn')) {
        document.activeElement.click();
    }
});

// Scroll to top button
scrollToTopBtn.addEventListener('click', () => {
    scrollToTop();
});

// Scroll events
let ticking = false;
function updateScrollElements() {
    updateScrollProgress();
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollElements);
        ticking = true;
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    preloader.style.display = 'flex';
    
    renderPosts();
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 800);
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});