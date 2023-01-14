let token = "";
$(document).ready(function (){
    let email = "admin@cabolabs.com";
    let password = "admin";
    let organization = "123456";
    let url = "http://localhost:8090/rest/v1/auth?" + "email=" + email +"&password=" + password + "&organization=" + organization;
    fetch(url, {
        method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/doctor/doctor_appointments',
            'Accept': 'application/json',
        },

    })
        .then(res=>{
            res.json().then(
                res => {
                    token = res.token;
                }
            );

        }).catch(err => err);
})

fetch("/patients").then(
    res=>{
        res.json().then(
            patientsData=> {
                displayPatient(patientsData);
            })

        async function displayPatient(patientsData) {
            if (patientsData.length > 0) {
                let temp = "";
                let numb = 1;
                patientsData.forEach((p) => {
                    if(p.status === 'active') {
                        temp += "<tr id=" + numb + " class='tabrow editing'>";
                        temp += "<td id = 'patient'>" + p.patient_ID + "</td>";
                        temp += "<td id='first'>" + p.firstname + "</td>";
                        temp += "<td id='middle'>" + p.middlename + "</td>";
                        temp += "<td id='sur'>" + p.surname + "</td>";
                        temp += "<td id='bd'>" + (p.birth_date).toString().split('T')[0] + "</td>";
                        temp += "<td id='UID'>" + p.uid + "</td>";
                        temp += "<td style='vertical-align: middle'>\n" +
                            "                             <span type=\"button\" data-toggle='modal' data-target='#medicalData' id='medicalD' onclick='getEHRbySubjectUid()' \n" +
                            "                               style='color: rgba(24,31,151,0.93); vertical-align: middle !important; horiz-align: center !important; font-size: 32px !important;' class=\"material-symbols-rounded\"; title='Check data'>\n" +
                            "                                   medical_information \n" +
                            "                              </span>\n" +
                            "                        </td>";
                        temp += "</tr>";
                        numb = numb + 1;
                    }
                })
                document.getElementById("patientsData").innerHTML = await temp;
                $(document).ready(function () {
                    $('.patient-table').DataTable({
                        responsive: true,
                        columnDefs: [
                            { width: "57px", targets: 0 },
                            { width: "150px", targets: 1 },
                            { width: "150px", targets: 2 },
                            { width: "150px", targets: 3 },
                            { width: "120px", targets: 4 },
                            { width: "235px", targets: 5 },
                            { width: "120px", targets: 6 },
                        ],
                    });
                });

            }
        }
    })


let ehrUID = "";
let time_commited = "";
let doctor = "";
let bmi = "";
let contraception = "";
let contraceptionType = "";
let status = "";
let date = "";
let last = "";
let period = "";
let unregular = "";
let description = "";

var parent = document.getElementById("data");

