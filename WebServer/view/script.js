$(function() {
    $("#form").on('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        var learnFile = $('#learn')[0].files[0];
        var detectFile = $('#detect')[0].files[0];
        var algorithm = $('#algorithm').val();

        learnFile.text().then(learnText => {
            detectFile.text().then(detectText => uploadData(
                JSON.stringify({
                    algorithm: algorithm,
                    train_data: csvToDict(learnText),
                    detect_data: csvToDict(detectText)
                })
            ));
        });
    });
});

// Sending AJAX request and upload file
function uploadData(formData){

    $.ajax({
        url: '/detect',
        type: 'post',
        data: formData,
        contentType: 'application/json',
        processData: false,
        dataType: 'json',
        success: function(response){
            console.log(response);
        },
        error: function(){
            alert("Unexpected error occured!")
        }
    });
}


function csvToDict(data){
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