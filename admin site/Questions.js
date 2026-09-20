let question = document.getElementById("question")
let option1 = document.getElementById("option1")
let option2 = document.getElementById("option2")
let option3 = document.getElementById("option3")
let option4 = document.getElementById("option4")
let answer = document.getElementById("answer")

var courseTable = document.getElementById("courseTable")



const AddNewQuestions = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const courseKey = urlParams.get('courseKey');
    console.log(courseKey)
    const quizKey = urlParams.get('quizKey');
    console.log(quizKey)
   var Questionkey = await firebase.database().ref(" Questions").child(quizKey).push().key

   var object = {
    courseKey:courseKey,
    quizKey:quizKey,
    Questionkey:Questionkey,
    question:question.value,
    option1:option1.value,
    option2:option2.value,
    option3:option3.value,
    option4:option4.value,
    answer:answer.value
   }
    await firebase.database().ref(" Questions").child(quizKey).child(Questionkey).set(object)
    alert("add new question ")
     const modalElement = document.getElementById('staticBackdrop');

    // 2. Get the active Bootstrap instance of that modal
    const modalInstance = bootstrap.Modal.getInstance(modalElement);

      if (modalInstance) {
        modalInstance.hide();
    }

    courseTableFunc()
}

const courseTableFunc=async()=>{
       courseTable.innerHTML=""

     const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const quizKey = urlParams.get('quizKey');
    console.log(quizKey)
    await firebase.database().ref(" Questions").child(quizKey).get().then((snap)=>{
        console.log(snap.val())
        var data = Object.values(snap.val())

        for(var i=0;i<data.length;i++){
            courseTable.innerHTML+=`
            
               <tr>
                            <td>${i+1}</td>
                            <td>${data[i]["question"]}</td>
                            <td>${data[i]["option1"]}</td>
                            <td>${data[i]["option2"]}</td>
                            <td>${data[i]["option3"]}</td>
                            <td>${data[i]["option4"]}</td>
                            <td>${data[i]["answer"]}</td>

                        </tr>
            `

        }
    })

}

courseTableFunc()