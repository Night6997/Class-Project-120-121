function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier=ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded(){

  console.log("Model loaded ");

}


function draw(){

  image(video, 0,0, 300,300);
  classifier.classify(video,gotResults);

}

var previous_results="";

function gotResults(error,results){

  if(error){

    console.error(error);

  }
  else{

    if((results[0].confidence > 0.5) && (previous_results != results[0].label)){

      console.log(results);
      previous_results=results[0].label;
      synth=window.speechSynthesis;
      speak_data="The object is "+ results[0].label;
      utterThis=new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("span1").innerHTML=results[0].label;
      document.getElementById("span2").innerHTML=results[0].confidence.toFixed(3);

    }

  }

}
