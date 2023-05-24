// Код писать здесь
import {comments} from "./API.js";
import { renderComments,buttonElement } from "./render.js";
// import { format } from "date-fns";

// Константы input

export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("text-input");


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

            renderComments(name);
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


export { renderComments, initLikeButtonsListeners, initEditButtonListeners, answers,};

console.log("It works!");
