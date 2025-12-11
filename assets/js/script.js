document.addEventListener('DOMContentLoaded', function() {
    // 1. Toggle Navigasi Mobile
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavUl = document.querySelector('#main-nav ul');

    navToggle.addEventListener('click', () => {
        mainNavUl.classList.toggle('show');
    });

    // 2. Interaksi Modal Biografi Pahlawan
    const modal = document.getElementById('bioModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalName = document.getElementById('modal-name');
    const modalBio = document.getElementById('modal-bio');
    const detailButtons = document.querySelectorAll('.btn-detail');

    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.profile-card');
            const name = card.querySelector('h3').textContent;
            const bio = card.getAttribute('data-bio');
            
            modalName.textContent = name;
            modalBio.innerHTML = bio;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // 3. Interaksi Tab Galeri Budaya
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryContents = document.querySelectorAll('.gallery-content');

    // Tampilkan konten tab pertama secara default saat DOMContentLoaded
    const firstTab = document.querySelector('.tab-btn');
    const firstContent = document.getElementById(`tab-${firstTab.dataset.tab}`);
    firstTab.classList.add('active');
    firstContent.classList.add('active');



    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus kelas 'active' dari semua tombol dan konten
            tabButtons.forEach(btn => btn.classList.remove('active'));
            galleryContents.forEach(content => content.classList.remove('active'));

            // Tambahkan kelas 'active' ke tombol yang diklik
            this.classList.add('active');

            // Tampilkan konten yang sesuai
            const targetTab = this.getAttribute('data-tab');
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 4. Highlight Navigasi Saat Scroll
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('header nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Section dianggap aktif ketika 30% terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus 'active' dari semua link
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Tambahkan 'active' ke link yang sesuai
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`header nav ul li a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

});