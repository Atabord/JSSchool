const initEvents = () => {
  // event to open the dropdwon when clicking name on header button
  $('.dropdown-button').on('click', (event) => {
    $(event.currentTarget).siblings('.dropdown-list').addClass('show');
  });
  // event to open dropdown when clicking the arrow simbol on header button
  $('.dropdown-button').children().on('click', (event) => {
    $(event.currentTarget).parent().siblings('.dropdown-list').addClass('show');
  });
  // event to close the dropdown when clicking whatever but the button
  $(document).on('click', (event) => {
    if (!$(event.target).siblings('.dropdown-list').length) {
      if (!$(event.target).parent().siblings('.dropdown-list').length) {
        if ($('.dropdown-list').hasClass('show')) {
          $('.dropdown-list').removeClass('show');
        }
      }
    }
  });
  // event to open/close the tooltip when clicking the books
  $('.book-section').on('click', '.book', (obj) => {
    $(obj.currentTarget).find('.book-hover').toggleClass('show');
    $(obj.currentTarget).find('.popup-book').toggleClass('show');
  });
  // event to close the tooltip when clicking other books
  $('.book-section').on('click', '.book', (obj) => {
    $(obj.currentTarget).siblings().find('.book-hover').removeClass('show');
    $(obj.currentTarget).siblings().find('.popup-book').removeClass('show');
  });
  // event to show navbar menus when clicking on small devices
  $('.navbar-toggler').click(() => {
    $(this).parent().siblings('.navbar-collapse').toggleClass('show');
  });
  // event to show navbar submenus when clicking on small devices
  $('.collapse-button').click(() => {
    $(this).next().toggle('linear');
  });
};

// window.addEventListener('load', initEvents)

module.exports = initEvents;
