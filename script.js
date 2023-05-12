// Obtén los elementos del formulario y el botón de envío
const uploadForm = document.getElementById('uploadForm');
const inputs = uploadForm.querySelectorAll('input');
const submitButton = uploadForm.querySelector('.enviar');

// Agrega un evento 'input' a cada campo de entrada
inputs.forEach(input => {
  input.addEventListener('input', () => {
    // Verifica si todos los campos tienen contenido
    const allInputsFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    
    // Si todos los campos están llenos, muestra el botón de envío
    if (allInputsFilled) {
      submitButton.classList.remove('oculto');
    } else {
      submitButton.classList.add('oculto');
    }
  });
});

document.getElementById("uploadForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    var form = event.target;
    var formData = new FormData(form);
    
    console.log("Formulario enviado");
    console.log("Datos del formulario:", Object.fromEntries(formData));
    
    try {
        const response = await fetch("http://0.0.0.0:10000/convert", {
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
