package praca.SpringApplication.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import praca.SpringApplication.address.Address;
import praca.SpringApplication.address.AddressRepository;
import praca.SpringApplication.patient.Patient;

import java.util.List;


@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

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
        List<Address> addresses = addressRepository.findAll();
        if(userexists != null) throw new RuntimeException("this user already exists");
        if (user.getAddress().getAddress_ID()==null) {
            for(int i = 0; i<addresses.size(); i++) {
                if(user.getAddress().getStreet().equals(addresses.get(i).getStreet()) &&
                     user.getAddress().getHouse_number().equals(addresses.get(i).getHouse_number()) &&
                        user.getAddress().getApartment_number().equals(addresses.get(i).getApartment_number()) &&
                            user.getAddress().getPostcode().equals(addresses.get(i).getPostcode())) {

                    user.getAddress().setAddress_ID(addresses.get(i).getAddress_ID());
                }
            }
        }
        addressRepository.save(user.getAddress());
        userRepository.save(user);
    }
    public void update(User user) {
        userRepository.save(user);
    }

    public User get(Long id) {
        return userRepository.findById(id).get();
    }


    public void delete(Long id) {
        userRepository.deleteById(id);
    }


}
