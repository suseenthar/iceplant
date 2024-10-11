 
/* TargetDate Picker */
flatpickr("#reminderdate", {
  enableTime: true,
  dateFormat: "Y-m-d",
});
$('#remindersTable').DataTable({});
/* For Delete Contact */
let invoicebtn = document.querySelectorAll(".contact-delete");
invoicebtn.forEach((eleBtn) => {
  eleBtn.onclick = () => {
    let invoice = eleBtn.closest(".crm-contact");
    invoice.remove();
  };
});

//CREATE REMAINDER
$('#createReminder').submit(function(event) {
    event.preventDefault();  
    var formData = $(this).serialize(); 
    $.ajax({
      type: 'POST',
      url: '/reminders/create',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) {   
        Swal.fire({
            title: 'Reminder created successfully!',
            icon: 'success', 
            showDenyButton: false,
            showCancelButton: false,
        }).then(() => {
            window.location.href = '/reminders';  
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


  // fixed header
  new gridjs.Grid({
    pagination:false,
    search: true,
    sort: true,
    fixedHeader: true,
    height: '500px',
    columns: [
          {
          name: "Channel",
          width: "150px",
          },{
          name: "Date",
          width: "150px",
          },{
          name: "Status",
          width: "200px",
          },{
          name: "ID",
          width: "150px",
          }
   ],
    data: [
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013"],
        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014"],
        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015"],
        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013"],
        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014"],
        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015"],
        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013"],
        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014"],
        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015"],
        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013"],
        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014"],
        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015"],
        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013"],
        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014"],
        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015"],
        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013"],
        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014"],
        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015"],
        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013"],
        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014"],
        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015"],
        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
        ["12-09-2022 04:24", "mark", "markzenner23@gmail.com", "#12013"],
        ["18-11-2022 18:43", "eoin", "eoin1992@gmail.com", "#12014"],
        ["10-09-2022 10:35", "sarahcdd", "sarahcdd129@gmail.com", "#12015"],
        ["27-10-2022 09:55", "afshin", "afshin@example.com", "#12016"],
        ["24-10-2022 12:47", "john", "john123@gmail.com", "#12012"],
    ],
}).render(document.getElementById("grid-header-fixed"));
// fixed header


function getdetails(id)
{  
   $.ajax({
    type: 'POST',
    url: '/reminders/details',   
    data: {reminder_id:id},  
    dataType: 'json',  
  })
  .done(function(response) {   
     
       $('#createdby').html(response.data.createdAt.firstname)
  })
  .fail(function(jqXHR, textStatus, errorThrown) { 
      Swal.fire({
          icon: 'error',
          title: 'Oops...Validation failed', 
      }) 
       
  });

  return false;

}