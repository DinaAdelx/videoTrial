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



  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);

  try {
    // Generate chatbot response
    const response = await getValue();

    // Add chatbot response to conversation
    message = document.createElement('div');
    message.classList.add('chatbot-message','chatbot');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
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
    return fetch('/get-variable')
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


