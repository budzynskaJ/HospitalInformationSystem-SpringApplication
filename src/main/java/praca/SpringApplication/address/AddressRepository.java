package praca.SpringApplication.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    @Override
    List<Address> findAllById(Iterable<Long> longs);

    @Override
    Optional<Address> findById(Long aLong);

    @Override
    List<Address> findAll();

}
