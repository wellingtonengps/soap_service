package org.example.java_soap;

import jakarta.annotation.PostConstruct;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.spring.guides.gs_producing_web_service.Country;
//import io.spring.guides.gs_producing_web_service.Currency;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class CountryRepository {
    private static final Map<String, Country> countries = new HashMap<>();

    @PostConstruct
    public void initData() {
        try (Reader reader = new FileReader("src/main/java/org/example/java_soap/repository.csv")) {

            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader("official_name", "name", "capital", "flag", "maps", "region", "subregion", "population", "currencies", "languages", "continents", "area").withIgnoreHeaderCase().withTrim());

            for (CSVRecord csvRecord : csvParser) {

                Country country = new Country();

                country.setOfficialName(csvRecord.get("official_name"));
                country.setName(csvRecord.get("name"));
                country.setCapital(csvRecord.get("capital"));
                country.setFlag(csvRecord.get("flag"));
                country.setMaps(csvRecord.get("maps"));
                country.setRegion(csvRecord.get("region"));
                country.setSubregion(csvRecord.get("subregion"));
                country.setPopulation(csvRecord.get("population"));
                country.setCurrencies(csvRecord.get("currencies"));
                country.setLanguages(csvRecord.get("languages"));
                country.setContinents(csvRecord.get("continents"));
                country.setArea(csvRecord.get("area"));


                countries.put(country.getName(), country);
            }
        } catch (IOException error) {
            throw new RuntimeException(error);
        }
    }

    public Country findCountry(String name) {
        Assert.notNull(name, "The country's name must not be null");
        return countries.get(name);
    }

    public List<Country> getAllCountries() {
        return new ArrayList<>(countries.values());
    }
}