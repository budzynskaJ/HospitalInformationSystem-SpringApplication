fetch("/main_admin/users").then(
    res=>{
        res.json().then(
            usersData=>{
                console.log(usersData);
                if(usersData.length > 0){
                    var temp = "";

                    usersData.forEach((u)=>{
                        temp += "<tr>";
                        temp += "<td>" + u.id + "</td>";
                        temp += "<td>" + u.username + "</td>";
                        temp += "<td>" + u.email + "</td>";
                        temp += "<td>" + u.role + "</td>";
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
                    document.getElementById("usersData").innerHTML = temp;
                }
            }
        )
    })


