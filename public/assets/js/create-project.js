//CREATE PROJECT 

$('#createproject').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'POST',
      url: '/projects/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        Swal.fire({
            title: 'Project Created Successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/projects';  
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
  $('a.delete-project').click(function(event) {
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

    /* StartDate Picker */
    flatpickr("#startDate", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    /* EndDate Picker */
    flatpickr("#endDate", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    flatpickr("#targetdate", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    

    /* multi select with remove button */
 new Choices('#assigned-engineers',{removeItemButton: true});
 new Choices('#work-types',{removeItemButton: true});
 

    /* passing unique values */
    var textUniqueVals = new Choices('#choices-text-unique-values', {
        allowHTML: true,
        paste: false,
        duplicateItemsAllowed: false,
        editItems: true,
    });
  



})();