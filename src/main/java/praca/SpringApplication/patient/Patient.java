package praca.SpringApplication.patient;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;

import praca.SpringApplication.address.Address;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Patient_ID;

    @NotNull
    private String firstname;

    private String middlename;

    @NotNull
    private String surname;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone="Europe/Zagreb")
    @NotNull
    private Date birth_date;

    private String PESEL;

    @NotNull
    private char sex;

    @NotNull
    private String phone_number;

    @NotNull
    private String uid;

    @Column(columnDefinition = "default 'active'")
    private String status;

    @ManyToOne()
    @JoinColumn(name = "address_ID")
    private Address address;


    public Patient() {
        super();
    }

    public Patient(long patient_ID, String firstname, String middlename, String surname, Date birth_date, String PESEL,
                   char sex, String phone_number, String uid, String status, Address address) {
        Patient_ID = patient_ID;
        this.firstname = firstname;
        this.middlename = middlename;
        this.surname = surname;
        this.birth_date = birth_date;
        this.PESEL = PESEL;
        this.sex = sex;
        this.phone_number = phone_number;
        this.uid = uid;
        this.status = status;
        this.address = address;
    }

    public long getPatient_ID() {
        return Patient_ID;
    }

    public void setPatient_ID(long patient_ID) {
        Patient_ID = patient_ID;
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

    public Date getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(Date birth_date) {
        this.birth_date = birth_date;
    }

    public String getPESEL() {
        if(PESEL == null){
            PESEL = "";
        }
        return PESEL;
    }

    public void setPESEL(String PESEL) {
        this.PESEL = PESEL;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getStatus() {

        if(status == null){
            status = "active";
        }
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Patient{" +
                 "Patient_ID=" + Patient_ID +
                 ", firstname='" + getFirstname() + '\'' +
                 ", middledname='" + getMiddlename() + '\'' +
                 ", surname='" + surname + '\'' +
                 ", birth_date=" + birth_date +
                 ", PESEL='" + getPESEL() + '\'' +
                 ", sex='" + sex + '\'' +
                 ", phone_number='" + phone_number + '\'' +
                 ", uid='" + uid + '\'' +
                 ", status='" + status + '\'' +
                 ", address='" + address + '\'' +
                 '}';
    }
}
