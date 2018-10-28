$(function(){
  $('.dropdown-button').focus(function(){
    $(this).siblings(".dropdown-list").addClass("show");
  });
  $(document).on('click', function(event) {
    if (!$(event.target).closest('.dropdown-list').length) {
      $(".dropdown-list").removeClass("show");
    }
  });
  $('.book').hover(function(){
    $(this).find(".book-hover").toggleClass("show");
    $(this).find(".popup-book").toggleClass("show");
  });

  $('.navbar-toggler').click(function(){
    $(this).parent().siblings(".navbar-collapse").toggleClass("show");
  })

  $('.collapse-button').click(function(){
    $(this).next().toggle("linear");
    console.log($(this).next())
  })
});
