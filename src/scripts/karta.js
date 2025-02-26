/**
 * Lyssnar på formulärets submit-event och hämtar koordinater från Nominatim API.
 */
document.getElementById("searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const location = document.getElementById("locationInput").value;
    if (!location) return;

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
        const data = await response.json();

        if (data.length === 0) {
            alert("Platsen hittades inte. Försök igen.");
            return;
        }

        const { lat, lon } = data[0]; // Första resultatet
        updateMap(lat, lon);
    } catch (error) {
        console.error("Fel vid hämtning av plats:", error);
    }
});

/**
 * Uppdaterar kartan med de nya koordinaterna.
 * @param {string} lat - Latitude (breddgrad)
 * @param {string} lon - Longitude (längdgrad)
 */
function updateMap(lat, lon) {
    const mapFrame = document.getElementById("mapFrame");
    mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon},${lat},${lon},${lat}&marker=${lat},${lon}`;
}
