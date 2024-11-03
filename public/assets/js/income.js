/* DueDate Picker */
flatpickr("#startdate", {enableTime: false,dateFormat: "Y-m-d"});

//CREATE INCOME
$('#newincome').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'POST',
      url: '/income/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        $('#createincome').modal('hide');
        Swal.fire({
            title: 'Income added successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/income';  
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
//DELETE INCOME
  $('.income-delete').click(function(event) {
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
                url: '/income/delete',   
                data: formData,  
                dataType: 'json',  
              })
            
            $('.expense-list-'+id).remove();
            Swal.fire(
                'Deleted!',
                'The income has been deleted.',
                'success'
            ).then(() => {
                window.location.href = '/income';  
            });  
        }
    })  
  });

  