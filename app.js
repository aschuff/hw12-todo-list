$(document).ready(function() {
  toDoPage.init();
})

var toDoPage = {
  url: 'http://tiny-tiny.herokuapp.com/collections/tuhdolist',
  toDoList: [],
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
     var newToDo = {
       todo: $(this).children('input').val(),
       completed: false
     }
     toDoPage.createToDo(newToDo)
     $(this).children('input').val('');
   })

  //Clear/Delete ToDos
   $('ul').on('click', 'a', function(event){
     event.preventDefault();
     var deleteToDoId = $(this).parent().data('id');
     console.log("cleared",deleteToDoId);

    //  $(this).css('text-decoration','line-through')
     $(this).parent().remove();
     toDoPage.deleteToDos(deleteToDoId);
   })

  //Edit ToDos
  //  Stores the data when enter is pressed
   $('ul').on('keypress', 'li',function(event){
     if (event.which === 13) {
       event.preventDefault();
       var update = $(this).data('id');
       var newText = $(this).text();
       var newCompleted = $(this).data('completed');
       var objToUpdate = {
        _id: update,
        todo: newText,
        completed: newCompleted,
      }
      console.log("TEST", objToUpdate)
      toDoPage.updateToDos(objToUpdate)

     }
   })
 },
createToDo: function(newToDo) {
  $.ajax({
    url: toDoPage.url,
    method: "POST",
    data: newToDo,
    success: function(data){
      console.log("Created Successfully!",data);
      $('form ul').append(`<li contenteditable="true" data-id="${data._id}" data-completed="${data.completed}"><a href="">&#10003;</a>${data.todo}</li>`);
      toDoPage.toDoList.push(data);
    },
    error: function(err) {
      console.error("Did not create!");
    }
  })
},
getToDos: function() {
  $.ajax({
    url: toDoPage.url,
    method: "GET",
    success: function(data){
      console.log("We got it!",data);
      $('.counter').find('h5').text('toDos Left: ' + data.length);
      $('form ul').html("")
      data.forEach(function(element){
        toDoPage.toDoList.push(element);
       $('form ul').append(`<li contenteditable="true" data-id="${element._id}" data-completed="${element.completed}"><a href="#">&#10003;</a>${element.todo}</li>`);
      })
    },
    error: function(err) {
      console.error("Did not get it!");
    }
  })
},
updateToDos: function(updateToDos){
  var updateUrl = toDoPage.url + "/" + updateToDos._id;
  $.ajax({
    url: updateUrl,
    method: "PUT",
    data: updateToDos,
    success: function(data){
      console.log("Updated Successfully!",data);
      toDoPage.getToDos();
    },
    error: function(err) {
      console.error("Did not update!");
    }
  })
},
deleteToDos: function(deleteToDoId) {
  var deleteUrl = toDoPage.url + "/" + deleteToDoId;
  $.ajax({
    url: deleteUrl,
    method: "DELETE",
    success: function(){
      console.log("Deleted!");
      toDoPage.getToDos();
    },
    error: function(err) {
      console.error("Didn't Delete!");
    }
})
}
}
