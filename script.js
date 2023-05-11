document.getElementById("uploadForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    var form = event.target;
    var formData = new FormData(form);
    
    console.log("Formulario enviado");
    console.log("Datos del formulario:", Object.fromEntries(formData));
    
    try {
        const response = await fetch("/convert", {
            method: "POST",
            body: formData
        });

        console.log("Respuesta del servidor:", response);

        const blob = await response.blob();
        console.log("Blob recibido:", blob);

        // Crear un enlace de descarga para el nuevo PDF
        var downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = form.elements.newPdfName.value + ".pdf";
        downloadLink.click();
    } catch (error) {
        console.error("Error:", error);
    }
});

});
