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

var handler = StripeCheckout.configure({
  key: 'pk_test_0IMcMatLvhq5MxMbvdGfYdoZ',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    $.ajax({
      type: "POST",
      url: "/checkout",
      data: {stripeToken : token.id},
      success:function(code_html, statut){
        $("html").empty();
        $("html").append(code_html);
      }})
  }
});

document.getElementById('customButton').addEventListener('click', function(e) {
  // Open Checkout with further options:
  handler.open({
    name: 'BikeShop',
    description: '2 widgets',
    currency: 'eur',
    amount: parseInt($('#total').text())*100
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});
