function clipboard(btnSel,dataSel){
    var btn=$(btnSel);
    var client=btn[0];
    btn.css('opacity',1).click(function(){
        var textArea=document.createElement('textarea');
        var style=textArea.style;
        style.position='absolute';
        style.top=0;style.left=0;
        style.width='2em';style.height='2em';
        style.opacity=0;textArea.value=$(dataSel).text();document.body.appendChild(textArea);
        try{
            textArea.select();
            if(document.execCommand('copy')){
                btn.tooltip({
                    title:'Copied!',trigger:'manual',placement:'right'
                });
            btn.tooltip('show');
            setTimeout(function(){
                btn.tooltip('hide')
                },
                1000);
            }
        }
        finally{
            document.body.removeChild(textArea);
        };
    });
}
function getWithRetry(url,cb,t){
    t=t||250;$.get(url,function(data){
        if(data=="busy"){
            setTimeout(function(){
                getWithRetry(url,cb,t+250);
            },t);
        }else cb(data);
    });
}
$(document).ajaxError(
    function(e,xhr){
        if(xhr.status==503)location.reload();
});
