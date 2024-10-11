//CREATE GOODS
$('#goodsproducts').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'POST',
      url: '/settings/goods/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        $('#create-Product').modal('hide');
        Swal.fire({
            title: 'Product added successfully!',
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
//DELETE GOODS
  $('.product-delete-btn').click(function(event) {
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



  //CREATE SERVICE
$('#services').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'POST',
      url: '/settings/services/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        $('#create-service').modal('hide');
        Swal.fire({
            title: 'Service added successfully!',
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
//DELETE SERVICE
  $('.service-delete-btn').click(function(event) {
    event.preventDefault();  
    var id = $(this).attr('data-id') ;
    var formData = {
        ServiceID: id 
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
                url: '/settings/services/delete',   
                data: formData,  
                dataType: 'json',  
              })
            
            $('.service-list-'+id).remove();
            Swal.fire(
                'Deleted!',
                'The Service has been deleted.',
                'success'
            )
        }
    })  
  });