const btnModalOpen = document.querySelector(".btn-open__modal");
const modalScreen = document.querySelector(".modal__screen");
const btnModalClose = document.querySelector(".modal-btn__close");
const btnModalCancel = document.querySelector(".modal-btn__cancel");
const btnModalCreate = document.querySelector(".modal-btn__create");
const input = document.querySelector(".input");
const todosContainer = document.querySelector(".todos__container");
const btnChangeTheme = document.querySelector(".btn__theme-toggle");
const htmlTag = document.querySelector("html");
const btnAll = document.querySelector(".btn__all");
const dropdownList = document.querySelector(".dropdown__list");
const dropdownItems = document.querySelectorAll(".dropdown__item");
const btnAllText = document.querySelector(".btn__all-text");

let todos = [];
let theme = "dark";
/* close/open Handler */
const openModalScreen = () => {
  modalScreen.classList.remove("hidden");
};
const closeModalScreen = () => {
  modalScreen.classList.add("hidden");
  input.value = "";
};
/* addTodo Handler */
const addTodo = () => {
  const title = input.value.trim();
  const id = Data.now();
  const newTodo = {
    title,
    id,
    isComplete: false,
  };
  todos.push(newTodo);
  saveDataInToLocalStorage(todos);
  closeModalScreen();
  showTodos(todos);
  input.value = "";
};

/* localStorage handler */

const saveDataInToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const getDataFromLocalStorage = () => {
  const localTodo = JSON.parse(localStorage.getItem("todos"));
  if (localTodo) {
    todos = localTodo;
  }
  showTodos(todos);
  const localTheme = localStorage.getItem("theme");
  if (localTheme) {
    theme = localTheme;
  }
  setTheme();
};
/* showTodos handler */
const showTodos = (shownTodos) => {
  if (shownTodos.length) {
    todosContainer.innerHTML = "";
    shownTodos.forEach((todo) => {
      todosContainer.insertAdjacentHTML(
        "beforeend",
        `
          <article class="todo ${todo.isComplete ? "complete" : ""}">
            <div class="todo__data">
              <div class="todo-data__icon">
                <i class="fa-solid fa-square-check"></i>
              </div>

              <p class="todo__title">${todo.title}</p>
            </div>
            <div class="todo__buttons">
              <button class="btn-todo__complete" onclick="completeHandler(${todo.id})">تکمیل</button>
              <button class="btn-todo__delete" onclick="removeHandler(${todo.id})">حذف</button>
            </div>
          </article>
        `,
      );
    });
  } else {
    todosContainer.innerHTML = "";
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `
       <div class="box__text">
         <p>تودو یافت نشد...!</p>
       </div>
         
      `,
    );
  }
};
/* complete handler */
const completeHandler = (todoId) => {
  todos.find((todo) => {
    if (todo.id === todoId) {
      todo.isComplete = true;
      return true;
    }
  });
  saveDataInToLocalStorage(todos);
  showTodos(todos);
};
/* remove handler */
const removeHandler = (todoId) => {
  const removeTodo = todos.findIndex((todo) => {
    return todo.id === todoId;
  });
  if(remoceTodo===-1) return;
  todos.splice(removeTodo, 1);
  saveDataInToLocalStorage(todos);
  showTodos(todos);
};
/* changeTheme Handler */
const changeThemeHandler = () => {
  btnChangeTheme.innerHTML = "";
  if (theme === "dark") {
    theme = "light";
    localStorage.setItem("theme", "light");
    btnChangeTheme.innerHTML = ' <i class= "fa-solid fa-sun"></i>';
  } else {
    theme = "dark";
    localStorage.setItem("theme", "dark");
    btnChangeTheme.innerHTML = ' <i class= "fa-solid fa-moon"></i>';
  }
  setTheme();
};
const setTheme = () => {
  btnChangeTheme.innerHTML = "";
  if (theme === "dark") {
    btnChangeTheme.innerHTML = ' <i class= "fa-solid fa-sun"></i>';
    htmlTag.classList.remove("light");
    htmlTag.classList.add("dark");
  } else {
    btnChangeTheme.innerHTML = ' <i class= "fa-solid fa-moon"></i>';
    htmlTag.classList.remove("dark");
    htmlTag.classList.add("light");
  }
};
/* dropdownlist handler */
const openDropdownList = () => {
  dropdownList.classList.remove("hidden");
};

const todoStatusHandler = (event) => {
  const dataStatus = event.target.dataset.status;
  const dataStatusTitle = event.target.innerHTML;
  switch (dataStatus) {
    case "complete": {
      const todosCompleted = todos.filter((todo) => {
        return todo.isComplete === true;
      });
      btnAllText.innerHTML = dataStatusTitle;
      showTodos(todosCompleted);
      saveDataInToLocalStorage(todosCompleted);
      dropdownList.classList.add("hidden");
      break;
    }
    case "notcomplete": {
      const todosNotComplete = todos.filter((todo) => {
        return todo.isComplete === false;
      });
      btnAllText.innerHTML = dataStatusTitle;
      showTodos(todosNotComplete);
      dropdownList.classList.add("hidden");
      break;
    }
    default: {
      btnAllText.innerHTML = dataStatusTitle;
      showTodos(todos);
      dropdownList.classList.add("hidden");
    }
  }
};
dropdownItems.forEach((dropdownItem) => {
  dropdownItem.addEventListener("click", todoStatusHandler);
});
//>>>>>>>>>>>>>>>>>>>>>>//
btnModalOpen.addEventListener("click", openModalScreen);
btnModalClose.addEventListener("click", closeModalScreen);
btnModalCancel.addEventListener("click", closeModalScreen);
btnModalCreate.addEventListener("click", addTodo);
btnChangeTheme.addEventListener("click", changeThemeHandler);
btnAll.addEventListener("click", openDropdownList);
document.addEventListener("DOMContentLoaded", ()=>{ getDataFromLocalStorage();});
/*document.addEventListener("click", () => {
  dropdownList.classList.add("hidden");
});*/
