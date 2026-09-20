let courses = document.getElementById("courses")
let quizName = document.getElementById("quizName")


const GETALLSUBJECT = async () => {
    await firebase.database().ref("course").get()
        .then((snap) => {
            console.log(snap.val())
            var listCourse = Object.values(snap.val())
            for (var i = 0; i < listCourse.length; i++) {
                courses.innerHTML += `
            <option key='${listCourse[i]["coursekey"]}'>${listCourse[i]["courseName"]}</option>
            `
            }

            console.log(listCourse)

        })
    getAllQuiz()
}

GETALLSUBJECT()


const addQuiz = async () => {
    console.log(courses.options[courses.selectedIndex].getAttribute('key'))
    console.log(courses.value)
    console.log(quizName.value)

    var quizKey = await firebase.database().ref("Quiz").push().key

    var quizObj = {
        coursesName: courses.value,
        quizName: quizName.value,
        quizKey: quizKey,
        coursekey: courses.options[courses.selectedIndex].getAttribute('key')
    }

    await firebase.database().ref("Quiz").child(quizKey).set(quizObj)
    alert("add new quiz")

}

const getAllQuiz = async () => {
    await firebase.database().ref("Quiz").get().then((db) => {
        console.log(db.val())

        let courseTable = document.getElementById("courseTable")

        var data = Object.values(db.val())

        for (var i = 0; i < data.length; i++) {
            courseTable.innerHTML += `
               <tr>
                            <td>${i+1}</td>
                            <td>${data[i]["coursesName"]}</td>
                            <td>${data[i]["quizName"]}</td>
                           <td><button ><a href='./Questions.html?courseKey=${data[i]['coursekey']}&quizKey=${data[i]['quizKey']}'>View</a></button></td>
                        </tr>
`
        }
    })

}