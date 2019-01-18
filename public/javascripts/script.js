// for (var i = 0; i < document.getElementsByClassName('trashicon').length; i++) {
//   document.getElementsByClassName('trashicon')[i].addEventListener("click",
//       function(){
//         console.log("click détécté !");
//       }
//   );
// }

// document.getElementsByClassName('trashicon')
var cardLine = [];

$(".trashicon").each(

  function(){
    var i = $(this).attr('id');
    cardLine.push(i)

  $(this).click(
  function(){
    $.ajax({
      type: "POST",
      url: "/delete",
      data: {numberToDelete: cardLine.indexOf(i)},
      success:function(){
      var newTotal =  parseInt($('#total').text().slice(0, -1)) - parseInt($('#total'+i).text());
      $('#total').text(newTotal+"€")
        $('.lineProduct'+i).remove();
        cardLine.splice(cardLine.indexOf(i),1)
      }
    });
  }
)
}
)
