var Username =""
async function getCurrentUser() {
    var username = document.getElementById("studentName")
    var studentEmail = document.getElementById("studentEmail")
    var stdImage = document.getElementById("stdImage")
    var userId = localStorage.getItem("loginUser")
   
    await firebase.database().ref("user").child(userId)
        .get()
        .then((db) => {
            console.log(db.val())
            Username= db.val()["name"]
            username.innerText += db.val()["name"]
            studentEmail.innerText=db.val()["email"]
            stdImage.src=db.val()["image"]

            new QRCode(document.getElementById("qrcode"),{
                text:db.val()["email"],
                width:75,
                heigth:75
            })
        })
}

function pdfDownload(){
    var card = document.getElementById("card")
    html2canvas(card,{
        scale:3,
        useCORS: true, 
    }).then((canva)=>{
        const image = canva.toDataURL("image/png")
        const {jsPDF} = window.jspdf;
        const pdf = new jsPDF()

        pdf.addImage(image,"PNG",50,50,100,61)
        pdf.save(`${Username}.pdf`)


    })
}
// a=>97
// A=>65

getCurrentUser()