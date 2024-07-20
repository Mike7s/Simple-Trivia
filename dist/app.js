"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Index = 0;
let questionsData = [];
let correctAnswers = 0;
function fetchData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        const data = yield response.json();
        return data.results;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        questionsData = yield fetchData("https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple");
        console.log(questionsData);
        showQuestion(Index);
    });
}
main();
function showQuestion(Index) {
    const oldContainer = document.querySelector(".container");
    if (oldContainer) {
        oldContainer.remove();
    }
    const element = questionsData[Index];
    console.log(element);
    const container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);
    const anwersCorrect = document.createElement("p");
    anwersCorrect.textContent = "Correct answers:" + correctAnswers.toString();
    anwersCorrect.classList.add("answerCorrect");
    container.appendChild(anwersCorrect);
    const category = document.createElement("h2");
    category.textContent = element.category;
    category.classList.add("category");
    container.appendChild(category);
    const currentIndex = document.createElement("p");
    currentIndex.textContent = `Current index: ${Index} / ${questionsData.length}`;
    container.appendChild(currentIndex);
    const questions = document.createElement("p");
    questions.textContent = element.question;
    container.appendChild(questions);
    const Allanswer = [...element.incorrect_answers, element.correct_answer];
    console.log(Allanswer);
    Allanswer.forEach((answer) => {
        const btnAnswer = document.createElement("button");
        btnAnswer.textContent = answer;
        btnAnswer.classList.add("btnAnswers");
        btnAnswer.addEventListener("click", () => answers(answer, element.correct_answer));
        container.appendChild(btnAnswer);
    });
}
function answers(selectedAnswer, correct_answer) {
    if (selectedAnswer === correct_answer) {
        alert('risposta corretta"');
        correctAnswers++;
    }
    else {
        alert("risposta sbagliata!");
    }
    Index++;
    if (Index < questionsData.length) {
        showQuestion(Index);
    }
    else {
        alert("Quiz Terminato!");
    }
}
