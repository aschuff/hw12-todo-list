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
     var newToDo = {
       todo: $(this).children('input').val(),
      //  completed: false
     }
     toDoPage.createToDo(newToDo)
     $('form ul').append(`<li><a href=""><input type="checkbox"></a>${newToDo.todo}</li>`);
     $(this).children('input').val('');
   })

// checkbox
// ('li').prop('checked')

  //Show All ToDos
  $('#all').on('click',function(event){
    event.preventDefault();
    console.log("Showing All");
  })

  //Active ToDos
  $('#active').on('click',function(event){
    event.preventDefault();
    console.log("Active ToDos");
  })

  //Completed ToDos
  $('#completed').on('click',function(event){
    event.preventDefault();
    console.log("Completed ToDos");

  })
  //Clear ToDos
   $('#clear').on('click',function(event){
     event.preventDefault();
     var todoId = $(this).parent().data('id');
     toDoPage.deleteToDos(todoId);
     console.log("cleared");
   })

  //Edit ToDos
  $('#edit').on('click',function(event){
    event.preventDefault();
    console.log("Edited ToDos");
    // var $edit = ('#edit')
    // var listToUpdate = {
    //
    // }
  })
 },
createToDo: function(newToDo) {
  $.ajax({
    url: toDoPage.url,
    method: "POST",
    data: newToDo,
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
    data: newToDo,
    success: function(){
      console.log("Updated Successfully!",data);
      toDoPage.getToDos();
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
deleteToDos: function(todoId) {
  var deleteUrl = toDoPage.url + "/" + todoId;
  $.ajax({
    url: deleteUrl,
    method: "DELETE",
    success: function(){
      console.log("Deleted!",data);
      toDoPage.getToDos();
    },
    error: function(err) {
      console.error("Didn't Delete!");
    }
})
}
}
