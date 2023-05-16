
// Код писать здесь
import {getCommentAPI, fetchCommentAPI } from "./API.js";
import { renderComments,} from "./render.js";

// Перенос данных из разметки

let comments = [];

// Константы


renderComments();
// const buttonDeliteElement = document.getElementById("delite-comment");
const listElement = document.getElementById("list");
const buttonElement = document.getElementById("add-button");
const nameInputElement = document.getElementById("name-input");


const userComments = document.querySelectorAll('.comment');
const likeButtonsElements = document.querySelectorAll('.likes');

const editButtonElements = document.querySelectorAll('.comment-body');

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

  const fetchComment = () => {
    return fetchCommentAPI()
      .then(() => {
        return getComment();
      })
      .then((data) => {
        loadingElementBottom.style.display = "none";
        nameInputElement.value = "";
        commentInputElement.value = "";
        if (data) {
            console.log(data);
        }
      })
      .catch((error) => {
        buttonElement.disabled = false;
        loadingElementBottom.style.display = "none";
        if (error.message === "Ошибка сервера") {
          alert("Что-то с сервером");
          return;
        }
        if (error.message === "Неверный запрос") {
          alert("Введи больше 3х символов");
          commentInputElement.classList.add("error");
          nameInputElement.classList.add("error");
          return;
        }
        else {
          alert("Отсутствует интернет");
        }
        console.warn(error);
      })

  };

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


// Функция отображает комментарий

function showComment() {

    // // nameInputElement.classList.remove("error");
    // if (nameInputElement.value.trim() === '') {
    //     nameInputElement.classList.add("error");
    //     return;
    // }

    commentInputElement.classList.remove("error");
    if (commentInputElement.value.trim() === '') {
        commentInputElement.classList.add("error");
        return;
    }

    function dateElement() {
        let date = new Date();
        let monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        let minute = String(date.getMinutes().length < 2 ? '0' + date.getMinutes() : date.getMinutes());
        let hour = String(date.getHours().length < 2 ? '0' + date.getHours() : date.getHours());
        let day = String(date.getDate().length < 2 ? '0' + date.getDate() : date.getDate());
        let month = monthArray[+date.getMonth()]
        let year = String(date.getFullYear()).slice(2)
        let str = day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
        return str;
    }

    fetchComment();
    renderComments();

    // nameInputElement.value = "";
    // commentInputElement.value = "";
};

// Через кнопку

document.addEventListener('keyup', function (event) {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') showComment();
    return;
});

// Через клик

// buttonElement.addEventListener('click', showComment);

// Блок кнопки

function checkValue() {
    if (nameInputElement.value.trim() === '') {
        buttonElement.disabled = true;
        return;
    }

    if (commentInputElement.value.trim() === '') {
        buttonElement.disabled = true;
        return;
    }

    buttonElement.disabled = false;
}

// nameInputElement.addEventListener('input', checkValue);
// commentInputElement.addEventListener('input', checkValue);

// Удаление последнего элемента

//   buttonDeliteElement.addEventListener("click", () => {
//     const listElements = document.querySelector('ul');
//     const lastCommentIndex = listElements.innerHTML.lastIndexOf(`<li class="comment"`);
//     listElements.innerHTML = listElements.innerHTML.substring(0, lastCommentIndex);
//     initLikeButtonsListeners();
//     initEditButtonListeners();
//     answers();
//   });

export { renderComments,bodyElementBottom, loadingElement, comments, initLikeButtonsListeners, initEditButtonListeners, answers, fetchComment};

console.log("It works!");
