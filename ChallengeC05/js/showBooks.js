'use strict'

function initBookShelfApp() {
    async function getJson() {
        try {
            let content = await fetch('./js/books.json')
                .then(async (res) => res.json());
            return content;
        } catch (err) {
            console.error(`an error ocurred ${err}`);
        }
    }
    
    function getStars(rating) {
        let starIcon;
        rating = Number(rating);
        for (let i = 0; i<rating; i += 1) {
            starIcon ? starIcon += '<i class="fas fa-star"></i>\n' : starIcon = '<i class="fas fa-star"></i>\n';        
        }
        if (rating !== 5) {
            for (let i = 0; i < (5-rating); i += 1) {
                starIcon ? starIcon += '<i class="far fa-star"></i>\n' : starIcon = '<i class="far fa-star"></i>\n';
            }
        }
        return starIcon;
    }
    
    let data = getJson();
    data.then((jsonData) => {
        let bookContainer = document.getElementById('books-container');
        for (const item in jsonData.items){
            console.log(jsonData.items[item]);
            let bookInfo = jsonData.items[item];
            let starsIcons = getStars(bookInfo.volumeInfo.averageRating);
            let book = `
            <div class="book">
                <img src="${bookInfo.volumeInfo.imageLink}" alt="${bookInfo.volumeInfo.title} book image" class="book-main-image">
                <div class="in-use">
                    <img src="images/inUse.png" alt="Borrowed Book">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="book-description">
                    <h3 class="book-title">${bookInfo.volumeInfo.title}</h3>
                    <span class="book-author">${bookInfo.volumeInfo.authors}</span>
                    ${starsIcons}
                </div>
                <!-- PopUp and hover section-->
                <div class="book-hover">
                    <div class="icon-container left">
                        <i class="far fa-heart"></i>
                    </div>
                    <div class="icon-container right">
                        <i class="far fa-bookmark"></i>
                    </div>
                    <div class="main-icon-container">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <p class="book-rate">Rate this book</p>
                    <div class="hover-rate">
                        ${starsIcons}
                    </div>
                </div>
                <div class="popup-book">
                    <div class="pupup-section-container">
                        <h3 class="popup-title">${bookInfo.volumeInfo.title} <span class="popup-book-year">${bookInfo.volumeInfo.publishedDate}</span></h3>
                        <p>Novel by <span class="popup-author">${bookInfo.volumeInfo.authors}</span></p>
                        <p>${bookInfo.volumeInfo.pageCount}</p>
                    </div>
                    <div class="pupup-section-container">
                        <h4 class="popup-section-title">Summary</h4>
                        <p class="pupup-summary-text">
                            ${bookInfo.volumeInfo.description}
                        </p>
                    </div>
                    <div class="pupup-section-container">
                        <h4 class="popup-section-title">Rating</h4>
                        ${starsIcons}
                    </div>
                    <div class="pupup-section-container">
                        <button class="borrow-book">Borrow</button>
                    </div>
                </div>
            </div>`;
            bookContainer.innerHTML += book;
        }
    }) 
    console.log(data);
    
}

window.addEventListener('load', initBookShelfApp);




