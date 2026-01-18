// Timeline Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Filter function
    function filterTimeline(filterValue) {
        timelineItems.forEach(item => {
            const categories = item.getAttribute('data-category');
            
            if (filterValue === 'all') {
                // Show all items
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                // Check if item has the selected category
                if (categories && categories.includes(filterValue)) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    }

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Apply filter
            filterTimeline(filterValue);
        });
    });

    // Initialize with 'all' filter
    filterTimeline('all');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Skills animation - 그래프 차오르는 효과
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const skillProgress = skillItem.querySelector('.skill-progress');
            const targetWidth = skillProgress.getAttribute('data-width');
            
            // 애니메이션 클래스 추가
            skillItem.classList.add('animate');
            
            // CSS 변수 설정
            skillProgress.style.setProperty('--skill-width', targetWidth + '%');
            
            // 실제 너비 설정
            setTimeout(() => {
                skillProgress.style.width = targetWidth + '%';
            }, 100);
            
            // 숫자 카운트 애니메이션
            const percentage = skillItem.querySelector('.skill-percentage');
            const finalNumber = parseInt(targetWidth);
            animateNumber(percentage, finalNumber);
            
            // 한번만 실행되도록 관찰 중지
            skillObserver.unobserve(skillItem);
        }
    });
}, observerOptions);

// 숫자 카운트 애니메이션 함수
function animateNumber(element, target) {
    const duration = 1500; // 1.5초
    const start = 0;
    const increment = target / (duration / 16); // 60fps 기준
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + '%';
    }, 16);
}

// 모든 스킬 아이템 관찰 시작
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
});

// 스킬 아이템 호버 효과 추가
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const skillProgress = this.querySelector('.skill-progress');
            skillProgress.style.background = 'linear-gradient(90deg, #FB923C 0%, #EA580C 100%)';
        });
        
        item.addEventListener('mouseleave', function() {
            const skillProgress = this.querySelector('.skill-progress');
            skillProgress.style.background = 'linear-gradient(90deg, #EA580C 0%, #FB923C 100%)';
        });
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        const email = emailInput ? emailInput.value : '';
        const message = messageInput ? messageInput.value : '';
        
        // Simple validation
        if (!email || !message) {
            alert('모든 필드를 채워주세요.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }
        
        // Show success message
        alert('메시지가 성공적으로 전송되었습니다!');
        this.reset();
    });
}

// Simple scroll effect for navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
        return;
    }
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('is-active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('is-active');
        }
    });
});
