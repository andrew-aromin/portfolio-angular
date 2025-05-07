package us.aaromincloud.server.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.apache.commons.validator.routines.DomainValidator;

@Service
public class LogoService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String CLEARBIT_URL = "https://logo.clearbit.com/";

    public byte[] downloadLogo(String domain) {

        domain = domain.trim().toLowerCase();

        DomainValidator domainValidator = DomainValidator.getInstance(true);

        if (!domainValidator.isValid(domain)) {
            throw new IllegalArgumentException("Invalid domain");
        }

        try {
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    CLEARBIT_URL + domain,
                    HttpMethod.GET,
                    new HttpEntity<>(new HttpHeaders()),
                    byte[].class
            );


            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to fetch logo: " + e.getMessage());
        }
    }
}
