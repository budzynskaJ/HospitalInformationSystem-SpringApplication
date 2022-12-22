package praca.SpringApplication.patient;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Override
    List<Patient> findAllById(Iterable<Long> longs);

    @Override
    List<Patient> findAll(Sort sort);
}