import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";


const formEl = document.querySelector(".form");
const inputEl = formEl.querySelector('input[name="search-text"]');

let currentQuery = "";

formEl.addEventListener("submit", onSearch);

function onSearch(evt) {
evt.preventDefault();

const query = inputEl.value.trim();

if (!query) {
iziToast.warning({
title: "Warning",
message: "Please enter a search term.",
position: "topRight",
});
return;
}

currentQuery = query;

showLoader();
clearGallery();

getImagesByQuery(query)
.then(data => {

const images = Array.isArray(data.hits) ? data.hits : [];


hideLoader();

if (!images.length) {
iziToast.error({
title: "No results",
message: "Sorry, there are no images matching your search query. Please try again!",
position: "topRight",
});
return;
}

createGallery(images);

iziToast.success({
title: "Success",
message: `Found ${images.length} images for "${query}".`,
position: "topRight",
});
})
.catch(err => {

hideLoader();
console.error("Error in main:", err);
iziToast.error({
title: "Error",
message: "Something went wrong while fetching images. Check console for details.",
position: "topRight",
});
});
}
