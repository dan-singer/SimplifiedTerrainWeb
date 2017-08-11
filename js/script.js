
window.onload = function(){

};

document.onclick = function(event){
    if (event.target.nodeName == "INPUT"){
        gameInstance.SendMessage("Terrain", "FromJS_SetWebGLInput", 0);
    }
    else{
        gameInstance.SendMessage("Terrain", "FromJS_SetWebGLInput", 1);        
    }
};


function ValidateInputsThenApply()
{
    var foundErr = false;
    var inputs = document.getElementsByTagName("INPUT");
    //Validate
    Array.from(inputs).forEach(function(input, index){
        if (foundErr)
            return;
        if (input.parentElement.parentElement.id == "input_area"){
            if (input.value == "" ){
                alert("Please enter valid urls");
                foundErr = true;
            }
        }
    });
    if (foundErr)
        return;

    //Send the urls to unity
    gameInstance.SendMessage("Terrain", "FromJS_LoadHeightmap", inputs[0].value);
    gameInstance.SendMessage("Terrain", "FromJS_LoadTerrainTex", inputs[1].value);
    
}