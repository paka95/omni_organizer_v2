export function showMessage(message, flag) {
    const banner = document.getElementById('message-banner')
    if (flag == 'error') {
        banner.style.backgroundColor = '#960000'
        banner.innerHTML = message;
        banner.classList.add('show');
    } else if (flag == 'success') {
        banner.style.backgroundColor = '#0b4192'
        banner.innerHTML = message;
        banner.classList.add('show');
    }


    setTimeout(function() {
        banner.classList.remove("show");
        }, 5000); // Hide after 5 seconds
}