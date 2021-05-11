$(function() {

    // preventing page from redirecting
    $(document).on("drag dragstart dragover dragenter", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("h1").addClass("d-none");
        $("#drag").removeClass("d-none");
        $('.upload-area').removeClass("border-secondary").removeClass("border-primary").addClass("border-danger");
        //$("#uploadfile h1").text("Drag here");
    });

    $(document).on('dragleave dragend drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("h1").addClass("d-none");
        $("#start").removeClass("d-none");
        $('.upload-area').removeClass("border-primary").removeClass("border-danger").addClass("border-secondary");
        //$("#uploadfile h1").html("Drag and Drop file here<br/>Or<br/>Click to select file");
    });

    // Drag enter
    $('.upload-area').on('drag dragstart dragover dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("h1").addClass("d-none");
        $("#drop").removeClass("d-none");
        $(this).removeClass("border-secondary").removeClass("border-danger").addClass("border-primary");
        //$("#uploadfile h1").text("Drop");
    });

    // Drop
    $('.upload-area').on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();

        $("h1").addClass("d-none");
        $("#uploading").removeClass("d-none");
        //$("#uploadfile h1").text("Uploading");

        var file = e.originalEvent.dataTransfer.files[0];
        file.text().then(text => uploadData(
            JSON.stringify({train_data: csvtodict(text)})
        ));
    });

    // Open file selector on div click
    $(".upload-area").on('click', function(){
        $("#file").trigger("click");
    });

    // file selected
    $("#file").on('change', function(){

        var file = $('#file')[0].files[0];
        file.text().then(text => uploadData(
            JSON.stringify({train_data: csvtodict(text)}) 
        ));
    });
});

// Sending AJAX request and upload file
function uploadData(formdata){

    $.ajax({
        url: '/api/model?model_type=1',
        type: 'post',
        data: formdata,
        contentType: 'application/json',
        processData: false,
        dataType: 'json',
        success: function(response){
            //console.log(response);
            $("h1").addClass("d-none");
            $("#start").removeClass("d-none");
            $('.upload-area').removeClass("border-primary").removeClass("border-danger").addClass("border-secondary");
            //$("#uploadfile h1").html("Drag and Drop file here<br/>Or<br/>Click to select file");
            var button = $(
                `<button type="button" data-id=${response.model_id} data-toggle="list" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"${response.status == "ready" ? "" : " disabled"}></button>`
            ).append(
                `Creating model number: ${response.model_id}`,
                $('<div>',{
                    class: response.status == "ready" ? "fa fa-check-circle-o" : "spinner-border",
                    role: "status",
                    append: $('<span>',{
                        class: "sr-only",
                        text: response.status == "ready" ? "Ready" : "Loading..."
                    })
                })
            ) /* .on("click", function(){
                $(this).addClass("active")
            }) */
            $('.list-group').append(button);
            if(response.status == "pending"){
                setTimeout(function(){
                    checkModelStatus(response.model_id, button)
                },1000);
            }
        },
        error: function(){
            $("h1").addClass("d-none");
            $("#start").removeClass("d-none");
            $('.upload-area').removeClass("border-primary").removeClass("border-danger").addClass("border-secondary");
            //$("#uploadfile h1").html("Drag and Drop file here<br/>Or<br/>Click to select file");
            alert("Unexpected error occured!")
        }
    });
}

function checkModelStatus(modelid, button){
    $.ajax({
        url: `/api/model?model_id=${modelid}`,
        type: 'get',
        contentType: 'application/json',
        processData: false,
        dataType: 'json',
        success: function(response){
            //console.log(response);
            if(response.status == "ready"){
                button.prop("disabled",false);
                button.find("div").removeClass("spinner-border").addClass("fa fa-check-circle-o");
                button.find("span").text("Ready");
                setTimeout(function(){button.text(`Upload predict data for model ${response.model_id}`)},5*1000);
            }
            else if(response.status == "pending"){
                setTimeout(function(){
                    checkModelStatus(response.model_id, button)
                },1000);
            }
        },
        error: function(){
            console.log("Unexpected error occured!");
            //alert("Unexpected error occured!")
        }
    });        
}

function csvtodict(data){
    var lines = data.split("\n");
    var dic={};
    var prop = lines[0].split(",");
    prop.forEach(element => dic[element]=[]);
    for(var i=1; i<lines.length; i++){
        var line = lines[i].split(',');
        prop.forEach( (element, index) => dic[element].push(parseFloat(line[index])) );
    }
    return dic;
}