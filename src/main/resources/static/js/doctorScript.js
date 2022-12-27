let token = "";
$(document).ready(function (){
    let email = "admin%40cabolabs.com";
    let password = "admin";
    let organization = "123456";
    let url = "http://localhost:8090/rest/v1/auth?" + "email=" + email +"&password=" + password + "&organization=" + organization;
  fetch(url, {
      method: 'POST',
      headers: {
          'Origin': 'http://localhost:8070/doctor/doctor_patients',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },

    })
      .then(res=>{
          res.json().then(
              res => {
                  token = res.token;
                  console.log(token);
              }
          );

    }).catch(err => err);
})
/**var gynecologist_uid = "";
setTimeout(function () {
    fetch('http://localhost:8090/rest/v1/templates', {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(
        res=> {
            res.json().then(
                data => {
                    gynecologist_uid = data.templates[3].uid

                }
            ).catch(err => console.log(err))
        }
    )

}, 1500);

setTimeout(function () {
    fetch('http://localhost:8090/rest/v1/templates/' + gynecologist_uid, {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(
    res=> {
        res.json().then(
            data => {
                console.log(data)
            }
        ).catch(err => console.log(err))
    }
)
}, 2000);**/
let uid = "";

function newEHR(subjectUid) {
    let format = "json";

    return fetch('http://localhost:8090/rest/v1/ehrs?' + "format=" + format + "&subjectUid=" + subjectUid, {

        method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/doctor/doctor_patients',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
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

        let today = new Date().getFullYear();
        let patient_birth_year = patient_birthday.split("-").at(0);
        console.log(patient_birth_year);
        let age = today - patient_birth_year;

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
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
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
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        res.json().then(
            data => {
                console.log(data);
                subjectUid = data.subjectUid;
            }
        )
    })
    return subjectUid;
}, 1500)



fetch("/patients").then(
    res=>{
        res.json().then(
            patientsData=> {
                console.log(patientsData);
                displayPatient(patientsData);
            })

        async function displayPatient(patientsData) {
            if (patientsData.length > 0) {
                let temp = "";
                let numb = 1;
                patientsData.forEach((p) => {
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
                })
                document.getElementById("patientsData").innerHTML = await temp;
                $(document).ready(function () {
                    $('.patient-table').DataTable();
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
        let contraceptionType = document.getElementById('contraceptionType').value;
        let status = document.getElementById('status').value;
        let dateContraception = document.getElementById('dateContraception').value;
        let dateLast = document.getElementById('dateLast').value;

        weight = parseFloat(weight);
        height = parseFloat(height);
        height = height.toFixed(2);
        weight = weight.toFixed(2);
        let bmi_h = 0;
        bmi_h = height**2;
        bmi_h = bmi_h.toFixed(2);
        let bmi = weight/bmi_h;

        bmi = bmi.toFixed(2);


        fetch('http://localhost:8090/rest/v1/ehrs/' + patientsuid + '/compositions?auditCommitter=' + name + '%20' + surname, {
            method: 'POST',
            headers: {
                'Origin': 'http://localhost:8070/doctor/doctor_patients',
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
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
                                            "value" : "Any event"
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
                                        "value" : "Summary and persistent information about the use of methods to prevent pregnancy."
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
                                                "value": "Statement about regular use of any type of contraception."
                                            },
                                            "value": {
                                                "@xsi:type": "DV_CODED_TEXT",
                                                "value":contraception,
                                                "defining_code":{
                                                    "terminology_id":{
                                                        "value":"local"
                                                    },
                                                    "code_string":"at0003"
                                                }
                                            }
                                            },
                                            {
                                                "@xsi:type": "CLUSTER",
                                                "@archetype_node_id":"at0029",
                                                "name": {
                                                    "@xsi:type": "DV_TEXT",
                                                    "value": "cluster"
                                                },
                                                "items": [{
                                                    "@xsi:type": "ELEMENT",
                                                    "@archetype_node_id": "at0151",
                                                    "name": {
                                                        "@xsi:type": "DV_TEXT",
                                                        "value": "The type of contraception used by the individual."
                                                    },
                                                    "value": [{
                                                        "@xsi:type": "DV_CODED_TEXT",
                                                        "value":contraceptionType,
                                                        "defining_code":{
                                                            "terminology_id":{
                                                                "value":"local"
                                                            },
                                                            "code_string":"at0155"
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
                                                            "value":status,
                                                            "defining_code":{
                                                                "terminology_id":{
                                                                    "value":"local"
                                                                },
                                                                "code_string":"at0145"
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

                                            }]

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

})


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
                } else if (result.isDenied) {

                }

                    res.json().then(
                        data => {
                            console.log(data);

                        }
                    ).catch(err => console.log(err))
                }
            )


}

