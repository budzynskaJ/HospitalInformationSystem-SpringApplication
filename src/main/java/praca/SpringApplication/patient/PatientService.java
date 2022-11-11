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
        patientRepository.save(patient);
    }

    public Patient get(Long Patient_id) {
        return patientRepository.findById(Patient_id).get();
    }

    public void delete(Long Patient_id) {
        patientRepository.deleteById(Patient_id);
    }

}
