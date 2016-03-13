'use strict';

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function gotSources(sourceInfos) {
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option');
    option.value = sourceInfo.id;
    if (sourceInfo.kind === 'audio') {
      option.text = sourceInfo.label || 'microphone ' +
        (audioSelect.length + 1);
      audioSelect.appendChild(option);
    } else if (sourceInfo.kind === 'video') {
      option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }
}

if (typeof MediaStreamTrack === 'undefined' || typeof MediaStreamTrack.getSources === 'undefined') {
  alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
} else {
  MediaStreamTrack.getSources(gotSources);
}

function successCallback(stream) {
  window.stream = stream; // make stream available to console
  videoElement.src = window.URL.createObjectURL(stream);
  videoElement.play();
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function start() {
  if (window.stream) {
    videoElement.src = null;
    window.stream.record();
    //window.stream.stop();
  }

  var audioSource = audioSelect.value;
  var videoSource = videoSelect.value;
  var constraints = {
    audio: {
      optional: [{ sourceId: audioSource }]  //get audio sources
    },
    video: {
      optional: [{ sourceId: videoSource }]  // get video sources
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

function startRecording() {
    streamRecorder = webcamstream.record();
    //setTimeout(stopRecording, 10000);
}
function stopRecording() {
    window.stream.stop();
    streamRecorder.getRecordedData(postVideoToServer);
}
function postVideoToServer(videoblob) {
/*  var x = new XMLHttpRequest();
    x.open('POST', 'uploadMessage');
    x.send(videoblob);
*/
    var data = {};
    data.video = videoblob;
    data.metadata = 'test metadata';
    data.action = "upload_video";
    //jQuery.post("http://www.foundthru.co.uk/uploadvideo.php", data, onUploadSuccess);
}
function onUploadSuccess() {
    alert ('video uploaded');
}

audioSelect.onchange = start;
videoSelect.onchange = start;

start();