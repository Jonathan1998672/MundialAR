document.getElementById('scan-button').addEventListener('click', function() {
    const frame = document.getElementById('scanner-frame');
    const startBtn = document.getElementById('scan-button');
    const rescanBtn = document.getElementById('rescan-button');
    const bottomBar = document.getElementById('bottom-bar');
    const preview = document.getElementById('camera-preview');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
        frame.style.display = "block";
        startBtn.style.display = "none";

        let video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        preview.appendChild(video);

        // Simulamos que detecta el logo tras 2 segundos para mostrar el mockup
        setTimeout(() => {
            frame.style.display = "none"; 
            rescanBtn.style.display = "flex"; 
            bottomBar.style.display = "flex"; 
        }, 2000);
    })
    .catch(err => {
        alert("Acceso a cámara denegado o no disponible.");
    });
});

document.getElementById('rescan-button').addEventListener('click', function() {
    location.reload(); 
});