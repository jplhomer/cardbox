dpd.users.me(function(user) {
  if (user) {
    $('h1').text("Welcome, " + user.username + "!");
  } else {
    location.href = "/";
  }
});

$('#logout-btn').click(function() {
  dpd.users.logout(function(res, err) {
    location.href = "/";
  });
});

$(document).ready(function() {

    loadCards();

    $('.add-card').submit(function() {
        //Get the data from the form
        var title = $('#title').val();
        var description = $('#description').val();

        dpd.cards.post({
                title: title,
                description: description
        }, function(card, error) {
                if (error) return showError(error);

                addCard(card);
                $('#title').val('');
                $('#description').val('');
        });

        return false;
    });

    function addCard(card) {
        $('<div class="card">')
            .append('<h4>' + card.title + '</h4>')
            .append('<p>' + card.description + '</p>')
            .append('<p><em>Added by ' + card.user.username + '</em></p>')
            .appendTo('.your-cards');
    }

    function loadCards() {
        dpd.cards.get(function(cards, error) { //Use dpd.js to access the API
            $('.your-cards').empty(); //Empty the list
            cards.forEach(function(card) { //Loop through the result
                addCard(card); //Add it to the DOM.
            });
        });
    }

});

function showError(error) {
        var message = "An error occurred";
        if (error.message) {
                message = error.message;
        } else if (error.errors) {
                var errors = error.errors;
                message = "";
                Object.keys(errors).forEach(function(k) {
                        message += k + ": " + errors[k] + "\n";
                });
        }

        alert(message);
}