// ========================================
// COSMIC ASTROLOGY - MAIN JAVASCRIPT
// ========================================

// === ZODIAC DATA ===
const zodiacData = [
    {
        name: 'Aries',
        symbol: '♈',
        icon: 'fa-solid fa-fire',
        dates: 'Mar 21 - Apr 19',
        element: 'Fire',
        description: 'Bold, ambitious, and confident. Natural leaders with pioneering spirit.',
        angle: 0
    },
    {
        name: 'Taurus',
        symbol: '♉',
        icon: 'fa-solid fa-leaf',
        dates: 'Apr 20 - May 20',
        element: 'Earth',
        description: 'Reliable, patient, and devoted. Lovers of beauty and comfort.',
        angle: 30
    },
    {
        name: 'Gemini',
        symbol: '♊',
        icon: 'fa-solid fa-wind',
        dates: 'May 21 - Jun 20',
        element: 'Air',
        description: 'Versatile, curious, and expressive. Quick-witted communicators.',
        angle: 60
    },
    {
        name: 'Cancer',
        symbol: '♋',
        icon: 'fa-solid fa-water',
        dates: 'Jun 21 - Jul 22',
        element: 'Water',
        description: 'Intuitive, emotional, and protective. Deeply caring nurturers.',
        angle: 90
    },
    {
        name: 'Leo',
        symbol: '♌',
        icon: 'fa-solid fa-fire',
        dates: 'Jul 23 - Aug 22',
        element: 'Fire',
        description: 'Dramatic, creative, and passionate. Natural-born performers.',
        angle: 120
    },
    {
        name: 'Virgo',
        symbol: '♍',
        icon: 'fa-solid fa-leaf',
        dates: 'Aug 23 - Sep 22',
        element: 'Earth',
        description: 'Analytical, practical, and diligent. Detail-oriented perfectionists.',
        angle: 150
    },
    {
        name: 'Libra',
        symbol: '♎',
        icon: 'fa-solid fa-wind',
        dates: 'Sep 23 - Oct 22',
        element: 'Air',
        description: 'Diplomatic, gracious, and fair-minded. Seekers of balance and harmony.',
        angle: 180
    },
    {
        name: 'Scorpio',
        symbol: '♏',
        icon: 'fa-solid fa-water',
        dates: 'Oct 23 - Nov 21',
        element: 'Water',
        description: 'Passionate, assertive, and resourceful. Magnetic and mysterious.',
        angle: 210
    },
    {
        name: 'Sagittarius',
        symbol: '♐',
        icon: 'fa-solid fa-fire',
        dates: 'Nov 22 - Dec 21',
        element: 'Fire',
        description: 'Adventurous, optimistic, and philosophical. Freedom-loving explorers.',
        angle: 240
    },
    {
        name: 'Capricorn',
        symbol: '♑',
        icon: 'fa-solid fa-leaf',
        dates: 'Dec 22 - Jan 19',
        element: 'Earth',
        description: 'Ambitious, disciplined, and responsible. Strategic achievers.',
        angle: 270
    },
    {
        name: 'Aquarius',
        symbol: '♒',
        icon: 'fa-solid fa-wind',
        dates: 'Jan 20 - Feb 18',
        element: 'Air',
        description: 'Progressive, independent, and humanitarian. Visionary thinkers.',
        angle: 300
    },
    {
        name: 'Pisces',
        symbol: '♓',
        icon: 'fa-solid fa-water',
        dates: 'Feb 19 - Mar 20',
        element: 'Water',
        description: 'Compassionate, artistic, and intuitive. Dreamy and empathetic souls.',
        angle: 330
    }
];

