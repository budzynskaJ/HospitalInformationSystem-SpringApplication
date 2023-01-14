let token = "";
$(document).ready(function (){
    let email = "admin@cabolabs.com";
    let password = "admin";
    let organization = "123456";
    let url = "http://localhost:8090/rest/v1/auth?" + "email=" + email +"&password=" + password + "&organization=" + organization;
  fetch(url, {
      method: 'POST',
      headers: {
          'Origin': 'http://localhost:8070/doctor/doctor_patients',
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

let uid = "";
function newEHR(subjectUid) {
    let format = "json";

    return fetch('http://localhost:8090/rest/v1/ehrs?' + "format=" + format + "&subjectUid=" + subjectUid, {

        method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/doctor/doctor_patients',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json; charset=UTF-8',
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
        .then(
            res=>{
                if(res.ok) {
                    Swal.fire({
                        title: 'EHR has been successfully created!',
                        icon: 'success',
                        showConfirmButton: false,
                        showCloseButton: false,
                        timer: 1500,
                    })
                }
                res.json().then(
                    data => {
                        console.log(data);
                        uid = data.uid;
                        console.log(uid);
                    }
                ).catch(err=>console.log(err))
            }


        )
}

function showinQuery() {
    $('.patient-table').on('click', '#queryD', function () {
        var patient_firstname = $(this).parents('tr')[0].cells[1].textContent;
        var patient_middlename = $(this).parents('tr')[0].cells[2].textContent;
        var patient_surname = $(this).parents('tr')[0].cells[3].textContent;
        var patient_birthday = $(this).parents('tr')[0].cells[4].textContent;
        var subjectUid = $(this).parents('tr')[0].cells[7].textContent;

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

        jQuery.noConflict();
        jQuery('#queryData').modal('show');


        fetch('http://localhost:8090/rest/v1/ehrs/subjectUid/' + subjectUid, {
            method: 'GET',
            headers: {
                'Origin': 'http://localhost:8070/doctor/doctor_patients',
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
            .then(res => {
                if (!res.ok) {
                    Swal.fire({
                        title: 'EHR for this patient does not exist in the EHR Server!',
                        icon: 'warning',
                        html: 'Do you want to add this patient to the EHR Server?',
                        showCloseButton: true,
                        showDenyButton: true,
                        confirmButtonText: "Yes",
                        denyButtonText: "No",
                        confirmButtonColor: "#2AB32A",
                        denyButtonColor: "#d33",
                        reverseButtons: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            newEHR(subjectUid);
                        } else if (result.isDenied) {
                            Swal.fire({
                                title: 'You cannot query data for this patient!',
                                icon: 'warning',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                buttonsStyling: false,
                                showCloseButton: true,
                            })
                            jQuery('#queryData').modal('hide');
                        }
                    })
                }
                res.json().then(
                    data => {
                        console.log(data);
                        uid = data.uid;
                    }
                )
            })


        return uid;
    })
}



let subjectUid = "";
setTimeout(function getEHR() {
    fetch("http://localhost:8090/rest/v1/ehrs", {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/doctor/doctor_patients',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json; charset=UTF-8',
            'Content-Type': 'application/json; charset=UTF-8'
        },
    }).then(res => {
        res.json().then(
            data => {
                subjectUid = data.subjectUid;
            }
        )
    })
    return subjectUid;
}, 1000)


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
                        temp += "<td id='PESEL'>" + p.pesel + "</td>";
                        temp += "<td id='s'>" + p.sex + "</td>";
                        temp += "<td id='UID'>" + p.uid + "</td>";
                        temp += "<td style='vertical-align: middle'>\n" +
                            "                             <span type=\"button\" data-toggle='modal' data-target='#queryData' id='queryD' onclick='showinQuery()' \n" +
                            "                               style='color: rgba(24,31,151,0.93); vertical-align: middle !important; font-size: 32px !important;' class=\"material-symbols-rounded\"; title='Query data'>\n" +
                            "                                   diagnosis \n" +
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
                            { width: "130px", targets: 5 },
                            { width: "70px", targets: 6 },
                            { width: "220px", targets: 7 },
                            { width: "120px", targets: 8 },
                    ]
                        },
                    );
                });

            }
        }
    })


