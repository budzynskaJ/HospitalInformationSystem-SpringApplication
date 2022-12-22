package praca.SpringApplication.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if(user == null) {
            throw new UsernameNotFoundException("User Not Found");
        }
        return new CustomUserDetails(user);

    }


    public List<User> listAll() {
        return userRepository.findAll();
    }

    public void save(User user) {
        User userexists = userRepository.findByUsername(user.getUsername());
        if(userexists != null) throw new RuntimeException("this user already exists");
        userRepository.save(user);
    }

    public User get(Long id) {
        return userRepository.findById(id).get();
    }


    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
