function password() {
    let nP1 = document.getElementById("newpass").value;
    let nP2 = document.getElementById("newpass2").value;
    if(nP1 === nP2) {
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
                res=>{
                    res.json().then(

                    ).catch(err=>console.log(err))
                }
            )
    }
}