(function () {
  //создаём и возвращаем заголовок приложения
  function createAppTitile(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }
  //создаём и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWriper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWriper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary", "disabled");
    button.textContent = "Добавить дело";

    input.id = "inputPrime";
    button.id = "buttonPrime";
    button.disabled = true;

    buttonWriper.append(button);
    form.append(input);
    form.append(buttonWriper);

    disableBtn(button, input);

    return {
      form,
      input,
      button,
    };
  }
  //создаём и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name, done = false) {
    debugger
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-item-center"
    );
    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn-group", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
      done,
    };

  }

  function disableBtn(button, input) {
    button.disabled = true;

    input.addEventListener("input", (e) => {
      e.preventDefault();
      if (!input.value.trim()) {
        button.classList.toggle("disabled");
        button.disabled = true;
      } else {
        button.classList.remove("disabled");
        button.disabled = false;
      }
    });
  }

  function createTodoApp(container, title = "Список дел") {
    let todoAppTitle = createAppTitile(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);


    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      localStorageKey = todoItemForm.input.value;
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value, todoItemForm.done);

      todoItem.doneButton.addEventListener("click", function () {
        if (!todoItem.done) {
          let t = todoItem.item.parentNode[this];
          todoItem.done = true;
          let saveLocal = localStorage.setItem(localStorageKey, todoItem.done);
        } else {
          todoItem.done = false;
          let saveLocal = localStorage.setItem(localStorageKey, todoItem.done);
        }
        debugger
        todoItem.item.classList.toggle("list-group-item-success");

      });

      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          debugger
          
          localStorage.removeItem();
        }
      });

      todoList.append(todoItem.item);

      todoItemForm.input.value = "";
      todoItemForm.button.classList.add("disabled");
      todoItemForm.button.disabled = true;

      localStorage.setItem(localStorageKey, todoItem.done);
    });

    function nameStorage(){
      for(let i = 0; i < localStorage.length; i++) {
        let todoList = createTodoList();
        let todoItem = createTodoItem(todoItemForm.input.value, todoItemForm.done);
        container.append(todoList);
        let key = localStorage.key(i);
        keyLocal = key;
        itemLocal = localStorage.getItem(key);
        todoList.append(createTodoItem(keyLocal, JSON.parse(itemLocal)));
        debugger
      }
    }

    nameStorage();
  }
  window.createTodoApp = createTodoApp;
})();