function uuid() {
    var time = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var random = (time + Math.random()*16)%16|0;
        time = Math.floor(time/16);
        return(c=='x' ? random:(random&0x3|0x8)).toString(16);
    });
    return uuid;
}


function queryData() {
    let patientsuid = uid;

        let format = "json";
        let current_doctor = document.getElementById('doctorsData').textContent;
        let name = current_doctor.split(" ").at(1);
        let surname = current_doctor.split(" ").at(2);
        let time_commited = new Date().toISOString().slice(0, 10)+"T"+ new Date().toLocaleTimeString();
        let weight = document.getElementById('weight').value;
        let height = document.getElementById('height').value;
        let lastUpdated = document.getElementById('lastUpdated').value;
        let lmp = document.getElementById('lmp').value;
        let description = document.getElementById('description').value;
        let contraception = document.getElementById('contraception').value;
        let code_contraception;
        if(contraception == "never used") {
            code_contraception = "at0006";
        } else if (contraception == "current user") {
            code_contraception = "at0003";
        } else if (contraception == "not current user") {
            code_contraception = "at0005";
        }


        const letters     = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż', 'Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż']; //nie zamienia Ż na Z
        const replacement = ['a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z', 'A', 'C', 'E', 'L', 'N', 'O', 'S', 'Z', 'Z'];
        current_doctor = current_doctor.toLowerCase();
        name = name.toLowerCase();
        surname = surname.toLowerCase();
        for(let l = 0; l<letters.length; ++l) {
            current_doctor = current_doctor.replaceAll(letters[l], replacement[l]);
            name = name.replaceAll(letters[l], replacement[l]);
            surname = surname.replaceAll(letters[l], replacement[l]);
        }
        let data = current_doctor.split(" ");
        for(let o = 0; o<data.length; o++) {
            data[o] = data[o].charAt(0).toUpperCase() + data[o].slice(1);
        }
        current_doctor = data.join(" ");
        name = name.charAt(0).toUpperCase() + name.slice(1);
        surname = surname.charAt(0).toUpperCase() + surname.slice(1);

        for (let d = 0; d<description.length; ++d) {
          description = description.replaceAll(letters[d], replacement[d]);
        }



        weight = parseFloat(weight);
        height = parseFloat(height);
        height = height.toFixed(2);
        weight = weight.toFixed(2);
        let bmi_h = 0;
        bmi_h = height**2;
        bmi_h = bmi_h.toFixed(2);
        let bmi = weight/bmi_h;

        bmi = bmi.toFixed(2);


        var json = {
            "versions" : [{
                "version": {
                    "@xmlns": "http://schemas.openehr.org/v1",
                    "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "@xsi:type": "ORIGINAL_VERSION",
                    "contribution": {
                        "id": {
                            "@xsi:type": "HIER_OBJECT_ID",
                            "value": uuid()
                        },
                        "namespace": "EHR::COMMON",
                        "type": "CONTRIBUTION"
                    },
                    "commit_audit": {
                        "system_id": "CABOLABS_EHR",
                        "committer": {
                            "@xsi:type": "PARTY_IDENTIFIED",
                            "name": "current_doctor"
                        },
                        "time_committed": {
                            "value": time_commited
                        },
                        "change_type": {
                            "value": "creation",
                            "defining_code": {
                                "terminology_id": {
                                    "value": "openehr"
                                },
                                "code_string": 249
                            }
                        }
                    },
                    "data": {
                        "@xsi:type": "COMPOSITION",
                        "@archetype_node_id": "openEHR-EHR-COMPOSITION.health_summary.v1",
                        "name": {
                            "value": "Gynecology appointment"
                        },
                        "uid": {
                            "@xsi:type": "HIER_OBJECT_ID",
                            "value": uuid()
                        },
                        "archetype_details": {
                            "archetype_id": {
                                "value": "openEHR-EHR-COMPOSITION.health_summary.v1"
                            },
                            "template_id": {
                                "value": "gin.pl.v1"
                            },
                            "rm_version": "1.0.2"
                        },
                        "language": {
                            "terminology_id": {
                                "value": "ISO_639-1"
                            },
                            "code_string": "pl"
                        },
                        "territory": {
                            "terminology_id": {
                                "value": "ISO_3166-1"
                            },
                            "code_string": "UY"
                        },
                        "category": {
                            "value": "event",
                            "defining_code": {
                                "terminology_id": {
                                    "value": "openehr"
                                },
                                "code_string": 433
                            }
                        },
                        "composer": {
                            "@xsi:type": "PARTY_IDENTIFIED",
                            "name": current_doctor
                        },
                        "context": {
                            "start_time": {
                                "value": time_commited
                            },
                            "setting": {
                                "value": "Hospital Montevideo",
                                "defining_code": {
                                    "terminology_id": {
                                        "value": "openehr"
                                    },
                                    "code_string": 227
                                }
                            }

                        },
                        "content": [{
                            "@xsi:type" : "OBSERVATION",
                            "@archetype_node_id" : "openEHR-EHR-OBSERVATION.body_mass_index.v2",
                            "name" : {
                                "value" : "Body Mass Index"
                            },
                            "language" : {
                                "terminology_id" : {
                                    "value" : "ISO_639-1"
                                },
                                "code_string" : "pl"
                            },
                            "encoding" : {
                                "terminology_id" : {
                                    "value" : "Unicode"
                                },
                                "code_string" : "UTF-8"
                            },
                            "subject" : {
                                "@xsi:type" : "PARTY_SELF"
                            },
                            "data" : {
                                "@xsi:type" : "HISTORY",
                                "@archetype_node_id" : "at0001",
                                "name" : {
                                    "value" : "history"
                                },
                                "origin" : {
                                    "@xsi:type" : "DV_DATE_TIME",
                                    "value" : time_commited
                                },
                                "events" : {
                                    "@xsi:type" : "POINT_EVENT",
                                    "@archetype_node_id" : "at0002",
                                    "name" : {
                                        "value" : "Measured at"
                                    },
                                    "time" : {
                                        "@xsi:type" : "DV_DATE_TIME",
                                        "value" : time_commited
                                    },
                                    "data" : {
                                        "@xsi:type" : "ITEM_TREE",
                                        "@archetype_node_id" : "at0003",
                                        "name" : {
                                            "value" : "List"
                                        },
                                        "items" : [ {
                                            "@xsi:type" : "ELEMENT",
                                            "@archetype_node_id" : "at0004",
                                            "name" : {
                                                "@xsi:type" : "DV_TEXT",
                                                "value" : "Body Mass Index"
                                            },
                                            "value" : {
                                                "@xsi:type" : "DV_QUANTITY",
                                                "magnitude": bmi,
                                                "units" : "kg/m2"
                                            }
                                        }]
                                    }
                                }
                            }

                        },
                            {
                                "@xsi:type" : "EVALUATION",
                                "@archetype_node_id" : "openEHR-EHR-EVALUATION.last_menstrual_period.v1",
                                "name" : {
                                    "value" : "Last menstrual period"
                                },
                                "language" : {
                                    "terminology_id" : {
                                        "value" : "ISO_639-1"
                                    },
                                    "code_string" : "pl"
                                },
                                "encoding" : {
                                    "terminology_id" : {
                                        "value" : "Unicode"
                                    },
                                    "code_string" : "UTF-8"
                                },
                                "subject" : {
                                    "@xsi:type" : "PARTY_SELF"
                                },
                                "protocol": {
                                    "@xsi:type": "ITEM_TREE",
                                    "@archetype_node_id": "at0003",
                                    "name": {
                                        "@xsi:type": "DV_TEXT",
                                        "value": "List"
                                    },
                                    "items": [{
                                        "@xsi:type": "ELEMENT",
                                        "@archetype_node_id": "at0004",
                                        "name": {
                                            "@xsi:type": "DV_TEXT",
                                            "value": "Date when the last menstrual period started"
                                        },
                                        "value": {
                                            "@xsi:type": "DV_DATE_TIME",
                                            "value": lastUpdated
                                        }
                                    }]
                                },
                                "data" : {
                                    "@xsi:type" : "ITEM_TREE",
                                    "@archetype_node_id" : "at0001",
                                    "name" : {
                                        "@xsi:type": "DV_TEXT",
                                        "value" : "List"
                                    },
                                    "items" : [ {
                                        "@xsi:type" : "ELEMENT",
                                        "@archetype_node_id" : "at0002",
                                        "name" : {
                                            "@xsi:type" : "DV_TEXT",
                                            "value" : "Date of onset of menstrual bleeding"
                                        },
                                        "value" : {
                                            "@xsi:type" : "DV_DATE",
                                            "value": lmp
                                        }
                                    },
                                        {
                                            "@xsi:type" : "ELEMENT",
                                            "@archetype_node_id" : "at0007",
                                            "name" : {
                                                "@xsi:type" : "DV_TEXT",
                                                "value" : "Description"
                                            },
                                            "value" : {
                                                "@xsi:type" : "DV_TEXT",
                                                "value": description
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "@xsi:type": "EVALUATION",
                                "@archetype_node_id" : "openEHR-EHR-EVALUATION.contraceptive_summary.v1",
                                "name" : {
                                    "@xsi:type": "DV_TEXT",
                                    "value" : "Summary and persistent information about the use of methods to prevent pregnancy"
                                },
                                "language" : {
                                    "terminology_id" : {
                                        "value" : "ISO_639-1"
                                    },
                                    "code_string" : "pl"
                                },
                                "encoding" : {
                                    "terminology_id" : {
                                        "value" : "Unicode"
                                    },
                                    "code_string" : "UTF-8"
                                },
                                "subject" : {
                                    "@xsi:type" : "PARTY_SELF"
                                },
                                "data": {
                                    "@xsi:type": "ITEM_TREE",
                                    "@archetype_node_id": "at0001",
                                    "name": {
                                        "@xsi:type": "DV_TEXT",
                                        "value": "List"
                                    },
                                    "items": [{
                                        "@xsi:type": "ELEMENT",
                                        "@archetype_node_id": "at0089",
                                        "name": {
                                            "@xsi:type": "DV_TEXT",
                                            "value": "Statement about regular use of any type of contraception"
                                        },
                                        "value": {
                                            "@xsi:type": "DV_CODED_TEXT",
                                            "value": contraception,
                                            "defining_code":{
                                                "terminology_id":{
                                                    "value":"local"
                                                },
                                                "code_string": code_contraception
                                            }
                                        }
                                    }
                                        ]

                                }
                            }
                        ]

                    },
                    "lifecycle_state": {
                        "value": "complete",
                        "defining_code": {
                            "terminology_id": {
                                "value": "openehr"
                            },
                            "code_string": 532
                        }
                    }
                }
            }]

        }

    let contraceptionType = document.getElementById('contraceptionType');
    let status = document.getElementById('status');
    let dateContraception = document.getElementById('dateContraception');
    let dateLast = document.getElementById('dateLast');

        let contr;
        if (contraception !== "never used") {
            let code_status;
            if (status.value == "current user") {
                code_status = "at0145";
            } else if (status.value == "not current user") {
                code_status = "at0146";
            }
            let code_contraceptionType;
            if (contraceptionType.value == "combination pill") {
                code_contraceptionType = "at0155"
            } else if (contraceptionType.value == "combination skin patch") {
                code_contraceptionType = "at0156"
            } else if (contraceptionType.value == "progestogen-only pill") {
                code_contraceptionType = "at0157"
            } else if(contraceptionType.value == "depot progestogen injection") {
                code_contraceptionType = "at0158"
            } else if (contraceptionType.value == "hormone implant") {
                code_contraceptionType = "at0159"
            } else if (contraceptionType.value == "vaginal ring") {
                code_contraceptionType = "at0160"
            } else if (contraceptionType.value == "female sterilisation") {
                code_contraceptionType = "at0161"
            } else if (contraceptionType.value == "male sterilisation") {
                code_contraceptionType = "at0162"
            } else if (contraceptionType.value == "IUD without hormone") {
                code_contraceptionType = "at0163"
            } else if (contraceptionType.value == "withdrawal") {
                code_contraceptionType = "at0164"
            } else if (contraceptionType.value == "fertility awereness method") {
                code_contraceptionType = "at0165"
            } else if (contraceptionType.value == "abstinence") {
                code_contraceptionType = "at0166"
            } else if (contraceptionType.value == "vaginal douching") {
                code_contraceptionType = "at0167"
            } else if (contraceptionType.value == "clinical indication") {
                code_contraceptionType = "at0168"
            } else if (contraceptionType.value == "IUD with hormone") {
                code_contraceptionType = "at0169"
            }
            contraceptionType = contraceptionType.value;
            status = status.value;
            dateContraception = dateContraception.value;
            dateLast = dateLast.value;
            contr =
                {
                    "@xsi:type": "CLUSTER",
                    "@archetype_node_id": "at0029",
                    "name": {
                        "@xsi:type": "DV_TEXT",
                        "value": "1"
                    },
                    "items": [{
                        "@xsi:type": "ELEMENT",
                        "@archetype_node_id": "at0151",
                        "name": {
                            "@xsi:type": "DV_TEXT",
                            "value": "The type of contraception used by the individual"
                        },
                        "value": [{
                            "@xsi:type": "DV_CODED_TEXT",
                            "value": contraceptionType,
                            "defining_code": {
                                "terminology_id": {
                                    "value": "local"
                                },
                                "code_string": code_contraceptionType
                            }
                        }
                        ]
                    },
                        {
                            "@xsi:type": "ELEMENT",
                            "@archetype_node_id": "at0144",
                            "name": {
                                "@xsi:type": "DV_TEXT",
                                "value": "Statement about current use of the specified type of contraception"
                            },
                            "value": {
                                "@xsi:type": "DV_CODED_TEXT",
                                "value": status,
                                "defining_code": {
                                    "terminology_id": {
                                        "value": "local"
                                    },
                                    "code_string": code_status
                                }
                            }
                        },
                        {
                            "@xsi:type": "ELEMENT",
                            "@archetype_node_id": "at0148",
                            "name": {
                                "@xsi:type": "DV_TEXT",
                                "value": "Date when the individual first used the specified type of contraception"
                            },
                            "value": {
                                "@xsi:type": "DV_DATE_TIME",
                                "value": dateContraception
                            }
                        },
                        {
                            "@xsi:type": "ELEMENT",
                            "@archetype_node_id": "at0149",
                            "name": {
                                "@xsi:type": "DV_TEXT",
                                "value": "Date when the individual last used the specified type of contraception"
                            },
                            "value": {
                                "@xsi:type": "DV_DATE_TIME",
                                "value": dateLast
                            }

                        }
                    ]
            }
            JSON.stringify(json);
            console.log(json);
            console.log(contr);
            json.versions.at(0).version.data.content.at(2).data.items[1] = contr;

        }

    let contraceptionType2;
    let status2;
    let dateContraception2;
    let dateLast2;
    let additional;

    for (let i = 1; i<5; i++) {
        contraceptionType2 = document.getElementById('contraceptionType' + i);
        status2 = document.getElementById('status' + i);
        dateContraception2 = document.getElementById('dateContraception' + i);
        dateLast2 = document.getElementById('dateLast' + i);

        if (contraceptionType2!==null && status2!==null && dateContraception2!==null && dateLast2!==null) {
            let code_status2;
            if (status2.value == "current user") {
                code_status2 = "at0145";
            } else if (status2.value == "not current user") {
                code_status2 = "at0146";
            }
            let code_contraceptionType2;
            if (contraceptionType2.value == "combination pill") {
                code_contraceptionType2 = "at0155"
            } else if (contraceptionType2.value == "combination skin patch") {
                code_contraceptionType2 = "at0156"
            } else if (contraceptionType2.value == "progestogen-only pill") {
                code_contraceptionType2 = "at0157"
            } else if(contraceptionType2.value == "depot progestogen injection") {
                code_contraceptionType2 = "at0158"
            } else if (contraceptionType2.value == "hormone implant") {
                code_contraceptionType2 = "at0159"
            } else if (contraceptionType2.value == "vaginal ring") {
                code_contraceptionType2 = "at0160"
            } else if (contraceptionType2.value == "female sterilisation") {
                code_contraceptionType2 = "at0161"
            } else if (contraceptionType2.value == "male sterilisation") {
                code_contraceptionType2 = "at0162"
            } else if (contraceptionType2.value == "IUD without hormone") {
                code_contraceptionType2 = "at0163"
            } else if (contraceptionType2.value == "withdrawal") {
                code_contraceptionType2 = "at0164"
            } else if (contraceptionType2.value == "fertility awereness method") {
                code_contraceptionType2 = "at0165"
            } else if (contraceptionType2.value == "abstinence") {
                code_contraceptionType2 = "at0166"
            } else if (contraceptionType2.value == "vaginal douching") {
                code_contraceptionType2 = "at0167"
            } else if (contraceptionType2.value == "clinical indication") {
                code_contraceptionType2 = "at0168"
            } else if (contraceptionType2.value == "IUD with hormone") {
                code_contraceptionType2 = "at0169"
            }
            contraceptionType2 = contraceptionType2.value;
            status2 = status2.value;
            dateContraception2 = dateContraception2.value;
            dateLast2 = dateLast2.value;
            additional =
                {
                    "@xsi:type": "CLUSTER",
                    "@archetype_node_id":"at0029",
                    "name": {
                        "@xsi:type": "DV_TEXT",
                        "value": i+1
                    },
                    "items": [{
                        "@xsi:type": "ELEMENT",
                        "@archetype_node_id": "at0151",
                        "name": {
                            "@xsi:type": "DV_TEXT",
                            "value": "The type of contraception used by the individual"
                        },
                        "value": [{

                            "@xsi:type": "DV_CODED_TEXT",
                            "value": contraceptionType2,
                            "defining_code":{
                                "terminology_id":{
                                    "value":"local"
                                },
                                "code_string": code_contraceptionType2
                            }
                        }


                        ]
                    },
                        {
                            "@xsi:type": "ELEMENT",
                            "@archetype_node_id": "at0144",
                            "name": {
                                "@xsi:type": "DV_TEXT",
                                "value": "Statement about current use of the specified type of contraception"
                            },
                            "value": {
                                "@xsi:type": "DV_CODED_TEXT",
                                "value": status2,
                                "defining_code":{
                                    "terminology_id":{
                                        "value":"local"
                                    },
                                    "code_string": code_status2
                                }
                            }
                        },
                        {
                            "@xsi:type": "ELEMENT",
                            "@archetype_node_id": "at0148",
                            "name": {
                                "@xsi:type": "DV_TEXT",
                                "value": "Date when the individual first used the specified type of contraception"
                            },
                            "value": {
                                "@xsi:type": "DV_DATE_TIME",
                                "value": dateContraception2
                            }
                        },
                        {
                            "@xsi:type": "ELEMENT",
                            "@archetype_node_id": "at0149",
                            "name": {
                                "@xsi:type": "DV_TEXT",
                                "value": "Date when the individual last used the specified type of contraception"
                            },
                            "value": {
                                "@xsi:type": "DV_DATE_TIME",
                                "value": dateLast2
                            }

                        }
                    ]

                }
            JSON.stringify(json);
            json.versions.at(0).version.data.content.at(2).data.items[1+i] = additional;
        }
    }




        fetch('http://localhost:8090/rest/v1/ehrs/' + patientsuid + '/compositions?auditCommitter=' + name + '%20' + surname, {
            method: 'POST',
            headers: {
                'Origin': 'http://localhost:8070/doctor/doctor_patients',
                Authorization: 'Bearer ' + token,
                'Accept': 'text/plain; charset=UTF-8',
                'Accept-Language': 'pl',
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(json)


        }) .then((res) => {
            if(res.ok) {
                Swal.fire({
                    title: 'The data has been saved successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    showCloseButton: false,
                    timer: 1600,
                })
                setTimeout(function(){
                    window.location.reload();},
                    1700);
                } else if (res.isDenied) {

                }

                    res.json().then(
                        data => {
                            console.log(data);

                        }
                    ).catch(err => console.log(err))
                }
            )


}

