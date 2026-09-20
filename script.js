/* ============ Menu mobile ============ */
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

/* ============ Reveal au scroll ============ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ============ Formulaire de réservation -> WhatsApp ============ */
const form = document.getElementById('reservation-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const message = document.getElementById('message').value.trim();
    const msgBox = document.querySelector('.form-msg');

    if (!nom || !service) {
      msgBox.textContent = "Merci de renseigner au moins votre nom et le service souhaité.";
      return;
    }

    let txt = `Bonjour, je souhaite réserver.%0A`;
    txt += `Nom : ${encodeURIComponent(nom)}%0A`;
    txt += `Service : ${encodeURIComponent(service)}%0A`;
    if (date) txt += `Date souhaitée : ${encodeURIComponent(date)}%0A`;
    if (message) txt += `Message : ${encodeURIComponent(message)}`;

    const phone = '33601104047'; // 06 01 10 40 47 au format international
    window.open(`https://wa.me/${phone}?text=${txt}`, '_blank');
    msgBox.textContent = "Ouverture de WhatsApp… Si rien ne s'ouvre, contactez-nous au 06 01 10 40 47.";
    form.reset();
  });
}
