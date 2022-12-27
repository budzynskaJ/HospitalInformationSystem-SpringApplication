function showAddress() {
    $('.address-table').on('click', '#editA', function () {
        var rowa = $(this).parents('tr')[0].firstChild.textContent;

        var street = $(this).parents('tr')[0].cells[1].textContent;
        var house_number = $(this).parents('tr')[0].cells[2].textContent;
        var apartment_number = $(this).parents('tr')[0].cells[3].textContent;
        var postcode = $(this).parents('tr')[0].cells[4].textContent;
        var city = $(this).parents('tr')[0].cells[5].textContent;
        var country = $(this).parents('tr')[0].cells[6].textContent;



        $('#addressidu').val(rowa);
        $('#streetu').val(street);
        $('#housenumberu').val(house_number);
        $('#apartmentnumberu').val(apartment_number);
        $('#postcodeu').val(postcode);
        $('#cityu').val(city);
        $('#countryu').val(country);


        jQuery.noConflict();
        jQuery('#editAddress').modal('show');

    })

};

async function editAddress() {
    var Address_data = {
        address_ID: document.getElementById("addressidu").value,
        street: document.getElementById("streetu").value,
        house_number: document.getElementById("housenumberu").value,
        apartment_number: document.getElementById("apartmentnumberu").value,
        postcode: document.getElementById("postcodeu").value,
        city: document.getElementById("cityu").value,
        country: document.getElementById("countryu").value,

    }


    Address_data = JSON.stringify(Address_data);

    const f = await fetch("/admin/admin_addresses/addresses/" + document.getElementById('addressidu').value, {
        method: 'put',
        credentials: 'include',
        headers: {
            'content-Type': 'application/json',
        },
        mode: 'cors',
        body: Address_data,
    }).then(
        res=>{
            res.json().then(

            ).catch(error=>console.log(error))
        }
    )
};

function newAddress() {
    let newAddressData = {
        address_ID: document.getElementById('newaddressidu').value,
        street: document.getElementById("newstreetu").value,
        house_number: document.getElementById("newhousenumberu").value,
        apartment_number: document.getElementById("newapartmentnumberu").value,
        postcode: document.getElementById("newpostcodeu").value,
        city: document.getElementById("newcityu").value,
        country: document.getElementById("newcountryu").value,
    }

    console.log(newAddressData);
    return fetch("/admin/admin_addresses/addaddress/", {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(newAddressData),
    }).then(response => {
        if(!response.ok) {
            throw new Error("This address already exists!")
        }
        return response.json();

    })
        .catch(error => {
          if(error.message == "This address already exists!") {
              Swal.fire({
                  title: 'This address already exists!',
                  icon: 'error',
                  showConfirmButton: false,
                  showCloseButton: false,
                  timer: 1500,
              })
              setTimeout(function(){
                  window.location.reload();
              }, 1600);
          } else {
              Swal.fire({
                  title: 'Address has been successfully added!',
                  icon: 'success',
                  showConfirmButton: false,
                  showCloseButton: false,
                  timer: 1500,
              })
              setTimeout(function(){
                  window.location.reload();
              }, 1600);
          }
        });

};

fetch("/admin/admin_addresses/addresses").then(
    res => {
        res.json().then(
            addressesData => {
                console.log(addressesData);
                displayAddress(addressesData);
            })

        async function displayAddress(addressesData) {
            if (addressesData.length > 0) {
                let temp = "";
                let numb = 1;
                await addressesData.forEach((a) => {
                    temp += "<tr id=" + numb + " class='tabrow editing'>";
                    temp += "<td id = 'address'>" + a.address_ID + "</td>";
                    temp += "<td>" + a.street + "</td>";
                    temp += "<td>" + a.house_number + "</td>";
                    temp += "<td>" + a.apartment_number + "</td>";
                    temp += "<td>" + a.postcode + "</td>";
                    temp += "<td>" + a.city + "</td>";
                    temp += "<td>" + a.country + "</td>";
                    temp += "<td class=\"text-right\" style='vertical-align: center'>\n" +
                        "                             <span type=\"button\" data-toggle='modal' data-target='#editAddress' id='editA' \n" +
                        "                               style='color: rgba(24,31,151,0.93); vertical-align: middle !important; font-size: 32px !important;' class=\"material-symbols-rounded\" onclick='showAddress()' title='Edit address'>\n" +
                        "                                   edit_square\n" +
                        "                              </span>\n" +
                        "                             <span type=\"button\" id='deleteA' style='color: #CE2020; vertical-align: middle !important; font-size: 33px !important;' class=\"material-symbols-rounded\" title='Delete address'>\n" +
                        "                                   delete\n" +
                        "                             </span>\n" +
                        "\n" +
                        "                        </td>";
                    temp += "</tr>";
                    numb = numb+1;
                })
                document.getElementById("addressesData").innerHTML = await temp;
                $(document).ready(function () {
                    $('.address-table').DataTable({
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                text: '<i class="fas fa-plus fa-2x" style="color: #228B22;"></i>',
                                className: 'bg-transparent border-0',
                                titleAttr: 'Add new address',
                                action: function ( e, dt, node, config ) {
                                    jQuery.noConflict();
                                    jQuery('#addAddress').modal('show');
                                }
                            }
                        ]
                    });
                    $('.address-table').on('click', '#deleteA', function (g) {
                        g.preventDefault();
                        Swal.fire({
                            title: 'Are you sure you want to delete this address?',
                            icon: 'warning',
                            showCloseButton: true,
                            showDenyButton: true,
                            confirmButtonText: "Yes",
                            denyButtonText: "No",
                            confirmButtonColor: "#2AB32A",
                            denyButtonColor: "#d33",
                            reverseButtons: true,
                        }).then((result) => {
                            if(result.isConfirmed) {
                                fetch("/admin/admin_addresses/address" + '/' + $(this).closest('tr')[0].firstChild.textContent, {
                                    method: 'delete',

                                }).then((response) => {
                                    if(response.ok) {
                                        Swal.fire({
                                            title: 'Address has been successfully deleted!',
                                            icon: 'success',
                                            showConfirmButton: false,
                                            showCloseButton: false,
                                            timer: 1500,
                                        })
                                        setTimeout(function(){
                                            window.location.reload();
                                        }, 1600);
                                    } else if (result.isDenied) {

                                    }
                                })
                            }
                        })

                    } );
                });
            }
        }
    })

