fetch("/main_admin/users").then(
    res=>{
        res.json().then(
            usersData=>{
                console.log(usersData);
                if(usersData.length > 0){
                    var temp = "";

                    usersData.forEach((u)=>{
                        temp += "<tr>";
                        temp += "<td>" + u.id + "</td>";
                        temp += "<td>" + u.username + "</td>";
                        temp += "<td>" + u.email + "</td>";
                        temp += "<td>" + u.role + "</td>";
                        temp += "<td class=\"text-right\">\n" +
                            "                            <a><button type=\"button\"\n" +
                            "                              class=\"btn btn-rounded btn-sm btn-primary\">\n" +
                            "                                Edit\n" +
                            "                            </button></a>\n" +
                            "                            <a id='delete-post'><button type=\"button\" \n"+
                            "                                    class=\"btn btn-rounded btn-sm btn-danger\">\n" +
                            "                                Delete\n" +
                            "                            </button></a>\n" +
                            "\n" +
                            "                        </td>";
                        temp += "<tr>";
                    })
                    document.getElementById("usersData").innerHTML = temp;
                }
            }
        )
    });

const userlist = document.querySelector('#usersData');
userlist.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonPressed = e.target.id == 'delete-post';
    let ID = e.target.parentElement.userData.id;


    if(delButtonPressed) {
        fetch('/main_admin/users/${ID}', {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload())
    }
});





