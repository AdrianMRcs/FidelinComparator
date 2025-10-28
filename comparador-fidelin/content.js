
function getProductTitle() {
  const titleElement = document.getElementById("productTitle");
  if (!titleElement) return null;
  const words = titleElement.innerText.trim().split(" ");
  return words.slice(1, 6).join(" ");
}

function createSearchButton(query) {
  const btn = document.createElement("button");

  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("fidelin_icon_16.png");
  img.alt = "Fidelín";
  img.style.width = "16px";
  img.style.height = "16px";
  img.style.marginRight = "8px";
  img.style.verticalAlign = "middle";

  btn.appendChild(img);
  btn.appendChild(document.createTextNode("Buscar en AliExpress"));
  styleButton(btn);

  btn.onclick = () => {
    const aliURL = `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(query)}`;
    window.open(aliURL, "_blank");
  };

  return btn;
}

function createImageButton() {
  const btn = document.createElement("button");
  btn.innerText = "🖼️ Buscar por imagen (Google Lens)";
  styleButton(btn);
  btn.onclick = () => {
    const imgURL = document.querySelector("#imgTagWrapperId img")?.src;
    if (imgURL) {
      const lensURL = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imgURL)}`;
      window.open(lensURL, "_blank");
    } else {
      alert("No se pudo obtener la imagen del producto.");
    }
  };
  return btn;
}

function styleButton(btn) {
  btn.style.display = "block";
  btn.style.marginTop = "10px";
  btn.style.padding = "8px 12px";
  btn.style.background = "#ff9900";
  btn.style.border = "none";
  btn.style.color = "white";
  btn.style.fontWeight = "bold";
  btn.style.cursor = "pointer";
}

function injectButtons() {
  const titleElement = document.getElementById("title");
  const query = getProductTitle();
  if (titleElement && query) {
    if (!document.getElementById("comparador-fidelin")) {
      const searchBtn = createSearchButton(query);
      searchBtn.id = "comparador-fidelin";
      titleElement.appendChild(searchBtn);

      const imageBtn = createImageButton();
      imageBtn.id = "imagen-fidelin";
      titleElement.appendChild(imageBtn);
    }
  }
}

setTimeout(injectButtons, 2000);
