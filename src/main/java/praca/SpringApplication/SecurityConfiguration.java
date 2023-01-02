package praca.SpringApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
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
    public AuthenticationProvider authenticationProvider() throws Exception {
        DaoAuthenticationProvider provider
          = new DaoAuthenticationProvider();

        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());

        return provider;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() throws Exception {
        return new BCryptPasswordEncoder();
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
    public void configure(WebSecurity web) throws Exception {

    }
   @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
          .csrf().disable()
          .cors().disable()
          .authorizeRequests()
          .antMatchers("/", "/login*").permitAll()
          .antMatchers("**/resources/static/**").permitAll()
          .antMatchers("/main").authenticated()
          .antMatchers("/main_doctor").hasAnyAuthority("USER")
          .antMatchers("/doctor_profile**").hasAnyAuthority("USER")
          .antMatchers("/doctor_patients/**").hasAnyAuthority("USER")
          .antMatchers("/doctor_appointments/**").hasAnyAuthority("USER")
          .antMatchers("/main_admin").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_users").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_profile**").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_users/users**").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_users/adduser").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_users/users/{id}").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_users/user/{id}").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_addresses").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_addresses/addaddress").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_addresses/addresses**").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_addresses/addresses/{address_id}").hasAnyAuthority("ADMIN")
          .antMatchers("/admin_addresses/address/{address_id}").hasAnyAuthority("ADMIN")
          .antMatchers("**/patients").hasAnyAuthority("ADMIN", "USER")
          .antMatchers("**/patient/{Patient_id}").hasAnyAuthority("ADMIN")
          .antMatchers("**/patients/{Patient_id}").hasAnyAuthority("ADMIN")
          .antMatchers("**/updatePassword**").hasAnyAuthority("ADMIN", "USER")
          //.anyRequest().authenticated()
          //.and()
          //.httpBasic()
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