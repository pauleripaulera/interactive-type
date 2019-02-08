//CONSOLE INFO
    console.log('––––––––––––––––––––');
    console.log('project');
    console.log('info');
    console.log('date');
    console.log('––––––––––––––––––––');

    //TOGGLE INFO BOX SHOW HIDE–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    document.getElementById('info').addEventListener('click', function() {
      let infoBox = document.getElementsByClassName('info')[0];
      if (infoBox.style.visibility === "hidden"){ infoBox.style.visibility = "visible";
                                                  infoBox.style.opacity = "1";}
      else { infoBox.style.visibility = "hidden";
             infoBox.style.opacity = "0";}
    });
    
    document.getElementById('closeInfo').addEventListener('click', function() {
      document.getElementsByClassName('info')[0].style.visibility = 'hidden';
      document.getElementsByClassName('info')[0].style.opacity = "0";
    });
    
    // FONT SIZE SLIDER  –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    
    document.getElementById('slider').addEventListener('input', function (value) {
      setFontSize(value);
    });

    function setFontSize (value) {
      var size = document.getElementById('result').style.fontSize = document.getElementById('slider').value + "vw";
      document.getElementById('result').style.letterSpacing = 0.5 / (0.05 * document.getElementById('slider').value + 2.2) - 0.2 + "em";
      var height = document.getElementById('result').style.lineHeight = -67/(Math.exp(1/50*document.getElementById('slider').value))+67 + "vw";
    }
    setFontSize();
    
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    
    //START AUDIO –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    //change displayed text based on size of window
    const mq = window.matchMedia( "(min-width: 813px)" );
    if (!mq.matches) fontContainer.innerHTML = "hello.";
    window.addEventListener("resize", function(){
      if (!mq.matches) fontContainer.innerHTML = "hello.";
      if (mq.matches) fontContainer.innerHTML = "hello. how are you?";
    });
    
    // showing and hiding controls for starting and stopping
    hideControls();
    function start() {
      setupVolumeMeter();
      showControls();
      switchState = "audio";
    }
    
    function stop() {
      switchState = "stop";
      hideControls();
    }
    
    function showControls() {
      document.getElementById('audio-btn').style.display = "block";
    }
    function hideControls() {
      document.getElementById('audio-btn').style.display = "none";
    }

    //EVENT LISTENER FOR START STOP AND AUDIO VIDEO –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    
    document.getElementById("start").addEventListener("click", function(value) {
      if (document.getElementById("start").value !=="start"){
        document.getElementById("start").value = "start";
        start();
        document.getElementById("start").innerHTML="stop!";
        
      }
      else {
        document.getElementById("start").value = "stop";
        stop();
        document.getElementById("start").innerHTML="start!";
        document.getElementById("audio-btn").classList.remove("active");
        }
    })
    //kickoff the audio.js script
    document.getElementById('audio-btn').addEventListener("click", function(value)  {
      switchState = "audio";
      setupVolumeMeter();      
      document.getElementById("audio-btn").classList.add("active");
    });
      
    //kickoff the speech.js script for speech recognition
    document.getElementById('voice-start').addEventListener("click", function(value)  {
      startDictation();
    });
    
    
    //END –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    //SETUP HEADER ELEMENTS FOR WIDTH, WEIGHT INFO OF TYPEFACE–––––––––––––––––––––––––––––––––––––––––––––––––––––––
    var width;
    var weight;
    var axesInfo = document.getElementsByClassName('header-item')[4];
      function setupHeaderElements() {
        axesInfo.innerHTML = 'weight ' + weight.toFixed() + '</br>width ' + width.toFixed();
      }
    

    //GOOGLE SUGGEST  –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    //for speech recognition
    var strippedData;

    function googleFunction (data){
      var string = JSON.stringify(data[1]);
      strippedData = string.split(',');
      console.log(strippedData);
      if (strippedData[1]) {
        document.getElementById('result').value = strippedData[0].substr(1).replace(/['"]+/g, '') + '.';
      }
      else {
        document.getElementById('result').value = result.slice(0, -1) + '.';
      }
    }

    function googleScript(){   
      var script = document.createElement('script');
      script.src = "https://suggestqueries.google.com/complete/search?client=firefox&q=" + result + "&callback=googleFunction";
      document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    }
    
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    

    //MAP FUNCTION
    function map (num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    //SPLICE FUNCTION FOR UNIT8ARRAY
    function splice(arr, starting, deleteCount, elements) {
      if (arguments.length === 1) {
        return arr;
      }
      starting = Math.max(starting, 0);
      deleteCount = Math.max(deleteCount, 0);
      elements = elements || [];


      const newSize = arr.length - deleteCount + elements.length;
      const splicedArray = new arr.constructor(newSize);

      splicedArray.set(arr.subarray(0, starting));
      splicedArray.set(elements, starting);
      splicedArray.set(arr.subarray(starting + deleteCount), starting + elements.length);
      return splicedArray;
    };