//sätter konstanter för url och port
const HOSTNAME = `localhost`;
const PORT = 8080;

window.onload = () => {
    //Sätter en listener på "login-knappen" som skapar ett objekt med attribut från inputfälten...
    document.querySelector("#login_button").addEventListener("click", () => {
        const user = {
            username: document.querySelector("#input_name").value,
            password: document.querySelector("#input_password").value
        };
        userLogin(user)
        .then(response => {
            window.location = response.path;
        })
        .catch(error => alert(error));
    });
}
//Funktion som skickar objektet till servern och resolvar eller rejectar beroende på om den hittar en matchning i db
const userLogin = (user) => {
    return new Promise((resolve, reject) => {
        fetch(`http://${HOSTNAME}:${PORT}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data => resolve(data))
                .catch(error => reject(error));
            }
            else {
                response.json()
                .then(data => reject(data.answer))
                .catch(error => reject(error));
            }
        })
        .catch(error => console.log(error));
    });
}