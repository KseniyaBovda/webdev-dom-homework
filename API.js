import { renderComments } from "./render.js";
import { commentInputElement, nameInputElement,loadingElement,loadingElementBottom } from "./index.js";

const host =  'https://webdev-hw-api.vercel.app/api/v2/:bovda';

export let token = null;
export let comments = [];
renderComments();

export function getCommentAPI() {

    return fetch(host + "/comments",
        {
            method: "GET",

        })
        .then((response) => {
            if (response === 401) {
                throw new Error("Нет авторизации")
            }

            return response.json();
        });
}

export const getComment = () => {
    return getCommentAPI()
    .then((responseData) => {
        comments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                commentText: comment.text,
                time: new Date(comment.date).toLocaleString().slice(0, -3),
                like: comment.likes,
                likeStatus: comment.isLiked ? true : false,
            };
        });
        renderComments( );
        loadingElement.style.display = "none";
    });
  };

getComment();


export function fetchCommentAPI(text, token,buttonElement) {

    return fetch(host + "/comments", {
        method: "POST",
        body: JSON.stringify({
            // name: nameInputElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
            text
            // forceError: true,
        }), headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => checkResponseStatus(response))
        .then(() => {
            return getComment();
        })
        .then(() => {
            loadingElementBottom.style.display = "none";
            // nameInputElement.value = "";
            // commentInputElement.value = "";
        })
        .catch((error) => {
            buttonElement.disabled = false;
            loadingElementBottom.style.display = "none";
            parseError(error,[text,nameInputElement])
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

export function Authoriz(name, password,) {
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
        name=data.user.name;
        
        renderComments(name);
    })
}