function getEHRbySubjectUid() {
    $('.patient-table').on('click', '#medicalD', function () {
        var subjectUid = $(this).parents('tr')[0].cells[5].textContent;
        var uid;
        fetch("http://localhost:8090/rest/v1/ehrs/subjectUid/" + subjectUid, {
            method: 'GET',
            headers: {
                'Origin': 'http://localhost:8070/doctor/doctor_appointments',
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8'
            },
        }).then(res => {
                if(!res.ok) {
                    Swal.fire({
                        title: 'Medical data for this patient does not exist in the EHR Server!',
                        icon: 'warning',
                        showCloseButton: true,
                        showDenyButton: false,
                        confirmButtonColor: "#2AB32A",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            jQuery('#medicalData').modal('hide');
                            return;
                        }
                    })
                } else {
                    res.json().then(
                        data => {
                            ehrUID = data.uid;
                            console.log(ehrUID);
                            fetch("http://localhost:8090/rest/v1/compositions?" + "format=json&ehrUid=" + ehrUID, {
                                method: 'GET',
                                headers: {
                                    'Origin': 'http://localhost:8070/doctor/doctor_appointments',
                                    Authorization: 'Bearer ' + token,
                                    'Accept': 'application/json; charset=UTF-8',
                                    'Content-Type': 'application/json; charset=UTF-8'
                                },
                            }).then(response => {
                                response.json().then(
                                    data2 => {
                                        console.log(data2);
                                        if (data2.result.length != 0) {
                                            for (let i = 0; i < data2.result.length; i++) {
                                                uid = data2.result[i].uid;
                                                console.log(uid);
                                                fetch("http://localhost:8090/rest/v1/compositions/" + uid, {
                                                    method: 'GET',
                                                    headers: {
                                                        'Origin': 'http://localhost:8070/doctor/doctor_appointments',
                                                        Authorization: 'Bearer ' + token,
                                                        'Accept': 'text/html; charset=UTF-8',
                                                        'Accept-Language': 'pl',
                                                        'Content-Type': 'text/html; charset=UTF-8',
                                                    },
                                                }).then(response1 => {
                                                    response1.json().then(
                                                        data3 => {
                                                            console.log(data3);
                                                            var patient_firstname = $(this).parents('tr')[0].cells[1].textContent;
                                                            var patient_middlename = $(this).parents('tr')[0].cells[2].textContent;
                                                            var patient_surname = $(this).parents('tr')[0].cells[3].textContent;
                                                            var patient_birthday = $(this).parents('tr')[0].cells[4].textContent;

                                                            let today = new Date();
                                                            console.log(today);

                                                            let patient_birth_year = patient_birthday.split("-").at(0);
                                                            let patient_birth_month = patient_birthday.split("-").at(1);
                                                            let patient_birth_day = patient_birthday.split("-").at(2);
                                                            console.log(patient_birth_year);
                                                            let age = today.getFullYear() - patient_birth_year;
                                                            let m = today.getMonth() - patient_birth_month;
                                                            if(m < 0 || m === 0 && today.getDate() < patient_birth_day) {
                                                                age--;
                                                            }

                                                            $('#name').text(patient_firstname + " " + patient_middlename + " " + patient_surname);
                                                            $('#birth').text(patient_birthday);
                                                            $('#age').text(age);

                                                            time_commited = data3.version.commit_audit.time_committed.value;
                                                            time_commited = time_commited.toString().replace('T', ' ');
                                                            var time = document.createElement("div");
                                                            time.setAttribute('id', "time_committed");
                                                            time.style.fontWeight = "bold";
                                                            time.innerHTML = time_commited;
                                                            parent.append(time);

                                                            doctor = data3.version.data.composer.name;
                                                            var doc = document.createElement("div");
                                                            doc.setAttribute('id', "doctor");
                                                            doc.style.fontWeight = "bold";
                                                            doc.innerHTML = doctor;
                                                            parent.append(doc);

                                                            parent.append(document.createElement("BR"));
                                                            parent.append(document.createElement("BR"));

                                                            bmi = data3.version.data.content[0].data.events.data.items.value.magnitude;
                                                            var BMILabel = document.createElement("label");
                                                            BMILabel.setAttribute('for', 'bmi');
                                                            BMILabel.innerHTML = "BMI: ";
                                                            BMILabel.style.display = "inline-block";
                                                            BMILabel.style.width = "50px";
                                                            BMILabel.style.fontWeight = "bold";
                                                            parent.append(BMILabel);
                                                            var BMI = document.createElement("div");
                                                            BMI.setAttribute('id', "bmi");
                                                            BMI.innerHTML = bmi;
                                                            BMI.style.display = "inline-block";
                                                            parent.append(BMI);

                                                            parent.append(document.createElement("BR"));
                                                            parent.append(document.createElement("BR"));

                                                            period = data3.version.data.content[1].data.items[0].value.value;
                                                            var perLabel = document.createElement("label");
                                                            perLabel.setAttribute("for", "period");
                                                            perLabel.innerHTML = "Date of last menstrual period: ";
                                                            perLabel.style.display = "inline-block";
                                                            perLabel.style.width = "260px";
                                                            perLabel.style.fontWeight = "bold";
                                                            parent.append(perLabel);
                                                            var per = document.createElement("div");
                                                            per.setAttribute('id', "period");
                                                            per.style.display = "inline-block";
                                                            per.innerHTML = period;
                                                            parent.append(per);

                                                            parent.append(document.createElement("BR"));

                                                            description = data3.version.data.content[1].data.items[1].value.value;
                                                            var descrLabel = document.createElement("label");
                                                            descrLabel.setAttribute("for", "description");
                                                            descrLabel.innerText = "Description";
                                                            descrLabel.style.fontWeight = "bold";
                                                            parent.append(descrLabel);
                                                            var descr = document.createElement("div");
                                                            descr.setAttribute('id', "description");
                                                            descr.innerHTML = description;
                                                            parent.append(descr);

                                                            if(data3.version.data.content[2].data.items.length>1) {
                                                                contraception = data3.version.data.content[2].data.items[0].value.value;

                                                                if (contraception != "never used") {
                                                                    for (let i = 1; i < data3.version.data.content[2].data.items.length; i++) {
                                                                        parent.append(document.createElement("BR"));
                                                                        parent.append(document.createElement("BR"));
                                                                        contraceptionType = data3.version.data.content[2].data.items[i].items[0].value.value;
                                                                        var cTLabel = document.createElement("label");
                                                                        cTLabel.setAttribute("for", "type");
                                                                        cTLabel.innerHTML = "Type of contraception: ";
                                                                        cTLabel.style.fontWeight = "bold";
                                                                        cTLabel.style.display = "inline-block";
                                                                        cTLabel.style.width = "195px";
                                                                        parent.append(cTLabel);
                                                                        var cT = document.createElement("div");
                                                                        cT.setAttribute('id', 'type');
                                                                        cT.innerHTML = contraceptionType;
                                                                        cT.style.display = "inline-block";
                                                                        parent.append(cT);

                                                                        status = data3.version.data.content[2].data.items[i].items[1].value.value;
                                                                        var statLabel = document.createElement("label");
                                                                        statLabel.setAttribute("for", "status");
                                                                        statLabel.innerHTML = "Status of using a given type of contraception: ";
                                                                        statLabel.style.fontWeight = "bold";
                                                                        statLabel.style.display = "inline-block";
                                                                        statLabel.style.width = "390px";
                                                                        parent.append(statLabel);
                                                                        var stat = document.createElement("div");
                                                                        stat.setAttribute('id', 'status');
                                                                        stat.innerHTML = status;
                                                                        stat.style.display = "inline-block";
                                                                        parent.append(stat);

                                                                        date = data3.version.data.content[2].data.items[i].items[2].value.value;
                                                                        date = date.toString().replace('T', ' ');
                                                                        var fDateLabel = document.createElement("label");
                                                                        fDateLabel.setAttribute("for", "date");
                                                                        fDateLabel.innerHTML = "Date of the first use of the given type of contraception: ";
                                                                        fDateLabel.style.fontWeight = "bold";
                                                                        fDateLabel.style.display = "inline-block";
                                                                        fDateLabel.style.width = "470px";
                                                                        parent.append(fDateLabel);
                                                                        var fDate = document.createElement("div");
                                                                        fDate.setAttribute('id', 'date');
                                                                        fDate.innerHTML = date;
                                                                        fDate.style.display = "inline-block";
                                                                        parent.append(fDate);

                                                                        last = data3.version.data.content[2].data.items[i].items[3].value.value;
                                                                        last = last.toString().replace('T', ' ');
                                                                        var lDateLabel = document.createElement("label");
                                                                        lDateLabel.setAttribute("for", "last");
                                                                        lDateLabel.innerHTML = "Date of the last use of the given type of contraception: ";
                                                                        lDateLabel.style.fontWeight = "bold";
                                                                        lDateLabel.style.display = "inline-block";
                                                                        lDateLabel.style.width = "465px";
                                                                        parent.append(lDateLabel);
                                                                        var lDate = document.createElement("div");
                                                                        lDate.setAttribute('id', 'last');
                                                                        lDate.innerHTML = last;
                                                                        lDate.style.display = "inline-block";
                                                                        parent.append(lDate);

                                                                    }

                                                                } else {
                                                                    console.log("nth");
                                                                }
                                                            }
                                                            parent.append(document.createElement("BR"));
                                                            var hr = document.createElement("hr");
                                                            hr.style.borderTop = "1px solid slategrey";
                                                            parent.append(hr);
                                                            parent.append(document.createElement("BR"));
                                                            parent.append(document.createElement("BR"));

                                                        }
                                                    )
                                                })
                                            }
                                        }
                                    }
                                )
                            })

                        }
                    )
                }
        })


        return ehrUID;
    })
}

