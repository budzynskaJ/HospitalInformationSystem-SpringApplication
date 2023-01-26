package praca.SpringApplication.user;
import com.sun.istack.NotNull;
import praca.SpringApplication.address.Address;


import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    private String firstname;

    private String middlename;

    @NotNull
    private String surname;
    @NotNull
    private String username;

    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String role;

    @ManyToOne()
    @JoinColumn(name = "address_ID")
    private Address address;

    public User() {
        super();
    }

    public User(long id, String firstname, String middlename, String surname, String username, String email, String password, String role, Address address) {
        this.id = id;
        this.firstname = firstname;
        this.middlename = middlename;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.address = address;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMiddlename() {
        if(middlename == null){
            middlename = "";
        }
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }



    public void setPassword(String password) {
        this.password = password;
        //this.password =  BCrypt.hashpw(password, BCrypt.gensalt(60));
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }


    @Override
    public String toString() {
        return "User{" +
                 "id=" + id +
                 ", firstname='" + firstname + '\'' +
                 ", middlename='" + middlename + '\'' +
                 ", surname='" + surname + '\'' +
                 ", username='" + username + '\'' +
                 ", email='" + email + '\'' +
                 ", password='" + password + '\'' +
                 ", role='" + role + '\'' +
                 ", address=" + getAddress() +
                 '}';
    }


}
