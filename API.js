import { renderComments, loadingElement, buttonElement, bodyElementBottom, nameInputElement, commentInputElement } from "./index.js"

let comments = [
    // {
    //   name: "Глеб Фокин",
    //   commentText: "Это будет первый комментарий на этой странице",
    //   time: "12.02.22 12:18",
    //   like: 3,
    //   likeStatus: false,
    // },
    // {
    //   name: "Варвара Н.",
    //   commentText: "Мне нравится как оформлена эта страница! ❤",
    //   time: "13.02.22 19:22",
    //   like: 75,
    //   likeStatus: false,
    // }
];

const getComment = () => {

    fetch('https://webdev-hw-api.vercel.app/api/v1/:bovda/comments',
        {
            method: "GET"
        }).then((response) => {

            return response.json();

        }).then((responseData) => {

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

    buttonElement.disabled = true;

    const loadingElementBottom = document.createElement("span");
    loadingElementBottom.textContent = "Комментарий загружается...";
    loadingElementBottom.style.display = "block";
    bodyElementBottom.appendChild(loadingElementBottom);

    fetch('https://webdev-hw-api.vercel.app/api/v1/:bovda/comments', {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
            text: commentInputElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Ошибка сервера");
            }

            if (response.status === 400) {
                throw new Error("Неверный запрос");
            }

            else {
                return response.json();
            }
        })
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
                // buttonElement.disabled = false;
                // loadingElementBottom.style.display = "none";
                alert("Отсутствует интернет");
            }
            console.warn(error);
        })

};

export { comments, getComment, fetchComment };