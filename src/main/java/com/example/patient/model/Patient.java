package com.example.patient.model;


import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;

    private String secondname;

    private String surname;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birth_date;

    private String PESEL;

    private String sex;

    private String phone_number;

    public Patient(Long id, String firstname, String secondname, String surname, Date birth_date, String PESEL, String sex, String phone_number){
        super();
        this.id = id;
        this.firstname = firstname;
        this.secondname = secondname;
        this.surname = surname;
        this.birth_date = birth_date;
        this.PESEL = PESEL;
        this.sex = sex;
        this.phone_number = phone_number;
    }

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getSecondname() {
        return secondname;
    }

    public void setSecondname(String secondname) {
        this.secondname = secondname;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Date getBirthdate() {
        return birth_date;
    }

    public void setBirthdate(Date birth_date) {
        this.birth_date = birth_date;
    }

    public String getPESEL() {
        return PESEL;
    }

    public void setPESEL(String PESEL) {
        this.PESEL = PESEL;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    @Override
    public String toString() {
        return "Patient{" +
                 "id=" + id +
                 ", firstname='" + firstname + '\'' +
                 ", secondname='" + secondname + '\'' +
                 ", surname='" + surname + '\'' +
                 ", birth_date=" + birth_date + '\'' +
                 ", PESEL=" + PESEL + '\'' +
                 ", sex='" + sex + '\'' +
                 ", phone_number=" + phone_number + '\'' +
                 '}';
    }
}
