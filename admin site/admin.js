

// async function createAdminFirst() {

//     await firebase.auth().createUserWithEmailAndPassword("burger-admin@admin.com", "admin1234")
//         .then(async (user) => {
//             await firebase.database().ref("admin").child(user.user.uid).set({
//                 name :"Admin",
//                 email :"burger-admin@admin.com",
//                 role:"admin",
//                 password :"admin1234",
//                 adminKey :user.user.uid
            
//             })
//             alert("admin create")
//     })
// }

// createAdminFirst()

async function login(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    await firebase.auth().signInWithEmailAndPassword(email,password)
    .then((snap)=>{
        console.log(snap.user.uid)
        localStorage.setItem("admin",true)
        localStorage.setItem("userid",snap.user.uid)

        window.location.href="./dashboard.html"
    })
    .catch((e)=>{
        console.log(e)
    })
}