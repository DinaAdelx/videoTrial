// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

inputForm.addEventListener('submit', async function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;


  /* to send the value because its the only way */
// Capture the value you want to send
var valueToSend = "Hello from JavaScript!";

// Make an HTTP POST request to the server
fetch('/send-value', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ value: input })
})
.then(response => {
  if (response.ok) {
    console.log('Value sent successfully!');
  } else {
    console.error('Failed to send value');
  }
})
.catch(error => {
  console.error('Error:', error);
});
/********************************************************/
/* so far we have recieved a value from user .. this will be used later because we need it in the model for further use
>> now lets head to the important part which is the video display

*/


  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);


/* here is where we start >> this area is suppose to get the value from the python which in the first case is a string but here in this case is a video 
>> so where suppose to get the video and display it in the html*/

  
  try {
    // Generate chatbot response
    const response = await getValue();

    // Add chatbot response to conversation
    message = document.createElement('div');
    message.classList.add('chatbot-message','chatbot');
    message.innerHTML = `<video controls>
            <source src="${response}" type="video/mp4">
            Your browser does not support the video tag.
        </video>`;
   // message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
    conversation.appendChild(message);
    message.scrollIntoView({behavior: "smooth"});
  } catch (error) {
    console.error('Error:', error);
    // Handle the error as needed
  }
});




async function getValue() {
  try {
    const variableValue = await getVariableFromPython();
    console.log("Variable value:", variableValue);
    return variableValue;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the event listener
  }
}


function getVariableFromPython() {
  document.addEventListener('DOMContentLoaded', function() {
    fetch('/get-video')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            // Create a URL for the blob object representing the video file
            const videoUrl = URL.createObjectURL(blob);

            // Create a video element and set its source to the URL
            const videoElement = document.createElement('video');
            videoElement.src = videoUrl;
            videoElement.controls = true;

            // Append the video element to the DOM (e.g., to a specific div)
            const videoContainer = document.getElementById('video-container');
            videoContainer.appendChild(videoElement);
        })
        .catch(error => {
            console.error('Error fetching video:', error);
        });
});

  /*
    return fetch('/get-video')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.value;
        })
        .catch(error => {
            console.error('Error:', error);
            return ''; // Return an empty string or handle the error as needed
        });
        */
}

async function getValue() {
  try {
    const variableValue = await getVariableFromPython();
    console.log("Variable value:", variableValue);
    return variableValue; // Return the variable value
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the event listener
  }
}


