//Local storage
    //set item 
    //get item
    //remove item
    //clear
    //key

    //info 
    //no expiration time
    //http and https
    //private tab
    let arrayOfTasks = [];

    if(localStorage.getItem("tasks")) {
        arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    else
    {
        document.querySelector(".task-item-zero").classList.replace("d-none" , "d-block");
    }

    generateTasks();


    document.getElementById("task-title").onkeyup = () => {

        if(document.getElementById("task-title").value === "")
        {
            document.forms[0].addTask.classList.add("disabled");
        }
        else {
            document.forms[0].addTask.classList.remove("disabled");
        }
    }


    document.forms[0].addTask.addEventListener("click" , () => { 
        console.log(Number.MAX_SAFE_INTEGER) ;     
        //create object of task
        let obj = {id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) , title: document.getElementById("task-title").value};
        //add object to array
        arrayOfTasks.unshift(obj);
        //save at local storage
        localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks));
        //empty task title and add class disabled
        document.getElementById("task-title").value = "";
        document.forms[0].addTask.classList.add("disabled");
        //empty task list to avoid duplicate tasks
        document.getElementById("tasks-list").innerHTML = "";
        //call function to generate tasks
        generateTasks();
    });

    //generate tasks in html
    function generateTasks() {
        arrayOfTasks.forEach((task) => {
            let taskItem = document.createElement("div");
            let taskTitleSpan = document.createElement("span");
            let taskTitleText = document.createTextNode(task.title);
            let deleteBtn = document.createElement("button");

            //style 
            taskItem.classList.add("task-item");
            taskItem.setAttribute("data-id" , task.id);
            deleteBtn.classList.add("btn" , "btn-danger" , "btn-sm" , "delete-task");
            deleteBtn.innerHTML = "delete";
            //append
            taskTitleSpan.appendChild(taskTitleText);
            taskItem.appendChild(taskTitleSpan);
            taskItem.appendChild(deleteBtn);
            document.getElementById("tasks-list").appendChild(taskItem);
            });

        }

    //delete task 
    document.querySelectorAll(".delete-task").forEach((deleteBtn) => {
        deleteBtn.addEventListener("click" , () => {
            arrayOfTasks.forEach((task) => {
                if(task.id === parseFloat(deleteBtn.parentElement.getAttribute("data-id"))) 
                {
                    arrayOfTasks.splice(arrayOfTasks.indexOf(task) , 1); //delete index
                    //save changes in localStorage
                    localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks));
                    //empty task list to avoid duplicate tasks
                    deleteBtn.parentElement.remove();
                    //check array length 
                    if(arrayOfTasks.length === 0) {
                        document.querySelector(".task-item-zero").classList.replace("d-none" , "d-block");
                        localStorage.removeItem("tasks");
                    }
                }
            })
        });
    })
