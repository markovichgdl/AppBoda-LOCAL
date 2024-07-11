// script.js
window.addEventListener("load", function () {
  console.log("La página ha cargado completamente");
  var loader = document.getElementById("loader");
  var content = document.getElementById("content");
  loader.style.display = "none";
  //content.style.display = "block";
});

//MENSAJE DE BIENVENIDA
document.addEventListener("DOMContentLoaded", function () {
  const Swal = window.Swal; // Assuming Swal is globally available

  Swal.fire({
    imageUrl: "img/lmlogo.png", // Ruta relativa desde la ubicación del archivo HTML
    imageWidth: 185, // Ancho de la imagen en píxeles
    //imageHeight: 57, // Alto de la imagen en píxeles
    imageAlt: "Logo Lima Memories", // Texto alternativo de la imagen para accesibilidad

    html: `
      <p style="font-size: 110%; line-height: 1.0;font-weight: bold;text-align: center;margin-top: -4%"> "Lime Memories es una aplicación que permite a los invitados compartir los momentos más destacados del evento con los anfitriones, manteniendo la calidad original." </p>
      <p style="font-size: 100%; line-height: 1.5;">Podras compartir hasta 5 fotos/videos</p>
    `,
    //icon: "info",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#6c757d",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      // Continuar con el proceso de carga (no se hace nada adicional porque es solo un mensaje informativo al inicio)
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      window.location.href = "Out.html"; // Redirigir a Out.html si se cancela
    }
  });
});
