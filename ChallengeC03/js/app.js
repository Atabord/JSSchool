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
});

var dropdown = document.getElementsByClassName("collapse-button");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
