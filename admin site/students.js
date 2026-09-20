var users = document.getElementById("users")

var loading = document.getElementById("loading")
var maintable = document.getElementById("maintable")


async function GetAllUsers() {

    await firebase.database().ref("user").get().then((db) => {
        console.log(db.val()) //convert read form 
        maintable.classList.remove("hide")
        // loading.classList.add("hide")
        // loading.classList.remove("show")
        loading.style.display="none"
        if (db.val() == null) {
            users.innerHTML = "<td colspan='5' style='text-align:center'><h1>No user found</h1></td>"
            return
        }
        var data = Object.values(db.val()) //data convert array
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]["name"])

            if (data[i]["image"] == undefined || data[i]["image"] == "") {
                users.innerHTML += `
         <tr>
         <td>${i + 1}</td>
                            <td>${data[i]["name"]}</td>
                            <td>${data[i].email}</td>
                            <td>
                          No image</td>
                            <td>
                                <span class="status">Active</span>
                            </td>
                        </tr>
        `
            }

            else {
                users.innerHTML += `
         <tr>
         <td>${i + 1}</td>
                            <td>${data[i]["name"]}</td>
                            <td>${data[i].email}</td>
                            <td>
                          <img src='${data[i]["image"]}' /></td>
                            <td>
                                <span class="status">Active</span>
                            </td>
                        </tr>
        `
            }

        }


        // totalStd.innerText=data.length
    })
        .catch((e) => {
            console.log(e)
        })

}

GetAllUsers()