// =============================================
// LOGIKA SCROLL ANIMATION (INTERSECTION OBSERVER)
// =============================================

const sections = document.querySelectorAll('.content-section');

const observerOptions = {
    root: null, 
    rootMargin: "0px",
    threshold: 0.2 // Animasi dipicu saat 20% dari section terlihat
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const content = entry.target.querySelector('.section-content');
        
        if (entry.isIntersecting) {
            if (entry.target.id === 'home') {
                 // Gunakan animasi 'popup' yang dramatis untuk HOME
                content.classList.add('popup');
            } else {
                // Gunakan animasi 'fade-in-scroll' untuk section lainnya
                content.classList.add('fade-in-scroll');
            }
            // Hentikan pengamatan agar animasi hanya berjalan sekali
            observer.unobserve(entry.target); 
        } 
    });
}, observerOptions);

// Mulai mengamati semua section
sections.forEach(section => {
    sectionObserver.observe(section);
});


// =============================================
// LOGIKA SMOOTH SCROLL NAVIGASI
// =============================================

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
        const content = target.querySelector('.section-content');

        // Scroll halus
        const offset = 75; // Sesuai dengan padding-top body
        const targetPos = target.offsetTop - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });

        // Ulang animasi pop-up di section tujuan
        if (content) {
             // Hapus kelas animasi yang mungkin sudah ada
             content.classList.remove('popup', 'fade-in-scroll'); 
             void content.offsetWidth; // Memaksa reflow untuk memulai ulang animasi
             
             // Tambahkan kembali kelas yang sesuai
             if (target.id === 'home') {
                 content.classList.add('popup');
             } else {
                 content.classList.add('fade-in-scroll');
             }
        }
    }
  });
});