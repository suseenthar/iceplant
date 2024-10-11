(function () {
    "use strict"

 new Choices('#worktype',{allowHTML: true,removeItemButton: true}); 
 new Choices('#select-customer',{allowHTML: false,removeItemButton: true}); 
 
    // for publish date picker
    flatpickr("#aptdate");
    flatpickr("#engineerdate");
    flatpickr("#customerdate");
 
    flatpickr("#arrivaltime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", 
    });
 
     flatpickr("#departuretime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i", 
    });  

})();


  // file export datatable
  $('#checklist-export').DataTable({
    dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    language: {
        searchPlaceholder: 'Search...',
        sSearch: '',
    },
});

const EGcanvas = document.getElementById('engineer-signature-pad');
const EGsignaturePad = new SignaturePad(EGcanvas);

const CRcanvas = document.getElementById('customer-signature-pad');
const CRsignaturePad = new SignaturePad(CRcanvas);

EGcanvas.addEventListener('pointerup', EGsignaturePadEndStroke);
EGcanvas.addEventListener('touchend', EGsignaturePadEndStroke);
CRcanvas.addEventListener('pointerup', CRsignaturePadEndStroke);
CRcanvas.addEventListener('touchend', CRsignaturePadEndStroke);

function EGsignaturePadEndStroke() {
    if (!EGsignaturePad.isEmpty()) {
        var EGdata = EGsignaturePad.toDataURL('image/png');  
     var sigData = {sign: EGdata};
    $.ajax({
        type: 'POST',
        url: '/sign/upload',   
        data: sigData,  
        dataType: 'json',  
      })
      .done(function(response) { 
        $("#egsign").val(response.filename); 
      })

     }
  }
 

  function CRsignaturePadEndStroke() {
    if (!CRsignaturePad.isEmpty()) {
         var CRdata = CRsignaturePad.toDataURL('image/png');  
    var sigData = {sign: CRdata};
    $.ajax({
        type: 'POST',
        url: '/sign/upload',   
        data: sigData,  
        dataType: 'json',  
      })
      .done(function(response) { 
        $("#crsign").val(response.filename); 
      })

     }
  }
 
 
  $('#createchecklist').submit(function(event) {
    event.preventDefault();    

   /* if ($("#egsign").val()=='') {
    $("#engineer-signature-pad").css( 'border-color','#FF0000'); return false;
    }

    if ($("#crsign").val()=='') {
    $("#customer-signature-pad").css( 'border-color','#FF0000'); return false;
    }   */

    var formData = $(this).serialize(); 
    $.ajax({
      type: 'POST',
      url: '/checklists/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) { 
        Swal.fire({
            title: 'Form created successfully!',
            icon: 'success',
            html: 'You can view send and download the checklist form',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'View',
            denyButtonText: `Download`,
        }).then((result) => {
            if (result.isConfirmed) {
                $(location).attr('href','/checklists/view/'+response.id)
            } else if (result.isDenied) {
                $(location).attr('href','/checklists/view/'+response.id)
            }
        })
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        Swal.fire({
            icon: 'error',
            title: 'Oops...Checklist validation failed', 
        }) 
         
    });
    return false;
  });


 
//SEND MAIL
function sendchecklistmail(id)
 { 
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to send mail to the customer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, send it!'
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'Mail Sent!',
            'The checklist mail sent to the customer.',
            'success'
        )
    }
    })  
} 


 
$('#addRow').click(function () {
    var lastRow = $('#goodstable tbody tr:last'); 
    var newRow = lastRow.clone();  
     newRow.find('input').val('');
    $('#goodstable tbody').append(newRow);
});

 $(document).on('click', '.deleteRow', function () {
    var rowCount = $('#goodstable tbody tr').length;
    if(rowCount>1){
    $(this).closest('tr').remove();
    }
});
 