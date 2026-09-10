 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

 if (!SpeechRecognition) {
     alert("Speech Recognition is not supported in this browser.");
 }

 const recognition = new SpeechRecognition();

 recognition.lang = "en-US";
 recognition.interimResults = false;
 recognition.continuous = false;

 function speak(text) {

     window.speechSynthesis.cancel();

     let speech = new SpeechSynthesisUtterance(text);

     speech.lang = "en-US";
     speech.rate = 1;
     speech.pitch = 1;
     speech.volume = 9;

     window.speechSynthesis.speak(speech);

 }

 function listen() {

     document.getElementById("status").innerHTML = "🎤 Listening...";

     recognition.start();

 }

 recognition.onresult = function(e) {

     let command = e.results[0][0].transcript.toLowerCase();

     document.getElementById("command").innerHTML = "You Said:<br><b>" + command + "</b>";

     document.getElementById("status").innerHTML = "Processing...";

     // Greetings
     if (command.includes("hello")) {

         speak("Hello! Welcome.");

     } else if (command.includes("how are you")) {

         speak("I am fine. Thank you come agin.");

     }

     // Facebook
     else if (command.includes("facebook")) {

         speak("Opening Facebook.");

         setTimeout(() => {
             window.open("https://facebook.com", "_blank");
         }, 1000);

     }

     // Google
     else if (command.includes("google")) {

         speak("Opening Google.");

         setTimeout(() => {
             window.open("https://google.com", "_blank");
         }, 1000);

     }


     // Open Shop
     else if (
         command.includes("open ") ||
         command.includes("shop open")
     ) {

         speak("Opening the shop.");

         setTimeout(() => {
             openShop();
         }, 1000);

     }

     // Close Shop
     else if (
         command.includes("close  ") ||
         command.includes("shop close")
     ) {

         speak("Closing the shop.");

         setTimeout(() => {
             closeShop();
         }, 1000);
     }


     // YouTube
     else if (command.includes("youtube")) {

         speak("Opening YouTube.");

         setTimeout(() => {
             window.open("https://youtube.com", "_blank");
         }, 1000);

     }

     // admin
     else if (command.includes("admin")) {

         speak("Welcome to  Admin Dashboard .");

         setTimeout(() => {
             window.location.href = "index.html";
         }, 1000);

     }

     // Cart
     else if (command.includes("cart")) {

         speak("Opening Cart.");

         setTimeout(() => {
             window.location.href = "cart.html";
         }, 1000);

     }

     //speak all order
     else if (command.includes("all order")) {

         speak("Opening Admin Hahahahah.");

         setTimeout(() => {
             window.location.href = "forclientpin.html";
         }, 1000);

     }

     // Admin
     else if (command.includes("remote")) {

         speak("Opening Admin.");

         setTimeout(() => {
             window.location.href = "remote.html";
         }, 1000);

     }

     // Time
     else if (command.includes("time")) {

         let t = new Date();

         let time = t.toLocaleTimeString();

         speak("Current time is " + time);

     }

     // Date
     else if (command.includes("date")) {

         let d = new Date();

         let date = d.toDateString();

         speak("Today is " + date);

     }

     // Stop
     else if (command.includes("stop")) {

         window.speechSynthesis.cancel();

     }

     // Search
     else if (command.startsWith("search")) {

         let q = command.replace("search", "").trim();

         if (q != "") {

             speak("Searching " + q);

             setTimeout(() => {

                 window.open("https://www.google.com/search?q=" + encodeURIComponent(q), "_blank");

             }, 1000);

         }

     }

     // Reload
     else if (command.includes("refresh")) {

         location.reload();

     }

     // Back
     else if (command.includes("back")) {

         history.back();

     }

     // Forward
     else if (command.includes("forward")) {

         history.forward();

     }

     // Close
     else if (command.includes("close tab")) {

         speak("Sorry. Browsers do not allow JavaScript to close tabs unless they were opened by the script.");

     }

     // Unknown
     else {

         speak("Sorry. I don't understand that command.");

     }

     document.getElementById("status").innerHTML = "Done.";

 }

 recognition.onerror = function(e) {

     document.getElementById("status").innerHTML = e.error;

 }