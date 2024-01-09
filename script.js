document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll to anchor links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Adjust the scroll offset to leave space for the fixed navbar
            const offset = document.getElementById('nav-bar').offsetHeight;

            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });

            // Highlight the clicked menu item
            document.querySelectorAll('a.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            this.classList.add('active');
        });
    });

    // Function to toggle skills list
    function toggleSkillsList(category) {
        const list = document.getElementById(`${category}-list`);
        const displayValue = window.getComputedStyle(list).getPropertyValue('display');

        list.style.display = displayValue === 'none' || displayValue === '' ? 'block' : 'none';
    }

    // Assign the toggleSkillsList function to the click event of skills headers
    document.querySelectorAll('.skills h3').forEach(header => {
        header.addEventListener('click', function () {
            const category = this.textContent.toLowerCase().trim();
            toggleSkillsList(category);
        });
    });

    // Highlight the active menu item based on the current section
    function highlightMenuItem() {
        let fromTop = window.scrollY + document.getElementById('nav-bar').offsetHeight;

        document.querySelectorAll('section').forEach(section => {
            const link = document.querySelector(`a.nav-link[href="#${section.id}"]`);

            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                document.querySelectorAll('a.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                link.classList.add('active');
            }
        });
    }

    // Add a scroll event listener to highlight the active menu item
    window.addEventListener('scroll', highlightMenuItem);

    // Set the "Home" link as active by default
    document.querySelector('a[href="#home"]').classList.add('active');

    // Scroll to the top of the home section after the nav bar when the page is loaded, only if there's no fragment identifier in the URL
    if (!window.location.hash) {
        const homeSection = document.getElementById('home');
        const offset = document.getElementById('nav-bar').offsetHeight;
        window.scrollTo({
            top: homeSection.offsetTop - offset,
            behavior: 'smooth',
        });
    }

    // Add a scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check in case the section is already in view on page load
    handleScroll();

    // Function to handle scroll event
    function handleScroll() {
        const employmentSection = document.getElementById('employment');
        let fromTop = window.scrollY + document.getElementById('nav-bar').offsetHeight;

        if (
            employmentSection.offsetTop <= fromTop &&
            employmentSection.offsetTop + employmentSection.offsetHeight > fromTop
        ) {
            employmentSection.classList.add('fade-in');
            window.removeEventListener('scroll', handleScroll); // Remove the scroll event listener once the animation is triggered
        }
    }
});
