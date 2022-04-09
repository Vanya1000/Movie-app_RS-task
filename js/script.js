"use strict";

const baseUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=46efeb593144cc1c9c275ecc75cdfd38&page=1'
const main = document.querySelector('.main__container');
const form = document.querySelector('.header__form');
const search = document.querySelector('.header__search');

let numberPage = 1;
let isSearch = null;

form.addEventListener('submit', (event) => {
	event.preventDefault();
	getData(`https://api.themoviedb.org/3/search/movie?api_key=46efeb593144cc1c9c275ecc75cdfd38&query=${search.value}`)
	main.innerHTML = "";
	numberPage = 1;
	isSearch = true;
})
let lastCard;
async function getData(url) {
	const res = await fetch(url);
	const data = await res.json();
	data.results.map((item) => { showData(item) })
	addObserver();
}
getData(baseUrl);

function calcRating(rating) {
	if (rating < 5) {
		return 'red'
	} else if (rating < 8) {
		return 'orange'
	} else {
		return 'green'
	}
}

function isNullImage(image) {
	if (image) {
		return `https://image.tmdb.org/t/p/w1280${image}`
	} else {
		return "./assets/img/no_image.jpg"
	}
}

function showData(data) {
	const film = (`<div class="card__item">
					<div class="card__wrapper-img">
						<img class="card__image" src="${isNullImage(data.poster_path)}" alt="image">
					</div>
					<div class="card__info">
						<h3>${data.original_title}</h3>
						<span class="${calcRating(data.vote_average)}" >${data.vote_average}</span>
					</div>
					<div class="card__overview">
	            <h3>Overview</h3>
	               <p>${data.overview}</p>
               </div>
				</div>`)
	main.insertAdjacentHTML('beforeend', film)
}

function getNewCard() {
	if (isSearch) {
		numberPage++
		setTimeout(() => getData(`https://api.themoviedb.org/3/search/movie?api_key=46efeb593144cc1c9c275ecc75cdfd38&query=${search.value}&page=${numberPage}`), 2000);
	} else {
		numberPage++
		setTimeout(() => getData(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=46efeb593144cc1c9c275ecc75cdfd38&page=${numberPage}`), 2000);
	}
}

const infiniteObserver = new IntersectionObserver(
	([entery], observer) => {
		if (entery.isIntersecting) {
			observer.unobserve(entery.target);
			getNewCard();
		}
	},
	{
		threshold: 1
	});

function addObserver () {
	lastCard = document.querySelector('.card__item:last-child');
	infiniteObserver.observe(lastCard)
}

console.log('%c  Самооценка 70/70 ', 'background: #222; color: #bada55');
console.log(`
Вёрстка +10
При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10 (Реализованы все пункты)
Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10 (Реализованы все пункты)
Поиск +30 (Реализованы все пункты)
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 (Реализованы все пункты)
`)
console.log('%c  Мои улучшения: Реализована бесконечная подгрузка контента при прокрутке до последнего загруженного элемента. Также она работает и при поиске. + если у API нет изображения подгружается наше.', 'background: #222; color: #bada55');