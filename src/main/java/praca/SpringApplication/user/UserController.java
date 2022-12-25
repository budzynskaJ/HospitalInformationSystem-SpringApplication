package praca.SpringApplication.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import praca.SpringApplication.address.Address;
import praca.SpringApplication.address.AddressRepository;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;


@RestController
public class UserController {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("admin/admin_users/users")
    public List<User> list() {
        return customUserDetailsService.listAll();
    }

    @GetMapping("admin/admin_users/users/{id}")
    public ResponseEntity<User> get(@PathVariable Long id) {
        try {
            User user = customUserDetailsService.get(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST, path = "/admin/admin_users/adduser")
    //@PostMapping("/users")
    public void add(@RequestBody User user) {
        customUserDetailsService.save(user);

    }

    @PutMapping("/admin/admin_users/users/{id}")
    public ResponseEntity<?> update(@RequestBody User user, @PathVariable Long id) {
        try {
            User existUser = customUserDetailsService.get(id);
            user.setId(id);
            user.setPassword(existUser.getPassword());
            user.setRole(existUser.getRole());
            customUserDetailsService.update(user);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST, path = "/updatePassword")
    public String changeUserPassword(@RequestParam("oldPass") String oldPass, @RequestParam("newPass") String newPass, Principal principal) {
        String username = principal.getName();
        User currentUser = (User) customUserDetailsService.loadUserByUsername(username);

        if(bCryptPasswordEncoder.matches(oldPass, currentUser.getPassword())) {
            currentUser.setPassword(bCryptPasswordEncoder.encode(newPass));
            customUserDetailsService.save(currentUser);
        }
        return "redirect:/";
    }


    @DeleteMapping("admin/admin_users/user/{id}")
    public void delete(@PathVariable Long id) {
        customUserDetailsService.delete(id);
    }

}
