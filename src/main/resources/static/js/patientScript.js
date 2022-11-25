let url = "main_admin/patient";
function deleteData() {
    $('#patient-table tbody').on('click', "#delete", function () {
        var row = $(this).parents('tr')[0].firstChild.textContent;
        alert("Are you sure you want to delete patient with ID: " + row);
        return fetch(url + '/' + row, {
            method: 'delete',

        }).then(() => {
            window.location.reload();
        })

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
                        temp += "<td>" + p.firstname + "</td>";
                        temp += "<td>" + p.middlename + "</td>";
                        temp += "<td>" + p.surname + "</td>";
                        temp += "<td>" + (p.birth_date).toString().split('T')[0] + "</td>";
                        temp += "<td>" + p.pesel + "</td>";
                        temp += "<td>" + p.sex + "</td>";
                        temp += "<td>" + p.phone_number + "</td>"
                        temp += "<td>" + p.uid + "</td>"
                        temp += "<td class=\"text-right\">\n" +
                            "                            <button type=\"button\" data-toggle='modal' data-target='#editPatient' id='edit' \n" +
                            "                              class=\"btn btn-rounded btn-sm btn-primary\" >\n" +
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

