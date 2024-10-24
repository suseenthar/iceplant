/* DueDate Picker */
flatpickr("#startdate", {enableTime: false,dateFormat: "Y-m-d"});

//CREATE GOODS
$('#newunit').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'POST',
      url: '/unit/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        $('#createunits').modal('hide');
        Swal.fire({
            title: 'Unit created successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/unit';  
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
  $('.unit-delete').click(function(event) {
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
                url: '/unit/delete',   
                data: formData,  
                dataType: 'json',  
              })
            
            $('.units-list-'+id).remove();
            Swal.fire(
                'Deleted!',
                'The Unit has been deleted.',
                'success'
            ).then(() => {
                window.location.href = '/unit';  
            });  
        }
    })  
  });

 //EDIT GOODS
 $('.product-edit-btn').click(function(event) {
    event.preventDefault();  
    var id = $(this).attr('data-id') ;
    var formData = {
        ProductID: id 
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
                url: '/settings/goods/delete',   
                data: formData,  
                dataType: 'json',  
              })
            
            $('.product-list-'+id).remove();
            Swal.fire(
                'Deleted!',
                'The Product has been deleted.',
                'success'
            )
        }
    })  
  });

 