const editButton = document.getElementById('update-button');
const editForm = document.querySelector(".form")
const bookpageText = document.querySelector("#bookpage-text")
const tileBook = document.getElementById('book-handlebar-tile')

function show(element) {
  element.style.display = 'block'
}
function hide(element) {
  element.style.display = "none";
}

editButton.addEventListener('click', function () {
  show(editForm);
  hide(bookpageText);
  show(tileBook)
})
editForm.addEventListener('submit', function (event) {
  event.preventDefault(); 

const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const descriptionInput = document.getElementById('book-description');


const title = document.getElementById('book-handlebar-title');
const author = document.getElementById('book-handlebar-author');
const description = document.getElementById('book-handlebar-description');

title.textContent = titleInput.value;
author.textContent = 'Written by ' + authorInput.value;
description.textContent = 'My thoughts: ' + descriptionInput.value;

hide(editForm);
show(bookpageText);
hide(tileBook)
});