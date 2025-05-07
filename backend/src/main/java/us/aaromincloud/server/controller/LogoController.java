package us.aaromincloud.server.controller;

import us.aaromincloud.server.service.LogoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {  
"http://localhost:4200",
"http://welcome-angular-frontend:4200", 
"http://welcome-angular-frontend:5010",
"http://welcome-angular.aaromincloud.lan",
"http://welcome-angular.aaromincloud.us"})
@RestController
@RequestMapping("/api/")
public class LogoController {

    private final LogoService logoService;

    public LogoController(LogoService logoService) {
        this.logoService = logoService;
    }

    @GetMapping("/getLogo")
    public ResponseEntity<?> getLogo(@RequestParam("q") String query) {
        try {
            byte[] result = logoService.downloadLogo(query);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}
