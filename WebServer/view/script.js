$(function() {
    $("#form").on('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        var learnFile = $('#learn')[0].files[0];
        var detectFile = $('#detect')[0].files[0];
        var algorithm = $('#algorithm').val();

        var data = new FormData();
        data.append('learnFile', learnFile);
        data.append('detectFile', detectFile);
        data.append('algorithm', algorithm);
        uploadData(data);
    });
});

// Sending AJAX request and upload file
function uploadData(formData){

    $.ajax({
        url: '/',
        type: 'post',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response){
            content=""
            content+="<html><body>"
            content+="<table BORDER=2>"
            content+="<TR><TD>Start</TD>"
            content+="<TD>End</TD>"
            content+="<TD>Features</TD></TR>"
            JSON.parse(response).forEach(json => {
                // add data
                content+="<TR><TD>"
                content+=json['start']
                content+="</TD><TD>"
                content+=json['end']
                content+="</TD><TD>"
                content+=json['description']
                content+="</TD></TR>"
            })
            content+="</table></body></html>"
            $('#resultFrame').contents().find('body').html(content);

        },
        error: function(){
            alert("Unexpected error occured!")
        }
    });
}