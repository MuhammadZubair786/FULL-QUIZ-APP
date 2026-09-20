var container = document.getElementById("container")
var TotalQuestion = document.getElementById("TotalQuestion")
var MainCard = document.getElementById("MainCard")
var result = document.getElementById("result")
var timer = document.getElementById("timer")

var QuizData = [];

function shuffleArray(array) {
    // Loop from the last element down to the second element
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements using destructuring assignment
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


async function getAllQuestions() {
    var quizkey = localStorage.getItem("quizKey")
    await firebase.database().ref(" Questions").child(quizkey)
        .get().then((snap) => {
            console.log(snap.val())
            var arr = Object.values(snap.val())
            QuizData = shuffleArray(arr)
            showQuizQuestion()
            console.log(QuizData)
        })
}


var index = 0;
var score = 0;
var correctAnswer = 0;

var min = 1
var second = 50000000;
var timer1 = setInterval(() => {
    if (second > 0) {
        second--;
    }
    else if (second == 0 && min != 0) {
        min = min - 1
        second = 5
        if (min == 0) {
            second = 0
        }


    }
    else if (second == 0 && min == 0) {

        clearInterval(timer1)

        MainCard.style.display = "none"
        MainCard.style.display = "none";
        result.style.display = "block";

        var percentage = ((score / QuizData.length) * 100).toFixed(0);

        result.innerHTML = `
    <h1>🎉 Quiz Result</h1>

    <div class="score">${percentage}%</div>

    <div class="box">
        <span>Total Questions</span>
        <strong>${QuizData.length}</strong>
    </div>

    <div class="box">
        <span>Correct Answers</span>
        <strong>${score}</strong>
    </div>

    <div class="box">
        <span>Wrong Answers</span>
        <strong>${QuizData.length - score}</strong>
    </div>

    <div class="box">
        <span>Your Percentage</span>
        <strong>${percentage}%</strong>
    </div>

    <button onclick="location.reload()">Try Again</button>
`;
    }
    timer.innerText = min + ":" + second

}, 1000)



// 15second







function showQuizQuestion() {
    TotalQuestion.innerText = `${(index + 1)} Question of ${QuizData.length}`

    console.log(score)
    container.innerHTML = ""

    var ul = document.createElement("ul")
    var h1 = document.createElement("h1")

    h1.innerText = (index + 1) + ")" + QuizData[index].question
    for (var i = 0; i < 4; i++) {

        var optionNumber = i + 1;
        var optionId = `option${optionNumber}`;

        var li = document.createElement("li")
        var inp = document.createElement("input")
        inp.type = "radio"
        console.log(QuizData[index])

        inp.setAttribute("id", optionId)
        inp.setAttribute("name", "Quiz")
        inp.setAttribute("value", QuizData[index][`option${optionNumber}`])
        var label = document.createElement("label")
        label.innerText = QuizData[index][`option${optionNumber}`]
        label.setAttribute("for", optionId)


        li.appendChild(inp);
        li.appendChild(label);
        ul.appendChild(li);




    }


    var div = document.createElement("div")
    div.setAttribute("id", "btn1")
    var button = document.createElement("button")
    button.disabled = true
    button.style.backgroundColor = "grey"


    if (QuizData.length - 1 == index) {
        button.innerText = "Submit"
        button.setAttribute("onclick", "submit()")


    }
    else {
        button.innerText = "Next"
        button.setAttribute("onclick", "ShowNext()")
    }
    div.appendChild(button)

    container.append(h1, ul, div)

    var input = document.getElementsByTagName("input")
    var btn1 = document.getElementById("btn1")

    for (var i = 0; i < input.length; i++) {
        console.log(input[i])
        input[i].addEventListener("change", function (e) {
            // console.log(e.target.checked)



            if (e.target.checked == true) {
                if (btn1.childNodes[0].disabled == true) {
                    btn1.childNodes[0].disabled = !btn1.childNodes[0].disabled
                    btn1.childNodes[0].style.backgroundColor = "blue"
                }
            }
            else {
                btn1.childNodes[0].disabled = !btn1.childNodes[0].disabled

                btn1.childNodes[0].style.backgroundColor = "grey"
            }


        })
    }




}


function ShowNext() {
    var liItems = container.childNodes[1].childNodes
    var check = false;
    for (var i = 0; i < liItems.length; i++) {

        if (liItems[i].childNodes[0].checked == true) {
            check = true
            if (QuizData[index].answer == liItems[i].childNodes[0].value) {
                score += 1;
            }
            break;
        }
    }

    if (check == true) {
        index = index + 1
        showQuizQuestion()
    }
    else {
        alert("bhai 1 select kar")
    }
}

async function submit() {

    var liItems = container.childNodes[1].childNodes
    var check = false;
    for (var i = 0; i < liItems.length; i++) {

        if (liItems[i].childNodes[0].checked == true) {
            check = true
            if (QuizData[index].answer == liItems[i].childNodes[0].value) {
                score += 1;
            }
            break;
        }
    }
    if (check == true) {
        MainCard.style.display = "none"
        MainCard.style.display = "none";
        result.style.display = "block";

        var percentage = ((score / QuizData.length) * 100).toFixed(0);

        result.innerHTML = `
    <h1>🎉 Quiz Result</h1>

    <div class="score">${percentage}%</div>

    <div class="box">
        <span>Total Questions</span>
        <strong>${QuizData.length}</strong>
    </div>

    <div class="box">
        <span>Correct Answers</span>
        <strong>${score}</strong>
    </div>

    <div class="box">
        <span>Wrong Answers</span>
        <strong>${QuizData.length - score}</strong>
    </div>

    <div class="box">
        <span>Your Percentage</span>
        <strong>${percentage}%</strong>
    </div>

    <button onclick="location.reload()">Try Again</button>
`;
        var quizkey = localStorage.getItem("quizKey")
        var loginUser = localStorage.getItem("loginUser")



        // 
        var resultObj = {
            quizkey: quizkey,
            loginUser: loginUser,
            score: percentage,

        }
        console.log(resultObj)
        var res = await firebase.database().ref("user").child(loginUser).child("Result").push(resultObj)

    }
    else {
        alert("bhai 1 select kar")
    }
}

// showQuizQuestion()




async function checkQuiz() {
    var quizkey = localStorage.getItem("quizKey")
    var loginUser = localStorage.getItem("loginUser")
    var percentage = 0;


    var startQuiz = true;
    var res = await firebase.database().ref("user").child(loginUser).child("Result")
        .get()
        .then((snap) => {
            console.log(snap.val())
               if(snap.val()==null){
                  getAllQuestions()
                  return


            }
            var object = Object.values(snap.val())
         

            console.log(object)
            for (var i = 0; i < object.length; i++) {
                if (object[i].quizkey == quizkey) {
                    console.log("true")
                    startQuiz = false;
                    percentage = object[i].score

                }
            }



        })
    if (startQuiz == true) {
        getAllQuestions()

    }
    else {
        MainCard.style.display = "none"
        MainCard.style.display = "none";
        result.style.display = "block";
        result.innerHTML = `
    <h1>🎉 Quiz Result</h1>

    <div class="score">${percentage}%</div>
`;
    }

}

checkQuiz()


