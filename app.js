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
     $('form ul').append(`<li><a href=""><input type="checkbox"></a>${newToDo.todo}</li>`);
     $(this).children('input').val('');
   })

// checkbox
// ('li').prop('checked')

  //Show All ToDos
  $('#all').on('click',function(event){
    event.preventDefault();
    var allToDos = ('ul').val()
    console.log("Showing All", allToDos);
  })
  toDoPage.getToDos(allToDos);

  //Active ToDos - the ones that aren't done/complete
  $('#active').on('click',function(event){
    event.preventDefault();
    console.log("Active ToDos",data);

  })

  //Completed ToDos
  $('#completed').on('click', 'checkbox',function(event){
    event.preventDefault();
    console.log("Completed ToDos");
  })

  // checkbox
    // $('li').prop('checked', function (event){
    //
    // })

  //Clear/Delete ToDos
   $(document).on('click', 'a', function(event){
     event.preventDefault();
     var deleteToDoId = $(this).parent().data('id');
     console.log("cleared",deleteToDoId);

     $(this).parent().remove();
     toDoPage.deleteToDos(deleteToDoId);
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
