package praca.SpringApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import
  org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
          .withUser("doctor")
          .password("doctor")
          .roles("DOCTOR")
          .and()
          .withUser("admin")
          .password("admin")
          .roles("ADMIN");
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() { return NoOpPasswordEncoder.getInstance();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
          .antMatchers("/", "/login").permitAll()
          .antMatchers("/resources/static/**").permitAll()
          .antMatchers("/main").authenticated()
          .antMatchers("/main_admin").access("hasRole('ADMIN')")
          .antMatchers("/main_admin/patients").access("hasRole('ADMIN')")
          .antMatchers("/main_doctor").access("hasRole('DOCTOR')")
          .and()
          .formLogin()
          .loginPage("/login")
          .defaultSuccessUrl("/main")
          .permitAll()
          .and()
          .logout()
          .logoutUrl("/")
          .logoutSuccessUrl("/")
          .permitAll();
    }
}