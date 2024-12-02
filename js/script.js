document.addEventListener("DOMContentLoaded", () => {
    function mostrarBanderas() {
      const api = `https://restcountries.com/v3.1/all`;
  
      // Crear dinámicamente el contenedor para las banderas
      const cuerpo = document.createElement("div");
      cuerpo.id = "countries-list";
      cuerpo.style.display = "flex";
      cuerpo.style.flexWrap = "wrap";
      cuerpo.style.justifyContent = "center";
      document.body.appendChild(cuerpo);
  
      // Crear dinámicamente el contenedor para la información del país
      const infoBox = document.createElement("div");
      infoBox.id = "country-info";
      infoBox.style.display = "none";
      infoBox.style.position = "fixed";
      infoBox.style.top = "50%";
      infoBox.style.left = "50%";
      infoBox.style.transform = "translate(-50%, -50%)";
      infoBox.style.background = "white";
      infoBox.style.padding = "20px";
      infoBox.style.border = "1px solid #ccc";
      infoBox.style.borderRadius = "10px";
      infoBox.style.maxWidth = "300px";
      infoBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      document.body.appendChild(infoBox);
  
      // Botón de cerrar
      const closeButton = document.createElement("button");
      closeButton.id = "close-info";
      closeButton.textContent = "Cerrar";
      closeButton.style.position = "absolute";
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.style.cursor = "pointer";
      infoBox.appendChild(closeButton);
  
      // Elementos para mostrar información
      const countryName = document.createElement("h2");
      countryName.id = "country-name";
      infoBox.appendChild(countryName);
  
      const countryFlag = document.createElement("img");
      countryFlag.id = "country-flag";
      countryFlag.style.width = "100px";
      infoBox.appendChild(countryFlag);
  
      const countryCapital = document.createElement("p");
      countryCapital.innerHTML = `<strong>Capital:</strong> <span id="country-capital"></span>`;
      infoBox.appendChild(countryCapital);
  
      const countryPopulation = document.createElement("p");
      countryPopulation.innerHTML = `<strong>Población:</strong> <span id="country-population"></span>`;
      infoBox.appendChild(countryPopulation);
  
      const countryDrivingSide = document.createElement("p");
      countryDrivingSide.innerHTML = `<strong>Lado de la carretera:</strong> <span id="country-driving-side"></span>`;
      infoBox.appendChild(countryDrivingSide);
  
      const banderas = async () => {
        try {
          const response = await fetch(api);
          if (!response.ok) {
            throw new Error("Ha surgido algo inesperado");
          }
          const data = await response.json();
          renderizarBanderas(data.sort((a, b) => a.name.common.localeCompare(b.name.common))); // Ordenar alfabéticamente
        } catch (error) {
          console.log("Error:", error);
        }
      };
  
      const renderizarBanderas = (data) => {
        cuerpo.innerHTML = "";
        data.forEach((pais) => {
          const item = document.createElement("div");
          item.className = "country-item";
          item.style.margin = "10px";
          item.style.cursor = "pointer";
  
          item.innerHTML = `
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" width="50" height="30">
          `;
  
          item.addEventListener("click", () => mostrarInformacion(pais));
  
          cuerpo.appendChild(item);
        });
      };
  
      const mostrarInformacion = (pais) => {
        countryName.textContent = pais.name.common;
        countryFlag.src = pais.flags.svg;
        document.getElementById("country-capital").textContent = pais.capital ? pais.capital[0] : "Desconocida";
        document.getElementById("country-population").textContent = pais.population.toLocaleString();
        document.getElementById("country-driving-side").textContent = pais.car.side === "left" ? "Izquierda" : "Derecha";
  
        infoBox.style.display = "block";
      };
  
      closeButton.addEventListener("click", () => {
        infoBox.style.display = "none";
      });
  
      banderas();
    }
  
    mostrarBanderas();
  });
  