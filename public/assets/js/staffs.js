/* DueDate Picker */
flatpickr("#dob", {enableTime: false,dateFormat: "Y-m-d"});
flatpickr("#joindate", {enableTime: false,dateFormat: "Y-m-d"});


//CREATE STAFF
$('#createstaff').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'POST',
      url: '/staffs/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        Swal.fire({
            title: 'Staff added successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/staffs';  
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

//DELETE STAFF
  $('.staff-delete-btn').click(function(event) {
    event.preventDefault();  
    var id = $(this).attr('data-id') ;
    var formData = {
        StaffID: id 
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
                url: '/staffs/delete',   
                data: formData,  
                dataType: 'json',  
              })
            
            $('.staff-list-'+id).remove();
            Swal.fire(
                'Deleted!',
                'The Staff account has been deleted.',
                'success'
            )
        }
    })  
  });

//CREATE STAFF
$('#editstaff').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'PUT',
      url: '/staffs/edit',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        Swal.fire({
            title: 'Staff details updated successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/staffs';  
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


  const inputElement = document.querySelector('.filepond');
  const pond = FilePond.create(inputElement);

  // Set FilePond server configuration
  FilePond.setOptions({
      server: {
          process: {
              url: '/files/upload',
              method: 'POST',
              headers: {
                  'Accept': 'application/json'
              },
              onload: (response) => {
                  const data = JSON.parse(response);
                  $('#profilepic').val(data.file);
                  return data.file;  
              },
              onerror: (response) => {
                  console.error('Upload error:', response);
              }
          },
          revert: null // Handle reverting uploads if needed
      }
  });