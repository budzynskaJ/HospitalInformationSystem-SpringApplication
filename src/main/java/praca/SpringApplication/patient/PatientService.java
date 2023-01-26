package praca.SpringApplication.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import praca.SpringApplication.address.Address;
import praca.SpringApplication.address.AddressRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AddressRepository addressRepository;

    public List<Patient> listAll() {
        return patientRepository.findAll();
    }

    public void save(Patient patient) {
        List<Patient> patients = patientRepository.findAll();
        List<Address> addresses = addressRepository.findAll();
        for(int i = 0; i<patients.size(); i++) {
            if(patients.get(i).getPESEL().equals(patient.getPESEL())){
                throw new RuntimeException("this patient already exists");
            }else if(patients.get(i).getFirstname().equals(patient.getFirstname()) &&
            patients.get(i).getSurname().equals(patient.getSurname()) &&
            patients.get(i).getBirth_date().equals(patient.getBirth_date()) &&
            patients.get(i).getPhone_number().equals(patient.getPhone_number())) {
                throw new RuntimeException("this patient already exists");
            }
        }
        if (patient.getAddress().getAddress_ID() == null) {
            for(int j = 0; j<addresses.size(); j++) {
                if(patient.getAddress().getStreet().equals(addresses.get(j).getStreet()) &&
                    patient.getAddress().getHouse_number().equals(addresses.get(j).getHouse_number()) &&
                        patient.getAddress().getApartment_number().equals(addresses.get(j).getApartment_number()) &&
                            patient.getAddress().getPostcode().equals(addresses.get(j).getPostcode())) {

                    patient.getAddress().setAddress_ID(addresses.get(j).getAddress_ID());
                }
            }
        }
        addressRepository.save(patient.getAddress());
        patientRepository.save(patient);
    }
    public void update(Patient patient) {
        List<Patient> patients = patientRepository.findAll();
        List<Address> addresses = addressRepository.findAll();
        if (patient.getAddress().getAddress_ID() == null) {
            for(int j = 0; j<addresses.size(); j++) {
                if(patient.getAddress().getStreet().equals(addresses.get(j).getStreet()) &&
                     patient.getAddress().getHouse_number().equals(addresses.get(j).getHouse_number()) &&
                     patient.getAddress().getApartment_number().equals(addresses.get(j).getApartment_number()) &&
                     patient.getAddress().getPostcode().equals(addresses.get(j).getPostcode())) {

                    patient.getAddress().setAddress_ID(addresses.get(j).getAddress_ID());
                }
            }
        } else if (patient.getAddress().getAddress_ID() != null) {
            Optional<Address> address = addressRepository.findById(patient.getAddress().getAddress_ID());
            patient.getAddress().setStreet(address.get().getStreet());
            patient.getAddress().setHouse_number(address.get().getHouse_number());
            patient.getAddress().setApartment_number(address.get().getApartment_number());
            patient.getAddress().setPostcode(address.get().getPostcode());
            patient.getAddress().setCity(address.get().getCity());
            patient.getAddress().setCountry(address.get().getCountry());
        } else if(patient.getStatus() == "inactive") {
            throw new RuntimeException("You cannot update inactive patient!");
        }
        addressRepository.save(patient.getAddress());
        patientRepository.save(patient);
    }

    public Patient get(Long Patient_id) {
        return patientRepository.findById(Patient_id).get();
    }

    public void delete(Long Patient_id) {
        Patient patient = patientRepository.findById(Patient_id).get();
        if(patient.getStatus().equals("active")) {
            patient.setStatus("archived");
        } else if (patient.getStatus().equals("archived")) {
            patient.setStatus("active");
        }
        patientRepository.save(patient);
    }



}
