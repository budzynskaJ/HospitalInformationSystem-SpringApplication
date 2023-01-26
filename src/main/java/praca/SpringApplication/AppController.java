package praca.SpringApplication;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@RestController
public class AppController implements WebMvcConfigurer {


    public AppController(){

    }

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("login");
        registry.addViewController("/main").setViewName("main");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/main_admin").setViewName("admin/main_admin");
        registry.addViewController("/admin/admin_profile").setViewName("admin/admin_profile");
        registry.addViewController("/admin/admin_users").setViewName("admin/admin_users");
        registry.addViewController("/admin/admin_addresses").setViewName("admin/admin_addresses");
        registry.addViewController("/admin/admin_patients").setViewName("admin/admin_patients");
        registry.addViewController("/main_doctor").setViewName("doctor/main_doctor");
        registry.addViewController("/doctor/doctor_profile").setViewName("doctor/doctor_profile");
        registry.addViewController("/doctor/doctor_patients").setViewName("doctor/doctor_patients");
        registry.addViewController("/doctor/doctor_appointments").setViewName("doctor/doctor_appointments");
    }

}