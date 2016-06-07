$(document).ready(function() {
  toDoPage.init();
})

var toDoPage = {
  url: 'http://tiny-tiny.herokuapp.com/collections/tuhdolist',
  // toDoList: [],
  init: function() {
    toDoPage.styling();
    toDoPage.events();
  },
  styling: function() {
    toDoPage.getToDos();
  },
  events: function() {
    //Add New ToDo to the page
    $('form').on('submit', function(event){
     event.preventDefault();
     var newText = {
       todo: $(this).children('input').val(),
       completed: false
     }
     toDoPage.createToDo(newText)
     $('form ul').append(`<li><a href="">&#x270A;</a>${newText.todo}</li>`);
     $(this).children('input').val('');
   })
  //Delete ToDos
   $('#clear').on('click',function(event){
     event.preventDefault();
     console.log("cleared");
     $(this).toggleClass('strike').fadeOut();
   })

  //
 },
createToDo: function(newText) {
  $.ajax({
    url: toDoPage.url,
    method: "POST",
    data: newText,
    success: function(data){
      console.log("Created Successfully!",data);
    },
    error: function(err) {
      console.error("Did not create!");
    }
  })
},
updateToDos: function(){
  $.ajax({
    url: toDoPage.url,
    method: "POST",
    data: newText,
    success: function(){
      console.log("Updated Successfully!");
    },
    error: function(err) {
      console.error("Did not update!");
    }
  })
},
getToDos: function() {
  $.ajax({
    url: toDoPage.url,
    method: "GET",
    success: function(data){
      console.log("We got it!",data);
      data.map(function(element){
       $('form ul').append(`<li>${element.todo}</li>`);
      })
    },
    error: function(err) {
      console.error("Did not get it!");
    }
  })
},
deleteToDos: function() {
  $.ajax({
    url: toDoPage.url,
    method: "DELETE",
    success: function(){
      console.log("Deleted!");
    },
    error: function(err) {
      console.error("Didn't Delete!");
    }
})
}
}
