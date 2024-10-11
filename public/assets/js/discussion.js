 

const socket = io();
let task = $('#task_id').val(); 
socket.emit('joinRoom', task); 

// Handle form submission
$('#chat-disscussion').submit(function(e) {
    e.preventDefault();
    const user = $('#user_id').val();
    const message = $('#textcontent').val().trim();
    const mediafile = $('#media_file')[0];
    if(message==='' && mediafile.files.length == 0){return false;}

    const data = { task, user, message }; 
    if (mediafile.files.length > 0) {
        const formData = new FormData();
        formData.append('media', mediafile.files[0]);

        $.ajax({
            url: '/files/chat-upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(mediaData) {
                data.mediaurl = mediaData.mediaurl;
                data.mediatype = mediaData.mediatype;
                socket.emit('newMessage', data);
                mediafile.value = ''; 
                $('#media-preview').hide();  
            },
            error: function(err) {
                console.error(err);
            }
        });
    } else {
        data.mediaUrl = null;
        data.mediaType = null;
        socket.emit('newMessage', data);
    }

    $('#message').val('');
});

chatdays();
scrollToBottom();

// Function to add message to the list
socket.on('newMessage', (data) => {  
    const content =  $('<li>').html(` 
        <div>
            <span class="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                <img src="/${data.user.profilepic}">
            </span>
            <p class="text-muted mb-2">
                <span class="text-default"><b>${data.user.firstname} ${data.user.lastname}</b>  </span>. <span class="float-end fs-11 text-muted time"   data-timestamp="${data.timestamp}">${moment(data.timestamp).fromNow()}</span>
            </p>
            <p class="text-muted mb-0">
            ${data.message}
            </p>
        </div> 
        `);

  if (data.mediaurl !== null && data.mediaurl !== undefined) {

       if(data.mediatype === 'image')
       {
        var mediacontent = `<p class="profile-activity-media mb-0"><a href="${data.mediaurl}"><img src="${data.mediaurl}" class="glightbox card"></a></p>`;
       }
       else{
        var mediacontent = `<p class="profile-activity-media mb-0"><a href="${data.mediaurl}" class="glightbox" data-gallery="video-gallery" data-type="video"><video   width="50%" src="${data.mediaurl}" ></a></video></p>`;
       }
        content.append(mediacontent);
    }

    $('#chatmessages ul').append(content);
    $('#textcontent').val('');
    scrollToBottom();
    chatdays();
    lightbox = GLightbox({selector: '.glightbox' });
});
 
 

function scrollToBottom() {
    const chatbox = document.getElementById('chatmessages');
    chatbox.scrollTop = chatbox.scrollHeight;
}

$('#select-media').click(function () {
    $('#media_file').click();
});


(function () {
    "use strict";
    const lightbox = GLightbox({
        selector: '.glightbox',  
        touchNavigation: true, 
        autoplayVideos: true    
    });

})();



 
setInterval(function () { chatdays() }, 3000); 

  function chatdays() {
    document.querySelectorAll('#chatmessages span.time').forEach(function (element) {
        var messageTime = element.getAttribute('data-timestamp');
        var formattedTime;

        if (moment().isSame(messageTime, 'day')) {
            formattedTime = moment(messageTime).fromNow();  //.format('hh:mm A');  
        } else if (moment().diff(messageTime, 'days') === 1) {
            formattedTime = 'Yesterday at ' + moment(messageTime).format('hh:mm A');
        } else if (moment().diff(messageTime, 'days') <= 7) {
            formattedTime = moment(messageTime).format('dddd [at] hh:mm A');  
        } else {
            formattedTime = moment(messageTime).format('MMMM D, YYYY [at] hh:mm A');  
        }
        element.textContent = formattedTime;
    });
}