
function showUser() {
    $('.user-table').on('click', '#editU', function () {
        var rowu = $(this).parents('tr')[0].firstChild.textContent;

        var firstu = $(this).parents('tr')[0].cells[1].textContent;
        var middleu = $(this).parents('tr')[0].cells[2].textContent;
        var suru = $(this).parents('tr')[0].cells[3].textContent;
        var user = $(this).parents('tr')[0].cells[4].textContent;
        var email = $(this).parents('tr')[0].cells[5].textContent;
        var role = $(this).parents('tr')[0].cells[6].textContent;
        var address = $(this).parents('tr')[0].cells[7].textContent.toString();

        var addressID = address.split(' ').at(0);
        address = address.substring(address.indexOf(' ') + 1);

        $('#idu').val(rowu);
        $('#fnu').val(firstu);
        $('#middlenameu').val(middleu);
        $('#surnameu').val(suru);
        $('#username').val(user);
        $('#email').val(email);
        $('#role').val(role);
        $('#address').text(address);
        $('#addressID').text(addressID);


        jQuery.noConflict();
        jQuery('#editUser').modal('show');

    })

};

async function editUser() {
    if (document.getElementById("EditUserForm").reportValidity() == true) {
        var User_data = {
            id: document.getElementById('idu').value,
            firstname: document.getElementById('fnu').value,
            middlename: document.getElementById('middlenameu').value,
            surname: document.getElementById('surnameu').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            role: document.getElementById('role').value,
            address: {
                address_ID: null,
                street: document.getElementById("streetu").value,
                house_number: document.getElementById("housenumberu").value,
                apartment_number: document.getElementById("apartmentnumberu").value,
                postcode: document.getElementById("postcodeu").value,
                city: document.getElementById("cityu").value,
                country: document.getElementById("countryu").value,
            }
        }

        if (User_data.address.street === "" && User_data.address.house_number === "" &&
            User_data.address.apartment_number === "" && User_data.address.postcode === "" &&
            User_data.address.city === "" && User_data.address.country === "") {
            User_data.address.address_ID = document.getElementById('addressID').textContent;
        }
        console.log(User_data.address.address_ID);
        User_data = JSON.stringify(User_data);

        const f = await fetch("/admin/admin_users/users/" + document.getElementById('idu').value, {
            method: 'put',
            credentials: 'include',
            headers: {
                'content-Type': 'application/json',
            },
            mode: 'cors',
            body: User_data,
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

function newUser() {
    if (document.getElementById("UserForm").reportValidity() == true) {
        let newUSerData = {
            id: null,
            firstname: document.getElementById('newfnu').value,
            middlename: document.getElementById('newmiddlenameu').value,
            surname: document.getElementById('newsurnameu').value,
            username: document.getElementById('newusername').value,
            email: document.getElementById('newemail').value,
            password: document.getElementById('password').value,
            role: document.getElementById('newrole').value,
            address: {
                address_ID: null,
                street: document.getElementById("newstreetu").value,
                house_number: document.getElementById("newhousenumberu").value,
                apartment_number: document.getElementById("newapartmentnumberu").value,
                postcode: document.getElementById("newpostcodeu").value,
                city: document.getElementById("newcityu").value,
                country: document.getElementById("newcountryu").value,
            }
        }

        console.log(newUSerData);
        return fetch("/admin/admin_users/adduser", {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(newUSerData),
        }).then(response => {
            if (!response.ok) {
                throw new Error("User with this username already exists!");
            }
            return response.json();
        })
            .catch(error => {
                    if (error.message == "User with this username already exists!") {
                        Swal.fire({
                            title: 'User with this username already exists!',
                            html: "You cannot add user with this username",
                            icon: 'error',
                            showConfirmButton: false,
                            showCloseButton: false,
                            timer: 1500,
                        })
                        setTimeout(function () {
                            window.location.reload();
                        }, 1600);
                    } else {
                        Swal.fire({
                            title: 'User has been successfully added!',
                            icon: 'success',
                            showConfirmButton: false,
                            showCloseButton: false,
                            timer: 1500,
                        })
                        setTimeout(function () {
                            window.location.reload();
                        }, 1600);
                    }
                }
            );
    }

};

fetch("/admin/admin_users/users").then(
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
                    temp += "<td><span id='ad' style='display: none'>" + Object.values(u.address)[0] + "</span> " + Object.values(u.address)[1] + " " + Object.values(u.address)[2] + "/" + Object.values(u.address)[3] + "\n" + Object.values(u.address)[4] + " " +
                        Object.values(u.address)[5] + ", " + Object.values(u.address)[6] + "</td>";
                    temp += "<td class=\"text-right\" style='vertical-align: center'>\n" +
                        "                             <span type=\"button\" data-toggle='modal' data-target='#editUser' id='editU' \n" +
                        "                               style='color: rgba(24,31,151,0.93); vertical-align: middle !important; font-size: 32px !important;' class=\"material-symbols-rounded\" onclick='showUser()' title='Edit user'>\n" +
                        "                                   edit_square\n" +
                        "                              </span>\n" +
                        "                             <span type=\"button\" id='deleteU' style='color: #CE2020; vertical-align: middle !important; font-size: 33px !important;' class=\"material-symbols-rounded\" title='Delete user'>\n" +
                        "                                   delete\n" +
                        "                             </span>\n" +
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
                                text: '<i class="fas fa-plus fa-2x" style="color: #228B22;"></i>',
                                className: 'bg-transparent border-0',
                                titleAttr: 'Add new user',
                                action: function ( e, dt, node, config ) {
                                    jQuery.noConflict();
                                    jQuery('#addUser').modal('show');
                                }
                            }
                        ]
                    });
                    $('.user-table').on('click', '#deleteU', function (g) {
                        g.preventDefault();
                        Swal.fire({
                            title: 'Are you sure you want to delete this User?',
                            icon: 'warning',
                            showCloseButton: true,
                            showDenyButton: true,
                            confirmButtonText: "Yes",
                            denyButtonText: "No",
                            confirmButtonColor: "#2AB32A",
                            denyButtonColor: "#d33",
                            reverseButtons: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                fetch("/admin/admin_users/user" + '/' + $(this).closest('tr')[0].firstChild.textContent, {
                                    method: 'delete',

                                }).then(response => {
                                    if(response.ok) {
                                        Swal.fire({
                                            title: 'User has been successfully deleted!',
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
                            } else if (result.isDenied) {

                            }
                        })
                    } );
                });
            }
        }
    })










