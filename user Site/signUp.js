var signup = document.getElementById("signup");
var email = document.getElementById("email");
var password = document.getElementById("password");
var username = document.getElementById("name");

signup.addEventListener("click", async function () {
  console.log(email.value, password.value);

  var courseKey =
    courseList.options[courseList.selectedIndex].getAttribute("key");
  console.log(courseKey);
  console.log(courseList.value);

  await firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(async (result) => {
      console.log(result.user.uid); // database id
      if (result.user.uid) {
        var imageUrl = await uploadimage();

        await firebase.database().ref("user").child(result.user.uid).set({
          email: email.value,
          password: password.value,
          name: username.value,
          image: imageUrl,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          courseName: courseList.value,
          courseKey: courseKey,
        });
        alert("SignUp Successfully");
        setTimeout(() => {
          // window.location.href="login.html"
          window.location.replace("login.html");
        }, 2000);
      }
    })
    .catch((error) => {
      alert(error);
    });
});

async function uploadimage() {
  const fileInput = document.getElementById("imageUpload");
  const file = fileInput.files[0];

  var imageUrl = "";
  if (!file) {
    return alert("please select profile image");
  }
  const cloudName = "sgnp0trm";
  const uploadFolder = "storageQuizApp";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadFolder);
  // var loading = document.getElementById("loading")
  // var btn = document.getElementById("btn")
  // btn.style.display="none"
  // loading.style.display="inline"

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    console.log(data);
    alert("profile imaeg upload");
    // window.location.href=data.secure_url
    imageUrl = data.secure_url;
    return imageUrl;
  } catch (e) {
    alert("error", e);
  }
}

///////////////////////////////////

let getAlLCourses = async () => {
  await firebase
    .database()
    .ref("course")
    .get()
    .then((db) => {
      console.log(db.val()); //firebase data base human read form convert
      var arrList = Object.values(db.val()); //object to array
      console.log(arrList);
      for (var value of arrList) {
        console.log(value);
        courseList.innerHTML += `
            <option key=${value.coursekey}>${value.courseName}</option>
            `;
      }
      courseList.style.display = "inline";
    })

    .catch((err) => {
      console.log(err);
    });
};

getAlLCourses();
