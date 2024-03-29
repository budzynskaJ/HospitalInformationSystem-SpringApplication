let token = "";
$(document).ready(function (){
    let email = "admin@cabolabs.com";
    let password = "admin";
    let organization = "123456";
    let url = "http://localhost:8090/rest/v1/auth?" + "email=" + email +"&password=" + password + "&organization=" + organization;
    fetch(url, {
        method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/main_admin',
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

function editData() {
    if(document.getElementById("EditPatientForm").reportValidity() == true) {
        var Patient_data = {
            Patient_ID: document.getElementById('idp').value,
            firstname: document.getElementById('fn').value,
            middlename: document.getElementById('middlename').value,
            surname: document.getElementById('surname').value,
            birth_date: document.getElementById('birthdate').value,
            pesel: document.getElementById('pesel').value,
            sex: document.querySelector("input[name=newsex]:checked").value,
            phone_number: document.getElementById('phonenumber').value,
            uid: document.getElementById('uid').value,
            status: "active",
            address: {
                address_ID: null,
                street: document.getElementById("street").value,
                house_number: document.getElementById("housenumber").value,
                apartment_number: document.getElementById("apartmentnumber").value,
                postcode: document.getElementById("postcode").value,
                city: document.getElementById("city").value,
                country: document.getElementById("country").value,
            }
        };

        if(Patient_data.address.street === "" && Patient_data.address.house_number ==="" &&
        Patient_data.address.apartment_number === "" && Patient_data.address.postcode === "" &&
        Patient_data.address.city === "" && Patient_data.address.country === "") {
            Patient_data.address.address_ID = document.getElementById('addressID').textContent;
        }


        return fetch("/patients/" + document.getElementById('idp').value, {
            method: 'put',
            credentials: 'include',
            headers:{
                'content-type': "application/json",
            },
            mode: 'cors',
            body: JSON.stringify(Patient_data),
        }).then(
            res => {
                if (res.ok) {
                    Swal.fire({
                        title: 'Data has been successfully updated!',
                        icon: 'success',
                        showConfirmButton: false,
                        showCloseButton: false,
                        timer: 1600,
                    })
                    setTimeout(function () {
                            window.location.reload();
                        },
                        1700);
                } else if (result.isDenied) {


                }
                res.json().then(

                ).catch(err => console.log(err))
            }
        )

    }
};

function uuid() {
    let uid = document.getElementById("newuid");
    var time = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var random = (time + Math.random()*16)%16|0;
        time = Math.floor(time/16);
        return(c=='x' ? random:(random&0x3|0x8)).toString(16);
    });
    uid.setAttribute("value", uuid);
    console.log(uid);
    return uid;
}

function createehruid() {
    let format = "json";
    let subjectUid = document.getElementById("newuid").value;
    var checkbox = document.getElementById("checkUID");
    if(checkbox.checked == true) {
        fetch('http://localhost:8090/rest/v1/ehrs?' + "format=" + format + "&subjectUid=" + subjectUid, {
            method: 'POST',
            headers: {
                'Origin': 'http://localhost:8070/main_admin',
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
            .then(
                res => {
                    res.json().then(
                        data => {
                            console.log(data);
                        }
                    ).catch(err => console.log(err))
                }
            )
    }
}


function newData() {
    if(document.getElementById("PatientForm").reportValidity() == true) {
        let newPatientData = {
            Patient_ID: null,
            firstname: document.getElementById('newfn').value,
            middlename: document.getElementById('newmiddlename').value,
            surname: document.getElementById('newsurname').value,
            birth_date: document.getElementById('newbirthdate').value,
            pesel: document.getElementById('newpesel').value,
            sex: document.querySelector("input[name=newsex]:checked").value,
            phone_number: document.getElementById('newphonenumber').value,
            uid: document.getElementById("newuid").value,
            status: 'active',
            address: {
                address_ID: null,
                street: document.getElementById("newstreet").value,
                house_number: document.getElementById("newhousenumber").value,
                apartment_number: document.getElementById("newapartmentnumber").value,
                postcode: document.getElementById("newpostcode").value,
                city: document.getElementById("newcity").value,
                country: document.getElementById("newcountry").value,
            }
        };


        newPatientData = JSON.stringify(newPatientData);
        console.log(newPatientData)


        return fetch("/patients/", {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: newPatientData
        }).then(response => {
            if(!response.ok) {
                throw new Error("This patient already exists!");
            }
            return response.json();
        }).catch(error => {
            if(error.message == "This patient already exists!") {
                Swal.fire({
                    title: 'This patient already exists!',
                    icon: 'error',
                    showConfirmButton: false,
                    showCloseButton: false,
                    timer: 1500,
                })
                setTimeout(function(){
                    window.location.reload();
                }, 1600);
            }else {
                Swal.fire({
                    title: 'Patient has been successfully added!',
                    icon: 'success',
                    showConfirmButton: false,
                    showCloseButton: false,
                    timer: 1500,
                })
                setTimeout(function(){
                    window.location.reload();
                }, 1600);
            }
        });
    }


};


fetch("/patients").then(
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
                    temp += "<td id = 'patient' >" + p.patient_ID + "</td>";
                    temp += "<td id='first'>" + p.firstname + "</td>";
                    temp += "<td id='middle'>" + p.middlename + "</td>";
                    temp += "<td id='sur'>" + p.surname + "</td>";
                    temp += "<td id='bd'>" + (p.birth_date).toString().split('T')[0]+ "</td>";
                    temp += "<td id='PESEL'>" + p.pesel + "</td>";
                    temp += "<td id='s'>" + p.sex + "</td>";
                    temp += "<td id='pn'>" + p.phone_number + "</td>";
                    temp += "<td><span id='ad' style='display: none'>" + Object.values(p.address)[0] + "</span> " + Object.values(p.address)[1] +
                        " " + Object.values(p.address)[2] + "/" + Object.values(p.address)[3] + "\n" + Object.values(p.address)[4] + " " +
                        Object.values(p.address)[5] + ", " + Object.values(p.address)[6] + "</td>";
                    temp += "<td id='UID'>" + p.uid + "</td>";
                    temp += "<td style='align-items: center; vertical-align: middle'><span name = 'status' id='status' style='color: white' " +
                        "class='badge badge-success rounded-pill'>"+ p.status + "</span></td>";
                    temp += "<td class=\"text-right\" style='vertical-align: middle'>\n" +
                        "                             <span type=\"button\" data-toggle='modal' data-target='#editPatient' id='edit' \n" +
                        "                               style='color: rgba(24,31,151,0.93); vertical-align: middle !important; font-size: 32px !important;' class=\"material-symbols-rounded\"; title='Edit patient'>\n" +
                        "                                   edit_square \n" +
                        "                              </span>\n" +
                        "                             <span type=\"button\" id='delete' style='color: #CE2020; vertical-align: middle !important; font-size: 33px !important;' class=\"material-symbols-rounded\"; title='Archive patient'>\n" +
                        "                                   archive \n" +
                        "                             </span>\n" +
                        "                        </td>";
                    temp += "</tr>";
                    numb = numb + 1;

                })

                    document.getElementById("patientsData").innerHTML = await temp;
                    $(document).ready(function () {
                        let tableP = $('.patient-table').DataTable({
                            pagingType: "simple_numbers",
                            dom: 'Bfrtip',
                            responsive: true,
                            columnDefs: [
                                {width: "57px", targets: 0},
                                {width: "113px", targets: 1},
                                {width: "113px", targets: 2},
                                {width: "120px", targets: 3},
                                {width: "115px", targets: 4},
                                {width: "128px", targets: 5},
                                {width: "65px", targets: 6},
                                {width: "113px", targets: 7},
                                {width: "140px", targets: 8},
                                {width: "200px", targets: 9},
                                {width: "87px", targets: 10},
                                {width: "98px", targets: 11},
                            ],
                            buttons: [
                                {
                                    text: '<i class="fas fa-plus fa-2x" style="display: flex; color: #228B22;"></i>',
                                    className: 'bg-transparent border-0',
                                    titleAttr: 'Add new patient',
                                    action: function (e, dt, node, config) {
                                        jQuery.noConflict();
                                        jQuery('#addPatient').modal('show');
                                        uuid();

                                    }
                                },
                            ],

                        });



                        $('.patient-table').on('click', '#delete', function (e) {
                            e.preventDefault();
                            Swal.fire({
                                title: 'Are you sure you want to change status of this Patient?',
                                icon: 'warning',
                                showCloseButton: true,
                                showDenyButton: true,
                                confirmButtonText: "Yes",
                                denyButtonText: "No",
                                confirmButtonColor: "#2AB32A",
                                denyButtonColor: "#d33",
                                reverseButtons: true,
                            }).then((result) => {
                                if(result.isConfirmed) {
                                    fetch("/patient" + '/' + $(this).closest('tr')[0].firstChild.textContent, {
                                        method: 'delete',

                                    }).then((response) => {
                                        if(response.ok) {
                                            Swal.fire({
                                                title: 'Patient status has been successfully changed!',
                                                icon: 'success',
                                                showConfirmButton: false,
                                                showCloseButton: false,
                                                timer: 1500,
                                            })
                                            setTimeout(function(){
                                                window.location.reload();
                                            }, 1600);

                                        }
                                    })
                                }
                            })

                        });


                        $('.patient-table').on('click', '#edit', function (f) {
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
                                var uid = row[0].cells[9].textContent;
                                var address = row[0].cells[8].textContent.toString();
                                var status = row[0].cells[10].textContent;

                                var addressID = address.split(' ').at(0);
                                address = address.substring(address.indexOf(' ') +1);

                            $('#idp').val(id);
                            $('#fn').val(firstname);
                            $('#middlename').val(middlename);
                            $('#surname').val(surname);
                            $('#birthdate').val(birthdate);
                            $('#pesel').val(pesel);
                            $('#sex').val(sex);
                            $('#phonenumber').val(phonenumber);
                            $('#uid').val(uid);
                            $('#address').text(address);
                            $('#addressID').text(addressID);

                            if(status == 'archived') {
                                Swal.fire({
                                    title: 'You cannot edit patient that is inactive!',
                                    icon: 'error',
                                    showConfirmButton: true,
                                    showCloseButton: true,
                                    confirmButtonColor: "rgb(25, 159, 239)",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        jQuery('#editPatient').modal('hide');

                                    } else {
                                        jQuery.noConflict();
                                        jQuery('#editPatient').modal('show');
                                    }
                                })

                            }
                        })
                    });

                }
                for (let i = 0; i < document.getElementsByName('status').length; i++) {
                    if (document.getElementsByName('status')[i].textContent == "archived") {
                        document.getElementsByName('status')[i].setAttribute('class', 'badge badge-danger rounded-pill');
                        for (let j = 0; j < document.getElementsByName('status')[i].parentNode.parentNode.childNodes.length; j++) {
                            document.getElementsByName('status')[i].parentNode.parentNode.childNodes[j].style.color = 'grey';
                        }
                    }
                }

            }

    });


