package com.example.patient.controller;

import com.example.patient.model.Patient;
import com.example.patient.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/main_admin")
public class PatientController {

    @Autowired
    PatientService patientService;

    @RequestMapping(value = "/patients", method = RequestMethod.POST)
    public Patient createPatient(@RequestBody Patient patient){

        return patientService.createPatient(patient);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Patient> readPatients(){
        return patientService.getPatients();
    }

    @RequestMapping(value = "/patients/{patientId}", method = RequestMethod.PUT)
    public Patient readPatients(@PathVariable(value = "patientId") Long id, @RequestBody Patient patientDetails){
        return patientService.updatePatient(id, patientDetails);
    }

    @RequestMapping(value = "/patients/{patientId}", method = RequestMethod.DELETE)
    public void deletePatients(@PathVariable(value = "patientId") Long id){
        patientService.deletePatient(id);
    }
}