// === PLANETARY DATA ===
const planetaryData = {
    Mercury: {
        influence: 'Communication, intellect, and mental agility. Mercury governs your thinking patterns and how you express yourself.',
        color: '#8c7853'
    },
    Venus: {
        influence: 'Love, beauty, and harmony. Venus influences your relationships, aesthetic preferences, and values.',
        color: '#ffd700'
    },
    Earth: {
        influence: 'Grounding, stability, and physical existence. Earth represents your material reality and practical nature.',
        color: '#4169e1'
    },
    Mars: {
        influence: 'Energy, passion, and drive. Mars governs your ambition, courage, and how you assert yourself.',
        color: '#cd5c5c'
    },
    Jupiter: {
        influence: 'Growth, expansion, and wisdom. Jupiter brings opportunities, optimism, and philosophical understanding.',
        color: '#daa520'
    },
    Saturn: {
        influence: 'Discipline, responsibility, and structure. Saturn teaches valuable lessons through challenges and limitations.',
        color: '#f4a460'
    }
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 2000);

    // Initialize components
    initializeNavigation();
    initializeZodiacWheel();
    initializeZodiacCards();
    initializeHoroscopes();
    initializePlanets();
    initializeBirthChart();
    initializeScrollAnimations();
}

// === NAVIGATION ===
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTA button scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('#zodiac').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

// === ZODIAC WHEEL ===
function initializeZodiacWheel() {
    const zodiacSignsContainer = document.querySelector('.zodiac-signs');
    
    zodiacData.forEach(sign => {
        const signElement = document.createElement('div');
        signElement.className = 'zodiac-sign';
        
        // Calculate position
        const radius = 200;
        const angleInRadians = (sign.angle * Math.PI) / 180;
        const x = radius * Math.cos(angleInRadians);
        const y = radius * Math.sin(angleInRadians);
        
        signElement.style.left = `calc(50% + ${x}px)`;
        signElement.style.top = `calc(50% + ${y}px)`;
        signElement.style.transform = 'translate(-50%, -50%)';
        
        signElement.innerHTML = `
            <i class="${sign.icon}"></i>
            <span>${sign.name}</span>
        `;
        
        signElement.addEventListener('click', () => {
            showZodiacInfo(sign);
        });
        
        zodiacSignsContainer.appendChild(signElement);
    });
}

function showZodiacInfo(sign) {
    alert(`${sign.name} ${sign.symbol}\n${sign.dates}\nElement: ${sign.element}\n\n${sign.description}`);
}

// === ZODIAC CARDS ===
function initializeZodiacCards() {
    const zodiacCardsContainer = document.querySelector('.zodiac-cards');
    
    zodiacData.forEach(sign => {
        const card = document.createElement('div');
        card.className = 'zodiac-card';
        card.innerHTML = `
            <div class="zodiac-card-icon">
                <i class="${sign.icon}"></i>
            </div>
            <h3>${sign.name} ${sign.symbol}</h3>
            <p class="zodiac-date">${sign.dates}</p>
            <p>${sign.description}</p>
        `;
        
        // Add staggered animation
        card.style.animation = `fadeInUp 0.6s ease-out ${zodiacData.indexOf(sign) * 0.1}s both`;
        
        zodiacCardsContainer.appendChild(card);
    });
}

