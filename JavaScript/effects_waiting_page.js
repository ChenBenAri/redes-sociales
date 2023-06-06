let countdown = document.getElementById('countdown');
let instaMessage = document.getElementById('instaMessage');
let moreActions = document.getElementById('moreActions');
let spinner = document.querySelector('.spinner');
let chosenFriends = document.getElementById('chosenFriends');

// Get the friend names from local storage
let friend1 = localStorage.getItem('friend1');
let friend2 = localStorage.getItem('friend2');
let friend3 = localStorage.getItem('friend3');
let chosenAction = localStorage.getItem('chosenAction');

document.getElementById('chosenAction').textContent = `Ação Escolhida: ${chosenAction}`;
chosenFriends.textContent = `Amigos Escolhidos: ${friend1}, ${friend2}, ${friend3}`;

let timer = setInterval(function() {
  let timeLeft = parseInt(countdown.textContent);
  if (timeLeft > 0) {
    countdown.textContent = timeLeft - 1;
  } else {
    clearInterval(timer);
    stopSpinner();
    instaMessage.style.display = 'block';
    moreActions.style.display = 'block';
    chosenFriends.style.display = 'block'; // Display the chosen friends' names
    chosenAction.style.display = 'block'
  }
}, 1000);

moreActions.addEventListener('click', function() {
  location.href = 'user_input.html';  // Adjust this URL to match your file's location
});

function stopSpinner() {
  spinner.style.animation = 'none';
}
