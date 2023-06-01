import { renderComments, buttonElement,loadingElementBottom,} from "./render.js";
import { commentInputElement, nameInputElement,} from "./index.js";

const host =  'https://webdev-hw-api.vercel.app/api/v2/:bovda';

export let token = null;
export let comments = [];


renderComments();
;


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

export const getComment = (name) => {
    return getCommentAPI()
    .then((responseData) => {
        comments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                commentText: comment.text,
                time: comment.date, // поменяла 
                like: comment.likes,
                likeStatus: comment.isLiked ? true : false,
            };
        });
        renderComments(name);
        const loadingElement = document.querySelector(".loader")
        if (loadingElement) {
            loadingElement.style.display = "none";
        }
    });
  };

getComment();


export function fetchCommentAPI(text, token,name) {

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
            return getComment(name);
        })
        .then(() => {
            loadingElementBottom.style.display = "none";
            // nameInputElement.value = "";
            // commentInputElement.value = "";
        })
        .catch((error) => {
            buttonElement.disabled = false;
            parseError(error,[text,name])
            if (loadingElementBottom) {
                loadingElementBottom.style.display = "none";
            }
            console.warn(error);
        }).then(()=>{
            loadingElementBottom.style.display = "block";
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

export function authoriz(login, password,name) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    method: "POST",
    body: JSON.stringify({
        login: login,
        password: password,
    }),    
}).then((response) => {
    return response.json()})
    .then((data) => {
        token=data.user.token;
        name=data.user.name;
        console.log(name);
        renderComments(name);
    })
}

export function register(login, password,name) {
    return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "POST",
    body: JSON.stringify({
        login: login,
        password: password,
        name: name,
    }),    
}).then((response) => {
    return response.json()})
    .then((data) => {
        token=data.user.token;
        console.log(name);
        renderComments(name);
    })

}