function getNumberOfUsers() {

    let number;
    let numberD = 0;
    let numberAdmins = 0;
    fetch("/admin/admin_users/users").then(
        res => {
            res.json().then(
                usersData => {
                    number = usersData.length.toString();
                    for(let i=0; i<usersData.length; i++){
                        if(usersData[i].role==="USER") {
                            numberD = numberD + 1;
                        } else if (usersData[i].role==="ADMIN"){
                            numberAdmins = numberAdmins + 1;
                        }
                    }
                    document.getElementById('numberOfAdmins').innerText = numberAdmins;
                    document.getElementById('numberOfD').innerText = numberD;
                })
        })

}
getNumberOfUsers();

function getNumberOfPatients() {

    let numberP = 0;
    fetch("/patients").then(
        res => {
            res.json().then(
                patientsData => {
                    for(let i = 0; i<patientsData.length; i++){
                        if(patientsData[i].status == 'active') {
                            numberP = numberP + 1;
                            document.getElementById("numberOfP").innerText = numberP;
                        }
                    }


                })
        })

}
getNumberOfPatients();

function getNumberOfAddresses() {
    let numberA;

    fetch("/admin/admin_addresses/addresses").then(
        res => {
            res.json().then(
                addressesData => {
                    numberA = addressesData.length.toString();
                    document.getElementById("numberOfA").innerText = numberA;
                }
            )
        }
    )
}
getNumberOfAddresses();