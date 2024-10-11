//CREATE TASK 

$('#createtask').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'POST',
      url: '/tasks/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        $('#createtask')[0].reset()
        Swal.fire({
            title: 'Task Created Successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        })  
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        Swal.fire({
            icon: 'error',
            title: 'Oops...Validation failed', 
        }) 
         
    });
    return false;
  });

//DELETE STAFF
  $('a.delete-task').click(function(event) {
    event.preventDefault();  console.log(event)

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: 'POST',
                url: '/projects/delete',   
                data: {ProjectID: $(this).attr('data-id') },  
                dataType: 'json',  
              })
            
             Swal.fire(
                'Deleted!',
                'The Customer account has been deleted.',
                'success'
            ).then(() => {
                window.location.href = '/projects';  
            }); 
        }
    })  
  });
  
   
  
  
  (function () {
    "use strict"
 

    flatpickr("#targetdate", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    

    /* multi select with remove button */
 new Choices('#task-engineers',{removeItemButton: true});
 new Choices('#task-types',{removeItemButton: true});
 
 

})();