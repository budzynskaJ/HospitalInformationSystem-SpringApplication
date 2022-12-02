function showUser() {
    $('#usersData').on('click', '#editU', function () {
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

    })

}

function editUser() {
    const formUserData = new FormData();
    formUserData.append('id', document.getElementById('idu').value);
    formUserData.append('firstname', document.getElementById('fnu').value);
    formUserData.append('middlename', document.getElementById('middlenameu').value);
    formUserData.append('surname', document.getElementById('surnameu').value);
    formUserData.append('username', document.getElementById('user').value);
    formUserData.append('email', document.getElementById('email').value);
    formUserData.append('role', document.getElementById('role').value);

    return fetch("main_admin/users/" + formUserData.get('id'), {
            method: 'put',
            credentials: 'include',
            headers: {
                //'Content-Type': 'multipart/form-data'
            },
            body: formUserData,
        }).then(
            res=>{
                res.json().then(
                    usersData => console.log(usersData)
                ).catch(err=>console.log(err))
            }
        )
};

function newUser() {
    let newUSerData = {
        id: document.getElementById('newidu').value,
        firstname: document.getElementById('newfnu').value,
        middlename: document.getElementById('newmiddlenameu').value,
        surname: document.getElementById('newsurnameu').value,
        username: document.getElementById('newusername').value,
        email: document.getElementById('newemail').value,
        role: document.getElementById('newrole').value,
    }

    return fetch("main_admin/users/" + newUSerData.id, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(newUSerData),
    }).then(response => response.json().then(() => {

    }).catch(error => error));

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
                            "                              class=\"btn btn-rounded btn-sm btn-primary\" onclick='showUser()' >\n" +
                            "                                Edit\n" +
                            "                            </button></a>\n" +
                            "                            <a id='delete-post'><button type=\"button\" onclick='deleteUser()' id='deleteU' \n" +
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
                        $('.user-table').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                {
                                    text: 'Add new',
                                    action: function ( e, dt, node, config ) {
                                        jQuery.noConflict();
                                        jQuery('#addUser').modal('show');
                                    }
                                }
                            ]
                        });
                        $('#user-table').on('click', '#deleteU', function (e) {
                            e.preventDefault();
                            alert("Are you sure you want to delete user with ID: " + row); //sprawdzić
                            $(this).closest('tr').remove();
                            fetch("main_admin/user" + '/' + $(this).closest('tr')[0].firstChild.textContent, {
                                method: 'delete',

                            }).then(() => {
                            })
                        } );
                    });
                }
            }
        })











