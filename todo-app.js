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

  
  function buttonsWriper(todoItem, title){
    todoItem.doneButton.addEventListener("click", function () {
      var parent = this.closest(".list-group-item");
      for (let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        arr = itemLocal;
        if (key == title) {
          itemLocal = JSON.parse(localStorage.getItem(key));
          for (let n = 0; n < itemLocal.length; n++){

            if (parent.children[0].outerText == itemLocal[n].todoValue){

              if (!itemLocal[n].todoItemDone) {
              itemLocal[n].todoItemDone = true;
              parent.classList.toggle("list-group-item-success");
  
              } else {
                itemLocal[n].todoItemDone = false;
                parent.classList.toggle("list-group-item-success");
              }
            }
            todoItem = createTodoItem(itemLocal[n].todoValue, itemLocal[n].todoItemDone);
            localStorage.setItem(title, JSON.stringify(itemLocal));
        }
    }
  }
  })
  todoItem.deleteButton.addEventListener("click", function () {
    var parent = this.closest(".list-group-item");
    if (confirm("Вы уверены?")) {
      parent.remove();
      for (let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        arr = itemLocal;
        if (key == title) {
          itemLocal = JSON.parse(localStorage.getItem(key));
          for (let n = 0; n < itemLocal.length; n++){
            //todoList.append(todoItem.item);

            if (parent.children[0].outerText == itemLocal[n].todoValue){
              arr.splice(n, 1);
              todoItem = createTodoItem(itemLocal[n].todoValue, itemLocal[n].todoItemDone);
            localStorage.setItem(title, JSON.stringify(arr));

            }
            
        }
    }
      
    }
}});
}

  function createTodoItem(name, done = false,arr) {
    let item = document.createElement("li");
    let p = document.createElement("p");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    p.classList.add("mb-0", "pPrime");
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-item-center"
    );
    p.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn-group", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(p);
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
    nameStorage(todoList, title);

    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      localStorageKey = todoItemForm.input.value;
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value, todoItemForm.done);
      buttonsWriper(todoItem, title);

      todoList.append(todoItem.item);
      let todoItemDone = todoItem.done;
      todoValue = todoItemForm.input.value;
      todoItemForm.input.value = "";
      todoItemForm.button.classList.add("disabled");
      todoItemForm.button.disabled = true;


      arr.push({todoValue,todoItemDone})

      localStorage.setItem(title ,JSON.stringify(arr));
    });

    function nameStorage(todoList, title) { 
      for (let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        if (key == title) {
          itemLocal = JSON.parse(localStorage.getItem(key));
          for (let n = 0; n < itemLocal.length; n++){
            todoItem = createTodoItem(itemLocal[n].todoValue, itemLocal[n].todoItemDone);
            todoList.append(todoItem.item);

            if (JSON.parse(itemLocal[n].todoItemDone)) {
              todoItem.item.classList.toggle("list-group-item-success");
            }
            buttonsWriper(todoItem, title);
          }
        }

      }
    }
  }
  window.createTodoApp = createTodoApp;
})();
