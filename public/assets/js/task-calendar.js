(function () {
    "use strict";
     
    var Taskcalendar  = document.getElementById('task-calendar');  
    var calendar = new FullCalendar.Calendar(Taskcalendar, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      defaultView: 'month',
      navLinks: true,  
      businessHours: true,  
      editable: false,
      selectable: true,
      selectMirror: true,
      droppable: false,  
   
      eventClick: function (arg) { 
        $('#taskdetails').modal('show'); 
      },
  
      editable: true,
      dayMaxEvents: true,  
      eventSources: [sptCalendarEvents, sptBirthdayEvents, sptHolidayEvents, sptOtherEvents,sptOtherEvents2],
  
    });
    calendar.render(); 
  
  })();
  