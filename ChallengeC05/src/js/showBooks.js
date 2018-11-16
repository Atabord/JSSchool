/* global fetch:false */
/* global window:false */
/* global document:false */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
// app initiator
function initBookShelfApp() {
  // function to get the JSON of an specific file
  async function getJson() {
    try {
      const content = await fetch('./books.json')
        .then(async res => res.json());
      return content;
    } catch (err) {
      return err;
    }
  }
  // function to get the stars icons due to the book rating
  function getStars(rating) {
    let starIcon;
    const ratingNumber = Math.floor(Number(rating));
    for (let i = 0; i < ratingNumber; i += 1) {
      starIcon ? (starIcon += '<i class="fas fa-star"></i>\n') : (starIcon = '<i class="fas fa-star"></i>\n');
    }
    if (ratingNumber !== 5) {
      for (let i = 0; i < (5 - ratingNumber); i += 1) {
        starIcon ? starIcon += '<i class="far fa-star"></i>\n' : starIcon = '<i class="far fa-star"></i>\n';
      }
    }
    return starIcon;
  }

  const data = getJson();
  // function to create the books using the Json
  data.then((jsonData) => {
    const bookContainer = document.getElementById('books-container');
    for (let i = 0; i < jsonData.items.length; i += 1) {
      const bookInfo = jsonData.items[i];
      const starsIcons = getStars(bookInfo.volumeInfo.averageRating);
      const book = `
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
  });
}

module.exports = initBookShelfApp;
