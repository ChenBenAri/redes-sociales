const form = document.getElementById('friendForm');
const searchButton = document.getElementById('searchButton');
const friendList = document.getElementById('friendList');
const confirmButton = document.getElementById('confirmButton');
const note = document.getElementById('note');
const yourChoices = document.getElementById('yourChoices');
const useLastNamesButton = document.getElementById('useLastNamesButton');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const friend1 = document.getElementById('friend1').value;
  const friend2 = document.getElementById('friend2').value;
  const friend3 = document.getElementById('friend3').value;

  document.getElementById('confirmButton').addEventListener('click', function() {
    let friend1 = document.getElementById('friend1').value;
    let friend2 = document.getElementById('friend2').value;
    let friend3 = document.getElementById('friend3').value;

    // Save to local storage
    localStorage.setItem('friend1', friend1);
    localStorage.setItem('friend2', friend2);
    localStorage.setItem('friend3', friend3);
  });

  friendList.innerHTML = `
    <li><strong>1. </strong>${friend1}</li>
    <li><strong>2. </strong>${friend2}</li>
    <li><strong>3. </strong>${friend3}</li>
  `;

  showListAndButton();
}

function showListAndButton() {
  friendList.style.display = 'block';
  confirmButton.style.display = 'block';
  yourChoices.style.display = 'block';
  useLastNamesButton.style.display = 'none'; // Hide the "Use the last names" button
}

function hideListAndButton() {
  friendList.style.display = 'none';
  confirmButton.style.display = 'none';
  yourChoices.style.display = 'none';
}

function useLastNames() {
  fetch('/lastnames')
    .then(response => response.json())
    .then(data => {
      const { names } = data;
      if (names.length === 3) {
        document.getElementById('friend1').value = names[0];
        document.getElementById('friend2').value = names[1];
        document.getElementById('friend3').value = names[2];
      }
    })
    .catch(error => console.error('Error:', error));
}

searchButton.addEventListener('click', function() {
  friendList.innerHTML = '';
  confirmButton.style.display = 'none';
  note.innerText = '';
  hideListAndButton();
  useLastNamesButton.style.display = 'none'; // Hide the "Use the last names" button
});

hideListAndButton(); // Hide the initial friend list and confirm button on page load

useLastNamesButton.addEventListener('click', useLastNames); // Add event listener to the "Use the last names" button

document.getElementById('confirmButton').addEventListener('click', function() {
  window.location.href = 'insta_actions.html';
});


function populateLastSearchesTable() {
  fetch('/lastSearches?username=socialorderaccount')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('lastSearchesTable').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = '';
      
      const uniqueNames = [...new Set(data.names)]; // get unique names
      
      uniqueNames.forEach(name => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = name;
        
        const actionsCell = document.createElement('td');
        const useButton = document.createElement('button');
        useButton.textContent = 'Usar';
        useButton.classList.add('use-button'); // Add a class for CSS styling
        useButton.addEventListener('click', () => {
          const inputs = [document.getElementById('friend1'), document.getElementById('friend2'), document.getElementById('friend3')];
          const emptyInput = inputs.find(input => input.value === '');
          if (emptyInput) {
            emptyInput.value = name;
          } else {
            inputs[2].value = name; // If all fields are filled, replace the third one
          }
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-button'); 
        deleteButton.addEventListener('click', () => {
          fetch('/deleteName', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: 'socialorderaccount', name: name })
          }).then(() => {
            populateLastSearchesTable();
          });
        });
        
        actionsCell.appendChild(useButton);
        actionsCell.appendChild(deleteButton);
        
        row.appendChild(nameCell);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error:', error));
}

function useName(name) {
}

function deleteName(name) {
  fetch('/deleteName', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: 'socialorderaccount', name: name }),
  })
    .then(response => {
      if (response.ok) {
        populateLastSearchesTable();
      } else {
        console.error('Error:', response);
      }
    })
    .catch(error => console.error('Error:', error));
}

populateLastSearchesTable(); 

