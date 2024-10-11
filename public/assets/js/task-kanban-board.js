(function () {
    "use strict"

  var drake=  dragula([document.querySelector('#NEW'), document.querySelector('#TODO'), document.querySelector('#REVIEW'), document.querySelector('#ONGOING'), document.querySelector('#COMPLTED')]);

    var myElement1 = document.getElementById('new-tasks');
    new SimpleBar(myElement1, { autoHide: true });

    var myElement2 = document.getElementById('todo-tasks');
    new SimpleBar(myElement2, { autoHide: true });

    var myElement3 = document.getElementById('inprogress-tasks');
    new SimpleBar(myElement3, { autoHide: true });

    var myElement4 = document.getElementById('inreview-tasks');
    new SimpleBar(myElement4, { autoHide: true });

    var myElement5 = document.getElementById('completed-tasks');
    new SimpleBar(myElement5, { autoHide: true });


    document.addEventListener("DOMContentLoaded", () => {
        setInterval(() => {
            let i = [
                document.querySelector('#NEW'),
                document.querySelector('#TODO'),
                document.querySelector('#REVIEW'),
                document.querySelector('#ONGOING'),
                document.querySelector('#COMPLTED')

            ]
            i.map((ele) => {
                if (ele) {
                    if (ele.children.length == 0) {
                        ele.classList.add("task-Null")
                       // document.querySelector(`#${ele.getAttribute("data-view-btn")}`).nextElementSibling.classList.add("d-none")
                    }
                    if (ele.children.length != 0) {
                        ele.classList.remove("task-Null")
                       // document.querySelector(`#${ele.getAttribute("data-view-btn")}`).nextElementSibling.classList.remove("d-none")
                    }
                }
            })
        }, 100);
    })
 

    drake.on('drop', function (el, target, source, sibling) {
        var formData = {
            id:el.id,
            target:target.id,
            source:source.id
        }; 
        $.ajax({
            type: 'PUT',
            url: '/tasks/status',   
            data: formData,  
            dataType: 'json',  
          })
    });

})();