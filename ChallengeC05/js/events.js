$(() => {
  $('.dropdown-button').on('click', (event) => {
    $(event.currentTarget).siblings('.dropdown-list').addClass('show');
  });

  $('.dropdown-button').children().on('click', (event) => {
    $(event.currentTarget).parent().siblings('.dropdown-list').addClass('show');
  });

  $(document).on('click', (event) => {
    if (!$(event.target).siblings('.dropdown-list').length) {
      if (!$(event.target).parent().siblings('.dropdown-list').length) {
        if ($('.dropdown-list').hasClass('show')) {
          $('.dropdown-list').removeClass('show');
        }
      }
    }
  });

  $('.book-section').on('click', '.book', (obj) => {
    $(obj.currentTarget).find('.book-hover').toggleClass('show');
    $(obj.currentTarget).find('.popup-book').toggleClass('show');
  });

  $('.book-section').on('click', '.book', (obj) => {
    $(obj.currentTarget).siblings().find('.book-hover').removeClass('show');
    $(obj.currentTarget).siblings().find('.popup-book').removeClass('show');
  });

  $('.navbar-toggler').click(() => {
    $(this).parent().siblings('.navbar-collapse').toggleClass('show');
  });

  $('.collapse-button').click(() => {
    $(this).next().toggle('linear');
  });
});
