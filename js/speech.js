//SPEECH RECOGNITION

var result = null;
    function startDictation() {
      startText = document.getElementById('voice-start').innerHTML;
      if (window.hasOwnProperty('webkitSpeechRecognition')) {

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = "en-UK";
        recognition.start();
        document.getElementById('result').className += " stroke";
        document.getElementById('voice-start').innerHTML = 'listening...';

        recognition.onresult = function(e) {
          document.getElementById('result').innerHTML
                                   = e.results[0][0].transcript.toLowerCase();
          //document.getElementById('textInput').innerHTML
                                   //= e.results[0][0].transcript.toLowerCase() + ' ';

          result = e.results[0][0].transcript.toLowerCase() + ' ';          

          recognition.stop();
          document.getElementById('voice-start').innerHTML = startText;

          googleScript();
          writeLogFile(result);
        }; 
        recognition.onend = function(e){
          document.getElementById('voice-start').innerHTML = startText;
        }
        recognition.onerror = function(e) {
          document.getElementById('voice-start').innerHTML = startText;
          //document.getElementById('result').classList.remove("stroke");
          recognition.stop();

        }
      }
    }