let url = "main_admin/patient";
function deleteData() {
    $('#patient-table tbody').on('click', "#delete", function () {
        let row = $(this).parents('tr')[0].firstChild.textContent;
        //alert("Are you sure you want to delete patient with ID: " + row);
        return fetch(url + '/' + row, {
            method: 'delete',

        }).then(() => {
            window.location.reload();
        })

    })

};
function show() {
    jQuery($('#patient-table tbody').on('click', '#edit', function () {

        $('#idp').val($(this).parents('tr')[0].firstChild.textContent);
        $('#fn').val($(this).parents('tr')[0].cells[1].textContent);
        $('#middlename').val($(this).parents('tr')[0].cells[2].textContent);
        $('#surname').val($(this).parents('tr')[0].cells[3].textContent);
        $('#birthdate').val($(this).parents('tr')[0].cells[4].textContent);
        $('#pesel').val($(this).parents('tr')[0].cells[5].textContent);
        $('#sex').val($(this).parents('tr')[0].cells[6].textContent);
        $('#phonenumber').val($(this).parents('tr')[0].cells[7].textContent);
        $('#uid').val($(this).parents('tr')[0].cells[8].textContent);

        jQuery.noConflict();
        jQuery('#editPatient').modal('show');
    }))
}
function editData() {
    var formData = new FormData();

    var Patient_data = {
       // Patient_ID: document.getElementById('idp').value,
        firstname: document.getElementById('fn').value,
        middlename: document.getElementById('middlename').value,
        surname: document.getElementById('surname').value,
        birth_date: document.getElementById('birthdate').value,
        PESEL: document.getElementById('pesel').value,
        sex: document.getElementById('sex').value,
        phone_number: document.getElementById('phonenumber').value,
        uid: document.getElementById('uid').value,
    };
    console.log(Patient_data);


    return fetch("main_admin/patients/" + document.getElementById('idp').value, {
        method: 'put',
        credentials: 'include',
        headers:{
            'content-type': "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(Patient_data),
    }).then(response => response.json().then(() => {

    }).catch(error => error));

}

function newData() {
    const formNewData = new FormData();
    var neData = {
        Patient_ID: document.getElementById('idp').value,
        firstname: document.getElementById('fn').value,
        middlename: document.getElementById('middlename').value,
        surname: document.getElementById('surname').value,
        birth_date: document.getElementById('birthdate').value,
        PESEL: document.getElementById('pesel').value,
        sex: document.getElementById('sex').value,
        phone_number: document.getElementById('phonenumber').value,
        uid: document.getElementById('uid').value,
    }

   /** formNewData.append('Patient_ID', document.getElementById('newIDP').value);
    formNewData.append('firstname', document.getElementById('newfn').value);
    formNewData.append('middlename', document.getElementById('newmiddlename').value);
    formNewData.append('surname', document.getElementById('newsurname').value);
    formNewData.append('birth_date', document.getElementById('newbirthdate').value);
    formNewData.append('PESEL', document.getElementById('newpesel').value);
    formNewData.append('sex', document.getElementById('newsex').value);
    formNewData.append('phone_number', document.getElementById('newphonenumber').value);
    formNewData.append('uid', document.getElementById('newuid').value);**/


    return fetch("main_admin/patients/", {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(neData),
    }).then(response => response.json().then(() => {

    }).catch(error => error));
}


fetch("main_admin/patients").then(
    res=>{
        res.json().then(
            patientsData=> {
                console.log(patientsData);
                displayPatient(patientsData);
            })

        async function displayPatient(patientsData) {
                if(patientsData.length > 0){
                    let temp = "";
                    let numb = 1;
                    patientsData.forEach((p)=>{
                        temp += "<tr id="+numb+" class='tabrow editing'>";
                        temp += "<td id = 'patient'>" + p.patient_ID + "</td>";
                        temp += "<td id='first'>" + p.firstname + "</td>";
                        temp += "<td id='middle'>" + p.middlename + "</td>";
                        temp += "<td id='sur'>" + p.surname + "</td>";
                        temp += "<td id='bd'>" + (p.birth_date).toString().split('T')[0] + "</td>";
                        temp += "<td id='PESEL'>" + p.pesel + "</td>";
                        temp += "<td id='s'>" + p.sex + "</td>";
                        temp += "<td id='pn'>" + p.phone_number + "</td>"
                        temp += "<td id='UID'>" + p.uid + "</td>"
                        temp += "<td class=\"text-right\">\n" +
                            "                            <button type=\"button\" data-toggle='modal' data-target='#editPatient' id='edit' \n" +
                            "                              class=\"btn btn-rounded btn-sm btn-primary\" onclick='show()' '>\n" +
                            "                                Edit\n" +
                            "                            </button>\n" +
                            "                            <button type=\"button\" id='delete' onclick='deleteData()' \n" +
                            "                                    class=\"btn btn-rounded btn-sm btn-danger\">\n" +
                            "                                Delete\n" +
                            "                            </button>\n" +
                            "\n" +
                            "                        </td>";
                        temp += "</tr>";
                        numb = numb+1;
                    })
                    document.getElementById("patientsData").innerHTML = await temp;
                    var tableP = $(document).ready(function () {
                        $('#patient-table').DataTable({
                            dom: 'Bfrtip',
                            buttons: [{
                                text: 'Add new',
                                action: function ( e, dt, node, config ) {
                                    jQuery.noConflict();
                                    jQuery('#addPatient').modal('show');
                                }

                            }

                            ]
                        });
                    });

                }

            }

    });

