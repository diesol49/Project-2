$(document).ready(function() {
    var nameInput = $("#resume-name");
    var resumeList = $("tbody");
    var container = $(".resume-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Author
    $(document).on("submit", "#resume-form", handleResumeFormSubmit);
    $(document).on("click", ".delete-author", handleDeleteButtonPress);
  
    // Getting the initial list of Authors
    getVersion();
  
    // A function to handle what happens when the form is submitted to create a new Author
    function handleResumeFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertAuthor function and passing in the value of the name input
      upsertAuthor({
        name: nameInput
          .val()
          .trim()
      });
    }
  
    // A function for creating an author. Calls getVersion upon completion
    function upsertAuthor(data) {
      $.post("/api/version", data)
        .then(getVersion);
    }
  
    // Function for creating a new list row for authors
    function createResumeRow(data) {
      var newTr = $("<tr>");
      newTr.data("author", data);
      newTr.append("<td>" + data.name + "</td>");
      if (data.Posts) {
        newTr.append("<td> " + data.Posts.length + "</td>");
      } else {
        newTr.append("<td>0</td>");
      }
      newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
      newTr.append("<td><a href=''>Download</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Resume</a></td>");
      return newTr;
    }
  
    // Function for retrieving authors and getting them ready to be rendered to the page
    function getVersion() {
      $.get("/api/version", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createResumeRow(data[i]));
        }
        renderResumeList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of authors to the page
    function renderResumeList(rows) {
      resumeList.children().not(":last").remove();
      container.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        resumeList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no authors
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Author before you can create a Post.");
      container.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("author");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/authors/" + id
      })
        .then(getVersion);
    }
  });
  