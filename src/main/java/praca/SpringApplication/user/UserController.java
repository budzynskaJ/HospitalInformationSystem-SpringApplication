package praca.SpringApplication.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import praca.SpringApplication.address.Address;
import praca.SpringApplication.address.AddressRepository;

import java.security.Principal;
import java.security.SecureRandom;
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
        String password = user.getPassword();
        int strength = 10;
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());
        user.setPassword(bCryptPasswordEncoder.encode(password));
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
    public ResponseEntity<?> changeUserPassword(@RequestParam("oldPass") String oldPass, @RequestParam("newPass") String newPass, Principal principal) throws Exception {
        List<User> users = userRepository.findAll();
        String username = principal.getName();
        UserDetails currentUser = customUserDetailsService.loadUserByUsername(username);
        System.out.println(currentUser.getPassword());

        int strength = 10;
        BCryptPasswordEncoder bCryptPasswordEncoder2 = new BCryptPasswordEncoder(strength, new SecureRandom());


        if(bCryptPasswordEncoder.matches(oldPass, currentUser.getPassword())) {
            System.out.println("matches");
            for(int i = 0; i<users.size(); i++) {
                if(users.get(i).getUsername().equals(currentUser.getUsername())) {
                    users.get(i).setPassword(bCryptPasswordEncoder2.encode(newPass));
                    customUserDetailsService.update(users.get(i));
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }


    @DeleteMapping("admin/admin_users/user/{id}")
    public void delete(@PathVariable Long id) {
        customUserDetailsService.delete(id);
    }

}
