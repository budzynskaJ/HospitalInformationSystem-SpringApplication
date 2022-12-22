
function showUser() {
    $('.user-table').on('click', '#editU', function () {
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

};

async function editUser() {
    var User_data = {
        id: document.getElementById('idu').value,
        firstname: document.getElementById('fnu').value,
        middlename: document.getElementById('middlenameu').value,
        surname: document.getElementById('surnameu').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        address: {
            id: document.getElementById("addressidu").value,
            street: document.getElementById("streetu").value,
            house_number: document.getElementById("housenumberu").value,
            apartment_number: document.getElementById("apartmentnumberu").value,
            postcode: document.getElementById("postcodeu").value,
            city: document.getElementById("cityu").value,
            country: document.getElementById("countryu").value,
        }
    }


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
        res=>{
            res.json().then(

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
        password: document.getElementById('password').value,
        role: document.getElementById('newrole').value,
        address: {
            address_ID: document.getElementById('newaddressidu').value,
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
    }).then(response => response.json().then(() => {

    }).catch(error => error));

};

function getNumberOfUsers() {

    let number;
    let numberD = 0;
    fetch("/admin/admin_users/users").then(
        res => {
            res.json().then(
                usersData => {
                    number = usersData.length.toString();
                    for(let i=0; i<usersData.length; i++){
                        if(usersData[i].role==="USER") {
                            numberD = numberD + 1;
                        }
                    }
                    document.getElementById("numberOfU").innerText = number;
                    document.getElementById("numberOfD").innerText = numberD;
                })
        })

}
getNumberOfUsers();

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
                    temp += "<td>" + Object.values(u.address)[1] + " " + Object.values(u.address)[2] + "/" + Object.values(u.address)[3] + "\n" + Object.values(u.address)[4] + " " +
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
                        var result = confirm("Are you sure you want to delete this User?");//sprawdzić
                        if(result) {

                            $(this).closest('tr').remove();
                            fetch("/admin/admin_users/user" + '/' + $(this).closest('tr')[0].firstChild.textContent, {
                                method: 'delete',

                            }).then(() => {
                            })
                        }
                    } );
                });
            }
        }
    })










