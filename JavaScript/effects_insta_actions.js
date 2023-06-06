// Account details
//socialordercompany@gmail.com
const account = {
  username: "socialorderaccount",
  password: "industrial4"
};

// Get from local storage
let friend1 = localStorage.getItem('friend1');
let friend2 = localStorage.getItem('friend2');
let friend3 = localStorage.getItem('friend3');


//db
let requestData = { 
  username: account.username, 
  names: [friend1, friend2, friend3] 
};

fetch('/requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestData)
}).then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Assign to HTML
document.getElementById('chosenFriend1').innerText = friend1;
document.getElementById('chosenFriend2').innerText = friend2;
document.getElementById('chosenFriend3').innerText = friend3;

// Set server URL
//http://127.0.0.1/
//http://192.168.0.108/
const serverUrl = "http://192.168.0.108:5000";

// Prepare common data (username, password, friends' names)
const data = {
  user_name: account.username, 
  password: account.password,
  name1: friend1 ? friend1.toString() : "",
  name2: friend2 ? friend2.toString() : "",
  name3: friend3 ? friend3.toString() : ""
};

function sendRequest(actionUrl, actionData) {
  console.log('Sending request:', actionUrl);
  
  fetch(`${serverUrl}${actionUrl}`, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(actionData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Request completed successfully:', data);
      chosenAction.textContent = `Chosen action: ${chosenAction.innerText}`;
    })
    .catch((error) => {
      console.error(`Failed to execute ${actionUrl}: `, error);
    });
}

function muteStories() {
  localStorage.setItem('chosenAction', 'Silenciar Histórias');
  sendRequest("/mutestories", data);
}

function mutePosts() {
  localStorage.setItem('chosenAction', 'Silenciar Publicações');
  sendRequest("/muteposts", data);
}

function closeFriends() {
  localStorage.setItem('chosenAction', 'Amigos Próximos');
  sendRequest("/closefriends", data);
}

function unfollow() {
  localStorage.setItem('chosenAction', 'Deixar de Seguir');
  sendRequest("/unfollow", data);
}


