let url = "main_admin/patient";
function deleteData() {
    $('#patient-table tbody').on('click', "#delete", function () {
        var row = $(this).parents('tr')[0].firstChild.textContent;
        alert("Are you sure you want to delete patient with ID: " + row);
        return fetch(url + '/' + row, {
            method: 'delete',

        }).then(() => {
            this.fetchData();
            //window.location.reload();
        })

    })

};
var data = {
    firstname: document.getElementById("fn").value,
    middlename: document.getElementById("middlename").value,
    surname: document.getElementById("surname").value,
    birthdate: document.getElementById("birthdate").value,
    PESEL: document.getElementById("pesel").value,
    sex : document.getElementById("sex").value,
    phonenumber: document.getElementById("phonenumber").value,
}
function editData() {
    $('#patient-table tbody').on('click', '#edit', function () {
        var row = $(this).parents('tr')[0].firstChild.textContent;
        var first = $(this).parents('tr')[0].cells[1].textContent;
        var middle = $(this).parents('tr')[0].cells[2].textContent;
        var sur = $(this).parents('tr')[0].cells[3].textContent;
        var bd = $(this).parents('tr')[0].cells[4].textContent;
        var PESEL = $(this).parents('tr')[0].cells[5].textContent;
        var s = $(this).parents('tr')[0].cells[6].textContent;
        var pn = $(this).parents('tr')[0].cells[7].textContent;
        var UID = $(this).parents('tr')[0].cells[8].textContent;

        $('#idp').val(row);
        $('#fn').val(first);
        $('#middlename').val(middle);
        $('#surname').val(sur);
        $('#birthdate').val(bd);
        $('#pesel').val(PESEL);
        $('#sex').val(s);
        $('#phonenumber').val(pn);
        $('#uid').val(UID);

        jQuery.noConflict();
        jQuery('#editPatient').modal('show');

    })

    $('#editPatient').on('click', '#savebtn', function () {
        var row1 = document.getElementById('patient-table').parents('tr')[0].firstChild.textContent;
        fetch("main_admin/patients/" + row1, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(
            res => {
                res.json().then(
                    patientData => console.log(patientData)
                ).catch(err => console.log(err))
            }
        )

    })


};


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
                            "                              class=\"btn btn-rounded btn-sm btn-primary\" onclick='editData()' '>\n" +
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
                    $(document).ready(function () {
                        $('#patient-table').DataTable();
                    });
                }

            }

    });

