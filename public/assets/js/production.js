//CREATE PRODUCTION
$('#newproduction').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'POST',
      url: '/productions/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
         Swal.fire({
            title: 'Production added successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/productions';  
        });    
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        Swal.fire({
            icon: 'error',
            title: 'Oops...Validation failed', 
        }) 
         
    });
    return false;
  });
//DELETE PRODUCTION
  $('.production-delete').click(function(event) {
    event.preventDefault();  
    var id = $(this).attr('data-id') ;
    var formData = {
        ID: id 
    }; 

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
                url: '/productions/delete',   
                data: formData,  
                dataType: 'json',  
              })
            
            $('.productions-list-'+id).remove();
            Swal.fire(
                'Deleted!',
                'The Production has been deleted.',
                'success'
            ).then(() => {
                window.location.href = '/productions';  
            });  
        }
    })  
  });

 //EDIT PRODUCTION 
 $('#updateproduction').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'PUT',
      url: '/productions/update',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
         Swal.fire({
            title: 'Production updated successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/productions';  
        });    
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        Swal.fire({
            icon: 'error',
            title: 'Oops...Validation failed', 
        }) 
         
    });
    return false;
  });