/**function show() {
   $('#editPatient').on('click', function () {

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
    })



           jQuery.noConflict();
           jQuery('#editPatient').modal('show');

}**/
function editData() {
    var Patient_data = {
        Patient_ID: document.getElementById('idp').value,
        firstname: document.getElementById('fn').value,
        middlename: document.getElementById('middlename').value,
        surname: document.getElementById('surname').value,
        birth_date: document.getElementById('birthdate').value,
        pesel: document.getElementById('pesel').value,
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

};

function newData() {
    let newPatientData = {
        Patient_ID: document.getElementById("idp").value,
        firstname: document.getElementById('newfn').value,
        middlename: document.getElementById('newmiddlename').value,
        surname: document.getElementById('newsurname').value,
        birth_date: document.getElementById('newbirthdate').value,
        pesel: document.getElementById('newpesel').value,
        sex: document.getElementById('newsex').value,
        phone_number: document.getElementById('newphonenumber').value,
        //uid: document.getElementById('newuid').value,
    };

    return fetch("main_admin/patients/", {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(newPatientData),
    }).then(response => response.json().then(() => {

    }).catch(error => error));

};


fetch("main_admin/patients").then(
    res=>{
        res.json().then(
            patientsData=> {
                console.log(patientsData);
                displayPatient(patientsData);
            })

        async function displayPatient(patientsData) {
                if(patientsData.length > 0) {
                let temp = "";
                let numb = 1;
                patientsData.forEach((p) => {
                    temp += "<tr id=" + numb + " class='tabrow editing'>";
                    temp += "<td id = 'patient'>" + p.patient_ID + "</td>";
                    temp += "<td id='first'>" + p.firstname + "</td>";
                    temp += "<td id='middle'>" + p.middlename + "</td>";
                    temp += "<td id='sur'>" + p.surname + "</td>";
                    temp += "<td id='bd'>" + (p.birth_date).toString().split('T')[0]+ "</td>";
                    temp += "<td id='PESEL'>" + p.pesel + "</td>";
                    temp += "<td id='s'>" + p.sex + "</td>";
                    temp += "<td id='pn'>" + p.phone_number + "</td>"
                    temp += "<td id='UID'>" + p.uid + "</td>"
                    temp += "<td class=\"text-right\">\n" +
                        "                             <span type=\"button\" data-toggle='modal' data-target='#editPatient' id='edit' \n" +
                        "                               style='color: rgba(24,31,151,0.93); height: 35px; width: 35px' class=\"material-symbols-rounded\">\n" +
                        "                                   edit_square\n" +
                        "                              </span>\n" +
                        "                             <span type=\"button\" id='delete' style='color: #CE2020; height: 35px; width: 35px' class=\"material-symbols-rounded\">\n" +
                        "                                   delete\n" +
                        "                             </span>\n" +
                        "\n" +
                        "                        </td>";
                    temp += "</tr>";
                    numb = numb + 1;
                })

                    document.getElementById("patientsData").innerHTML = await temp;
                    var tableP = $(document).ready(function () {
                        $('#patient-table').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                {
                                    className: 'btn btn-success btn-sm btn-rounded',
                                    text: 'Add new',
                                    action: function ( e, dt, node, config ) {
                                        jQuery.noConflict();
                                        jQuery('#addPatient').modal('show');
                                    }
                                },
                            ]
                        });

                        $('#patient-table').on('click', '#delete', function (e) {
                            e.preventDefault();

                            $(this).closest('tr').remove();
                            fetch("main_admin/patient" + '/' + $(this).closest('tr')[0].firstChild.textContent, {
                                method: 'delete',

                            }).then(() => {
                            })
                        } );

                        $('#patient-table').on('click', '#edit', function (f) {
                            f.preventDefault();
                            var row = $(this).closest('tr');
                                var id = row[0].firstChild.textContent;
                                var firstname = row[0].cells[1].textContent;
                                var middlename = row[0].cells[2].textContent;
                                var surname = row[0].cells[3].textContent;
                                var birthdate = row[0].cells[4].textContent;
                                var pesel = row[0].cells[5].textContent;
                                var sex = row[0].cells[6].textContent;
                                var phonenumber = row[0].cells[7].textContent;
                                var uid = row[0].cells[8].textContent;

                            $('#idp').val(id);
                            $('#fn').val(firstname);
                            $('#middlename').val(middlename);
                            $('#surname').val(surname);
                            $('#birthdate').val(birthdate);
                            $('#pesel').val(pesel);
                            $('#sex').val(sex);
                            $('#phonenumber').val(phonenumber);
                            $('#uid').val(uid);

                                jQuery.noConflict();
                                jQuery('#editPatient').modal('show');

                        })
                    });

                }

            }

    });

