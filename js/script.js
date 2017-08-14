
var viewingGL = false;
var justPressedReturn = false;
var justPressedAlt = false;

function HandleSceneLoaded(){
    document.getElementById("loader").style.display = "none";

    document.addEventListener("pointerlockchange", function(event){
        if (document.pointerLockElement == null){
            if (!justPressedReturn && !justPressedAlt)
                ResetAndHidePlayer(true);       
        }
    });


    document.onkeydown = function(event){
        justPressedAlt = true;
        setTimeout(function(){justPressedAlt = false;}, 100);
    }

}

function HandleEscapePressedFromWebGL(){
    ResetAndHidePlayer(false);
}

function HandleReturnPressedFromWebGL(){
    console.log("Pressed return");
    justPressedReturn = true;
    setTimeout(function(){justPressedReturn = false;}, 100);
}


function ResetAndHidePlayer(sendResetMessage){
    if (sendResetMessage)
        gameInstance.SendMessage("Terrain", "FromJS_Reset");    
    document.getElementById("unity").style.display = "none";
    //Some weird hack we need to do to get button presses to register again 
    document.getElementById("input_area").click();
    viewingGL = false;
}


document.onmousedown = function(event){
    
    if (viewingGL){
        if (event.target.nodeName != "CANVAS"){
            document.getElementById("unity").style.display = "none";            
            viewingGL = false;
        }
    }
    else{
        if (event.target.nodeName == "INPUT"){
            gameInstance.SendMessage("Terrain", "FromJS_SetWebGLInput", 0);
        }
        else{
            gameInstance.SendMessage("Terrain", "FromJS_SetWebGLInput", 1);        
        }
    }
};


function ValidateInputsThenApply()
{
    //Prevent phantom clicks by hitting space.
    if (viewingGL)
        return;
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

    document.getElementById("unity").style.display = "block";

    //Send the urls to unity
    gameInstance.SendMessage("Terrain", "FromJS_LoadHeightmap", inputs[0].value);
    gameInstance.SendMessage("Terrain", "FromJS_LoadTerrainTex", inputs[1].value);

    //To make we don't immediately close the unity popup window when setting viewingGL to true
    setTimeout(function(){viewingGL = true;}, 100);
    
}