String.prototype.html = function () {
    let parser = new DOMParser()
    let doc = parser.parseFromString(this, "text/html")
    return doc.body.firstChild
}

const locations = [
    {
        "name": "Philadelphia",
        "map-key": 5859,
        "details": true
    },
    {
        "name": "Berlin",
        "map-key": 1079,
        "details": true
    },
    {
        "name": "Cape Town",
        "map-key": 4403,
        "details": true
    },
    {
        "name": "Italy",
        "map-key": 1117,
        "details": true
    },
    {
        "name": "Sydney",
        "map-key": 3775,
        "details": true
    },
    {
        "name": "New York",
        "map-key": 5535,
        "details": true
    },
    {
        "name": "Estonia",
        "map-key": 1393,
        "details": true
    },
    {
        "name": "Tokyo",
        "map-key": 3349,
        "details": true
    },
    {
        "name": "Moscow",
        "map-key": 1325,
        "details": true
    },
    {
        "name": "Sau Paulo",
        "map-key": 4731,
        "details": true
    },
    {
        "name": "Delhi",
        "map-key": 2255,
        "details": true
    },
    {
        "name": "Singapor",
        "map-key": 4011,
        "details": false
    }
]

const createPin = (x, y) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "use");
    svg.setAttribute("class", "Pin");
    svg.setAttribute("href", "assets/pin.svg#Pin")
    svg.style.position = "absolute";
    svg.style.transform = `translate(${x}px, ${y - 20}px)`
    return svg
}

const create_title = (params) => {
    return `<section style="position:absolute;transform:translate(${params.x + 20}px, ${params.y - 30}px)" class="pin-title" title="${params.name}">
                <span>${params.name}</span>
            </section>`.html()
}

window.onload = () => {
    const svg_map = document.querySelector("#map-object").contentDocument.children[0]
    const map_details = document.querySelector("#map-details")

    locations.forEach(loc => {
        const pin_location = svg_map.querySelector(`#Fill-${loc["map-key"]}`).getBoundingClientRect();
        loc.x = pin_location.x
        loc.y = pin_location.y
        const pin = createPin(pin_location.x, pin_location.y)
        const title = create_title(loc)
        svg_map.appendChild(pin)
        map_details.appendChild(title)
    })
}