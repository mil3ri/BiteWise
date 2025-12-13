document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('betaModal');
    const openBtns = document.querySelectorAll('[data-open-beta]');
    const closeBtns = document.querySelectorAll('[data-close-beta]');
    const form = document.getElementById('betaForm');
    const statusMsg = document.getElementById('betaStatus');
    const successMsg = document.getElementById('betaSuccess');
    const errorMsg = document.getElementById('betaError');

    function openModal() {
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; // Restore scrolling
        }
        
        // Reset form state
        if (form) form.reset();
        if (statusMsg) statusMsg.textContent = '';
        if (successMsg) successMsg.classList.add('hidden');
        if (errorMsg) errorMsg.classList.add('hidden');
    }

    // Attach event listeners
    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));
    
    closeBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    }));

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Form handling
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            if (statusMsg) statusMsg.textContent = '';
            if (successMsg) successMsg.classList.add('hidden');
            if (errorMsg) errorMsg.classList.add('hidden');

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const endpoint = window.BITEWISE_BETA_ENDPOINT;

            if (!endpoint) {
                console.error('Formspree endpoint not defined');
                if (statusMsg) statusMsg.textContent = 'Configuration error. Please try again later.';
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                return;
            }

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    form.reset();
                    if (successMsg) {
                        successMsg.textContent = "Thanks! We've added you to the list.";
                        successMsg.classList.remove('hidden');
                    }
                    setTimeout(() => {
                        closeModal();
                    }, 3000);
                } else {
                    const result = await response.json();
                    if (errorMsg) {
                        if (Object.hasOwn(result, 'errors')) {
                            errorMsg.textContent = result.errors.map(error => error.message).join(", ");
                        } else {
                            errorMsg.textContent = "Oops! There was a problem submitting your form";
                        }
                        errorMsg.classList.remove('hidden');
                    }
                }
            } catch (error) {
                if (errorMsg) {
                    errorMsg.textContent = "Oops! There was a problem submitting your form";
                    errorMsg.classList.remove('hidden');
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});
