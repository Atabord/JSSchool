$(function(){
  $('.dropdown-button').focus(function(){
    $(this).siblings(".dropdown-list").addClass("show");
  });
  $(document).on('click', function(event) {
    if (!$(event.target).closest('.dropdown-list').length) {
      $(".dropdown-list").removeClass("show");
    }
  });

  $('.book-section').on('mouseenter', '.book', function(){
    $(this).find(".book-hover").addClass("show");
    $(this).find(".popup-book").addClass("show");
  });

  $('.book-section').on('mouseleave', '.book', function(){
    $(this).find(".book-hover").removeClass("show");
    $(this).find(".popup-book").removeClass("show");
  });
  
  $('.navbar-toggler').click(function(){
    $(this).parent().siblings(".navbar-collapse").toggleClass("show");
  })

  $('.collapse-button').click(function(){
    $(this).next().toggle("linear");
  })
});
