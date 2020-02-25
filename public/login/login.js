const HOSTNAME = `localhost`;
const PORT = 8080;

const userLogin = () => {
    const user = {
        username: document.querySelector("#input_name").value,
        password: document.querySelector("#input_password").value
    };
    postLogin(user)
    .then(response => {
        window.location = response.path;
    })
    .catch(error => alert(error));
}

const postLogin = (user) => {
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