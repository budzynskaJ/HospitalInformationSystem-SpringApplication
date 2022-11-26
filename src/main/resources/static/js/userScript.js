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

const dataUser = {
    firstnameu: document.getElementById("fnu").value,
    middlenameu: document.getElementById("middlenameu").value,
    surnameu: document.getElementById("surnameu").value,
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
}

function editUser() {
    $('#user-table tbody').on('click', '#editU', function () {
        var rowu = $(this).parents('tr')[0].firstChild.textContent;
        var firstu = $(this).parents('tr')[0].cells[1].textContent;
        var middleu = $(this).parents('tr')[0].cells[2].textContent;
        var suru = $(this).parents('tr')[0].cells[3].textContent;
        var user = $(this).parents('tr')[0].cells[4].textContent;
        var email = $(this).parents('tr')[0].cells[5].textContent;
        var role = $(this).parents('tr')[0].cells[6].textContent;

        $('#idu').val(rowu);
        $('#fnu').val(firstu);
        $('#middlenameu').val(middleu);
        $('#surnameu').val(suru);
        $('#username').val(user);
        $('#email').val(email);
        $('#role').val(role);

        jQuery.noConflict();
        jQuery('#editUser').modal('show');

        fetch("main_admin/users/" + rowu, {
            method: 'put',
            body: JSON.stringify(dataUser)
        }).then(
            res=>{
                res.json().then(
                    usersData => console.log(usersData)
                ).catch(err=>console.log(err))
            }
        )
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
                            "                            <a><button type=\"button\" data-toggle='modal' data-target='#editUser' id='editU' \n" +
                            "                              class=\"btn btn-rounded btn-sm btn-primary\" onclick='editUser()'>\n" +
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











