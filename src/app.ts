let Index: number = 0;
let questionsData: any[] = [];
let correctAnswers: number = 0;

async function fetchData(url: string): Promise<any[]> {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

async function main(): Promise<void> {
  questionsData = await fetchData(
    "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple"
  );
  console.log(questionsData);
  showQuestion(Index);
}

main();

function showQuestion(Index: number) {
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
    btnAnswer.addEventListener("click", () =>
      answers(answer, element.correct_answer)
    );
    container.appendChild(btnAnswer);
  });
}

function answers(selectedAnswer: string, correct_answer: string): void {
  if (selectedAnswer === correct_answer) {
    alert('risposta corretta"');
    correctAnswers++;
  } else {
    alert("risposta sbagliata!");
  }
  Index++;
  if (Index < questionsData.length) {
    showQuestion(Index);
  } else {
    alert("Quiz Terminato!");
  }
}
