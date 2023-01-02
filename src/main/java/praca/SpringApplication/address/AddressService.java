package praca.SpringApplication.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class AddressService {

    @Autowired
    AddressRepository addressRepository;

    public List<Address> listAll() {
        return addressRepository.findAll();
    }

    public void save(Address address) {
        List<Address> addresses = addressRepository.findAll();
        for(int i = 0; i < addresses.size(); i++) {
            if(addresses.get(i).getStreet().equals(address.getStreet()) &&
            addresses.get(i).getHouse_number() == address.getHouse_number() &&
            addresses.get(i).getApartment_number().equals(address.getApartment_number())&&
            addresses.get(i).getPostcode().equals(address.getPostcode())) {
                throw new RuntimeException("this address already exists");
            }
        }
        addressRepository.save(address);
    }

    public Address get(Long address_id) {
        return addressRepository.findById(address_id).get();
    }

    public void delete(Long address_ID) {
        addressRepository.deleteById(address_ID);
    }
}
