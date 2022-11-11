package praca.SpringApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

@Configuration
@EnableWebSecurity
@EnableJpaRepositories
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider
          = new DaoAuthenticationProvider();

        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());
        return provider;
    }

    public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
        SimpleUrlAuthenticationSuccessHandler userSuccessHandler =
          new SimpleUrlAuthenticationSuccessHandler("/main_doctor");
        SimpleUrlAuthenticationSuccessHandler adminSuccessHandler =
          new SimpleUrlAuthenticationSuccessHandler("/main_admin");

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                            Authentication authentication) throws IOException, ServletException {
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            for (final GrantedAuthority grantedAuthority : authorities) {
                String authorityName = grantedAuthority.getAuthority();
                if (authorityName.equals("ADMIN")) {
                    this.adminSuccessHandler.onAuthenticationSuccess(request, response, authentication);
                    return;
                }
            }
            this.userSuccessHandler.onAuthenticationSuccess(request, response, authentication);
        }
    }
   @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
          .authorizeRequests()
          .antMatchers("/", "/login").permitAll()
          .antMatchers("/resources/static/**").permitAll()
          .antMatchers("/main").authenticated()
          .antMatchers("/main_doctor").hasAuthority("USER")
          .antMatchers("/main_admin").hasAuthority("ADMIN")
          .antMatchers("/main_admin/users").hasAuthority("ADMIN")
          .antMatchers("/main_admin/users/{id}").hasAuthority("ADMIN")
          .antMatchers("/main_admin/patients").hasAuthority("ADMIN")
          .antMatchers("/main_admin/patients/{Patient_id}").hasAuthority("ADMIN")
          //.anyRequest()
          //.authenticated()
          .and()
          .formLogin(formLogin -> formLogin
                                    .successHandler(new CustomAuthenticationSuccessHandler())
          .loginPage("/login"))
          .logout()
          .logoutUrl("/")
          .logoutSuccessUrl("/")
          .permitAll();
    }


}