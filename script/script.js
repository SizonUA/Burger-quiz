document.addEventListener("DOMContentLoaded", () => {
  const btnOpenModal = document.getElementById("btnOpenModal"),
    modalBlock = document.getElementById("modalBlock"),
    closeModal = document.getElementById("closeModal"),
    questionTitle = document.getElementById("question"),
    formAnswers = document.getElementById("formAnswers"),
    burgerBtn = document.getElementById("burger"),
    prevModalBtn = document.getElementById("prev"),
    nextModalBtn = document.getElementById("next");

  const questions = [{
      question: "Какого цвета бургер?",
      answers: [{
          id: '1',
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          id: '2',
          title: 'Черный',
          url: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Из какого мяса котлета?",
      answers: [{
          id: '3',
          title: 'Курица',
          url: './image/chickenMeat.png'
        },
        {
          id: '5',
          title: 'Говядина',
          url: './image/beefMeat.png'
        },
        {
          id: '6',
          title: 'Свинина',
          url: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [{
          id: '7',
          title: 'Помидор',
          url: './image/tomato.png'
        },
        {
          id: '8',
          title: 'Огурец',
          url: './image/cucumber.png'
        },
        {
          id: '9',
          title: 'Салат',
          url: './image/salad.png'
        },
        {
          id: '10',
          title: 'Лук',
          url: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: "Добавить соус?",
      answers: [{
          id: '11',
          title: 'Чесночный',
          url: './image/sauce1.png'
        },
        {
          id: '12',
          title: 'Томатный',
          url: './image/sauce2.png'
        },
        {
          id: '13',
          title: 'Горчичный',
          url: './image/sauce3.png'
        }
      ],
      type: 'checkbox'
    }
  ];

  let clientWidth = document.documentElement.clientWidth;

  if (clientWidth < 768) {
    burgerBtn.style.display = "flex";
  } else {
    burgerBtn.style.display = "none";
  }

  window.addEventListener("resize", () => {
    clientWidth = document.documentElement.clientWidth;

    if (clientWidth < 768) {
      burgerBtn.style.display = "flex";
    } else {
      burgerBtn.style.display = "none";
    }
  });

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.add("active");
    modalBlock.classList.add("d-block");
    playTest();
  });
  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
    burgerBtn.classList.remove("active");
  });

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".modal-dialog") &&
      !event.target.closest(".openModalButton") &&
      !event.target.closest(".burger")
    ) {
      modalBlock.classList.remove("d-block");
      burgerBtn.classList.remove("active");
    }
  });

  const playTest = () => {
    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");

        answerItem.classList.add("answers-item", "d-flex", "flex-column");
        answerItem.innerHTML = `<input type='${questions[index].type}' id='${answer.id}' name='answer' class='d-none'>
        <label for='${answer.id}' class='d-flex flex-column justify-content-between'>
          <img class='answerImg' src='${answer.url}' alt='burger'>
          <span>${answer.title}</span>
        </label>`;
        formAnswers.appendChild(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = "";

      questionTitle.textContent = `${questions[indexQuestion].question}`;
      renderAnswers(indexQuestion);
    };

    renderQuestions(numberQuestion);
    nextModalBtn.onclick = () => {
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
    prevModalBtn.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };
  };
});
