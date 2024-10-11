//CREATE COMPANY
$('#createcompany').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'POST',
      url: '/company/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        Swal.fire({
            title: response.message,
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/company';  
        });  
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        let errorMessage = 'An error occurred';

        if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
        errorMessage = jqXHR.responseJSON.message;
        } else {
        errorMessage = errorThrown;  
        }

        Swal.fire({
        icon: 'error',
        title: 'Error.'+ errorMessage, 
        }) 
         
    });
    return false;
  });
 
//EDIT COMAPANY
$('#editcompany').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'PUT',
      url: '/company/edit',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        Swal.fire({
            title: 'Company details updated successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/company';  
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
 

  //DELETE COMPANY
  $('.company-delete-btn').click(function(event) {
    event.preventDefault();  
    var id = $(this).attr('data-id') ;
    var formData = {
        CompanyID: id 
    }; 

    Swal.fire({
        icon: 'error',
        title: 'Oops...Not Allowed', 
    })   
  });


  $('.company-edit-btn').click(function(event) {
    event.preventDefault();  
    var id = $(this).attr('data-id') ;
    var formData = {
        CompanyID: id 
    }; 

    $.ajax({
        type: 'POST',
        url: '/company/edit',   
        data: formData,  
        dataType: 'json',  
      })
      .done(function(response) {   

        $('#edit-name').val(response.data.name);
        $('#edit-email').val(response.data.email); 
        $('#edit-phone').val(response.data.phone);
        $('#edit-address').val(response.data.address);
        $('#edit-city').val(response.data.city);
        $('#edit-postcode').val(response.data.postcode);
        $('#edit-url').val(response.data.url);
        $('#edit-status').val(response.data.status);
        $('#edit-notes').val(response.data.notes);
        $('#company_id').val(response.data._id);      

        
        jQuery('#edit-company').modal('show') 
      })
      .fail(function(jqXHR, textStatus, errorThrown) { 
          Swal.fire({
              icon: 'error',
              title: 'Oops...Validation failed', 
          }) 
           
      });  
  });
