$(function() {
    $("#submit").on('click', function(){

        var learnFile = $('#learn')[0].files[0];
        var detectFile = $('#detect')[0].files[0];
        var algorithm = $('#algorithm').val();
        learnFile.text().then(leartext => {
            detectFile.text().then(detecttext => uploadData(
                JSON.stringify({
                    algorithm: algorithm,
                    train_data: csvtodict(leartext),
                    detect_data: csvtodict(detecttext)
                })
            ));
        });
    });
});

// Sending AJAX request and upload file
function uploadData(formdata){

    $.ajax({
        url: '/detect',
        type: 'post',
        data: formdata,
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