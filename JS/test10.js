const fetch = require("node-fetch");

function fetchUser() {
    var url = 'https://jsonplaceholder.typicode.com/users/1'
    return fetch(url).then(function(response) {
        return response.json();
    });
}

function fetchTodo() {
    var url = 'https://jsonplaceholder.typicode.com/todos/1';
    return fetch(url).then(function(response) {
        return response.json();
    });
}

async function logTodoTitle() {
    try {
        var user = await fetchUser();
        if (user.id === 1) {
            var todo = await fetchTodo();
            console.log(todo.title); // delectus aut autem
        }
    } catch (error) {
        console.log(error);
    }
}
logTodoTitle()