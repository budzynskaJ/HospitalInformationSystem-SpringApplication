function deleteUser() {
    $('#patient-table tbody').on('click', "#delete", function () {
        let row = $(this).parents('tr')[0].firstChild.textContent;
        alert("Are you sure you want to delete user with ID: " + row);
        return fetch('main_admin/user/' + row, {
            method: 'delete',

        }).then(() => {
            window.location.reload();
        })

    })

};

    fetch("/main_admin/users").then(
        res => {
            res.json().then(
                usersData => {
                    console.log(usersData);
                    displayUser(usersData);
                })

            async function displayUser(usersData) {
                if (usersData.length > 0) {
                    let temp = "";
                    let numb = 1;
                    await usersData.forEach((u) => {
                        temp += "<tr id=" + numb + " class='tabrow editing'>";
                        temp += "<td id = 'user'>" + u.id + "</td>";
                        temp += "<td>" + u.firstname + "</td>";
                        temp += "<td>" + u.middlename + "</td>";
                        temp += "<td>" + u.surname + "</td>";
                        temp += "<td>" + u.username + "</td>";
                        temp += "<td>" + u.email + "</td>";
                        temp += "<td>" + u.role + "</td>";
                        temp += "<td class=\"text-right\">\n" +
                            "                            <a><button type=\"button\"\n" +
                            "                              class=\"btn btn-rounded btn-sm btn-primary\">\n" +
                            "                                Edit\n" +
                            "                            </button></a>\n" +
                            "                            <a id='delete-post'><button type=\"button\" onclick='deleteUser()' \n" +
                            "                                    class=\"btn btn-rounded btn-sm btn-danger\">\n" +
                            "                                Delete\n" +
                            "                            </button></a>\n" +
                            "\n" +
                            "                        </td>";
                        temp += "</tr>";
                        numb = numb+1;
                    })
                    document.getElementById("usersData").innerHTML = await temp;
                    $(document).ready(function () {
                        $('.user-table').DataTable();
                    });
                }
            }
        })











