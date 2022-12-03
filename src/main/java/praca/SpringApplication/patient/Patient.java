package praca.SpringApplication.patient;

import com.sun.istack.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "patient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Patient_ID;

    @NotNull
    private String firstname;

    private String middlename;

    @NotNull
    private String surname;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date birth_date;

    private String PESEL;

    @NotNull
    private char sex;

    @NotNull
    private String phone_number;

    @NotNull
    private String uid;

    public Patient() {
        super();
    }

    public Patient(long patient_ID, String firstname, String middlename, String surname, Date birth_date, String PESEL, char sex, String phone_number, String uid) {
        Patient_ID = patient_ID;
        this.firstname = firstname;
        this.middlename = middlename;
        this.surname = surname;
        this.birth_date = birth_date;
        this.PESEL = PESEL;
        this.sex = sex;
        this.phone_number = phone_number;
        this.uid = uid;
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
                 '}';
    }
}
