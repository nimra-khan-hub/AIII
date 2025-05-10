// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle Free Trial Button
document.querySelectorAll('.btn-gradient').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const plan = this.closest('.pricing-card')?.querySelector('h3')?.textContent || 'Free Trial';
        showModal(`Start ${plan}`, 'Please sign up to continue with your trial.');
    });
});

// Handle Pricing Plan Selection
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', function() {
        const plan = this.querySelector('h3').textContent;
        const price = this.querySelector('.amount').textContent;
        showModal(`Select ${plan} Plan`, `You've selected the ${plan} plan at $${price}/month.`);
    });
});

// Handle Login Form
const loginForm = document.querySelector('.auth-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('#email').value;
        const password = this.querySelector('#password').value;
        
        if (!email || !password) {
            showModal('Error', 'Please fill in all fields.');
            return;
        }
        
        showModal('Success', 'Login successful! Redirecting to dashboard...');
    });
}

// Handle Social Auth Buttons
document.querySelectorAll('.btn-social').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const provider = this.classList.contains('btn-google') ? 'Google' : 'Facebook';
        showModal('Social Login', `Connecting with ${provider}...`);
    });
});

// Password Strength Meter
const passwordInput = document.querySelector('#password');
if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text span');
        
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;
        
        strengthBar.style.width = `${strength}%`;
        
        if (strength <= 25) {
            strengthBar.style.background = '#F44336';
            strengthText.textContent = 'Weak';
        } else if (strength <= 50) {
            strengthBar.style.background = '#FFC107';
            strengthText.textContent = 'Medium';
        } else if (strength <= 75) {
            strengthBar.style.background = '#4CAF50';
            strengthText.textContent = 'Strong';
        } else {
            strengthBar.style.background = '#00E676';
            strengthText.textContent = 'Very Strong';
        }
    });
}

// Modal Function
function showModal(title, message) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content glass-card">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-gradient" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Initialize and show modal
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // Remove modal from DOM after it's hidden
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
}

// Add modal styles
const style = document.createElement('style');
style.textContent = `
    .modal-content {
        background: var(--card-bg);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
    }
    
    .modal-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .modal-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .btn-close {
        filter: invert(1) grayscale(100%) brightness(200%);
    }
`;
document.head.appendChild(style); 