// === HOROSCOPE CARDS ===
async function initializeHoroscopes() {
    const horoscopeGrid = document.querySelector('.horoscope-grid');
    
    try {
        // Try to fetch horoscopes from database
        const response = await fetch('tables/horoscopes?limit=12');
        let horoscopes = [];
        
        if (response.ok) {
            const data = await response.json();
            horoscopes = data.data;
        }
        
        // If no data in database, use default horoscopes
        if (horoscopes.length === 0) {
            horoscopes = generateDefaultHoroscopes();
        }
        
        zodiacData.forEach((sign, index) => {
            const horoscope = horoscopes.find(h => h.zodiac_sign === sign.name) || {
                zodiac_sign: sign.name,
                daily_horoscope: 'The stars align in your favor today. Trust your intuition and embrace new opportunities.',
                love: 'Communication is key in relationships today.',
                career: 'Your hard work is about to pay off.',
                health: 'Focus on mental and physical balance.',
                lucky_number: Math.floor(Math.random() * 100) + 1,
                lucky_color: ['Purple', 'Gold', 'Blue', 'Green', 'Red'][Math.floor(Math.random() * 5)]
            };
            
            const card = document.createElement('div');
            card.className = 'horoscope-card';
            card.innerHTML = `
                <div class="horoscope-card-inner">
                    <div class="horoscope-card-front">
                        <i class="${sign.icon} horoscope-icon"></i>
                        <h3>${sign.name}</h3>
                        <p class="zodiac-date">${sign.dates}</p>
                        <p class="flip-instruction">Click to reveal your horoscope</p>
                    </div>
                    <div class="horoscope-card-back">
                        <div class="horoscope-content">
                            <h4>Today's Horoscope</h4>
                            <p>${horoscope.daily_horoscope}</p>
                            <div class="horoscope-detail">
                                <strong>Love:</strong> ${horoscope.love}
                            </div>
                            <div class="horoscope-detail">
                                <strong>Career:</strong> ${horoscope.career}
                            </div>
                            <div class="horoscope-detail">
                                <strong>Health:</strong> ${horoscope.health}
                            </div>
                            <div class="horoscope-detail">
                                <strong>Lucky Number:</strong> ${horoscope.lucky_number}
                            </div>
                            <div class="horoscope-detail">
                                <strong>Lucky Color:</strong> ${horoscope.lucky_color}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
            
            // Add staggered animation
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
            
            horoscopeGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading horoscopes:', error);
        // Fallback to default horoscopes
        zodiacData.forEach((sign, index) => {
            const card = document.createElement('div');
            card.className = 'horoscope-card';
            card.innerHTML = `
                <div class="horoscope-card-inner">
                    <div class="horoscope-card-front">
                        <i class="${sign.icon} horoscope-icon"></i>
                        <h3>${sign.name}</h3>
                        <p class="zodiac-date">${sign.dates}</p>
                        <p class="flip-instruction">Click to reveal your horoscope</p>
                    </div>
                    <div class="horoscope-card-back">
                        <div class="horoscope-content">
                            <h4>Today's Horoscope</h4>
                            <p>The cosmic energies are in your favor. Trust the journey ahead.</p>
                            <div class="horoscope-detail">
                                <strong>Lucky Number:</strong> ${Math.floor(Math.random() * 100)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
            
            horoscopeGrid.appendChild(card);
        });
    }
}

function generateDefaultHoroscopes() {
    const horoscopes = [];
    const loveMessages = [
        'Romance is in the air. Open your heart to new possibilities.',
        'Communication strengthens your relationships today.',
        'A surprise encounter may lead to something special.',
        'Focus on deepening existing connections.',
        'Your charm is magnetic today.'
    ];
    
    const careerMessages = [
        'Your creativity shines at work. Share your ideas.',
        'A new opportunity is on the horizon.',
        'Collaboration leads to success today.',
        'Trust your professional instincts.',
        'Recognition for your efforts is coming.'
    ];
    
    const healthMessages = [
        'Balance is key. Take time for self-care.',
        'Physical activity boosts your energy.',
        'Listen to your body\'s needs.',
        'Mental clarity comes through meditation.',
        'Stay hydrated and rest well.'
    ];
    
    zodiacData.forEach(sign => {
        horoscopes.push({
            zodiac_sign: sign.name,
            daily_horoscope: `The universe aligns favorably for ${sign.name} today. Embrace the cosmic energy flowing your way.`,
            love: loveMessages[Math.floor(Math.random() * loveMessages.length)],
            career: careerMessages[Math.floor(Math.random() * careerMessages.length)],
            health: healthMessages[Math.floor(Math.random() * healthMessages.length)],
            lucky_number: Math.floor(Math.random() * 100) + 1,
            lucky_color: ['Purple', 'Gold', 'Blue', 'Green', 'Red', 'Silver', 'Orange'][Math.floor(Math.random() * 7)]
        });
    });
    
    return horoscopes;
}

// === PLANETS ===
function initializePlanets() {
    const planets = document.querySelectorAll('.planet');
    const planetDetails = document.getElementById('planet-details');
    
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            const planetName = planet.getAttribute('data-planet');
            const data = planetaryData[planetName];
            
            if (data) {
                planetDetails.innerHTML = `
                    <h4 style="color: ${data.color}; margin-bottom: 1rem;">${planetName}</h4>
                    <p>${data.influence}</p>
                `;
            }
        });
        
        planet.addEventListener('mouseleave', () => {
            planetDetails.innerHTML = '<p>Hover over a planet to see its current influence</p>';
        });
    });
}

