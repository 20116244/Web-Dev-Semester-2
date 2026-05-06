// This is my theme button as const since its a unique feature
const themeBtn = document.getElementById("themeToggle");
// im using a if statement so i can add condition to it
if (themeBtn) {
    // if user cliked on button...
    themeBtn.addEventListener("click", () => {
        // change the theme of the page to "dark" (refer to css .dark for colors)
        document.body.classList.toggle("dark");
    });// no need for "else" since the other condition will be null
}
// we declare our img and wrapper variable as const since they are both unique features
const img = document.getElementById("MomoRoll");
const wrapper = document.getElementById("momoWrapper");

// using a IF statement for my img AND my wrapper
if (img && wrapper) {
    /// if user is hovering the IMG...
    img.addEventListener("mouseenter", () => {
        // the IMG will spin forward on a constant loop
        img.style.animation = "spinForward 0.6s linear infinite";
        // it will be spinning horizontally at 2000px lengthwise
        wrapper.style.transform = "translateX(2000px)";
    });
    // if user stop hovering the IMG...
    img.addEventListener("mouseleave", () => {
        // IMG will spinbackward on a constant loop
        img.style.animation = "spinBackward 0.6s linear infinite";
        // it will be spinning horizontally back to 0px lengthwise
        wrapper.style.transform = "translateX(0px)";
    });
    // we declare our message variable as const since it's a unique feature
    const message = document.getElementById("welcomeMessage");
    // using a IF statement for my message
    if (message) {
        // we fecth user current time
        const hour = new Date().getHours();
        // we declare a variable call greeting
        let greeting;
        // using a IF in order to get the dynamic message based on user time (24h basis)
        // IF user current time is under 12...
        if (hour < 12) {
            // greet user with "Rise and shine 👋 Welcome to my Index !"
            greeting = "Rise and shine 👋 Welcome to my Index !";
            // IF user current time is under 18...
        } else if (hour < 18) {
            // greet user with "Good Afternoon ☀️ Welcome to my Index !"
            greeting = "Good Afternoon ☀️ Welcome to my Index !";
            // last condition for greeting
        } else {
            // greet user with "Time to go to bed ! 🌙 Welcome to my Index !"
            greeting = "Time to go to bed ! 🌙 Welcome to my Index !";
        }
        // we say that all message are greeting based on user time
        message.textContent = greeting;
    }
} // new IF statement for my about.html, necessary so it only loads on this page and not elsewhere.
// This IF statement will contain all my data for the about.html
if (document.body.id === "aboutPage") {
    // we declare this variable as const since it's a unique feature
    const form = document.getElementById("petForm");
    // we declare this variable as const since it's a unique feature
    const petsResults = document.getElementById("petsResults");
    // we declare this variable as const since it's a unique feature
    const searchInput = document.getElementById("searchInput");
    // we declare this variable as const since it's a unique feature
    const template = Handlebars.compile(
        // this is targetting our pets-template HTML.
        document.getElementById("pets-template").innerHTML
    );

    // we declare a variable "petsData" that we store in localStorage, it will hold several unique object with unique set data.
    let petsData = JSON.parse(localStorage.getItem("petsData")) || [
        // this is an object with an individual "species", "race", "name", "yearOfBirth", "coat" and "IMG"
        { species: "Dog", race: "Welsh Corgi Pembroke", name: "Mozart", yearOfBirth: "2016", coat: "Red Headed Tricolor", img: "images/momo.jpg" },
        // this is an object with an individual "species", "race", "name", "yearOfBirth", "coat" and "IMG"
        { species: "Dog", race: "Welsh Corgi Cardigan", name: "Olaf", yearOfBirth: "2020", coat: "Red", img: "images/olaf.png" },
        // this is an object with an individual "species", "race", "name", "yearOfBirth", "coat" and "IMG"
        { species: "Dog", race: "Dachshund", name: "Ollie", yearOfBirth: "2025", coat: "Cream", img: "images/ollie.png" },
        // this is an object with an individual "species", "race", "name", "yearOfBirth", "coat" and "IMG"
        { species: "Dog", race: "Pomeranian", name: "Marie", yearOfBirth: "2024", coat: "Orange", img: "images/marie.png" },
        // this is an object with an individual "species", "race", "name", "yearOfBirth", "coat" and "IMG"
        { species: "Cat", race: "Somali", name: "Annie", yearOfBirth: "2015", coat: "Lilac", img: "images/annie.png" }
    ];

    // we declare saveData as a function so it can return all the data in "petsData"
    function saveData() {
        localStorage.setItem("petsData", JSON.stringify(petsData));
    }

    // we declare data as a function so it can return the data that will be in our counter
    function render(data) {
        petsResults.innerHTML = template({ pets: data });
        // this line update the amount of data that will show up in real time
        updateCount(data);
    }

    render(petsData);

    // this is our form that will be dynamic based on people inputs
    form.addEventListener("submit", (e) => {
        // allow users to not submit data if they change page while filling the form
        e.preventDefault();
        // we declare this variable as a const since it's a unique feature (img)
        const file = form.img.files[0];
        // we declare this variable as a const since it's a unique feature (FileReader allow us to read the data from any file)
        const reader = new FileReader();
        // will fire is the file is read sucessfuly
        reader.onload = () => {
            // we declate newPet as a const since it's a unique feature
            const newPet = {
                // each newPet will have an individual ID
                id: String(Date.now()),
                // each newPet will have an individual name
                name: form.name.value,
                // each newPet will have an individual species
                species: form.species.value,
                // each newPet will have an individual race
                race: form.race.value,
                // each newPet will have an individual yearOfBirth
                yearOfBirth: Number(form.yearOfBirth.value),
                // each newPet will have an individual coat 
                coat: form.coat.value,
                // each newPet will have an individual img
                img: reader.result
            };
            // this IF statement is checking IF the data yearOfBirth is over 2026...
            if (parseInt(newPet.yearOfBirth) > 2026) {
                // IF it is over the year 2026 (current year), will display "Invalid year"
                alert("Invalid year");
                return;
            }
            // this line allow us to add an object (newPet) into our array (petsData)
            petsData.push(newPet);
            // this line save the data from the object
            saveData();
            // this update the petsData
            render(petsData);
            // this line put our form in default value
            form.reset();
        };
        // we use if statement for the file upload of the newPet
        if (file) {
            // condition is file is working
            reader.readAsDataURL(file);
        } else {
            // if there is no image, error message displayed
            alert("Please upload an image");
        }
    });
    // this is our delete button event
    petsResults.addEventListener("click", (e) => {
        // if user click on our delete button...
        if (e.target.classList.contains("delete-btn")) {
            // this variable is a unique id, there is a button for each object in the page
            const id = e.target.dataset.id;
            // this allow us to to verify which pet will be delete based on id
            petsData = petsData.filter(p => p.id !== id);
            // this line save the data from the object
            saveData();
            // this update the petsData
            render(petsData);

        }
    });
    // this is our filter event
    searchInput.addEventListener("input", () => {
        // this variable value have a unique id
        const value = searchInput.value.toLowerCase();
        // this variable with unique id, it will filter all datas
        const filtered = petsData.filter(p =>
            // it will filter each object by name or race (it can start at any letter in the name or race)
            p.name.toLowerCase().includes(value) ||
            p.race.toLowerCase().includes(value)
        );
        // this update the petsData filtered
        render(filtered);
    });
    // this is our function that allow us to update our data counted showing up
    function updateCount(data) {
        // this is our unique variable that cout how many pets are
        const count = document.getElementById("petCount");
        if (!count) return;
        // this will display "Total pets in data:" + the amount of data in real time
        count.textContent = `Total pets in data: ${data.length}`;
    }
    // this is our function for our data, in real time
    function render(data) {
        petsResults.innerHTML = template({ pets: data });
        updateCount(data);
    }
    // this unique variable is for our sorting by ascending order.
    const sortAscBtn = document.getElementById("sortAsc");
    // this unique variable is for our sorting by descending order.
    const sortDescBtn = document.getElementById("sortDesc");
    // when user click on A-Z button
    sortAscBtn.addEventListener("click", () => {
        // will sort all datas by ascending order
        petsData.sort((a, b) => a.name.localeCompare(b.name));
        saveData();
        render(petsData);
    });
    // when user click on Z-A button
    sortDescBtn.addEventListener("click", () => {
        // qill sort all datas by descending order
        petsData.sort((a, b) => b.name.localeCompare(a.name));
        saveData();
        render(petsData);
    });
}
// i use a if statement so it only load this on the dataPage
if (document.body.id === "dataPage") {
    // im declaring three variable, the first one is for the form of the comment
    const form = document.getElementById("commentForm");
    // this variable is for when the comment is successfully send
    const commentsResults = document.getElementById("commentsResults");
    // this variable is for the elements in my template
    const templateElement = document.getElementById("comments-template");
    // this variable indicate that we will be using handlebars
    const template = Handlebars.compile(templateElement.innerHTML);
    // this variable allow us to store all the comments into our localStorage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    // this function make sure that all comments content stays even if you refresh page
    function save() {
        localStorage.setItem("comments", JSON.stringify(comments));
    }
    // this function will display the datas using handlebars
    function render(data) {
        commentsResults.innerHTML = template({ comments: data });
    }
    // this will display the comment on the page
    render(comments);
    // this is our event listener when people click on submit
    form.addEventListener("submit", (e) => {
        // we prevent null
        e.preventDefault();
        // we get the user file (IMG)
        const file = form.img.files[0];
        // allow us to read the file uploaded
        const reader = new FileReader();
        // when file is ready..
        reader.onload = () => {
            // we declare that our comment will have several datas
            const newComment = {
                // each new comment will contain a unique ID
                id: Date.now(),
                // each new comment will contain a unique name
                name: form.name.value,
                // each new comment will contain a unique message
                message: form.message.value,
                // each new comment will contain a unique Image
                img: reader.result,
                // each new comment will contain an amount of bone (like) set to 0 by default
                bones: 0
            };

            comments.unshift(newComment);
            // we save the comment
            save();
            // we show it up
            render(comments);
            // display "Comment added successfully!" bottom right corner
            showToast("Comment added successfully!");
            // reset the form once user send one
            form.reset();
        };
        // if statement for our IMG file
        if (file) {
            // if condition true (file img)
            reader.readAsDataURL(file);
        } else {
            // condition if profile picture not uploaded
            alert("Please upload a profile picture");
        }
    });
// event listener for our bone (likes) feature
    commentsResults.addEventListener("click", (e) => {
        // declare unique variable for our bone button
        const btn = e.target.closest(".bone-btn");
        // work only if clicked on the bone button
        if (!btn) return;
        // each button have an index
        const index = btn.dataset.index;
        // it check if the comment does not exit
        if (!comments[index]) {
            // display error msg "Invalid index:"
            console.log("Invalid index:", index);
            return;
        }
        // this allow to increase the amount of bone when clicked by 1
        comments[index].bones += 1;
        // save data in localStorage
        save();
        // update datas for user (displayed)
        render(comments);
    });

}
// this variable is unique, its the audio file that will show up
const notifySound = new Audio("images/dog-barking-noti.mp3");
// this is the function for our audio to work
function showToast(message) {
    const toast = document.getElementById("toast");
    // we use a IF statement security net so it wont crash
    if (!toast) {
        console.log("Toast element missing");
        return;
    }
    // this allow me to display on the bottom right of the page when submitted
    toast.textContent = message;
    toast.classList.add("show");
    // allow the audio file to not cut off
    notifySound.currentTime = 0;
    // it start the audio file, it prevent it from crashing
    notifySound.play().catch(err => {
        console.log("Audio failed:", err);
    });
    // it will hide the class "show" after 2000 ms
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
