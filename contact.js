const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcdwxyz"

  var form = document.getElementById('contactForm');
  var success = document.getElementById('success');
  var errorBox = document.getElementById('error');
  var btn = document.getElementById('submitBtn');

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove('hidden');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form));

    if (!data.name.trim() || !form.email.checkValidity() || !data.topic || data.message.trim().length < 10) {
      return showError('Please add your name, a valid email, a topic, and a message of at least 10 characters.');
    }
    errorBox.classList.add('hidden');
    btn.disabled = true;
    btn.textContent = 'SENDING...';

    try {
      if (FORM_ENDPOINT) {
        var res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Request failed');
      }
      document.getElementById('who').textContent = data.name.split(' ')[0];
      document.getElementById('where').textContent = data.email;
      form.classList.add('hidden');
      success.classList.remove('hidden');
    } catch (err) {
      showError('Something went wrong sending your message. Please try again or email hello@dressiq.com.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'SEND MESSAGE ↗';
    }
  });

  document.getElementById('again').addEventListener('click', () => {
    form.reset();
    success.classList.add('hidden');
    form.classList.remove('hidden');
  });