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

let token = "";
$(document).ready(function (){
    let email = "admin%40cabolabs.com";
    let password = "admin";
    let organization = "123456";
    let url = "http://localhost:8090/rest/v1/auth?" + "email=" + email +"&password=" + password + "&organization=" + organization;
    fetch(url, {
        method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/doctor/doctor_patients',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },

    })
        .then(res=>{
            res.json().then(
                res => {
                    token = res.token;
                }
            );

        }).catch(err => err);
})

let numberOfEHRs;
let EHRs = document.getElementById("numberOfEHRs");
setTimeout(function getEHR() {
    fetch("http://localhost:8090/rest/v1/ehrs", {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/doctor/doctor_patients',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        res.json().then(
            data => {
                console.log(data.ehrs.length);
                numberOfEHRs = (data.ehrs.length);
                if(numberOfEHRs == undefined) {
                    numberOfEHRs = 0;
                }
                EHRs.innerText = numberOfEHRs;
            }
        )
    })
}, 1000)

let contributions = document.getElementById("numberOfC");
setTimeout(function getContributions() {
    fetch("http://localhost:8090/mgt/v1/stats", {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/doctor/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        res.json().then(
            data => {
                contributions.innerText = data.total_contribution_count;

            }
        )
    })
}, 1100)
