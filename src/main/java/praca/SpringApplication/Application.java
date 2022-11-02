package praca.SpringApplication;

import com.example.patient.model.Patient;
import com.example.patient.repository.PatientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class Application  {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}



}
