package praca.SpringApplication;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import praca.SpringApplication.patient.PatientRepository;
import praca.SpringApplication.user.User;
import praca.SpringApplication.user.UserRepository;

import java.util.List;


@Controller
public class AppController implements WebMvcConfigurer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    public AppController(){

    }

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("login");
        registry.addViewController("/main").setViewName("main");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/main_admin").setViewName("admin/main_admin");
        registry.addViewController("/main_doctor").setViewName("doctor/main_doctor");
    }

    @Controller
    public class DashboardController {
        public DashboardController() {
        }

       /* @GetMapping("/main_admin")
        public String listUsers(Model model) {
            List<User> listUsers = userRepository.findAll();
            model.addAttribute("listUsers", listUsers);

            return "admin/main_admin";
        }*/

    }
}