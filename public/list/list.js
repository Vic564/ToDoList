//sätter konstanter för url och port
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

const saveTask = (button) => {
    const task = {
        note: document.querySelector("#task_note").value,
        prio: document.querySelector("#task_prio").value
    };
    console.log(task)
    console.log('testar console log')

    postTask(task)
    .then(response => {
        updatePage();
    })
    .catch(error => alert(`ERROR ${error}`));
}

//Funktion som skickar objektet till servern och resolvar eller rejectar beroende på om den hittar en matchning i db
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
    .then(response => {
        updatePage();
    })
    .catch(error => alert(`ERROR ${error}`));
}

const deleteTask = (taskid) => {
    return new Promise((resolve, reject) => {
        fetch(window.location.href, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({taskid: taskid})
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
    .then(response => {
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

const toggleEditForm = (button) => {
    const taskid = button.parentNode.parentNode.id.replace("task_", "");
    button.parentNode.parentNode.childNodes[1].childNodes[1].remove();
    button.parentNode.parentNode.childNodes[1].childNodes[2].remove();

    let inputPrio = document.createElement("input");
    inputPrio.id = "m_task_prio_" + taskid;
    inputPrio.setAttribute("type", "number");
    inputPrio.setAttribute("class", "task-prio-active");
    button.parentNode.parentNode.childNodes[1].insertBefore(inputPrio, button.parentNode.parentNode.childNodes[1].childNodes[1]);

    let inputTask = document.createElement("input");
    inputTask.id = "m_task_note_" + taskid;
    inputTask.setAttribute("type", "text");
    inputTask.setAttribute("class", "task-note-active");
    button.parentNode.parentNode.childNodes[1].insertBefore(inputTask, button.parentNode.parentNode.childNodes[1].childNodes[3]);

    let saveButton = document.createElement("button");
    saveButton.setAttribute("type", "button");
    saveButton.innerText = "SAVE";
    saveButton.addEventListener("click", () => {
        const task = {
            id: taskid,
            note: document.querySelector(`#${inputTask.id}`).value,
            prio: document.querySelector(`#${inputPrio.id}`).value
        };
        putTask(task)
        .then(response => {
            updatePage();
        })
        .catch(error => alert(`ERROR ${error}`));
    });
    button.parentNode.parentNode.appendChild(saveButton);
}

const editTask = (button) => {
    const notePrefix = "m_task_note_";
    const prioPrefix = "m_task_prio_";
    const taskid = button.parentNode.parentNode.id.replace("task_", "");
    const task = {
        id: button.parentNode.parentNode.id,
        note: document.querySelector(`#${notePrefix}${taskid}`).value,
        prio: document.querySelector(`#${prioPrefix}${taskid}`).value
    };
    putTask(task)
    .then(response => {
        updatePage();
    })
    .catch(error => alert(`ERROR ${error}`));
}

const toggleSaveForm = () => document.querySelector('#save_form').classList.toggle("save-form-show");
