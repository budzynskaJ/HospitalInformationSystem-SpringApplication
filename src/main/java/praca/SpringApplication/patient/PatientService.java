package praca.SpringApplication.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientRepository patientRepository;

    public List<Patient> listAll() {
        return patientRepository.findAll();
    }

    public void save(Patient patient) {
        List<Patient> patients = patientRepository.findAll();
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
        patientRepository.save(patient);
    }

    public Patient get(Long Patient_id) {
        return patientRepository.findById(Patient_id).get();
    }

    public void delete(Long Patient_id) {
        patientRepository.deleteById(Patient_id);
    }



}
