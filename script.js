// Function to add a name to the list
function addName() {
    const nameInput = document.getElementById("nameInput");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Navnet kan ikke være tomt.");
        return;
    }

    const nameList = document.getElementById("nameList");
    const li = document.createElement("li");
    li.textContent = name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Fjern";
    removeBtn.onclick = () => li.remove();

    li.appendChild(removeBtn);
    nameList.appendChild(li);

    nameInput.value = ""; // Clear the input field
}

// Function to get all names from the list
function getSelectedNames() {
    const listItems = document.querySelectorAll("#nameList li");
    const names = Array.from(listItems).map((li) => li.firstChild.textContent);
    return names;
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Helper function to create groups of 3
function listsof3(list) {
    const lists = [];
    const iterations = Math.floor(list.length / 3);

    for (let i = 0; i < iterations; i++) {
        lists.push([list[i * 3], list[i * 3 + 1], list[i * 3 + 2]]);
    }

    return lists;
}

// Main function to group names
function namegroups(names) {
    shuffleArray(names);
    let groups = [];

    if (names.length < 6) {
        if (names.length === 4) {
            groups.push([names[0], names[1]]);
            groups.push([names[2], names[3]]);
        } else if (names.length === 5) {
            groups.push([names[0], names[1], names[2]]);
            groups.push([names[3], names[4]]);
        } else if (names.length === 6) {
            groups.push([names[0], names[1], names[2]]);
            groups.push([names[3], names[4], names[5]]);
        }
    } else {
        if (names.length % 3 === 1) {
            groups = listsof3(names);
            groups[groups.length - 1].push(names[names.length - 1]);
        } else if (names.length % 3 === 2) {
            groups = listsof3(names);
            groups[groups.length - 2].push(names[names.length - 2]);
            groups[groups.length - 1].push(names[names.length - 1]);
        } else {
            groups = listsof3(names);
        }
    }
    return groups;
}

// Function to generate groups and display them
function generateGroups() {
    const selectedNames = getSelectedNames();
    const groupsContainer = document.getElementById("groupsContainer");
    groupsContainer.innerHTML = "";

    if (selectedNames.length < 4) {
        alert("Velg mer enn 3 navn.");
        return;
    }

    const groups = namegroups(selectedNames);

    groups.forEach((group, index) => {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("group-item");
        groupDiv.innerHTML = `<strong>Gruppe ${index + 1}:</strong> ${group.join(", ")}`;
        groupsContainer.appendChild(groupDiv);
    });

    groupsContainer.scrollIntoView({ behavior: "smooth" });
}
