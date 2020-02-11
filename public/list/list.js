//sätter konstanter för url och port
const HOSTNAME = `localhost`;
const PORT = 8080;

const saveTask = () => {
    const task = {
        note: document.querySelector("#task_note").value,
        prio: document.querySelector("#task_prio").value
    };
    console.log(task)

    postTask(task)
    .then(response => {
        updatePage();
    })
    .catch(error => alert(`ERROR ${error}`));
}

const updatePage = () => window.location.href = window.location.href;

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

const deleteTask = (taskid) => {
    return new Promise((resolve, reject) => {
        console.log(JSON.stringify(taskid));
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

const removeTask = (button) => {
    deleteTask(button.parentNode.id)
    .then(response => {
        updatePage();
    })
    .catch(error => alert(`ERROR ${error}`));
}

