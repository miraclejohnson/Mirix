const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question");
const cardbutton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
let editBool = false;
const noCardsText = document.querySelector("[no-cards]")

//Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
   container.classList.add("hide");
   question.value = "";
   answer.value = "";
   addQuestionCard.classList.remove("hide");
});

//Hide Create flashcard
closeBtn.addEventListener(
    "click",
    (hideQuestion = () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
        editBool = false;
        submitQuestion();
    }
})
);

//Submit Question
cardbutton.addEventListener("click", (submitQuestion = () => {
    editBool = false;
    tempQuestion = question.value.trim();
    tempAnswer = answer.value.trim();
    if (!tempQuestion || !tempAnswer){
        errorMessage.classList.remove("hide");
    } else {
        container.classList.remove("hide");
        errorMessage.classList.add("hide");
        viewlist();
        question.value = "";
        answer.value = "";
    }
  })
);

//Card Generate
function viewlist() {
    noCardsText.remove()
    var listCard = document.getElementsByClassName("card-list-container");
    var div = document.createElement("div");
    div.classList.add("card");
    //Question
    div.innerHTML += `<p class="question-div">${question.value}</p>`;
    //Answer
    var displayAnswer = document.createElement("p");
    displayAnswer.classList.add("answer-div");
    displayAnswer.innerText = answer.value;

    //Link to show/hide answer
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "show-hide-btn");
    link.innerHTML = "Show/Hide";
    link.addEventListener("click", () => {
        displayAnswer.classList.toggle("hide");
    });

    div.appendChild(link);
    div.appendChild(displayAnswer);

    //Edit button
    let buttonsCon = document.createElement("div");
    buttonsCon.classList.add("buttons-con");
    var editButton = document.createElement("button");
    editButton.setAttribute("class","edit");
    editButton.innerHTML = `<i class='glyphicon glyphicon-edit'></i>`;
    editButton.addEventListener("click",()=>{
        editBool = true;
        modifyElement(editButton, true);
        addQuestionCard.classList.remove("hide");
    });
    buttonsCon.appendChild(editButton);
    disableButtons(false);
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class","delete");
    deleteButton.innerHTML = `<i class="glyphicon glyphicon-trash"></i>`;
    deleteButton.addEventListener("click",()=>{
        modifyElement(deleteButton);
    });
    buttonsCon.appendChild(deleteButton);
    div.appendChild(buttonsCon);
    listCard[0].appendChild(div);
    hideQuestion();
}

const modifyElement = (element, edit=false) => {
    let parentDiv = element.parentElement.parentElement
    let parentQuestion = parentDiv.querySelector(".question-div").innerText
    if (edit){
        let parentAns = parentDiv.querySelector(".answer-div").innerHTML
        answer.value = parentAns
        question.value = parentQuestion
        disableButtons(true)
    }
    parentDiv.remove()
}

function disableButtons(value) {
    let editButtons = document.getElementsByClassName("edit")
    Array.from(editButtons).forEach((element) => {
        element.disabled = value
    });
};