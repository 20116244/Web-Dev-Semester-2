const callStatus = document.querySelector('#callStatus');

const acceptButton = document.querySelector('#acceptButton');

acceptButton.addEventListener('click', (evt) => {
    acceptButton.textContent = "Call Accepted!";
    acceptButton.classList.remove('declined', 'message');
    acceptButton.classList.add('accepted')
})


const declineButton = document.querySelector('#declineButton');

declineButton.addEventListener('click', (evt) => {
    declineButton.textContent = "Call Declined.";
    declineButton.classList.remove('accepted', 'message');

    declineButton.classList.add('declined')
})

const messageButton = document.querySelector('#messageButton');

messageButton.addEventListener('click', (evt) => {
    messageButton.textContent = "Sending Message...";
    messageButton.classList.remove('accepted', 'declined');

    messageButton.classList.add('message')
})

