document.addEventListener('DOMContentLoaded', () => {
    // Coordinates for Alberto's Pastries (Via Uberto Mondolfi, Livorno)
    const livornoCoords = [43.5855, 10.3242]; 
    const mapZoom = 15;

    const map = L.map('leaflet-map').setView(livornoCoords, mapZoom);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker(livornoCoords).addTo(map);


    marker.bindPopup(`
        <strong>Alberto's Pastries</strong><br>
        Via Uberto Mondolfi, 192/A, Livorno<br>
        Come visit us for fresh pastries!
    `).openPopup();
});