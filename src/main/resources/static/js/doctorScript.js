let token = "";
$(document).ready(function (){
    let email = "admin%40cabolabs.com";
    let password = "admin";
    let organization = "123456";
    let url = "http://localhost:8090/rest/v1/auth?" + "email=" + email +"&password=" + password + "&organization=" + organization;
  fetch(url, {
      method: 'POST',
      headers: {
          'Origin': 'http://localhost:8070/main_doctor',
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
function newEHR() {
    let format = "json";
    let subjectUid = document.getElementById("uid").value;
    return fetch('http://localhost:8090/rest/v1/ehrs?' + "format=" + format + "&subjectUid=" + subjectUid, {

    method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then(
            res=>{
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
let subjectUid = "";
setTimeout(function getEHR() {
    fetch("http://localhost:8090/rest/v1/ehrs", {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
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
                        "                             <span type=\"button\" data-toggle='modal' data-target='#queryData' id='edit' \n" +
                        "                               style='color: rgba(24,31,151,0.93); vertical-align: middle !important; font-size: 32px !important;' class=\"material-symbols-rounded\"; title='Query data'>\n" +
                        "                                   diagnosis \n" +
                        "                              </span>\n" +
                        "                        </td>";
                    temp += "</tr>";
                    numb = numb + 1;
                })
                document.getElementById("patientsData").innerHTML = await temp;
                $(document).ready(function () {
                    $('#patient-table').DataTable();
                });

            }
        }
    })

function getEHRBySubjectID() {

    subjectUid = document.getElementById("uid").value;
    fetch('http://localhost:8090/rest/v1/ehrs/subjectUid/' + subjectUid, {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then(res=>{
            res.json().then(
                data => {
                    console.log(data);
                    uid = data.uid;
                    console.log(uid);
                }
            )
        })


    return uid;
}
function uuid() {
    var time = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var random = (tima + Math.random()*16)%16|0;
        tima = Math.floor(time/16);
        return(c=='x' ? random:(random&0x3|0x8)).toString(16);
    });
    return uuid;
}

function queryData() {
    getEHRBySubjectID();

        let format = "json";

        let current_doctor = document.getElementById("doctorsData").value;
        let time_commited = new Date().toISOString().slice(0, 10)+"T"+ new Date().toLocaleTimeString();
        let bmi = document.getElementById("bmi").value;
        let lmp = document.getElementById("lmp").value;
        let lastUpdated = document.getElementById("lastUpdated").value;
        let description = document.getElementById("description").value;
        let contraception = document.getElementById("contraception").value;
        let contraceptionType = document.getElementById("contraceptionType").value;
        let status = document.getElementById("status").value;
        let dateContraception = document.getElementById("dateContraception").value;
        let dateLast = document.getElementById("dateLast").value;

        fetch('http://localhost:8090/rest/v1/ehrs/' + '6f53e00b-c38a-4a11-9334-36c454bec667' + '/compositions?auditCommitter=Gregory%20House,%20MD', {
            method: 'POST',
            headers: {
                'Origin': 'http://localhost:8070/main_doctor',
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
                                "value": "6f53e00b-c48a-4a11-9334-36c454bec667"
                            },
                            "namespace": "EHR::COMMON",
                            "type": "CONTRIBUTION"
                        },
                        "commit_audit": {
                            "system_id": "CABOLABS_EHR",
                            "committer": {
                                "@xsi:type": "PARTY_IDENTIFIED",
                                "name": current_doctor
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
                                "value": "Gynecological appointment"
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
                                        "value" : "20220812T211200,115-0300"
                                    },
                                    "events" : {
                                        "@xsi:type" : "POINT_EVENT",
                                        "@archetype_node_id" : "at0002",
                                        "name" : {
                                            "value" : "Any event"
                                        },
                                        "time" : {
                                            "@xsi:type" : "DV_DATE_TIME",
                                            "value" : "20220812T211200,117-0300"
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
                                                "value": "Date when the last menstrual period was updated"
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
                                                "value" : "Date of onset"
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
                                                    }]
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


        }) .then(
                res => {
                    res.json().then(
                        data => {
                            console.log(data);
                        }
                    ).catch(err => console.log(err))
                }
            )


}

