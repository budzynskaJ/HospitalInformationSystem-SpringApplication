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
var gynecologist_uid = "";
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
}, 2000);

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
                        "                             <span type=\"button\" onclick='queryData()' id='edit' \n" +
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

function queryData() {
    let format = "json";

    fetch('http://localhost:8090/rest/v1/ehrs/729fd42d-34a2-4ba2-84fb-c185f17bf256/compositions?auditCommitter=Gregory%20House,%20MD', {
        method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
        "versions" : [
        {
            "version": {
                "@xmlns": "http://schemas.openehr.org/v1",
                "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                "@xsi:type": "ORIGINAL_VERSION",
                "contribution": {
                    "id": {
                        "@xsi:type": "HIER_OBJECT_ID",
                        "value": "{% uuid 'v4' %}"
                    },
                    "namespace": "EHR::COMMON",
                    "type": "CONTRIBUTION"
                },
                "commit_audit": {
                    "system_id": "CABOLABS_EHR",
                    "committer": {
                        "@xsi:type": "PARTY_IDENTIFIED",
                        "name": "Dr. Pablo Pazos"
                    },
                    "time_committed": {
                        "value": "2018-04-20T04:01:48.717Z"
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
                    "@archetype_node_id": "openEHR-EHR-COMPOSITION.test_all_datatypes.v1",
                    "name": {
                        "value": "Test all datatypes"
                    },
                    "uid": {
                        "@xsi:type": "HIER_OBJECT_ID",
                        "value": "961e7542-43aa-4396-9cd9-3ffae2c36abd"
                    },
                    "archetype_details": {
                        "archetype_id": {
                            "value": "openEHR-EHR-COMPOSITION.test_all_datatypes.v1"
                        },
                        "template_id": {
                            "value": "test_all_datatypes.es.v1"
                        },
                        "rm_version": "1.0.2"
                    },
                    "language": {
                        "terminology_id": {
                            "value": "ISO_639-1"
                        },
                        "code_string": "es"
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
                        "name": "Dr. Pablo Pazos"
                    },
                    "context": {
                        "start_time": {
                            "value": "2018-04-20T04:01:48.717Z"
                        },
                        "setting": {
                            "value": "Hospital Montevideo",
                            "defining_code": {
                                "terminology_id": {
                                    "value": "openehr"
                                },
                                "code_string": 229
                            }
                        }
                    },
                    "content": {
                        "@xsi:type": "OBSERVATION",
                        "@archetype_node_id": "openEHR-EHR-OBSERVATION.test_all_datatypes.v1",
                        "name": {
                            "value": "Blood Pressure"
                        },
                        "language": {
                            "terminology_id": {
                                "value": "ISO_639-1"
                            },
                            "code_string": "es"
                        },
                        "encoding": {
                            "terminology_id": {
                                "value": "UNICODE"
                            },
                            "code_string": "UTF-8"
                        },
                        "subject": {
                            "@xsi:type": "PARTY_IDENTIFIED",
                            "external_ref": {
                                "id": {
                                    "@xsi:type": "HIER_OBJECT_ID",
                                    "value": "11111111-1111-1111-1111-111111111111"
                                },
                                "namespace": "DEMOGRAPHIC",
                                "type": "PERSON"
                            }
                        },
                        "data": {
                            "@xsi:type": "HISTORY",
                            "@archetype_node_id": "at0001",
                            "name": {
                                "value": "history"
                            },
                            "origin": {
                                "value": "2018-04-20T04:01:48.718Z"
                            },
                            "events": {
                                "@xsi:type": "POINT_EVENT",
                                "@archetype_node_id": "at0002",
                                "name": {
                                    "value": "any event"
                                },
                                "time": {
                                    "value": "2018-04-20T04:01:48.718Z"
                                },
                                "data": {
                                    "@xsi:type": "ITEM_TREE",
                                    "@archetype_node_id": "at0003",
                                    "name": {
                                        "value": "Arbol"
                                    },
                                    "items": {
                                        "@xsi:type": "ELEMENT",
                                        "@archetype_node_id": "at0011",
                                        "name": {
                                            "value": "Count"
                                        },
                                        "value": {
                                            "@xsi:type": "DV_COUNT",
                                            "magnitude": 3
                                        }
                                    }
                                }
                            }
                        }
                    }
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
        }
    ]


}),

    })
        .then(
            res=>{
                res.json().then(
                    data => {
                        console.log(data);
                    }
                ).catch(err=>console.log(err))
            }

        )
}

