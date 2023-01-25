package praca.SpringApplication.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import praca.SpringApplication.patient.Patient;
import praca.SpringApplication.patient.PatientRepository;
import praca.SpringApplication.user.User;
import praca.SpringApplication.user.UserRepository;


import java.util.List;

@Service
public class AddressService {

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    UserRepository userRepository;

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

    public void update(Address address) {
        List<Address> addresses = addressRepository.findAll();
        for(int i = 0; i < addresses.size(); i++) {
            if(addresses.get(i).getStreet().equals(address.getStreet()) &&
                 addresses.get(i).getHouse_number() == address.getHouse_number() &&
                 addresses.get(i).getApartment_number().equals(address.getApartment_number())&&
                 addresses.get(i).getPostcode().equals(address.getPostcode())) {
                throw new RuntimeException("this address already exists");
            }
        }
        List<Patient> patients = patientRepository.findAll();
        List<User> users = userRepository.findAll();
        for (int j = 0; j < patients.size(); j++) {
            if(patients.get(j).getAddress().getAddress_ID() == address.getAddress_ID()) {
                throw new RuntimeException("You can not update address which is assigned to someone");
            }
        }
        for (int k = 0; k < users.size(); k++) {
            if (users.get(k).getAddress().getAddress_ID() == address.getAddress_ID()) {
                throw new RuntimeException("You can not update address which is assigned to someone");
            }
        }
        addressRepository.save(address);
    }

    public Address get(Long address_id) {
        return addressRepository.findById(address_id).get();
    }

    public void delete(Long address_ID) {
        List<Patient> patients = patientRepository.findAll();
        List<User> users = userRepository.findAll();
        for (int j = 0; j < patients.size(); j++) {
            if(patients.get(j).getAddress().getAddress_ID() == address_ID) {
                throw new RuntimeException("You can not delete address which is assigned to someone");
            }
        }
        for (int k = 0; k < users.size(); k++) {
            if (users.get(k).getAddress().getAddress_ID() == address_ID) {
                throw new RuntimeException("You can not delete address which is assigned to someone");
            }
        }
        addressRepository.deleteById(address_ID);
    }
}
