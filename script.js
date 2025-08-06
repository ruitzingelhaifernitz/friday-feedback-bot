document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('names-form');
    const resultDiv = document.getElementById('result');
    const selectedPersonText = document.getElementById('selected-person-text');
    const redirectButton = document.getElementById('redirect-button');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        const person1 = document.getElementById('person1').value;
        const person2 = document.getElementById('person2').value;
        const person3 = document.getElementById('person3').value;

        const people = [person1, person2, person3];
        
        // Randomly select one person from the array
        const randomIndex = Math.floor(Math.random() * people.length);
        const selectedPerson = people[randomIndex];

        // Display the result and the new button
        selectedPersonText.textContent = `You've selected to give feedback for: ${selectedPerson}!`;
        resultDiv.classList.remove('hidden');
    });

    // Add an event listener to the new button to handle the redirection
    redirectButton.addEventListener('click', () => {
        window.location.href = 'https://mono-1.my.canva.site/feedback/#comment-boxes';
    });
});