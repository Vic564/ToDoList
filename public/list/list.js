//sätter konstanter för url och port
const HOSTNAME = `localhost`;
const PORT = 8080;

window.onload = () => {
    //Sätter en listener på "login-knappen" som skapar ett objekt med attribut från inputfälten...
    document.querySelector("#save_task_button").addEventListener("click", () => {
        const task = {
            note: document.querySelector("#task_note").value,
            prio: document.querySelector("#task_prio").value
        };
        console.log(task)

        saveTask(task)
        .then(response => {
            window.location.href = window.location.href;
        })
        .catch(error => alert(`ERROR ${error}`));
    });
}

//Funktion som skickar objektet till servern och resolvar eller rejectar beroende på om den hittar en matchning i db
const saveTask = (task) => {
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

const deleteTaskServer = (taskid) => {
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

const deleteTask = (button) => {
    deleteTaskServer(button.parentNode.id)
    .then(response => {
        window.location.href = window.location.href;
    })
    .catch(error => alert(`ERROR ${error}`));
}
