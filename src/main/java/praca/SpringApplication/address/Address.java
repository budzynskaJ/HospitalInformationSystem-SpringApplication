package praca.SpringApplication.address;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import praca.SpringApplication.patient.Patient;
import praca.SpringApplication.user.User;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Entity
@Transactional
@Data
@Table(name = "addresses")
public class Address {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long address_ID;

    @NotNull
    @NotBlank
    private String street;

    @NotNull
    @NotBlank
    private String house_number;

    private String apartment_number;

    @NotNull
    @NotBlank
    private String postcode;

    @NotNull
    @NotBlank
    private String city;

    @NotNull
    @NotBlank
    private String country;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "address_id")
    private Set<User> users;


    public Address() {
        super();
    }

    public Address(Long address_ID, String street, String house_number, String apartment_number, String postcode, String city, String country) {
        this.address_ID = address_ID;
        this.street = street;
        this.house_number = house_number;
        this.apartment_number = apartment_number;
        this.postcode = postcode;
        this.city = city;
        this.country = country;

    }

    public Long getAddress_ID() {
        return address_ID;
    }

    public void setAddress_ID(Long address_ID) {
        this.address_ID = address_ID;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouse_number() {
        return house_number;
    }

    public void setHouse_number(String house_number) {
        this.house_number = house_number;
    }

    public String getApartment_number() {
        if(apartment_number == null) {
            apartment_number = "";
        }
        return apartment_number;
    }

    public void setApartment_number(String apartment_number) {
        this.apartment_number = apartment_number;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Address{" +
                 "address_ID=" + address_ID +
                 ", street='" + street + '\'' +
                 ", house_number=" + house_number +
                 ", apartment_number='" + apartment_number + '\'' +
                 ", postcode='" + postcode + '\'' +
                 ", city='" + city + '\'' +
                 ", country='" + country + '\'' +
                 '}';
    }
}
