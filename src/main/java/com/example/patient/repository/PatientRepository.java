package com.example.patient.repository;

import com.example.patient.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // indicates that the class is a data repository that will contain CRUD operations
public interface PatientRepository extends JpaRepository<Patient, Long> {

}
