import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/" ;
const API_KEY = "52318710-c8f94a6f7665a4ba5885a56a6" ;

/**
 * Виконує запит до Pixabay і повертає response.data
 * @param {string} query — пошуковий рядок
 * @returns {Promise<Object>} — об'єкт відповіді (має поле hits: [...])
 */

export function getImagesByQuery(query) {
const params = {
key: API_KEY ,
q: query,
image_type: "photo" ,
orientation: "horizontal",
safesearch: true,
};
return axios
.get(BASE_URL, {params})
.then(response => {
    if (response.data.hits.length === 0) {
    alert("Sorry, there are no images matching your search query. Please try again!");
    }
    return response.data;
})
.catch (error =>{
return Promise.reject(error);
}
);
};

