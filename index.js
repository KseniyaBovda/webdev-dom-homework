
// Код писать здесь
import {getCommentAPI, fetchCommentAPI, token} from "./API.js";
import { renderComments, text,buttonElement } from "./render.js";
import { format } from "date-fns";

// Перенос данных из разметки

let comments = [];
renderComments();

// Константы

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("text-input");

// Лоадеры 

const bodyElementBottom = document.getElementById("loader-bottom");
const loadingElementBottom = document.createElement("span");
loadingElementBottom.textContent = "Комментарий загружается...";
loadingElementBottom.style.display = "block";
bodyElementBottom.appendChild(loadingElementBottom);

const bodyElement = document.getElementById("loader");
const loadingElement = document.createElement("span");
loadingElement.textContent = "Пожалуйста подождите, комментарии загружаются...";
bodyElement.appendChild(loadingElement);


// API

  const getComment = () => {
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
        renderComments();
        loadingElement.style.display = "none";
    });
  };

//   const fetchComment = () => {
//     return fetchCommentAPI(text, token, buttonElement )
//       .then(() => {
//         return getComment();
//       })
//       .then((data) => {
//         loadingElementBottom.style.display = "none";
//         nameInputElement.value = "";
//         commentInputElement.value = "";
//         if (data) {
//             console.log(data);
//         }
//         renderComments();
//       })
//       .catch((error) => {
//         buttonElement.disabled = false;
//         loadingElementBottom.style.display = "none";
//         if (error.message === "Ошибка сервера") {
//           alert("Что-то с сервером");
//           return;
//         }
//         if (error.message === "Неверный запрос") {
//           alert("Введи больше 3х символов");
//           commentInputElement.classList.add("error");
//           nameInputElement.classList.add("error");
//           return;
//         }
//         else {
//           alert("Отсутствует интернет");
//         }
//         console.warn(error);
//       })

//   };

getComment();

// Обработчик клика лайка

function initLikeButtonsListeners() {
    const likeElements = document.querySelectorAll('.likes');

    for (const likeElement of likeElements) {

        const index = likeElement.dataset.button;
        const heart = likeElement.dataset.counter;

        likeElement.addEventListener("click", (event) => {
            event.stopPropagation();

            if (comments[index].likeStatus === false) {
                comments[index].like += 1;
                comments[index].likeStatus = true;
            } else {
                comments[index].like -= 1;
                comments[index].likeStatus = false;
            }

            renderComments();
        });
    };
};

// Редактирование комментария

function initEditButtonListeners() {
    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(button => {
        button.addEventListener('click', handleEditButtonClick);
    });
}

function handleEditButtonClick(event) {
    event.stopPropagation();
    const commentItem = event.target.closest('.comment');
    const commentText = commentItem.querySelector('.comment-text');
    const editButton = commentItem.querySelector('.edit-button');

    const textarea = document.createElement('textarea');
    textarea.value = commentText.textContent;
    textarea.classList.add('comment-textarea');

    commentText.replaceWith(textarea);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.classList.add('save-button');

    editButton.replaceWith(saveButton);

    saveButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const newText = textarea.value;
        commentText.textContent = newText;
        textarea.replaceWith(commentText);
        saveButton.replaceWith(editButton);
    });
};

// Ответы на комментарии

function answers() {

    const userComments = document.querySelectorAll('.comment');

    for (const userComment of userComments) {

        userComment.addEventListener("click", (event) => {
            event.stopPropagation();

            if (event.target.classList.contains('comment-textarea')) {
                return;
            }

            const nameComment = userComment.dataset.name;
            const textComment = userComment.dataset.comment;

            commentInputElement.value = `>${textComment} \n ${nameComment},`;

        })
    }
};
renderComments();


// Блок кнопки

function checkValue() {
    // if (nameInputElement.value.trim() === '') {
    //     buttonElement.disabled = true;
    //     return;
    // }

    if (commentInputElement.value.trim() === '') {
        buttonElement.disabled = true;
        return;
    }

    buttonElement.disabled = false;
}

// nameInputElement.addEventListener('input', checkValue);
// commentInputElement.addEventListener('input', checkValue);


export { renderComments,bodyElementBottom, loadingElement, comments, initLikeButtonsListeners, initEditButtonListeners, answers,};

console.log("It works!");
