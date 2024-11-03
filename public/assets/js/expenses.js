/* DueDate Picker */
flatpickr("#startdate", {enableTime: false,dateFormat: "Y-m-d"});

//CREATE GOODS
$('#newexpense').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'POST',
      url: '/expenses/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        $('#createexpense').modal('hide');
        Swal.fire({
            title: 'Expense added successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/expenses';  
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
  $('.expense-delete').click(function(event) {
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
                url: '/expenses/delete',   
                data: formData,  
                dataType: 'json',  
              })
            
            $('.expense-list-'+id).remove();
            Swal.fire(
                'Deleted!',
                'The expense has been deleted.',
                'success'
            ).then(() => {
                window.location.href = '/expenses';  
            });  
        }
    })  
  });

  