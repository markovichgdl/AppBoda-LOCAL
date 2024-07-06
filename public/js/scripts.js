document.getElementById("files").addEventListener("change", function () {
  const files = this.files;
  const fileCount = files.length;
  const customFileButton = document.getElementById("customFileButton");

  if (fileCount === 0) {
    customFileButton.textContent = "Seleccionar Archivos";
  } else {
    customFileButton.textContent = `${fileCount} Archivos seleccionados.`;
    confirmUpload(files);
  }
});

function confirmUpload(files) {
  const Swal = window.Swal; // Assuming Swal is globally available

  Swal.fire({
    title: "¿Estás listo para subir tus fotos y videos?",
    html: `
      <input type="text" id="clientName" class="swal2-input centered-input" placeholder="Firma con tu nombre. Opc">
      <p style="text-align: center; margin-top: 10px; font-size: 14px;">Se subirá un total de ${files.length} archivos.</p>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6c757d",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, subir",
    cancelButtonText: "Cancelar",
    customClass: {
      //popup: "small-popup", // Clase personalizada para el tamaño del popup
    },
    didOpen: () => {
      // Ajustar el tamaño del input centrado
      const inputField = document.getElementById("clientName");
      inputField.style.width = "80%"; // Ajustar el ancho al 100%
      inputField.style.boxSizing = "border-box"; // Incluir el padding en el ancho total
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const clientName = document.getElementById("clientName").value;
      showNoticeMessage();
      uploadFiles(files, clientName);
    }
  });
}

function showNoticeMessage() {
  const Swal = window.Swal; // Assuming Swal is globally available

  Swal.fire({
    icon: "info",
    title: "Aviso de Paciencia",
    text: "No cierres la aplicación hasta ver un mensaje de éxito.",
    showConfirmButton: false,
  });
}

function uploadFiles(files, clientName) {
  const Swal = window.Swal; // Assuming Swal is globally available

  const maxSizeInBytes = 150 * 1024 * 1024; // 150MB en bytes
  const maxFiles = 5;
  const formData = new FormData();

  if (files.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor selecciona hasta un máximo de 5 archivos.",
      confirmButtonColor: "#6c757d",
    });
    return;
  }

  let filesExceedingSizeLimit = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].size > maxSizeInBytes) {
      filesExceedingSizeLimit.push(files[i].name);
    }
  }

  if (filesExceedingSizeLimit.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `Los siguientes archivos exceden el tamaño máximo permitido de 150MB: ${filesExceedingSizeLimit.join(
        ", "
      )}.`,
      confirmButtonColor: "#6c757d",
    });
    return;
  }

  if (files.length > maxFiles) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `No puedes subir más de ${maxFiles} archivos a la vez.`,
      confirmButtonColor: "#6c757d",
    });
    return;
  }

  formData.append("clientName", clientName);
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Se subieron tus fotos y videos con éxito!",
        confirmButtonColor: "#6c757d",
      }).then(() => {
        window.location.href = "Out.html"; // Redirigir a la nueva página
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error!",
        confirmButtonColor: "#6c757d",
      });
    }
  };

  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      const percentComplete = Math.floor((event.loaded / event.total) * 100);
      const progressBar = document.getElementById("progressBar");
      progressBar.style.width = percentComplete + "%";
      progressBar.textContent = ` ${percentComplete}%`;
    }
  };

  xhr.send(formData);
}
