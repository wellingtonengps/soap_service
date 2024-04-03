package org.example.java_soap;

import io.spring.guides.gs_producing_web_service.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import io.spring.guides.gs_producing_web_service.GetCountryRequest;
import io.spring.guides.gs_producing_web_service.GetCountryResponse;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Endpoint
public class CountryEndpoint {
    private static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";

    private final CountryRepository countryRepository;

    @Autowired
    public CountryEndpoint(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getCountryRequest")
    @ResponsePayload
    public GetCountryResponse getCountry(@RequestPayload GetCountryRequest request) {
        GetCountryResponse response = new GetCountryResponse();
        Set<Country> countries = new HashSet<>();
        if (request.getName() == null) {
            countries.addAll(countryRepository.getAllCountries().values());
        } else {
            System.out.println("Country Name: " + request.getName());
            Country country = countryRepository.findCountry(request.getName());
            if (country != null) {
                countries.add(country);

            } else {
                // Handle case where country is not found for the given name
                System.out.println("Else");
            }
        }

        System.out.println("Countries:");
        for (Country country : countries) {
            System.out.println(country.getName()); // Assuming Country has a getName() method
        }

        response.setCountry(countries);


        /*response.setCountry(countryRepository.findCountry(request.getName()));*/

        CountryRepository countries2 = new CountryRepository();
        Map<String, Country> allCountries = countries2.getAllCountries();

        for (Map.Entry<String, Country> entry : allCountries.entrySet()) {
            String countryName = entry.getKey();
            Country country = entry.getValue();

            /*System.out.println("Country name: " + countryName + ", Country object: " + country);*/
        }
        return response;
    }
}