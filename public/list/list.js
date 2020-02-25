const HOSTNAME = `localhost`;
const PORT = 8080;

const updatePage = (sort = "prio") => {
    let url = "";
    if (sort === "prio") {
        url = window.location.href;
    }
    else if (sort === "date") {
        url = window.location.href;
    }
    window.location.href = url;
}

const saveTask = () => {
    const task = {
        note: document.querySelector("#task_note").value,
        prio: document.querySelector("#task_prio").value
    };
    if (task.note.length > 0) {
        postTask(task)
        .then(() => {
            updatePage();
        })
        .catch(error => alert(`ERROR ${error}`));
    }
    else {
        alert("You have to write a task!");
    }
}

const postTask = (task) => {
    return new Promise((resolve, reject) => {
        fetch(window.location.href, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data => resolve(data))
                .catch(error => reject(error));
            }
            else {
                response.json()
                .then(data => reject(data.error))
                .catch(error => reject(error));
            }
        })
        .catch(error => console.log(error));
    });
}

const removeTask = (button) => {
    deleteTask(button.parentNode.parentNode.id.replace("task_", ""))
    .then(() => {
        updatePage();
    })
    .catch(error => alert(`ERROR ${error}`));
}

const deleteTask = (taskID) => {
    return new Promise((resolve, reject) => {
        fetch(window.location.href, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({taskID: taskID})
        })
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data => resolve(data))
                .catch(error => reject(error));
            }
            else {
                response.json()
                .then(data => reject(data.error))
                .catch(error => reject(error));
            }
        })
        .catch(error => console.log(error));
    });
}

const putTask = (task) => {
    return new Promise((resolve, reject) => {
        fetch(window.location.href, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data => resolve(data))
                .catch(error => reject(error));
            }
            else {
                response.json()
                .then(data => reject(data.error))
                .catch(error => reject(error));
            }
        })
        .catch(error => console.log(error));
    });
}

const completeTask = (button) => {
    const task = {
        id: button.parentNode.parentNode.id.replace("task_", "")
    };
    putStatus(task)
    .then(() => {
        updatePage();
    })
    .catch(error => alert(`ERROR ${error}`));
}

const putStatus = (task) => {
    return new Promise((resolve, reject) => {
        fetch(`${window.location.href}/status`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data => resolve(data))
                .catch(error => reject(error));
            }
            else {
                response.json()
                .then(data => reject(data.error))
                .catch(error => reject(error));
            }
        })
        .catch(error => console.log(error));
    });
}

const toggleOptions  = (taskHeading) => {
    taskHeading.parentNode.parentNode.childNodes[3].classList.toggle("options-visible");
    taskHeading.classList.toggle("task-heading-selected")
}

const createEditForm = (button) => {
    const taskID = button.parentNode.parentNode.id.replace("task_", "");
    button.parentNode.classList.toggle("options-visible");
    const taskObject = button.parentNode.parentNode;
    const current = getCurrentValues(taskObject);
    const setID = {
        prio: `edit_task_prio_${taskID}`,
        note: `edit_task_note_${taskID}`
    }
    removeCurrentText(taskObject);
    createInputPrio(setID.prio, current.prio, taskObject);
    createInputNote(setID.note, current.note, taskObject);
    createSaveButton(taskID, setID, taskObject);
    createCancelButton(taskObject);
}

const getCurrentValues = (taskObject) => {
    return {
        prio: taskObject.childNodes[1].childNodes[1].innerHTML,
        note: taskObject.childNodes[1].childNodes[3].innerHTML
    };
}

const removeCurrentText = (taskObject) => {
    taskObject.childNodes[1].childNodes[1].remove();
    taskObject.childNodes[1].childNodes[2].remove();
}

const createInputPrio = (setID, currentPrio, taskObject) => {
    let inputPrio = document.createElement("input");
    inputPrio.id = setID;
    inputPrio.setAttribute("type", "number");
    inputPrio.value = currentPrio;
    inputPrio.setAttribute("min", "1");
    inputPrio.setAttribute("max", document.querySelector("#task_prio").value - 1);
    inputPrio.setAttribute("class", "task-prio-active");
    taskObject.childNodes[1].insertBefore(inputPrio, taskObject.childNodes[1].childNodes[1]);
}

const createInputNote = (setID, currentNote, taskObject) => {
    let inputTask = document.createElement("input");
    inputTask.id = setID;
    inputTask.setAttribute("type", "text");
    inputTask.value = currentNote;
    inputTask.setAttribute("class", "task-note-active");
    taskObject.childNodes[1].insertBefore(inputTask, taskObject.childNodes[1].childNodes[3]);
}

const createSaveButton = (taskID, setID, taskObject) => {
    let saveButton = document.createElement("button");
    saveButton.setAttribute("type", "button");
    saveButton.innerText = "SAVE";
    saveButton.classList.add("text-green")
    saveButton.addEventListener("click", () => {
        const task = {
            id: taskID,
            note: document.querySelector(`#${setID.note}`).value,
            prio: document.querySelector(`#${setID.prio}`).value
        };
        if (task.note.length > 0) {
            putTask(task)
            .then(response => {
                updatePage();
            })
            .catch(error => alert(`ERROR ${error}`));
        }
        else {
            alert("You have to write a task!");
        }
    });
    taskObject.appendChild(saveButton);
}

const createCancelButton = (taskObject) => {
    let cancelButton = document.createElement("button");
    cancelButton.setAttribute("type", "button");
    cancelButton.innerText = "CANCEL";
    cancelButton.classList.add("text-red");
    cancelButton.addEventListener("click", () => updatePage());
    taskObject.appendChild(cancelButton);
}

const toggleSaveForm = (button) => {
    document.querySelector('#save_form').classList.toggle("save-form-show");
    button.classList.toggle("hidden");
}
