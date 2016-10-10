"use strict";

define(["jquery"], function($) {

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
        

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');


    function addTodoEntry( submitForm ) {
        var textForm = submitForm.find("#textToSubmit").val(); 

        // Send the data using post
        var addTodoUrl = "todo/";

        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
                
        var posting = $.post( addTodoUrl, {'text': textForm, 'done': false});
 
        // Put the results in a div
        posting.done(function( data ) {
            $("#insert-here").append("<tr class='todo-row' entryId='" + data.id +"'>" + 
                "<td class='col-md-1'><input autocomplete='off' type='checkbox'></td>" + 
                "<td class='todo-text'>" + data.text + "</td>" + 
                "<td class='col-md-1'><span class='glyphicon glyphicon-remove delete-button'></span></td>" + 
                "</tr>");
        });
    }

    function doneTodoEntry(todoRow) {
        var entryId = todoRow.attr("entryId");
        
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });

        var doneTodoUrl = "/todo/done/" + entryId;
        $.ajax({ 
            url: doneTodoUrl,
            type: "PUT"
        }).done(function(data) {
            var isDone = data.isDone;
            todoRow.find("input[type='checkbox']").prop("checked", isDone);
            todoRow.find("td.todo-text").css("text-decoration", isDone ? "line-through" : "none");
            todoRow.find("span.delete-button").css("visibility", isDone ? "visible" : "hidden");
        });
    }

    function deleteTodoEntry(clickedSpan) {
        var entryId = clickedSpan.closest("tr").attr("entryId");

        var deleteUrl = "/todo/" + entryId;
        $.ajax({ 
            url: deleteUrl.url,
            type: "DELETE",
            success: function() { clickedSpan.closest("tr").remove(); }
        });
    }

    return {
        addTodoEntry: addTodoEntry,
        doneTodoEntry: doneTodoEntry,
        deleteTodoEntry: deleteTodoEntry
    }
});
