import { locations } from "./locations.js"

String.prototype.html = function () {
    let parser = new DOMParser()
    let doc = parser.parseFromString(this, "text/html")
    return doc.body.firstChild
}


const createPin = (x, y) => {
  return `<img style="transform:translate(${x}px, ${y - 20}px);" class="Pin" src="assets/pin.svg"></img>`.html()
};

const create_title = (params) => {
    return `<section style="transform:translate(${params.x + 20}px, ${params.y - 30}px)" class="pin-title" title="${params.name}">
                <span>${params.name}</span>
            </section>`.html()
}


const create_details = (params) => {
    let visitors = params["Visitors"]
    let wait_time = params["Wait time"]
    let service_time = params["Service time"]
    return `<section style="transform:translate(${params.x + 20}px, ${params.y + 10}px)" class="pin-detail">
                <span class="detail-header">Performance</span>
                <div class="detail-item"><span>Visitors last week</span><span>${visitors[0]}</span><span style="color:${visitors[1] > 0 ? "green": "red"};">(${visitors[1]}%)</span></div>
                <div class="detail-item"><span>Wait time</span><span>${wait_time[0]}min</span><span style="color:${wait_time[1] > 0 ? "green": "red"};">(${wait_time[1]}%)</span></div>
                <div class="detail-item"><span>Service time</span><span>${service_time[0]}min</span><span style="color:${service_time[1] > 0 ? "green": "red"};">(${service_time[1]}%)</span></div>
            </section>`.html()
}

window.onload = () => {
  const svg_map = document.querySelector("#map-object").contentDocument
    .children[0];
  const map_details = document.querySelector("#map-details");

  locations.forEach(loc => {
    const pin_location = svg_map
      .querySelector(`#Fill-${loc["map-key"]}`)
      .getBoundingClientRect();
    loc.x = pin_location.x;
    loc.y = pin_location.y;
    const pin = createPin(pin_location.x, pin_location.y);

    map_details.appendChild(pin);

    if (loc.title) {
      const title = create_title(loc);
      map_details.appendChild(title);
    }
    if (loc.details) {
      const details = create_details(loc);
      map_details.appendChild(details);
    }
  });
};