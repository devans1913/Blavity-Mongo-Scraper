// Grab the articles as a json
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      // Display articles
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save p-tag
    var thisId = $(this).attr("data-id");
  
    // Ajax call
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    
    // With that done, add the note information to the page
    .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // Input new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // Input new note
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // New note buttion
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // New note article
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
    });
});
  
// Save note
$(document).on("click", "#savenote", function() {
    
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      
    // Log response
    .then(function(data) {
        console.log(data);
        $("#notes").empty();
    });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");

});