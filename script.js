document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    if (savedTheme === 'dark') {
        mobileThemeToggle.checked = true;
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        mobileThemeToggle.checked = newTheme === 'dark';
    });
    
    mobileThemeToggle.addEventListener('change', () => {
        const newTheme = mobileThemeToggle.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.style.right = '0';
    });
    
    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.style.right = '-100%';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu-content a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.right = '-100%';
        });
    });

    // Hero Video Playback Control
    const heroVideo = document.getElementById('heroVideo');
    
    // Ensure video plays on mobile (with muted autoplay)
    function playVideo() {
        heroVideo.play().catch(error => {
            console.log('Video autoplay prevented:', error);
        });
    }
    
    // Try to play video when page loads
    playVideo();
    
    // Try to play video when user interacts with page
    document.addEventListener('click', playVideo, { once: true });

    // Project Showcase
    const showcaseGrid = document.querySelector('.showcase-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMoreProjects');
    let visibleProjects = 6;
    
    // Sample project data (in a real app, this would come from an API)
    const projects = [
        {
            id: 1,
            title: 'Summer Campaign 2023',
            category: 'commercial',
            image: 'https://via.placeholder.com/600x400?text=Summer+Campaign',
            description: 'A vibrant summer campaign for a leading fashion brand featuring beach scenes and urban settings.'
        },
        {
            id: 2,
            title: 'The Last Sunset',
            category: 'narrative',
            image: 'https://via.placeholder.com/600x400?text=The+Last+Sunset',
            description: 'A short film exploring the final days of a relationship through poetic visuals and minimal dialogue.'
        },
        {
            id: 3,
            title: 'Urban Explorers',
            category: 'documentary',
            image: 'https://via.placeholder.com/600x400?text=Urban+Explorers',
            description: 'Documentary series following urban explorers as they uncover hidden spaces in major cities.'
        },
        {
            id: 4,
            title: 'Midnight Dreams',
            category: 'music-video',
            image: 'https://via.placeholder.com/600x400?text=Midnight+Dreams',
            description: 'Music video for an indie band featuring surreal dream sequences and practical effects.'
        },
        {
            id: 5,
            title: 'Tech Revolution',
            category: 'commercial',
            image: 'https://via.placeholder.com/600x400?text=Tech+Revolution',
            description: 'Corporate video for a tech startup showcasing their innovative products and company culture.'
        },
        {
            id: 6,
            title: 'Silent Echo',
            category: 'narrative',
            image: 'https://via.placeholder.com/600x400?text=Silent+Echo',
            description: 'Experimental short film about sound and memory, shot entirely on 16mm film.'
        },
        {
            id: 7,
            title: 'Wilderness',
            category: 'documentary',
            image: 'https://via.placeholder.com/600x400?text=Wilderness',
            description: 'Feature-length documentary about conservation efforts in the Amazon rainforest.'
        },
        {
            id: 8,
            title: 'Neon Lights',
            category: 'music-video',
            image: 'https://via.placeholder.com/600x400?text=Neon+Lights',
            description: 'High-energy music video featuring dynamic lighting and choreography.'
        },
        {
            id: 9,
            title: 'Autumn Collection',
            category: 'commercial',
            image: 'https://via.placeholder.com/600x400?text=Autumn+Collection',
            description: 'Fashion commercial showcasing a luxury brand\'s autumn/winter collection.'
        }
    ];
    
    // Display projects
    function displayProjects(filter = 'all', limit = visibleProjects) {
        showcaseGrid.innerHTML = '';
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        const projectsToShow = filteredProjects.slice(0, limit);
        
        projectsToShow.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.dataset.category = project.category;
            projectCard.dataset.id = project.id;
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-category">${formatCategory(project.category)}</p>
                </div>
            `;
            showcaseGrid.appendChild(projectCard);
            
            // Add click event to open project modal
            projectCard.addEventListener('click', () => openProjectModal(project.id));
        });
        
        // Show/hide load more button
        if (filteredProjects.length > limit) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Format category for display
    function formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            displayProjects(filter, visibleProjects);
        });
    });
    
    // Load more projects
    loadMoreBtn.addEventListener('click', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        visibleProjects += 3;
        displayProjects(activeFilter, visibleProjects);
    });
    
    // Initial display
    displayProjects();

    // Project Modal
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.querySelector('.close-project-modal');
    const projectModalBody = document.getElementById('projectModalBody');
    
    function openProjectModal(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        // In a real app, this would fetch more detailed data from an API
        const team = [
            { name: 'Alex Johnson', role: 'Director', image: 'https://via.placeholder.com/150?text=Alex+Johnson' },
            { name: 'Sarah Miller', role: 'DP', image: 'https://via.placeholder.com/150?text=Sarah+Miller' },
            { name: 'Jamie Chen', role: 'Editor', image: 'https://via.placeholder.com/150?text=Jamie+Chen' },
            { name: 'Taylor Smith', role: 'Producer', image: 'https://via.placeholder.com/150?text=Taylor+Smith' }
        ];
        
        projectModalBody.innerHTML = `
            <div class="project-modal-header">
                <h2>${project.title}</h2>
                <div class="project-meta">
                    <span class="project-category-badge">${formatCategory(project.category)}</span>
                    <span class="project-date"><i class="far fa-calendar-alt"></i> ${getRandomDate()}</span>
                </div>
            </div>
            
            <div class="project-modal-gallery">
                <img src="${project.image}" alt="${project.title}" class="project-main-image">
                <div class="project-thumbnails">
                    <div class="project-thumbnail">
                        <img src="${project.image}" alt="${project.title} Thumbnail 1">
                    </div>
                    <div class="project-thumbnail">
                        <img src="https://via.placeholder.com/300x200?text=BTS+1" alt="Behind the Scenes 1">
                    </div>
                    <div class="project-thumbnail">
                        <img src="https://via.placeholder.com/300x200?text=BTS+2" alt="Behind the Scenes 2">
                    </div>
                </div>
            </div>
            
            <h3>About the Project</h3>
            <p class="project-description">${project.description}</p>
            
            <div class="project-details-grid">
                <div class="project-detail-card">
                    <h4>Production Details</h4>
                    <ul>
                        <li>Duration: ${getRandomDuration()}</li>
                        <li>Format: ${getRandomFormat()}</li>
                        <li>Location: ${getRandomLocation()}</li>
                        <li>Year: ${new Date().getFullYear()}</li>
                    </ul>
                </div>
                <div class="project-detail-card">
                    <h4>Equipment Used</h4>
                    <ul>
                        <li>Camera: ${getRandomCamera()}</li>
                        <li>Lenses: ${getRandomLenses()}</li>
                        <li>Lighting: ${getRandomLighting()}</li>
                        <li>Support: ${getRandomSupport()}</li>
                    </ul>
                </div>
            </div>
            
            <h3>Video</h3>
            <div class="project-video">
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            
            <h3>Team</h3>
            <div class="project-team">
                <div class="team-grid">
                    ${team.map(member => `
                        <div class="team-member">
                            <img src="${member.image}" alt="${member.name}">
                            <h5>${member.name}</h5>
                            <p>${member.role}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <h3>Client Testimonial</h3>
            <div class="project-testimonial">
                <div class="project-testimonial-content">
                    <p>Working with Luminous Films was an exceptional experience. Their attention to detail and creative vision brought our project to life in ways we couldn't have imagined. The team was professional, collaborative, and delivered beyond our expectations.</p>
                </div>
                <div class="project-testimonial-author">
                    <img src="https://via.placeholder.com/150?text=Client" alt="Client">
                    <div class="project-testimonial-author-info">
                        <h5>Jordan Williams</h5>
                        <p>Marketing Director, ${project.title.split(' ')[0]} Company</p>
                    </div>
                </div>
            </div>
            
            <div class="project-modal-footer">
                <button class="project-nav-btn prev">
                    <i class="fas fa-chevron-left"></i> Previous Project
                </button>
                <button class="project-nav-btn next">
                    Next Project <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        
        projectModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add click events to thumbnails
        const thumbnails = document.querySelectorAll('.project-thumbnail');
        const mainImage = document.querySelector('.project-main-image');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const imgSrc = thumb.querySelector('img').src;
                mainImage.src = imgSrc;
            });
        });
    }
    
    // Helper functions for random project details
    function getRandomDate() {
        const start = new Date(2023, 0, 1);
        const end = new Date();
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    }
    
    function getRandomDuration() {
        const durations = ['30 seconds', '1 minute', '2 minutes', '5 minutes', '15 minutes', '30 minutes', '1 hour'];
        return durations[Math.floor(Math.random() * durations.length)];
    }
    
    function getRandomFormat() {
        const formats = ['4K Digital', '6K Digital', '8K Digital', '16mm Film', '35mm Film', 'Digital & Film'];
        return formats[Math.floor(Math.random() * formats.length)];
    }
    
    function getRandomLocation() {
        const locations = ['Los Angeles, CA', 'New York, NY', 'Chicago, IL', 'Miami, FL', 'London, UK', 'Paris, France', 'Tokyo, Japan'];
        return locations[Math.floor(Math.random() * locations.length)];
    }
    
    function getRandomCamera() {
        const cameras = ['ARRI Alexa Mini LF', 'RED Komodo', 'Sony Venice', 'Blackmagic URSA Mini Pro', 'Canon C300 Mark III'];
        return cameras[Math.floor(Math.random() * cameras.length)];
    }
    
    function getRandomLenses() {
        const lenses = ['ARRI Signature Primes', 'Zeiss Supreme Primes', 'Cooke Anamorphic', 'Leica Summilux-C', 'Canon K35'];
        return lenses[Math.floor(Math.random() * lenses.length)];
    }
    
    function getRandomLighting() {
        const lighting = ['ARRI SkyPanel', 'Kino Flo', 'Aputure', 'LiteMat', 'Quasar Science'];
        return lighting[Math.floor(Math.random() * lighting.length)];
    }
    
    function getRandomSupport() {
        const support = ['DJI Ronin', 'Steadicam', 'Technocrane', 'Dolly', 'Gimbal'];
        return support[Math.floor(Math.random() * support.length)];
    }
    
    closeProjectModal.addEventListener('click', () => {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Crew Slider
    const crewSlider = document.getElementById('crewSlider');
    const crewPrev = document.getElementById('crewPrev');
    const crewNext = document.getElementById('crewNext');
    const crewModal = document.getElementById('crewModal');
    const closeCrewModal = document.querySelector('.close-crew-modal');
    const crewModalBody = document.getElementById('crewModalBody');
    
    // Sample crew data
    const crewMembers = [
        {
            id: 1,
            name: 'Alex Johnson',
            role: 'Director',
            image: 'https://via.placeholder.com/300x400?text=Alex+Johnson',
            bio: 'With over 15 years of experience in filmmaking, Alex has directed award-winning commercials and short films. His unique visual style and attention to narrative detail make him one of our most sought-after directors.',
            skills: ['Visual Storytelling', 'Script Development', 'Actor Direction', 'Creative Vision'],
            contact: {
                email: 'alex@luminousfilms.com',
                phone: '+1 (555) 123-4567'
            },
            projects: [1, 2, 5]
        },
        {
            id: 2,
            name: 'Sarah Miller',
            role: 'Director of Photography',
            image: 'https://via.placeholder.com/300x400?text=Sarah+Miller',
            bio: 'Sarah brings a cinematic eye to every project she works on. Specializing in both digital and film formats, she has a knack for creating stunning visuals that serve the story.',
            skills: ['Cinematography', 'Lighting Design', 'Camera Operation', 'Color Theory'],
            contact: {
                email: 'sarah@luminousfilms.com',
                phone: '+1 (555) 234-5678'
            },
            projects: [1, 3, 6]
        },
        {
            id: 3,
            name: 'Jamie Chen',
            role: 'Editor',
            image: 'https://via.placeholder.com/300x400?text=Jamie+Chen',
            bio: 'Jamie\'s editing brings rhythm and pace to our projects. With a background in both narrative and documentary filmmaking, Jamie knows how to craft a compelling story in the edit bay.',
            skills: ['Adobe Premiere', 'DaVinci Resolve', 'Color Grading', 'Sound Design'],
            contact: {
                email: 'jamie@luminousfilms.com',
                phone: '+1 (555) 345-6789'
            },
            projects: [2, 4, 7]
        },
        {
            id: 4,
            name: 'Taylor Smith',
            role: 'Producer',
            image: 'https://via.placeholder.com/300x400?text=Taylor+Smith',
            bio: 'Taylor keeps our productions running smoothly from pre-production through delivery. With a keen eye for detail and budget management, Taylor ensures every project is completed on time and on budget.',
            skills: ['Budgeting', 'Scheduling', 'Client Relations', 'Logistics'],
            contact: {
                email: 'taylor@luminousfilms.com',
                phone: '+1 (555) 456-7890'
            },
            projects: [3, 5, 8]
        },
        {
            id: 5,
            name: 'Morgan Lee',
            role: 'Production Designer',
            image: 'https://via.placeholder.com/300x400?text=Morgan+Lee',
            bio: 'Morgan creates immersive worlds for our projects. With a background in fine arts and theater, Morgan brings a unique perspective to every production design challenge.',
            skills: ['Set Design', 'Props', 'Art Direction', 'Color Palette'],
            contact: {
                email: 'morgan@luminousfilms.com',
                phone: '+1 (555) 567-8901'
            },
            projects: [1, 4, 9]
        },
        {
            id: 6,
            name: 'Casey Brown',
            role: 'Sound Designer',
            image: 'https://via.placeholder.com/300x400?text=Casey+Brown',
            bio: 'Casey\'s sound design adds depth and emotion to our projects. From field recording to final mix, Casey ensures every audio element is perfect.',
            skills: ['Field Recording', 'Sound Mixing', 'Foley', 'ADR'],
            contact: {
                email: 'casey@luminousfilms.com',
                phone: '+1 (555) 678-9012'
            },
            projects: [2, 6, 8]
        }
    ];
    
    // Display crew members
    function displayCrewMembers() {
        crewSlider.innerHTML = '';
        crewMembers.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'crew-member';
            memberElement.dataset.id = member.id;
            memberElement.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="crew-image">
                <div class="crew-info">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                    <div class="crew-social">
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-vimeo-v"></i></a>
                    </div>
                </div>
            `;
            crewSlider.appendChild(memberElement);
            
            // Add click event to open crew modal
            memberElement.addEventListener('click', () => openCrewModal(member.id));
        });
    }
    
    // Open crew modal
    function openCrewModal(crewId) {
        const member = crewMembers.find(m => m.id === crewId);
        if (!member) return;
        
        const memberProjects = member.projects.map(projectId => {
            const project = projects.find(p => p.id === projectId);
            return project || null;
        }).filter(Boolean);
        
        crewModalBody.innerHTML = `
            <div class="crew-modal-top">
                <img src="${member.image}" alt="${member.name}" class="crew-modal-image">
                <div class="crew-modal-info">
                    <h3>${member.name}</h3>
                    <p class="position">${member.role}</p>
                    <p class="bio">${member.bio}</p>
                    
                    <div class="crew-modal-skills">
                        <h4>Skills & Specialties</h4>
                        <div class="skill-tags">
                            ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="crew-modal-contact">
                        <h4>Contact</h4>
                        <p><i class="fas fa-envelope"></i> ${member.contact.email}</p>
                        <p><i class="fas fa-phone-alt"></i> ${member.contact.phone}</p>
                    </div>
                </div>
            </div>
            
            <div class="crew-modal-projects">
                <h4>Featured Projects</h4>
                <div class="crew-projects-grid">
                    ${memberProjects.map(project => `
                        <div class="crew-project">
                            <img src="${project.image}" alt="${project.title}">
                            <div class="crew-project-title">${project.title}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        crewModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Initialize crew slider
    displayCrewMembers();
    
    // Crew slider navigation
    crewPrev.addEventListener('click', () => {
        crewSlider.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    crewNext.addEventListener('click', () => {
        crewSlider.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    closeCrewModal.addEventListener('click', () => {
        crewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === crewModal) {
            crewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Equipment Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabId).classList.add('active');
            
            // Activate clicked button
            button.classList.add('active');
            
            // Load equipment data if not already loaded
            if (document.getElementById(tabId).innerHTML.trim() === '') {
                loadEquipmentData(tabId);
            }
        });
    });
    
    // Load equipment data
    function loadEquipmentData(category) {
        const equipmentGrid = document.querySelector(`#${category} .equipment-grid`);
        if (!equipmentGrid) return;
        
        // Sample equipment data
        const equipmentData = {
            cameras: [
                {
                    name: 'ARRI Alexa Mini LF',
                    image: 'https://via.placeholder.com/300x200?text=ARRI+Alexa+Mini+LF',
                    specs: ['Large Format', '4.5K Resolution', 'Up to 60fps', 'ARRIRAW & ProRes']
                },
                {
                    name: 'RED Komodo 6K',
                    image: 'https://via.placeholder.com/300x200?text=RED+Komodo+6K',
                    specs: ['Super 35mm', '6K Resolution', 'Up to 40fps', 'REDCODE RAW']
                },
                {
                    name: 'Sony Venice',
                    image: 'https://via.placeholder.com/300x200?text=Sony+Venice',
                    specs: ['Full Frame', '6K Resolution', 'Up to 60fps', 'X-OCN & ProRes']
                },
                {
                    name: 'Blackmagic URSA Mini Pro 12K',
                    image: 'https://via.placeholder.com/300x200?text=Blackmagic+URSA+12K',
                    specs: ['Super 35mm', '12K Resolution', 'Up to 60fps', 'Blackmagic RAW']
                }
            ],
            lenses: [
                {
                    name: 'ARRI Signature Primes',
                    image: 'https://via.placeholder.com/300x200?text=ARRI+Signature+Primes',
                    specs: ['T1.8 Aperture', 'Full Frame Coverage', 'Focal Lengths: 16mm-280mm', 'Cinematic Look']
                },
                {
                    name: 'Zeiss Supreme Primes',
                    image: 'https://via.placeholder.com/300x200?text=Zeiss+Supreme+Primes',
                    specs: ['T1.5 Aperture', 'Full Frame Coverage', 'Focal Lengths: 15mm-200mm', 'Sharp & Contrasty']
                },
                {
                    name: 'Cooke Anamorphic/i',
                    image: 'https://via.placeholder.com/300x200?text=Cooke+Anamorphic',
                    specs: ['T2.3 Aperture', '2x Squeeze', 'Focal Lengths: 32mm-180mm', 'Classic Flare']
                },
                {
                    name: 'Leica Summilux-C',
                    image: 'https://via.placeholder.com/300x200?text=Leica+Summilux-C',
                    specs: ['T1.4 Aperture', 'Super 35mm Coverage', 'Focal Lengths: 16mm-135mm', 'Compact & Light']
                }
            ],
            lighting: [
                {
                    name: 'ARRI SkyPanel S360-C',
                    image: 'https://via.placeholder.com/300x200?text=ARRI+SkyPanel+S360',
                    specs: ['360W LED', 'Full Color Spectrum', 'DMX Control', 'Soft Light Output']
                },
                {
                    name: 'Kino Flo Celeb 401',
                    image: 'https://via.placeholder.com/300x200?text=Kino+Flo+Celeb+401',
                    specs: ['400W LED', 'Tunable White', 'Flicker-Free', 'Soft Light Quality']
                },
                {
                    name: 'Aputure 600D Pro',
                    image: 'https://via.placeholder.com/300x200?text=Aputure+600D+Pro',
                    specs: ['600W LED', 'Daylight Balanced', 'Bowens Mount', 'High Output']
                },
                {
                    name: 'Quasar Science Rainbow 2',
                    image: 'https://via.placeholder.com/300x200?text=Quasar+Rainbow+2',
                    specs: ['Bi-Color LED', 'RGB+W', 'DMX Control', 'Linear Light Source']
                }
            ],
            support: [
                {
                    name: 'DJI Ronin 4D',
                    image: 'https://via.placeholder.com/300x200?text=DJI+Ronin+4D',
                    specs: ['6-Axis Stabilization', 'LiDAR Focus', 'Payload: 10kg', 'Integrated Camera']
                },
                {
                    name: 'Tiffen Steadicam Aero',
                    image: 'https://via.placeholder.com/300x200?text=Steadicam+Aero',
                    specs: ['Carbon Fiber', 'Payload: 12kg', 'Modular Design', 'Smooth Movement']
                },
                {
                    name: 'Chapman Leonard Hybrid',
                    image: 'https://via.placeholder.com/300x200?text=Chapman+Leonard+Hybrid',
                    specs: ['Remote Head', 'Payload: 45kg', 'Jib & Crane', 'Versatile System']
                },
                {
                    name: 'Libec TH-X Tripod',
                    image: 'https://via.placeholder.com/300x200?text=Libec+TH-X',
                    specs: ['Fluid Head', 'Payload: 18kg', 'Carbon Fiber', 'Lightweight']
                }
            ],
            audio: [
                {
                    name: 'Sound Devices 833',
                    image: 'https://via.placeholder.com/300x200?text=Sound+Devices+833',
                    specs: ['12-Channel Mixer', '8-Track Recorder', '32-Bit Float', 'Timecode Sync']
                },
                {
                    name: 'Sennheiser MKH 416',
                    image: 'https://via.placeholder.com/300x200?text=Sennheiser+MKH+416',
                    specs: ['Shotgun Mic', 'Super-Cardioid', 'Moisture Resistant', 'Industry Standard']
                },
                {
                    name: 'Lectrosonics Wireless',
                    image: 'https://via.placeholder.com/300x200?text=Lectrosonics+Wireless',
                    specs: ['Dual Channel', 'Digital Hybrid', '250m Range', 'Reliable Transmission']
                },
                {
                    name: 'Zoom F8n Pro',
                    image: 'https://via.placeholder.com/300x200?text=Zoom+F8n+Pro',
                    specs: ['8-Channel Recorder', '32-Bit Float', 'Timecode Sync', 'Compact Design']
                }
            ]
        };
        
        equipmentGrid.innerHTML = equipmentData[category].map(item => `
            <div class="equipment-item">
                <img src="${item.image}" alt="${item.name}" class="equipment-image">
                <div class="equipment-info">
                    <h4>${item.name}</h4>
                    <div class="equipment-specs">
                        <ul>
                            ${item.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Load initial tab data
    loadEquipmentData('cameras');

    // Testimonials Slider
    const testimonialSlider = document.getElementById('testimonialSlider');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialDots = document.getElementById('testimonialDots');
    
    // Sample testimonials
    const testimonials = [
        {
            content: 'Luminous Films exceeded our expectations on every level. Their creative approach to our commercial campaign resulted in a product that perfectly captured our brand identity while pushing creative boundaries. The team was professional, collaborative, and delivered on time and on budget.',
            author: 'Jessica Taylor',
            role: 'Marketing Director, BrandCo',
            image: 'https://via.placeholder.com/150?text=Jessica+Taylor'
        },
        {
            content: 'Working with Luminous Films on our documentary was a game-changer. They brought a level of technical expertise and artistic vision that elevated our project beyond what we thought possible. Their attention to detail and commitment to storytelling is unmatched in the industry.',
            author: 'Michael Chen',
            role: 'Producer, Insight Films',
            image: 'https://via.placeholder.com/150?text=Michael+Chen'
        },
        {
            content: 'The music video Luminous Films created for our band went viral and completely transformed our career. They understood our aesthetic immediately and brought it to life with stunning visuals. The entire process was smooth, creative, and fun - we can\'t wait to work with them again.',
            author: 'The Midnight Drifters',
            role: 'Band',
            image: 'https://via.placeholder.com/150?text=Midnight+Drifters'
        }
    ];
    
    let currentTestimonial = 0;
    
    // Display testimonials
    function displayTestimonials() {
        testimonialSlider.innerHTML = '';
        testimonialDots.innerHTML = '';
        
        testimonials.forEach((testimonial, index) => {
            const slide = document.createElement('div');
            slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `
                <div class="testimonial-content">
                    ${testimonial.content}
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                    <div class="testimonial-author-info">
                        <h5>${testimonial.author}</h5>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            `;
            testimonialSlider.appendChild(slide);
            
            const dot = document.createElement('div');
            dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.addEventListener('click', () => showTestimonial(index));
            testimonialDots.appendChild(dot);
        });
    }
    
    // Show specific testimonial
    function showTestimonial(index) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Navigation
    testimonialPrev.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });
    
    testimonialNext.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });
    
    // Initialize testimonials
    displayTestimonials();
    
    // Auto-rotate testimonials
    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    // Contact Form
    const contactForm = document.getElementById('productionInquiryForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const projectType = document.getElementById('projectType').value;
        
        if (!name || !email || !projectType) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, this would send data to a server
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        this.reset();
    });

    // Client Login Modal
    const clientLoginBtn = document.getElementById('clientLoginBtn');
    const clientLoginModal = document.getElementById('clientLoginModal');
    const closeClientLogin = document.querySelector('.close-client-login');
    const clientLoginForm = document.getElementById('clientLoginForm');
    
    clientLoginBtn.addEventListener('click', () => {
        clientLoginModal.style.display = 'flex';
    });
    
    closeClientLogin.addEventListener('click', () => {
        clientLoginModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === clientLoginModal) {
            clientLoginModal.style.display = 'none';
        }
    });
    
    clientLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('clientEmail').value;
        const password = document.getElementById('clientPassword').value;
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        // In a real app, this would verify credentials with a server
        if (email === 'client@example.com' && password === 'password123') {
            alert('Login successful! Redirecting to client portal...');
            clientLoginModal.style.display = 'none';
        } else {
            alert('Invalid email or password');
        }
    });

    // Footer Newsletter
    const footerNewsletter = document.getElementById('footerNewsletter');
    
    footerNewsletter.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Explore button scroll to showcase
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const showcaseSection = document.getElementById('showcase');
            if (showcaseSection) {
                window.scrollTo({
                    top: showcaseSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Contact button scroll to contact
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
});
// Updated Crew Modal with Progress Bars
function openCrewModal(crewId) {
    const member = crewMembers.find(m => m.id === crewId);
    if (!member) return;
    
    // Add skill levels for demonstration
    member.skills = [
        { name: 'Visual Storytelling', level: 90 },
        { name: 'Script Development', level: 85 },
        { name: 'Actor Direction', level: 95 },
        { name: 'Creative Vision', level: 88 }
    ];
    
    const memberProjects = member.projects.map(projectId => {
        const project = projects.find(p => p.id === projectId);
        return project || null;
    }).filter(Boolean);
    
    crewModalBody.innerHTML = `
        <div class="crew-modal-top">
            <img src="${member.image}" alt="${member.name}" class="crew-modal-image">
            <div class="crew-modal-info">
                <h3>${member.name}</h3>
                <p class="position">${member.role}</p>
                <p class="bio">${member.bio}</p>
                
                <div class="crew-modal-skills">
                    <h4>Skills & Expertise</h4>
                    ${member.skills.map(skill => `
                        <div class="skill-item">
                            <div class="progress-container">
                                <div class="progress-label">
                                    <span>${skill.name}</span>
                                    <span>${skill.level}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${skill.level}%"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="crew-modal-contact">
                    <h4>Contact</h4>
                    <p><i class="fas fa-envelope"></i> ${member.contact.email}</p>
                    <p><i class="fas fa-phone-alt"></i> ${member.contact.phone}</p>
                </div>
            </div>
        </div>
        
        <div class="crew-modal-projects">
            <h4>Featured Projects</h4>
            <div class="crew-projects-grid">
                ${memberProjects.map(project => `
                    <div class="crew-project">
                        <img src="${project.image}" alt="${project.title}">
                        <div class="crew-project-title">${project.title}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Animate progress bars when modal opens
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    }, 300);
    
    crewModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    if (savedTheme === 'dark') {
        mobileThemeToggle.checked = true;
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        mobileThemeToggle.checked = newTheme === 'dark';
    });
    
    mobileThemeToggle.addEventListener('change', () => {
        const newTheme = mobileThemeToggle.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Section Reveal on Scroll
    const sections = document.querySelectorAll('.section-reveal');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.style.right = '0';
    });
    
    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.style.right = '-100%';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu-content a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.right = '-100%';
        });
    });

    // Hero Video Playback Control
    const heroVideo = document.getElementById('heroVideo');
    
    function playVideo() {
        heroVideo.play().catch(error => {
            console.log('Video autoplay prevented:', error);
        });
    }
    
    // Try to play video when page loads
    playVideo();
    
    // Try to play video when user interacts with page
    document.addEventListener('click', playVideo, { once: true });

    // Project Showcase with Section Reveal
    const showcaseGrid = document.querySelector('.showcase-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('loadMoreProjects');
    let visibleProjects = 6;
    
    // Sample project data
    const projects = [
        {
            id: 1,
            title: 'Summer Campaign 2023',
            category: 'commercial',
            image: 'https://via.placeholder.com/600x400?text=Summer+Campaign',
            description: 'A vibrant summer campaign for a leading fashion brand featuring beach scenes and urban settings.'
        },
        // ... (rest of project data remains the same)
    ];
    
    // Display projects
    function displayProjects(filter = 'all', limit = visibleProjects) {
        showcaseGrid.innerHTML = '';
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        const projectsToShow = filteredProjects.slice(0, limit);
        
        projectsToShow.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card section-reveal';
            projectCard.dataset.category = project.category;
            projectCard.dataset.id = project.id;
            projectCard.style.transitionDelay = `${index * 0.1}s`;
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-category">${formatCategory(project.category)}</p>
                </div>
            `;
            showcaseGrid.appendChild(projectCard);
            
            // Add click event to open project modal
            projectCard.addEventListener('click', () => openProjectModal(project.id));
        });
        
        // Show/hide load more button
        if (filteredProjects.length > limit) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
        
        // Trigger scroll check to reveal sections
        setTimeout(checkScroll, 100);
    }
    
    // Format category for display
    function formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            visibleProjects = 6; // Reset visible projects when filter changes
            displayProjects(filter, visibleProjects);
        });
    });
    
    // Load more projects
    loadMoreBtn.addEventListener('click', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        visibleProjects += 3;
        displayProjects(activeFilter, visibleProjects);
    });
    
    // Initial display
    displayProjects();

    // Crew Section with Progress Bars
    const crewSlider = document.getElementById('crewSlider');
    const crewPrev = document.getElementById('crewPrev');
    const crewNext = document.getElementById('crewNext');
    const crewModal = document.getElementById('crewModal');
    const closeCrewModal = document.querySelector('.close-crew-modal');
    const crewModalBody = document.getElementById('crewModalBody');
    
    // Sample crew data with skill levels
    const crewMembers = [
        {
            id: 1,
            name: 'Alex Johnson',
            role: 'Director',
            image: 'https://via.placeholder.com/300x400?text=Alex+Johnson',
            bio: 'With over 15 years of experience in filmmaking, Alex has directed award-winning commercials and short films. His unique visual style and attention to narrative detail make him one of our most sought-after directors.',
            skills: [
                { name: 'Visual Storytelling', level: 95 },
                { name: 'Script Development', level: 90 },
                { name: 'Actor Direction', level: 98 },
                { name: 'Creative Vision', level: 97 }
            ],
            contact: {
                email: 'alex@luminousfilms.com',
                phone: '+1 (555) 123-4567'
            },
            projects: [1, 2, 5]
        },
        // ... (rest of crew data with skill levels)
    ];
    
    // Display crew members with section reveal
    function displayCrewMembers() {
        crewSlider.innerHTML = '';
        crewMembers.forEach((member, index) => {
            const memberElement = document.createElement('div');
            memberElement.className = 'crew-member section-reveal';
            memberElement.dataset.id = member.id;
            memberElement.style.transitionDelay = `${index * 0.1}s`;
            memberElement.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="crew-image">
                <div class="crew-info">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                    <div class="crew-social">
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-vimeo-v"></i></a>
                    </div>
                </div>
            `;
            crewSlider.appendChild(memberElement);
            
            // Add click event to open crew modal
            memberElement.addEventListener('click', () => openCrewModal(member.id));
        });
        
        // Trigger scroll check to reveal sections
        setTimeout(checkScroll, 100);
    }
    
    // Open crew modal with animated progress bars
    function openCrewModal(crewId) {
        const member = crewMembers.find(m => m.id === crewId);
        if (!member) return;
        
        crewModalBody.innerHTML = `
            <div class="crew-modal-top">
                <img src="${member.image}" alt="${member.name}" class="crew-modal-image">
                <div class="crew-modal-info">
                    <h3>${member.name}</h3>
                    <p class="position">${member.role}</p>
                    <p class="bio">${member.bio}</p>
                    
                    <div class="crew-modal-skills">
                        <h4>Skills & Expertise</h4>
                        ${member.skills.map(skill => `
                            <div class="skill-item">
                                <div class="progress-container">
                                    <div class="progress-label">
                                        <span>${skill.name}</span>
                                        <span>${skill.level}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" data-level="${skill.level}"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="crew-modal-contact">
                        <h4>Contact</h4>
                        <p><i class="fas fa-envelope"></i> ${member.contact.email}</p>
                        <p><i class="fas fa-phone-alt"></i> ${member.contact.phone}</p>
                    </div>
                </div>
            </div>
            
            <div class="crew-modal-projects">
                <h4>Featured Projects</h4>
                <div class="crew-projects-grid">
                    ${member.projects.map(projectId => {
                        const project = projects.find(p => p.id === projectId);
                        return project ? `
                            <div class="crew-project">
                                <img src="${project.image}" alt="${project.title}">
                                <div class="crew-project-title">${project.title}</div>
                            </div>
                        ` : '';
                    }).join('')}
                </div>
            </div>
        `;
        
        // Animate progress bars
        setTimeout(() => {
            document.querySelectorAll('.progress-fill').forEach(fill => {
                const level = fill.dataset.level;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = `${level}%`;
                }, 100);
            });
        }, 300);
        
        crewModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Initialize crew slider
    displayCrewMembers();
    
    // Crew slider navigation
    crewPrev.addEventListener('click', () => {
        crewSlider.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    crewNext.addEventListener('click', () => {
        crewSlider.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    closeCrewModal.addEventListener('click', () => {
        crewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === crewModal) {
            crewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Equipment Tabs with Section Reveal
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab content
            const activeTab = document.getElementById(tabId);
            activeTab.classList.add('active');
            
            // Activate clicked button
            button.classList.add('active');
            
            // Load equipment data if not already loaded
            if (activeTab.innerHTML.trim() === '') {
                loadEquipmentData(tabId);
            }
            
            // Add section reveal to equipment items
            setTimeout(() => {
                const equipmentItems = activeTab.querySelectorAll('.equipment-item');
                equipmentItems.forEach((item, index) => {
                    item.classList.add('section-reveal');
                    item.style.transitionDelay = `${index * 0.1}s`;
                });
                checkScroll();
            }, 50);
        });
    });
    
    // Load equipment data
    function loadEquipmentData(category) {
        const equipmentGrid = document.querySelector(`#${category} .equipment-grid`);
        if (!equipmentGrid) return;
        
        // Sample equipment data
        const equipmentData = {
            cameras: [
                {
                    name: 'ARRI Alexa Mini LF',
                    image: 'https://via.placeholder.com/300x200?text=ARRI+Alexa+Mini+LF',
                    specs: ['Large Format', '4.5K Resolution', 'Up to 60fps', 'ARRIRAW & ProRes']
                },
                // ... (rest of equipment data)
            ]
            // ... (other categories)
        };
        
        equipmentGrid.innerHTML = equipmentData[category].map(item => `
            <div class="equipment-item">
                <img src="${item.image}" alt="${item.name}" class="equipment-image">
                <div class="equipment-info">
                    <h4>${item.name}</h4>
                    <div class="equipment-specs">
                        <ul>
                            ${item.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Load initial tab data
    loadEquipmentData('cameras');

    // Testimonials Slider with Section Reveal
    const testimonialSlider = document.getElementById('testimonialSlider');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialDots = document.getElementById('testimonialDots');
    
    // Sample testimonials
    const testimonials = [
        {
            content: 'Luminous Films exceeded our expectations on every level. Their creative approach to our commercial campaign resulted in a product that perfectly captured our brand identity while pushing creative boundaries.',
            author: 'Jessica Taylor',
            role: 'Marketing Director, BrandCo',
            image: 'https://via.placeholder.com/150?text=Jessica+Taylor'
        },
        // ... (rest of testimonials)
    ];
    
    let currentTestimonial = 0;
    
    // Display testimonials with section reveal
    function displayTestimonials() {
        testimonialSlider.innerHTML = '';
        testimonialDots.innerHTML = '';
        
        testimonials.forEach((testimonial, index) => {
            const slide = document.createElement('div');
            slide.className = `testimonial-slide section-reveal ${index === 0 ? 'active' : ''}`;
            slide.style.transitionDelay = `${index * 0.1}s`;
            slide.innerHTML = `
                <div class="testimonial-content">
                    ${testimonial.content}
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                    <div class="testimonial-author-info">
                        <h5>${testimonial.author}</h5>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            `;
            testimonialSlider.appendChild(slide);
            
            const dot = document.createElement('div');
            dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.addEventListener('click', () => showTestimonial(index));
            testimonialDots.appendChild(dot);
        });
        
        // Trigger scroll check to reveal sections
        setTimeout(checkScroll, 100);
    }
    
    // Show specific testimonial
    function showTestimonial(index) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Navigation
    testimonialPrev.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });
    
    testimonialNext.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });
    
    // Initialize testimonials
    displayTestimonials();
    
    // Auto-rotate testimonials
    setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    // Contact Form with Section Reveal
    const contactForm = document.getElementById('productionInquiryForm');
    const contactFormElements = contactForm.querySelectorAll('.form-group');
    
    contactFormElements.forEach((element, index) => {
        element.classList.add('section-reveal');
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const projectType = document.getElementById('projectType').value;
        
        if (!name || !email || !projectType) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, this would send data to a server
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        this.reset();
    });

    // Client Login Modal
    const clientLoginBtn = document.getElementById('clientLoginBtn');
    const clientLoginModal = document.getElementById('clientLoginModal');
    const closeClientLogin = document.querySelector('.close-client-login');
    const clientLoginForm = document.getElementById('clientLoginForm');
    
    clientLoginBtn.addEventListener('click', () => {
        clientLoginModal.style.display = 'flex';
    });
    
    closeClientLogin.addEventListener('click', () => {
        clientLoginModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === clientLoginModal) {
            clientLoginModal.style.display = 'none';
        }
    });
    
    clientLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('clientEmail').value;
        const password = document.getElementById('clientPassword').value;
        
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        
        // In a real app, this would verify credentials with a server
        if (email === 'client@example.com' && password === 'password123') {
            alert('Login successful! Redirecting to client portal...');
            clientLoginModal.style.display = 'none';
        } else {
            alert('Invalid email or password');
        }
    });

    // Footer Newsletter
    const footerNewsletter = document.getElementById('footerNewsletter');
    
    footerNewsletter.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initial scroll check for all sections
    setTimeout(checkScroll, 500);
});