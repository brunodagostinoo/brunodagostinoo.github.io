document.addEventListener('DOMContentLoaded', function() {
    fetch('links.json')
        .then(response => response.json())
        .then(data => {
            const linksContainer = document.querySelector('.links');
            linksContainer.innerHTML = ''; // Clear hardcoded links
            data.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url;
                a.className = 'link-button';
                a.textContent = link.text;
                linksContainer.appendChild(a);
            });
        })
        .catch(error => console.error('Error loading links:', error));
});