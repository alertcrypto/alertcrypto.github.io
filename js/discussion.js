
firebase.initializeApp({
    apiKey: "AIzaSyAHFP7yrxLz9ZucBWIkAxk_Dpwjf607wCg",
    authDomain: "cryptoalert-ec64a.firebaseapp.com",
    projectId: "cryptoalert-ec64a"
  });
  
// Initialize Cloud Firestore through Firebase
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);
  
  const form = document.querySelector("form");
  const nickname = document.getElementById("nickname");
  const message = document.getElementById("message");
  const errorMessage = document.querySelector(".error-message");
  const closebtn = document.querySelector(".error-message .close");
  const dataArea = document.getElementById("load-data");
  
  form.addEventListener("submit", e => {
    e.preventDefault();
  
    if (nickname.value !== "" && message.value !== "") {
      db
        .collection("messages")
        .add({
          nickname: nickname.value,
          message: message.value,
          date: new Date()
        })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          // window.location.reload();
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      errorMessage.classList.remove("show");
      nickname.value = "";
      message.value = "";
    } else {
      errorMessage.classList.add("show");
    }
  });
  
  closebtn.addEventListener("click", () => {
    errorMessage.classList.remove("show");
  });
  
  // A function for formatting a date to DD Month YY - HH:mm
  formatDate = d => {
    // Months array to get the month in string format
    const months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    );
    // get the month
    const month = d.getMonth();
    // get the day
    const day = d.getDate();
    // get the year
    let year = d.getFullYear();
    // pull the last two digits of the year
    year = year.toString().substr(-2);
    // get the hours
    const hours = d.getHours();
    // get the minutes
    const minutes = ("0" + d.getMinutes()).slice(-2);
    //return the string "DD Month YY - HH:mm"
    return (
      day + " " + months[month] + " '" + year + " - " + hours + ":" + minutes
    );
  };
  
  db
    .collection("messages")
    .orderBy("date")
    .onSnapshot(querySnapshot => {
      let messages = [];
      querySnapshot.forEach(chat => {
        messages.push(chat.data());
      });
  
      if (messages.length !== 0) {
        dataArea.innerHTML = "";
      } else {
        dataArea.innerHTML = "<p>No messages</p>";
      }
  
      for (let i = 0; i < messages.length; i++) {
        const createdOn = new Date(messages[i].date.seconds * 1000);
        dataArea.innerHTML += `
                              <article>
                                  <div class="p-1 teal-blue box-shadow">
                                      <p>${messages[i].message}</p>
                                  </div>
                                  <div class="float-right">
                                      <span class="green-sheen p-05 small">
                                          ${messages[i].nickname}
                                      </span>
                                      <span class="cambridge-blue p-05 small">
                                          ${formatDate(createdOn)}
                                      </span>
                                  </div>
                              </article>
                          `;
      }
    });
  