fetch("main_admin/patients").then(
    res=>{
        res.json().then(
            patientsData=>{
                console.log(patientsData);
                if(patientsData.length > 0){
                    var temp = "";

                    patientsData.forEach((p)=>{
                        temp += "<tr>";
                        temp += "<td>" + p.patient_ID + "</td>";
                        temp += "<td>" + p.firstname + "</td>";
                        temp += "<td>" + p.middlename + "</td>";
                        temp += "<td>" + p.surname + "</td>";
                        temp += "<td>" + p.birth_date + "</td>";
                        temp += "<td>" + p.pesel + "</td>";
                        temp += "<td>" + p.sex + "</td>";
                        temp += "<td>" + p.phone_number + "</td>"
                        temp += "<td class=\"text-right\">\n" +
                            "                            <button type=\"button\"\n" +
                            "                              class=\"btn btn-rounded btn-sm btn-primary\">\n" +
                            "                                Edit\n" +
                            "                            </button>\n" +
                            "                            <button type=\"button\"\n" +
                            "                                    class=\"btn btn-rounded btn-sm btn-danger\">\n" +
                            "                                Delete\n" +
                            "                            </button>\n" +
                            "\n" +
                            "                        </td>";
                        temp += "<tr>";
                    })
                    document.getElementById("patientsData").innerHTML = temp;
                }
            }
        )
    }
)