// === BIRTH CHART ===
function initializeBirthChart() {
    const form = document.getElementById('birth-chart-form');
    const resultContainer = document.getElementById('chart-result');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            birthDate: document.getElementById('birth-date').value,
            birthTime: document.getElementById('birth-time').value,
            birthPlace: document.getElementById('birth-place').value
        };
        
        // Calculate birth chart
        const chartData = calculateBirthChart(formData);
        
        // Display results
        displayBirthChart(chartData);
        
        // Save to database
        try {
            await saveBirthChart(chartData);
        } catch (error) {
            console.error('Error saving birth chart:', error);
        }
    });
}

function calculateBirthChart(formData) {
    const birthDate = new Date(formData.birthDate);
    
    // Calculate sun sign
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const sunSign = calculateZodiacSign(month, day);
    
    // Simplified calculations for moon and rising signs
    const moonSign = zodiacData[Math.floor(Math.random() * 12)].name;
    const risingSign = zodiacData[Math.floor(Math.random() * 12)].name;
    
    return {
        name: formData.name,
        birth_date: formData.birthDate,
        birth_time: formData.birthTime,
        birth_place: formData.birthPlace,
        sun_sign: sunSign,
        moon_sign: moonSign,
        rising_sign: risingSign,
        chart_data: generateChartAnalysis(sunSign, moonSign, risingSign)
    };
}

function calculateZodiacSign(month, day) {
    const signs = [
        { name: 'Capricorn', start: [12, 22], end: [1, 19] },
        { name: 'Aquarius', start: [1, 20], end: [2, 18] },
        { name: 'Pisces', start: [2, 19], end: [3, 20] },
        { name: 'Aries', start: [3, 21], end: [4, 19] },
        { name: 'Taurus', start: [4, 20], end: [5, 20] },
        { name: 'Gemini', start: [5, 21], end: [6, 20] },
        { name: 'Cancer', start: [6, 21], end: [7, 22] },
        { name: 'Leo', start: [7, 23], end: [8, 22] },
        { name: 'Virgo', start: [8, 23], end: [9, 22] },
        { name: 'Libra', start: [9, 23], end: [10, 22] },
        { name: 'Scorpio', start: [10, 23], end: [11, 21] },
        { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
    ];
    
    for (const sign of signs) {
        const [startMonth, startDay] = sign.start;
        const [endMonth, endDay] = sign.end;
        
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
            return sign.name;
        }
    }
    
    return 'Capricorn';
}

function generateChartAnalysis(sunSign, moonSign, risingSign) {
    return `Your Sun in ${sunSign} represents your core essence and ego. 
    Your Moon in ${moonSign} reveals your emotional nature and inner world. 
    Your Rising sign in ${risingSign} shows how you present yourself to the world. 
    This unique combination creates a complex and fascinating personality profile.`;
}

function displayBirthChart(chartData) {
    const resultContainer = document.getElementById('chart-result');
    
    resultContainer.innerHTML = `
        <div class="chart-result">
            <h3>${chartData.name}'s Birth Chart</h3>
            <div class="chart-signs">
                <div class="sign-item">
                    <strong>Sun Sign:</strong>
                    <span>${chartData.sun_sign}</span>
                </div>
                <div class="sign-item">
                    <strong>Moon Sign:</strong>
                    <span>${chartData.moon_sign}</span>
                </div>
                <div class="sign-item">
                    <strong>Rising Sign:</strong>
                    <span>${chartData.rising_sign}</span>
                </div>
            </div>
            <div class="chart-analysis">
                <h4>Your Cosmic Blueprint</h4>
                <p>${chartData.chart_data}</p>
            </div>
        </div>
    `;
    
    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function saveBirthChart(chartData) {
    try {
        const response = await fetch('tables/birth_charts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chartData)
        });
        
        if (response.ok) {
            console.log('Birth chart saved successfully');
        }
    } catch (error) {
        console.error('Error saving birth chart:', error);
    }
}

// === SCROLL ANIMATIONS ===
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// === UTILITY FUNCTIONS ===
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// === PARTICLE EFFECTS (Optional Enhancement) ===
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite;
            opacity: ${Math.random()};
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Initialize particles on load
createParticles();

// === CONSOLE MESSAGE ===
console.log('%c✨ Cosmic Astrology ✨', 'font-size: 20px; font-weight: bold; color: #6b4ce6;');
console.log('%cWelcome to your cosmic journey!', 'font-size: 14px; color: #ff6b9d;');
