// ==UserScript==
// @name          Scholarum/Zonacoles Search Preparer
// @namespace     http://tampermonkey.net/
// @version       2024-09-06
// @description   Extract the location data from the Scholarum/Zonacoles record and assemble it into a ready-to-use Google search.
// @author        Ricardo M (amaillo)
// @match         https://www.scholarum.es/es/colegios/*
// @match         https://zonacoles.es/es/colegios/*
// @icon          https://www.google.com/s2/favicons?sz=64&domain=scholarum.es
// @grant         none
// ==/UserScript==

// Selection of title and description elements (containing the postal code)
const nombreColegioElementos = document.getElementsByClassName("titulo_colegios_enlace c_mostar")
const postalCode = document.getElementsByClassName("contenido_registro_colegio_descripcion")
let i =0

while(nombreColegioElementos[i]){
	// Access the DOM structure to find the school image
    const imagenesDeColegios= nombreColegioElementos[i].parentNode.parentNode.previousSibling.firstChild.firstChild

    let parent = imagenesDeColegios.parentNode;
    let wrapper = document.createElement('a');
    let attribute = nombreColegioElementos[i].getAttribute("href")

	// Extraction of city, province, and postal code through string manipulation and node navigation
    let city = nombreColegioElementos[i].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.split(",")[0]
    const currentPostalCodeString = postalCode[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML
    const currentProvinceString = postalCode[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML

	// Manually parsing the string to isolate the postal code and clear the province brackets
    const currentPostalCode = currentPostalCodeString.split(" ")[currentPostalCodeString.split(" ").length-1]
    const currenProvince = currentProvinceString.split(" ")[currentProvinceString.split(" ").length-1].replace("(","").replace(")","")

	// Visual progress marker on auxiliary click
    nombreColegioElementos[i].firstChild.addEventListener("auxclick",(e)=>{
        e.currentTarget.style.color="purple"
    })

	// Wrap the image in a link so that it also redirects to the Google search.
    wrapper.setAttribute("href",attribute)
    parent.replaceChild(wrapper, imagenesDeColegios);
    wrapper.appendChild(imagenesDeColegios);

    let name = nombreColegioElementos[i].firstChild.innerHTML
    name = name.replace("IES","Colegio") // Standardization of search terms
    city = city + " primaria"

	// Replacing the original href attribute with the Google search URL containing the collected data
    nombreColegioElementos[i].setAttribute("href",`https://www.google.com/search?q=${name +" " + city +" "+ currentPostalCode +" "+currenProvince+
                                           " correo electrónico"}&sourceid=chrome&ie=UTF-8`)
    i=i+1
}