let token = "";
$(document).ready(function (){
    let email = "admin%40cabolabs.com";
    let password = "admin";
    let organization = "123456";
    let url = "http://localhost:8090/rest/v1/auth?" + "email=" + email +"&password=" + password + "&organization=" + organization;
  fetch(url, {
      method: 'POST',
      headers: {
          'Origin': 'http://localhost:8070/main_doctor',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },

    })
      .then(res=>{
          res.json().then(
              res => {
                  token = res.token;
                  console.log(token);
              }
          );

    }).catch(err => err);
})
let gynecologist_uid = "";
setTimeout(function () {
    fetch('http://localhost:8090/rest/v1/templates', {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(
        res=> {
            res.json().then(
                data => {
                    gynecologist_uid = data.templates[3].uid;

                }
            ).catch(err => console.log(err))
        }
    )

}, 1000);

setTimeout(function () {
    fetch('http://localhost:8090/rest/v1/templates/' + gynecologist_uid, {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }).then(
    res=> {
        res.json().then(
            data => {
                console.log(data)
            }
        ).catch(err => console.log(err))
    }
)
}, 1500);


function newEHR() {
    let format = "json";
    let subjectUid = document.getElementById("uid").value;
    return fetch('http://localhost:8090/rest/v1/ehrs?' + "format=" + format + "&subjectUid=" + subjectUid, {

    method: 'POST',
        headers: {
            'Origin': 'http://localhost:8070/main_doctor',
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then(
            res=>{
                res.json().then(
                    data => {
                        console.log(data);
                    }
                ).catch(err=>console.log(err))
            }


    )
}
