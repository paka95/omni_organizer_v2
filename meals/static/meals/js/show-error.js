export function showError(errorMessage) {
    const banner = document.getElementById('error-banner')
    banner.innerHTML = errorMessage;
    banner.classList.add('show');

    setTimeout(function() {
        banner.classList.remove("show");
        }, 5000); // Hide after 5 seconds
}