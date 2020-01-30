"use strict";
(function() {
  let leafScript = document.createElement("script");
  leafScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.js";
  leafScript.async = false;
  document.head.appendChild(leafScript);
  function _groupClick(event) {
    console.log("Clicked on marker " + event.layer.test);
  }

  leafScript.onload = () =>
    customElements.define(
      "com-demo-gauge",
      class Box extends HTMLElement {
        constructor() {
          super();
          let shadowRoot = this.attachShadow({ mode: "open" });
          // Apply styles to the shadow dom
          var style = document.createElement("style");
          style.textContent =
            "#mapdiv { position: relative; height: 90%; width:  90%;}";
          shadowRoot.appendChild(style);
          // Create the DIV
          var mapdiv = document.createElement("div");
          mapdiv.setAttribute("id", "mapdiv");
          mapdiv.innerHTML =
            '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="crossorigin=""/>';
          shadowRoot.appendChild(mapdiv);
          // this.addEventListener("click", event => {
          //   var event = new Event("onClick");
          //   this.dispatchEvent(event);
          //   console.log(event);
          // });

          if (map != undefined) {
            map.remove();
          }
          window.setTimeout(function() {
            map.invalidateSize();
          }, 30);

          var map = L.map(mapdiv).setView([-33.75969, 151.09488], 6);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          var myFeatureGroup = L.featureGroup()
          .addTo(map)
          .on("click", _groupClick);

          L.marker([-33.75969, 151.09488])
            .addTo(myFeatureGroup)
            .bindPopup("This is working")
            .openPopup();

        }
        connectedCallback() {
          console.log("Custom square element added to page.");
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
          this._props = { ...this._props, ...changedProperties };
          console.log("Custom square Before Update.");
          console.log(changedProperties);
        }

        attributeChangedCallback(name, oldValue, newValue) {
          console.log("Custom square element attributes changed.");
        }

        
      }
    );
})();
