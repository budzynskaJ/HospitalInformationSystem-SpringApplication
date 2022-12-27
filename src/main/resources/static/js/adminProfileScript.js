function showModal() {
    $('.card-body').on('click', '#editprofile', function () {
        let firstu = document.getElementById('myname').textContent;


        document.getElementById('#fnu');
        $('#middlenameu').val(middleu);
        $('#surnameu').val(suru);
        $('#username').val(user);
        $('#email').val(email);
        $('#role').val(role);
        $('#streetu').val(street);
        $('#housenumberu').val(house_number);

        jQuery.noConflict();
        jQuery('#editMe').modal('show');
    });



}

function password() {
    let nP1 = document.getElementById("newpass").value;
    let nP2 = document.getElementById("newpass2").value;
    if (nP1 !== nP2) {
        document.getElementById("message").innerHTML = "Passwords do not match! Please try again."

    }
    else if(nP1 === nP2) {
        let oldPass = document.getElementById("pass").value;
        let newPass = document.getElementById("newpass").value;

        let url = "/updatePassword" + "?oldPass=" + oldPass + "&newPass=" + newPass;

        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',

        })
            .then(
                res=> {
                    if (!res.ok) {
                        document.getElementById("message0").innerHTML = "Password does not match current user password!"
                    } else {
                        Swal.fire({
                            title: 'Password has been successfully changed!',
                            icon: 'success',
                            showConfirmButton: false,
                            showCloseButton: false,
                            timer: 1500,
                        })
                    }
                    return res.json();
                }).catch(err=> {
                console.log(err);
                }
            )
    }
}