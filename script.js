document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var form = event.target;
    var formData = new FormData(form);
    
    console.log("Formulario enviado");
    
    fetch("/convert", {
        method: "POST",
        body: formData
    })
    .then(response => {
        console.log("Respuesta del servidor:", response);
        return response.blob();
    })
    .then(blob => {
        console.log("Blob recibido:", blob);
        // Crear un enlace de descarga para el nuevo PDF
        var downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = form.elements.newPdfName.value + ".pdf";
        downloadLink.click();
    })
    .catch(error => {
        console.error("Error:", error);
    });
});