document.getElementById('scan-button').addEventListener('click', function() {
    const preview = document.getElementById('camera-preview');
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            if (preview.querySelector('video')) return;

            let video = document.createElement('video');
            video.srcObject = stream;
            video.setAttribute("playsinline", true); 
            video.play();
            
            preview.appendChild(video);
            console.log("Escáner activado");
        })
        .catch(function(err) {
            alert("Error al acceder a la cámara. Revisa los permisos.");
        });
});