package praca.SpringApplication.patient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/main_admin/patients")
    public List<Patient> list() {
        return patientService.listAll();
    }

    @GetMapping("/main_admin/patients/{Patient_id}")
    public ResponseEntity<Patient> get(@PathVariable Long Patient_id) {
        try {
            Patient patient = patientService.get(Patient_id);
            return new ResponseEntity<Patient>(patient, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Patient>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/main_admin/patients")
    public void add(@RequestBody Patient patient) {
        patientService.save(patient);
    }

    @PutMapping("/main_admin/patients/{Patient_id}")
    public ResponseEntity<?> update(@RequestBody Patient patient, @PathVariable Long Patient_id) {
        try {
            Patient existPatient = patientService.get(Patient_id);
            patientService.save(patient);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("main_admin/patients/{Patient_id}")
    public void delete(@PathVariable Long Patient_id) {
        patientService.delete(Patient_id);
    }


}
