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
    deleteTask(button.parentNode.id)
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

const editTask = (button) => {
    const notePrefix = "m_task_note_";
    const prioPrefix = "m_task_prio_";
    const task = {
        id: button.parentNode.parentNode.id,
        note: document.querySelector(`#${notePrefix}${button.parentNode.parentNode.id}`).value,
        prio: document.querySelector(`#${prioPrefix}${button.parentNode.parentNode.id}`).value,
    };
    putTask(task)
    .then(response => {
        updatePage();
    })
    .catch(error => alert(`ERROR ${error}`));
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
    const notePrefix = "m_task_note_";
    const prioPrefix = "m_task_prio_";
    const task = {
        id: button.parentNode.id,
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

const toggleEditForm = (button) => document.querySelector(`#edit_form_${button.parentNode.id}`).classList.toggle("save-form-show");

const toggleSaveForm = () => document.querySelector('#save_form').classList.toggle("save-form-show");

const sCurrentPrio = () => document.querySelector('#s_display_prio').innerHTML = document.querySelector("#task_prio").value;

const mCurrentPrio = (prio) => document.querySelector(`#m_display_prio_${prio.parentNode.parentNode.id}`).innerHTML = prio.value;
