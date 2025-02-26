"use strict"

/**
 * Hämtar data från API:et och returnerar den som ett JavaScript-objekt.
 * @returns {Promise<Object>} - En promise som returnerar JSON-data.
 */
async function fetchData() {
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        if (!response.ok) {
            throw new Error('Nätverksfel: Kunde inte hämta data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fel vid hämtning av data:', error);
    }
}

/**
 * Skapar ett stapeldiagram med Chart.js.
 * @param {Object} data - JSON-data som innehåller information om kurser.
 */
function createBarChart(data) {
    const courses = data
        .filter(item => item.type === 'Kurs')
        .sort((a, b) => Number(b.applicantsTotal) - Number(a.applicantsTotal))
        .slice(0, 6);

    const ctx = document.getElementById('barChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: courses.map(course => course.name),
            datasets: [{
                label: 'Antal sökande',
                data: courses.map(course => Number(course.applicantsTotal)), // Konvertera till nummer
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
/**
 * Skapar ett cirkeldiagram med Chart.js.
 * @param {Object} data - JSON-data som innehåller information om program.
 */
function createPieChart(data) {
    const programs = data
        .filter(item => item.type === 'Program')
        .sort((a, b) => Number(b.applicantsTotal) - Number(a.applicantsTotal))
        .slice(0, 5);

    const ctx = document.getElementById('pieChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: programs.map(program => program.name),
            datasets: [{
                label: 'Antal sökande',
                data: programs.map(program => Number(program.applicantsTotal)), // Konvertera till nummer
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}
/**
 * Initierar diagrammen genom att hämta data och skapa diagram.
 */
async function initCharts() {
    const data = await fetchData();
    if (data) {
        createBarChart(data);
        createPieChart(data);
    }
}

// Kör funktionen för att initiera diagrammen när sidan laddas
initCharts();