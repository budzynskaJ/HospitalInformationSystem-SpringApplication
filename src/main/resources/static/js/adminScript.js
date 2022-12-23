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
                    document.getElementById('numberOfU').innerText = number;
                    document.getElementById('numberOfD').innerText = numberD;
                })
        })

}
getNumberOfUsers();

function getNumberOfPatients() {

    let numberP;
    fetch("/patients").then(
        res => {
            res.json().then(
                patientsData => {
                    numberP = patientsData.length.toString();
                    document.getElementById("numberOfP").innerText = numberP;
                })
        })

}
getNumberOfPatients();

function getNumberOfAddresses() {
    let numberA;

    fetch("/addresses").then(
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