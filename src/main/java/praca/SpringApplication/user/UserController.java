package praca.SpringApplication.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import praca.SpringApplication.patient.Patient;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class UserController {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @GetMapping("/main_admin/users")
    public List<User> list() {
        return customUserDetailsService.listAll();
    }

    @GetMapping("/main_admin/users/{id}")
    public ResponseEntity<User> get(@PathVariable Long id) {
        try {
            User user = customUserDetailsService.get(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/main_admin/users")
    public void add(@RequestBody User user) {
        customUserDetailsService.save(user);
    }

    @PutMapping("/main_admin/users/{id}")
    public ResponseEntity<?> update(@RequestBody User user, @PathVariable Long id) {
        try {
            User existUser = customUserDetailsService.get(id);
            customUserDetailsService.save(user);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("main_admin/user/{id}")
    public void delete(@PathVariable Long id) {
        customUserDetailsService.delete(id);
    }

}
