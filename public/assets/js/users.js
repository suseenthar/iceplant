$('#submitBtnC').click(function(event) {
    event.preventDefault();  
    var formData = {
        username: $('#username').val(),
        password: $('#password').val()
    };
 
    $.ajax({
      type: 'POST',
      url: '/login',   
      data: formData,  
      dataType: 'json',  
    })
    .done(function(response) { 
        $(location).attr('href','/dashboard')
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        $(location).attr('href','/')
    });
    return false;
  });