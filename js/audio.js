// Volume Meter

var switchState;
var source; 
var analyser;
const fontContainer = document.getElementById( "result" );
var lastClip;
const clipLag = 550;
var clipping = false;

function setupHeaderElementsAudio() {
      //setting up the html spans for displaying the current variable font setting
      var newP = document.createElement('p');
      var newSpan = document.createElement('span');
      var newSpan2 = document.createElement('span');
      newP.setAttribute("class", "logo");
      newSpan.setAttribute("id", "volumeMeter");
      newSpan2.setAttribute("id", "volumeMeter2");
      //actually creating the HTML
      document.getElementsByTagName('header')[0].appendChild(newP).appendChild(newSpan);
      document.getElementsByTagName('header')[0].appendChild(newP).appendChild(newSpan2);
    }


function didntGetStream() {
    alert('Sorry something didn’t work.');
}

function checkClipping() {
  //not working right now
			if (!clipping)
				return false;
			if ((lastClip + clipLag) < window.performance.now())
				clipping = false;
			return clipping;
}

function meterVolumeInRealTime(analyser, stream){
  
  async function meterLoop(){
    //this is the loop which is analyising the audio input and updating the variable font
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    
    
    analyser.getByteFrequencyData(dataArray);
    
    var highFrequencies = dataArray.slice(4, 255);
    var lowFrequencies = dataArray.slice(0, 1);
    //console.log(lowFrequencies);
    
    
    var highSum = highFrequencies.reduce((a, b) => a + b, 0);
    var lowSum = lowFrequencies.reduce((a, b) => a + b, 0);
    
    var lowVolume = lowSum / (lowFrequencies.length * 32);
    var highVolume = highSum / (highFrequencies.length * 32);
    
    // ... then take the square root of the sum.
    var lowRms =  Math.sqrt(lowSum / bufferLength/2);
    var highRms =  Math.sqrt(highSum / bufferLength/2);
    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
     highVolume = Math.max(highRms, highVolume*0.95);
     lowVolume = Math.max(lowRms, lowVolume*0.95);
    
    //do the fontvariations magic
    fontContainer.style.setProperty('--style-setting', " \'STYL\' 0, \'wdth\'" + map(lowVolume, 0, 10, 100, 200));
    fontContainer.style.setProperty('--f-weight', map(highVolume, 0, 10, 100, 200));
    //fontContainer.style.setProperty('--f-stretch', map(lowVolume, 3, 10, 100, 200)); //font-stretch css is not yet supported in chrome, thus you need to use font-variation-settings
    
    //set width and weight variables for the info box and call the function
    width = map(lowVolume, 0, 10, 100, 200);
    weight = map(highVolume, 0, 10, 100, 200);
    setupHeaderElements();
    //break loop if stop is clicked
    if (switchState === 'stop') {
      console.log(switchState);  
      stopVolumeMeter(stream);
      return;
      }
    
    //loop
    requestAnimationFrame(meterLoop);
  }
  meterLoop();
}

function stopVolumeMeter(stream) {
  //console.log(stream);
  let tracks = stream.getTracks();

  tracks.forEach(function(track) {
    track.stop();
  });
}

async function setupVolumeMeter() {
  //make audio-btn (button) active
  document.getElementById('audio-btn').classList.add("active");
  // grab an audio context
  var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 
  if (AudioContext) {
    context = new AudioContext();
    //console.log(context);
    let constraints = {audio : true, video : false }
    // Attempt to get audio input        
    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {

    // Create an AudioNode from the context.
    source = context.createMediaStreamSource(stream);
    //create analyser
    analyser = context.createAnalyser();
    analyser.fftSize = 512;
    //connect it to analyser
    source.connect(analyser);

      //kick off loop
      meterVolumeInRealTime(analyser, stream);
      })
    .catch(function(err) {
    /* handle the error */
      alert('error');
    });
  } else {
     alert("Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome");
  }
}
