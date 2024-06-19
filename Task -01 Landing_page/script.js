function scrollToForm() {
    document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('event-form').addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Thank you for registering!');
    event.target.reset();
});
