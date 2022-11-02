package com.example.patient.service;

import com.example.patient.model.Patient;
import com.example.patient.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientRepository patientRepository;

    public Patient createPatient(Patient patient){

        return patientRepository.save(patient);
    }

    public List<Patient> getPatients(){

        return patientRepository.findAll();
    }

    public void deletePatient(Long patientId){

        patientRepository.deleteById(patientId);
    }

    public Patient updatePatient(Long patientId, Patient patientDetails){
        Patient patient = patientRepository.findById(patientId).get();
        patient.setFirstname(patientDetails.getFirstname());
        patient.setSecondname(patientDetails.getSecondname());
        patient.setSurname(patientDetails.getSurname());
        patient.setBirthdate(patientDetails.getBirthdate());
        patient.setPESEL(patientDetails.getPESEL());
        patient.setSex(patientDetails.getSex());
        patient.setPhone_number(patientDetails.getPhone_number());

        return patientRepository.save(patient);
    }
}
