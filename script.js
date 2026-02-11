let equipoActual = "";

const datosMundial = {
    mexico: {
        nombre: "MÉXICO",
        stats: "Sede Mundial 2026. Ranking FIFA: 15. Jugador clave: Santiago Giménez."
    },
    japon: {
        nombre: "JAPÓN",
        stats: "Clasificado AFC. Ranking FIFA: 18. Jugador clave: Takefusa Kubo."
    }
};

// Eventos de detección
document.getElementById('marker-mexico').addEventListener('markerFound', () => {
    equipoActual = "mexico";
    document.getElementById('info-panel').style.display = "flex";
});

document.getElementById('marker-japon').addEventListener('markerFound', () => {
    equipoActual = "japon";
    document.getElementById('info-panel').style.display = "flex";
});

// Opcional: Ocultar panel si se pierde el marcador
document.getElementById('marker-mexico').addEventListener('markerLost', () => {
    document.getElementById('info-panel').style.display = "none";
    cerrarStats();
});

document.getElementById('marker-japon').addEventListener('markerLost', () => {
    document.getElementById('info-panel').style.display = "none";
    cerrarStats();
});

// Botón de Estadísticas (Implementación de interacción requerida) [cite: 77]
document.getElementById('btn-stats').addEventListener('click', function() {
    const display = document.getElementById('stats-display');
    if (equipoActual && datosMundial[equipoActual]) {
        document.getElementById('country-name').innerText = datosMundial[equipoActual].nombre;
        document.getElementById('country-data').innerText = datosMundial[equipoActual].stats;
        display.style.display = "block";
    }
});

function cerrarStats() {
    document.getElementById('stats-display').style.display = "none";
}

// ACTIVAR ESCANEO (Botón solicitado)
document.getElementById('scan-button').addEventListener('click', function() {
    const preview = document.getElementById('camera-preview');
    const frame = document.getElementById('scanner-frame');
    const button = document.getElementById('scan-button');
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
        if (preview.querySelector('video')) return;

        frame.style.display = "block";
        button.style.display = "none";

        let video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute("playsinline", true); 
        video.play();
        
        preview.appendChild(video);
        console.log("Sistema de escaneo activo");
    })
    .catch(err => alert("Acceso denegado. Asegúrate de usar HTTPS."));
});