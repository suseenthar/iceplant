/* DueDate Picker */
flatpickr("#saledate", {enableTime: false,dateFormat: "Y-m-d"});

//CREATE SALES
$('#createsales').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize();
 
    $.ajax({
      type: 'POST',
      url: '/sales/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        $('#create-sales').modal('hide');
        Swal.fire({
            title: 'Sales created successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/sales';  
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


    $('select[name="products"]').on('change', function() {
      const selectedOption = $(this).find('option:selected'); 
      const price = selectedOption.data('price'); 
      if (price) {  
        $('#product-price').val(price);
      } else {
        $('#product-price').val('');  
      }
    });
 

    
    $('select[name="customer"]').on('change', function() {
        const selectedOption = $(this).find('option:selected'); 
        const discount = selectedOption.data('discount'); 
        if (discount) {  
          $('#discountpercentage').text(discount);
          $('#discount').val(discount);
        } else {
          $('#discountpercentage').text('0');
          $('#discount').val(0);  
        }
      });

      $(document).ready(function() {

      function calculateTotals() { 
        const pricePerUnit = parseFloat($('#product-price').val()) || 0;
        const quantity = parseInt($('#productqty').val()) || 0;

        const selectedOption = $('select[name="customer"]').find('option:selected'); 
        const discountpc = selectedOption.data('discount'); 


        const discountPercentage = parseFloat(discountpc) || 0;
     
        $('#price-per-unit').val(pricePerUnit.toFixed(2) * quantity);
     
        const subtotal = pricePerUnit * quantity;
        
     
        const discount = (subtotal * discountPercentage) / 100;

        $('#discount').val(discount);
     
        const cgst = (subtotal - discount) * 0.025;   
        const sgst = (subtotal - discount) * 0.025;  
     
        const grandTotal = subtotal - discount + cgst + sgst;
     
        $('#subtotal').val(subtotal.toFixed(2));
        $('#total').val((subtotal - discount).toFixed(2));  
        $('#cgst').val(cgst.toFixed(2));
        $('#sgst').val(sgst.toFixed(2));
        $('#grandtotal').val(grandTotal.toFixed(2));
      } 
        $('select[name="products"],select[name="customer"], #productqty,#product-price, #discount,.proqty').on('input change click', function() {
          calculateTotals();
        });
      });