const myHeaders = new Headers();
myHeaders.append("Content-Type", "text/xml");

const raw = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"\r\n                  xmlns:gs=\"http://spring.io/guides/gs-producing-web-service\">\r\n    <soapenv:Header/>\r\n    <soapenv:Body>\r\n        <gs:getAllCountriesRequest>\r\n        </gs:getAllCountriesRequest>\r\n    </soapenv:Body>\r\n</soapenv:Envelope>";

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch("http://localhost:8080/ws/", requestOptions)
    .then((response) => response.text())
    .then((xmlResponse) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
        const countries = xmlDoc.getElementsByTagName("ns2:countries");
        const container = document.getElementById("countries-container");

        const countryArray = [];

        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            const name = country.getElementsByTagName("ns2:name")[0].textContent;
            const flagUrl = country.getElementsByTagName("ns2:flag")[0].textContent;

            countryArray.push({ name, flagUrl });
        }

        countryArray.sort((a, b) => a.name.localeCompare(b.name));


        countryArray.forEach((country) => {

            const wrapper = document.createElement("div");
            wrapper.className = "country";

            const img = document.createElement("img");
            img.src = country.flagUrl;
            img.alt = country.name;
            wrapper.appendChild(img);

            const text = document.createElement("p");
            text.textContent = country.name;
            wrapper.appendChild(text);

            container.appendChild(wrapper);
        });
    })
    .catch((error) => console.error(error));

document.addEventListener("DOMContentLoaded", function() {
    const endpoint = 'http://localhost:8080/ws/';
    const countriesContainer = document.getElementById("countries-container");

    function getCountryDetails(countryName) {
        const soapEnvelope = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                              xmlns:gs="http://spring.io/guides/gs-producing-web-service">
                <soapenv:Header/>
                <soapenv:Body>
                    <gs:getCountryRequest>
                        <gs:name>${countryName}</gs:name>
                    </gs:getCountryRequest>
                </soapenv:Body>
            </soapenv:Envelope>`;

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "text/xml"
            },
            body: soapEnvelope
        };

        fetch(endpoint, requestOptions)
            .then(response => response.text())
            .then(xmlResponse => {
                console.log("Country Details:", xmlResponse);
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
                const country = xmlDoc.getElementsByTagName("ns2:country");
                showModal(country);

                // Add code here to handle the country details response
            })
            .catch(error => console.error("Error fetching country details:", error));
    }

    function showModal(countryDetails) {
        const modal = document.getElementById("country-modal");
        const modalContent = document.getElementById("modal-country-details");

        const arrowContainer = document.querySelectorAll(".container-arrow");
        arrowContainer[0].style.opacity = '0';


        const name = countryDetails[0].getElementsByTagName("ns2:name")[0].textContent;
        const flag = countryDetails[0].getElementsByTagName("ns2:flag")[0].textContent;
        const population = countryDetails[0].getElementsByTagName("ns2:population")[0].textContent;
        const region = countryDetails[0].getElementsByTagName("ns2:region")[0].textContent;
        const subregion = countryDetails[0].getElementsByTagName("ns2:subregion")[0].textContent;
        const capitalElement = countryDetails[0].getElementsByTagName("ns2:capital")[0];
        const capital = capitalElement ? capitalElement.textContent.replace(/[\[\]']/g, '').split(',').map(currency => currency.trim()).join(', '): '';
        const currenciesElement = countryDetails[0].getElementsByTagName("ns2:currencies")[0];
        const currencies = currenciesElement ? currenciesElement.textContent.replace(/[\[\]']/g, '').split(',').map(currency => currency.trim()).join(', '): '';
        const languagesElement = countryDetails[0].getElementsByTagName("ns2:languages")[0];
        const languages = languagesElement ? languagesElement.textContent.replace(/[\[\]']/g, '').split(',').map(currency => currency.trim()).join(', '): '';
        const continentsElement = countryDetails[0].getElementsByTagName("ns2:continents")[0];
        const continents = continentsElement ? continentsElement.textContent.replace(/[\[\]']/g, '').split(',').map(currency => currency.trim()).join(', '): '';
        const area = countryDetails[0].getElementsByTagName("ns2:area")[0].textContent;
        const maps = countryDetails[0].getElementsByTagName("ns2:maps")[0].textContent;



        modalContent.innerHTML = `
            <div class="modal-body">
                <div class="modal-left">
                    <h2>${name}</h2>
                    <img src="${flag}" alt="${name}">
                    <p><a href={maps}>Maps</a></p>

                </div>
                <div class="modal-right">
                    <p><strong>Official Name:</strong> ${name}</p>
                    <p><strong>Capital:</strong> ${capital}</p>
                    <p><strong>Population:</strong> ${population}</p>
                    <p><strong>Region:</strong> ${region}</p>
                    <p><strong>Subregion:</strong> ${subregion}</p>
                    <p><strong>Currencies:</strong> ${currencies}</p>
                    <p><strong>Languages:</strong> ${languages}</p>
                    <p><strong>Continents:</strong> ${continents}</p>
                    <p><strong>Area:</strong> ${area}</p>
                </div>`;
        modal.style.display = "block";

    }

    countriesContainer.addEventListener("click", function(event) {
        const target = event.target;
        if (target.tagName === "IMG" || target.tagName === "P") {
            const countryElement = target.closest(".country");
            if (countryElement) {
                const countryName = countryElement.querySelector("p").textContent;
                getCountryDetails(countryName);
            }
            showModal();
        }
    });

});

document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("country-modal").style.display = "none";
    const arrowContainer = document.querySelectorAll(".container-arrow");
    arrowContainer[0].style.opacity = '1';
});

const countries = document.querySelectorAll('.country');
countries.forEach((country, index) => {
    country.style.setProperty('--index', index);
});




var min_w = 300;
var vid_w_orig;
var vid_h_orig;

$(function() {

    vid_w_orig = parseInt($('video').attr('width'));
    vid_h_orig = parseInt($('video').attr('height'));

    $(window).resize(function () { fitVideo(); });
    $(window).trigger('resize');

});

function fitVideo() {

    $('#video-viewport').width($('.fullsize-video-bg').width());
    $('#video-viewport').height($('.fullsize-video-bg').height());

    var scale_h = $('.fullsize-video-bg').width() / vid_w_orig;
    var scale_v = $('.fullsize-video-bg').height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    $('video').width(scale * vid_w_orig);
    $('video').height(scale * vid_h_orig);

    $('#video-viewport').scrollLeft(($('video').width() - $('.fullsize-video-bg').width()) / 2);
    $('#video-viewport').scrollTop(($('video').height() - $('.fullsize-video-bg').height()) / 2);

};

$(document).ready(function(){
    $("a.container-arrow").on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
            window.location.hash = hash;
        });
    });
});