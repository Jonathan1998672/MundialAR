document.getElementById('scan-button').addEventListener('click', function() {
    const preview = document.getElementById('camera-preview');
    
    // Solicitar acceso a la cámara del celular
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            // Crear el elemento video
            let video = document.createElement('video');
            video.srcObject = stream;
            video.setAttribute("playsinline", true); // Requerido para iOS
            video.play();
            
            // Estilo para que el video llene el recuadro pequeño
            video.style.width = "100%";
            video.style.height = "100%";
            video.style.objectFit = "cover";

            // Limpiar mensaje previo e insertar video
            preview.innerHTML = "";
            preview.appendChild(video);
            
            console.log("Cámara activada en el recuadro central");
        })
        .catch(function(err) {
            console.error("Error al acceder a la cámara: ", err);
            alert("Para escanear, por favor permite el acceso a la cámara.");
        });
});