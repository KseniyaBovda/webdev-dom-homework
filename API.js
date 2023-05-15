import { renderComments } from "./render.js";

const host =  'https://webdev-hw-api.vercel.app/api/v2/:bovda';


export let token = null;

export function getCommentAPI() {

    return fetch(host + "/comments",
        {
            method: "GET",

        }).then((response) => {
            if (response === 401) {
                throw new Error("Нет авторизации")
            }

            return response.json();
        });
}

export function fetchCommentAPI({ name, text, forceError, token }) {

    return fetch(host + "/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
            text: commentInputElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
            forceError: true,
        }), headers: {
            Autorization: token,
        }
    })
        .then((response) => checkResponseStatus(response))
        .then(() => {
            return getComment();
        })
        .then(() => {
            loadingElementBottom.style.display = "none";
            nameInputElement.value = "";
            commentInputElement.value = "";
        })
        .catch((error) => {
            buttonElement.disabled = false;
            loadingElementBottom.style.display = "none";
            parseError(error,[commentInputElement,nameInputElement])
            console.warn(error);
        })

};

function checkResponseStatus(response) {
    if (response.status === 500) {
        throw new Error("Ошибка сервера");
    }

    if (response.status === 400) {
        throw new Error("Неверный запрос");
    }

    else {
        return response.json();
    }
};

function parseError(error, elements ) {
    if (error.message === "Ошибка сервера") {
        alert("Что-то с сервером");
        return;
    }
    if (error.message === "Неверный запрос") {
        alert("Введи больше 3х символов");
        elements.forEach((element) => element.classList)
        return;
    }
    alert("Отсутствует интернет");
}

export function Authoriz(name, password) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    method: "POST",
    body: JSON.stringify({
        login: name,
        password: password,
    }),    
}).then((response) => {
    return response.json()})
    .then((data) => {
        token=data.user.token;
        console.log(token)
        renderComments();
    })
}