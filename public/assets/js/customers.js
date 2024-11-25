/* DueDate Picker */
flatpickr("#dob", {enableTime: false,dateFormat: "Y-m-d"});
flatpickr("#joindate", {enableTime: false,dateFormat: "Y-m-d"});


//CREATE CUSTOMER
$('#createcustomer').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'POST',
      url: '/customers/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        Swal.fire({
            title: 'Customer added successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/customers';  
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
  $('.customer-delete-btn').click(function(event) {
    event.preventDefault();  
    var id = $(this).attr('data-id') ;
    var formData = {
        CustomerID: id 
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
                url: '/customers/delete',   
                data: formData,  
                dataType: 'json',  
              })
            
            $('.customer-list-'+id).remove();
            Swal.fire(
                'Deleted!',
                'The Customer account has been deleted.',
                'success'
            )
        }
    })  
  });

//CREATE STAFF
$('#editcustomers').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'PUT',
      url: '/customerss/edit',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        Swal.fire({
            title: 'Customer details updated successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/customerss';  
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

  $('#company-name').change(function(event) {
    event.preventDefault();  
    var id = $(this).val() ;
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
        $('#edit-phone').val(response.data.phone);
        $('#edit-address').val(response.data.address);
        $('#edit-city').val(response.data.city);
        $('#edit-postcode').val(response.data.postcode); 
      }) 
  });



   //EDIT CUSTOMER 
 $('.customer-edit-btn').click(function(event) {
    event.preventDefault();  
    var id = $(this).attr('data-id') ;
    var formData = {id}; 

    $.ajax({
        type: 'POST',
        url: '/customers/edit',   
        data: formData,  
        dataType: 'json',  
      })
      .done(function(response) {   
 
        $('#edit-name').val(response.data.name);
        $('#edit-phone').val(response.data.phone);  
        $('#edit-address').val(response.data.address); 
        $('#edit-city').val(response.data.city);
        $('#edit-postcode').val(response.data.postcode); 
        $('#edit-discount').val(response.data.discount);  
        $('#edit-status').val(response.data.status);
        $('#edit-notes').val(response.data.notes);  
        $('#customerid').val(response.data._id); 

        $('#edit-email').val(response.data.email);  
        $('#edit-gst').val(response.data.gst);  
        
        jQuery('#edit-customer').modal('show') 
      })
      .fail(function(jqXHR, textStatus, errorThrown) { 
          Swal.fire({
              icon: 'error',
              title: 'Oops...Validation failed', 
          }) 
           
      });  
  });
  //UPDATE CUSTOMER
  $('#editcustomer').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'PUT',
      url: '/customers/edit',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        $('#edit-customer').modal('hide');
        Swal.fire({
            title: 'Customers updated successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/customers/';  
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