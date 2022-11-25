
fetch('https://localhost:8090/rest/v1/templates/3dd0bf1b-7a06-4f76-904e-3a01bc50535e', {
    //mode: 'cors',
    //credentials: 'include',
    method: 'GET',
    headers: {
        accept: 'application/xml',
        'Content-Type': 'application/xml',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp1bnp1b212b2lxaWJlcmRuZHhzbHVvZ2tiemFnZmtrZ3VudGRkeGpmb2Vjc2d1bXFtQGFwaWtleS5jb20iLCJleHRyYWRhdGEiOnsic2NvcGUiOiJzeW5jIn0sImlzc3VlZF9hdCI6IjIwMjItMTEtMjRUMTA6MDA6MjguNzY5WiIsImV4cGlyZXNfYXQiOiIyMDIyLTExLTI1VDEwOjAwOjI5LjM4NFoifQ.2UFQjuwh5t-foUEyokFAcX6qPITezUI7yKG9bry0OKI'}

})
        .then(
            res=> {
                res.json().then(
                    data=>{
                        console.log(data);
                    }
                )

        })
