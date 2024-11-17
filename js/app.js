// MODAL IMAGE GALLERY (LIGHTBOX)

// 212.

const images = document.querySelectorAll(".gallery img");
const modal = document.querySelector("#modal");
const modalImg = document.querySelector("#modal-image");
const modalDescription = document.querySelector("#modal-description");
const closeModalBtn = document.querySelector("#closeModalBtn");
const prevImageBtn = document.querySelector("#prevImageBtn");
const nextImageBtn = document.querySelector("#nextImageBtn");
const downloadImageBtn = document.querySelector("#downloadImageBtn");

// Inicializar el índice actual
let curretIndex = 0;

//funcion para abrir la ventana modal
function openModal(img) {
  modal.style.display = "block";
  modalImg.src = img.src;
  modalDescription.innerText = img.getAttribute("data-description") || "";
  curretIndex = Array.from(images).indexOf(img);
}

images.forEach((img) => {
  img.addEventListener("click", () => {
    openModal(img);
  });
});

// MOSTRAR LA IMAGENE EN EL ,ODAL Y ACTUALIZAR DESCRIPTION
function showImage(img) {
  modalImg.src = img.src;
  modalDescription.innerText = img.dataset.description || "";
  curretIndex = Array.from(images).indexOf(img);
}

// 213. Botones “Anterior” y “Siguente”
// Funcion para mostrar la imagen anterior
function prevImage() {
  curretIndex = (curretIndex - 1 + images.length) % images.length;
  showImage(images[curretIndex]);
}
prevImageBtn.addEventListener("click", prevImage);

// Function para mostrar la imagen siguiente
function nextImage() {
  curretIndex = (curretIndex + 1) % images.length;
  showImage(images[curretIndex]);
}
nextImageBtn.addEventListener("click", nextImage);

// Mostrar la imagen anterior con tecla de direcccionamiente
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    prevImage();
  }
});

// Mostrar la imagen siguiente con tecla de direcccionamiente
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight") {
    nextImage();
  }
});

// 214. Cerrar la ventana modal

const closeModal = () => {
  modal.style.display = "none";
};

closeModalBtn.addEventListener("click", closeModal);

// Cerrar la ventana mosdal si se hac clic en cualquier parte de la pantalla
modal.addEventListener("click", (e) => {
  if (e.target == modal) {
    closeModal();
  }
});

// 215. Descargar la imagen
function downloadImage() {
  const a = document.createElement("a");
  a.href = images[curretIndex].src;
  a.download = "image.jpg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

downloadImageBtn.addEventListener("click", downloadImage);

// 216. Botones para compartir en las redes sociales
//Funcion para compartir en facebook
// https://developers.facebook.com/docs/plugins/share-button/

function shareOnFacebook() {
  const url =
    "https://www.facebook.com/sharer/sharer.php?" +
    encodeURIComponent(window.location.href);
  window.open(url, "_blank");
}

document
  .querySelector("#facebookShareBtn")
  .addEventListener("click", shareOnFacebook);

//Funcion para compartir en X
// https://developer.x.com/en/docs/x-for-websites/tweet-button/overview

function shareOnTwitter() {
  const url =
    "https://twitter.com/intent/tweet?" +
    encodeURIComponent(window.location.href);
  window.open(url, "_blank");
}

document
  .querySelector("#twitterShareBtn")
  .addEventListener("click", shareOnTwitter);

// 217. Scroll infinito
// scroll infinito
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const galleryItem = document.querySelectorAll(".gallery-item");
  const loadMoreBtn = document.querySelector("#loadMoreBtn");

  // incremento en la cantidad de lementos a cargar
  const increment = 6;

  // contador de elementos visibles
  let visibleItems = increment;

  // Funcion para mostrar los elementos
  function showItems(){
    galleryItem.forEach((item, index) => {
      if (index < visibleItems) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // ocultar el boton de carga si se muestrar todas las  imganes
    if (visibleItems >= galleryItem.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  }

  showItems();
  loadMoreBtn.addEventListener("click", () => {
    visibleItems += increment;
    showItems();
  });
});
