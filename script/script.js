// Глобальный обработчик событий
document.addEventListener("DOMContentLoaded", () => {
  const btnOpenModal = document.getElementById("btnOpenModal"),
    modalBlock = document.getElementById("modalBlock"),
    closeModal = document.getElementById("closeModal"),
    questionTitle = document.getElementById("question"),
    formAnswers = document.getElementById("formAnswers"),
    burgerBtn = document.getElementById("burger"),
    nextModalBtn = document.getElementById("next"),
    prevModalBtn = document.getElementById("prev"),
    sendModalBtn = document.getElementById("send"),
    modalTitle = document.querySelector(".modal-title"),
    modalDialog = document.querySelector(".modal-dialog");

  //Массив обьектов Вопрос-ответ
  const questions = [
    {
      question: "Какого цвета бургер Вы хотите?",
      answers: [
        {
          id: "color_standart",
          title: "Стандартного",
          url: "./image/burger.png",
        },
        {
          id: "color_black",
          title: "Черного",
          url: "./image/burgerBlack.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Из какого мяса будет котлета?",
      answers: [
        {
          id: "meat_chicken",
          title: "Курица",
          url: "./image/chickenMeat.png",
        },
        {
          id: "meat_beef",
          title: "Говядина",
          url: "./image/beefMeat.png",
        },
        {
          id: "meat_pork",
          title: "Свинина",
          url: "./image/porkMeat.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Необходимы дополнительные ингредиенты?",
      answers: [
        {
          id: "ingredient_tomato",
          title: "Помидор",
          url: "./image/tomato.png",
        },
        {
          id: "ingredient_cucumber",
          title: "Огурец",
          url: "./image/cucumber.png",
        },
        {
          id: "ingredient_salad",
          title: "Салат",
          url: "./image/salad.png",
        },
        {
          id: "ingredient_onion",
          title: "Лук",
          url: "./image/onion.png",
        },
      ],
      type: "checkbox",
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          id: "sauce_garlicky",
          title: "Чесночный",
          url: "./image/sauce1.png",
        },
        {
          id: "sauce_tomato",
          title: "Томатный",
          url: "./image/sauce2.png",
        },
        {
          id: "sauce_mustard",
          title: "Горчичный",
          url: "./image/sauce3.png",
        },
      ],
      type: "checkbox",
    },
  ];

  let count = -100;
  modalDialog.style.top = count + "%";

  const animateModal = () => {
    modalDialog.style.top = count + "%";
    count += 3;
    if (count < 0) {
      requestAnimationFrame(animateModal);
    } else {
      count = -100;
    }
  };

  // Бургер меню
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

  // Обработчики событий, открытия.закрытия Модальго окна
  btnOpenModal.addEventListener("click", () => {
    requestAnimationFrame(animateModal);
    modalBlock.classList.add("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
    burgerBtn.classList.remove("active");
  });

  burgerBtn.addEventListener("click", () => {
    burgerBtn.classList.add("active");
    modalBlock.classList.add("d-block");
    playTest();
  });

  // Функция запуска сбора бургера
  const playTest = () => {
    const finalAnswers = [];
    const obj = {};
    let numberQuestion = 0;

    // Функция рендера ответов
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");

        answerItem.classList.add(
          "answers-item",
          "d-flex",
          "justify-content-center"
        );
        answerItem.innerHTML = `<input type='${questions[index].type}' id='${answer.id}' name='answer' class='d-none' value='${answer.title}'>
        <label for='${answer.id}' class='d-flex flex-column justify-content-between'>
          <img class='answerImg' src='${answer.url}' alt='burger'>
          <span>${answer.title}</span>
        </label>`;
        formAnswers.appendChild(answerItem);
      });
    };

    // Функция рендера вопросов
    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = "";

      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;
        renderAnswers(indexQuestion);
        nextModalBtn.classList.remove("d-none");
        prevModalBtn.classList.remove("d-none");
        sendModalBtn.classList.add("d-none");
      }

      if (numberQuestion === 0) {
        prevModalBtn.classList.add("d-none");
      }

      if (numberQuestion === questions.length) {
        nextModalBtn.classList.add("d-none");
        sendModalBtn.classList.remove("d-none");
        questionTitle.textContent =
          "Для начала приготовления Вам необходимо указать:";
        formAnswers.innerHTML = `
        <div class="form-group">
          <label for="phoneNumber">Ваше имя?</label>
          <input type="name" class="form-control" id="nameClient">
          <label for="phoneNumber">Номер телефона</label>
          <input type="phone" class="form-control" id="phoneNumber">
        </div>`;
      }

      if (numberQuestion === questions.length + 1) {
        modalTitle.textContent = "";
        questionTitle.textContent = "Ваш заказ принят";
        formAnswers.innerHTML = "Наш менеджер перезвонит в течении 1 минуты";

        for (let key in obj) {
          newObj = {};
          newObj[key] = obj[key];
          finalAnswers.push(newObj);
        }

        setTimeout(() => {
          modalBlock.classList.remove("d-block");
        }, 5000);
      }
    };

    // Кнопки Next и Prev
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const inputsName = [...formAnswers.elements].filter(
        (input) => input.checked || input.id === "nameClient"
      );
      inputsName.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }

        if (numberQuestion === questions.length) {
          obj[`Имя клиента`] = input.value;
        }
      });

      const inputsPhone = [...formAnswers.elements].filter(
        (input) => input.checked || input.id === "phoneNumber"
      );
      inputsPhone.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }

        if (numberQuestion === questions.length) {
          obj[`Номер телефона`] = input.value;
        }
      });
    };

    nextModalBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
    prevModalBtn.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };
    sendModalBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);

      console.log("finalAnswers: ", finalAnswers);
    };
  };
});
