let token = "";
$(document).ready(function (){
    let email = "admin%40cabolabs.com";
    let password = "admin";
    let organization = "123456";
    let url = "http://localhost:8090/rest/v1/auth?" + "email=" + email +"&password=" + password + "&organization=" + organization;
    fetch(url, {
        method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/doctor/doctor_appointments',
            'Content-Type': 'application/json',
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
let message = "";

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
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
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
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json; charset=UTF-8',
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
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json; charset=UTF-8',
                                                    },
                                                }).then(response1 => {
                                                    response1.json().then(
                                                        data3 => {
                                                            console.log(data3);
                                                            time_commited = data3.version.commit_audit.time_committed.value;
                                                            var time = document.createElement("div");
                                                            time.setAttribute('id', "time_committed");
                                                            time.innerHTML = time_commited;
                                                            parent.append(time);

                                                            doctor = data3.version.data.composer.name;
                                                            var doc = document.createElement("div");
                                                            doc.setAttribute('id', "doctor");
                                                            doc.innerHTML = doctor;
                                                            parent.append(doc);

                                                            bmi = data3.version.data.content[0].data.events.data.items.value.magnitude;
                                                            var BMI = document.createElement("div");
                                                            BMI.setAttribute('id', "bmi");
                                                            BMI.innerHTML = bmi;
                                                            parent.append(BMI);

                                                            period = data3.version.data.content[1].data.items[0].value.value;
                                                            var per = document.createElement("div");
                                                            per.setAttribute('id', "period");
                                                            per.innerHTML = period;
                                                            parent.append(per);

                                                            description = data3.version.data.content[1].data.items[1].value.value;
                                                            var descr = document.createElement("div");
                                                            descr.setAttribute('id', "description");
                                                            descr.innerHTML = description;
                                                            parent.append(descr);

                                                            contraception = data3.version.data.content[2].data.items[0].value.value;
                                                            var contr = document.createElement("div");
                                                            contr.setAttribute('id', "contraception");
                                                            contr.innerHTML = contraception;
                                                            parent.append(contr);

                                                            if (contraception != "never used") {
                                                                for (let i = 1; i < data3.version.data.content[2].data.items.length; i++) {
                                                                    contraceptionType = data3.version.data.content[2].data.items[i].items[0].value.value;
                                                                    console.log(contraceptionType);
                                                                    var cT = document.createElement("div");
                                                                    cT.setAttribute('id', 'type');
                                                                    cT.innerHTML = contraceptionType;
                                                                    parent.append(cT);

                                                                    status = data3.version.data.content[2].data.items[i].items[1].value.value;
                                                                    console.log(status);
                                                                    var stat = document.createElement("div");
                                                                    stat.setAttribute('id', 'status');
                                                                    stat.innerHTML = status;
                                                                    parent.append(stat);

                                                                    date = data3.version.data.content[2].data.items[i].items[2].value.value;
                                                                    console.log(date);
                                                                    var fDate = document.createElement("div");
                                                                    fDate.setAttribute('id', 'date');
                                                                    fDate.innerHTML = date;
                                                                    parent.append(fDate);

                                                                    last = data3.version.data.content[2].data.items[i].items[3].value.value;
                                                                    console.log(last);
                                                                    var lDate = document.createElement("div");
                                                                    lDate.setAttribute('id', 'last');
                                                                    lDate.innerHTML = last;
                                                                    parent.append(lDate);

                                                                }

                                                            }

                                                            console.log(time_commited);
                                                            console.log(doctor);
                                                            console.log(bmi);
                                                            console.log(period);
                                                            console.log(description);


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

