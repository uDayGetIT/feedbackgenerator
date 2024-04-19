// Updated Decision Tree data
const decisionTree = {
    "Mobile Category": {
        "Issue with firm phone": {
            "Which phone are you experiencing issues with?": {
                "Firm phone": {
                    "What type of license have you been assigned?": {
                        "Mobilewood": {
                            "Are you able to access the Mobilewood app?": {
                                "Yes": {
                                    "Are you receiving any error messages or codes?": {
                                        "Yes": "Resolution: Check the Mobilewood error code list (KB234567) and follow the troubleshooting steps. If the issue persists, collect device logs and submit a ticket to the Mobilewood support team.",
                                        "No": "Contact IT for further assistance"
                                    }
                                },
                                "No": {
                                    "Have you tried restarting the app or phone?": {
                                        "Yes": "Resolution: Check Mobilewood server status and verify login credentials (KB123456)",
                                        "No": "Resolution: Restart the app and phone, then try accessing the Mobilewood app again. If the issue persists, check the Mobilewood server status and verify your login credentials. (KB123456)"
                                    }
                                }
                            }
                        },
                        "Insynced": {
                            "Are you able to sync your data with the Insynced server?": {
                                "Yes": "Resolution: Verify the Insynced sync settings and conflict resolution policies. If the issue persists, collect device logs and submit a ticket to the Insynced support team. (KB456789)",
                                "No": {
                                    "Have you checked your internet connection and login credentials?": {
                                        "Yes": "Resolution: Verify the Insynced server status and check for any software updates. If the issue persists, collect device logs and submit a ticket to the Insynced support team. (KB345678)",
                                        "No": "Resolution: Check your internet connection and login credentials, then try syncing your data again. If the issue persists, verify the Insynced server status and check for any software updates. (KB345678)"
                                    }
                                }
                            }
                        },
                        "Other (please specify)": "Contact IT with license details for further assistance"
                    }
                },
                "Personal phone": "Personal phone issues are not supported by the IT department"
            }
        },
        "Issue with personal phone": "Personal phone issues are not supported by the IT department"
    }
};

let currentNode = decisionTree;
const questionContainer = document.getElementById("questionContainer");
const optionsContainer = document.getElementById("optionsContainer");
const resolutionContainer = document.getElementById("resolutionContainer");
const navigationContainer = document.getElementById("navigationContainer");
const copyButton = document.createElement("button");
copyButton.textContent = "Copy";
copyButton.addEventListener("click", copySelectedOptions);
const selectedOptions = [];

function displayQuestion(question) {
    questionContainer.textContent = question;
}

function displayOptions(options) {
    optionsContainer.innerHTML = "";
    for (const option in options) {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => handleOptionClick(option, options[option]));
        optionsContainer.appendChild(button);
    }
}

function displayResolution(resolution) {
    resolutionContainer.textContent = resolution;
}

function displayNavigation() {
    navigationContainer.innerHTML = "";
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.addEventListener("click", handleBackClick);
    navigationContainer.appendChild(backButton);

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", handleRestartClick);
    navigationContainer.appendChild(restartButton);

    navigationContainer.appendChild(copyButton);
}

function handleOptionClick(option, nextNode) {
    selectedOptions.push(option);
    if (typeof nextNode === "string") {
        displayResolution(nextNode);
        displayNavigation();
    } else {
        currentNode = nextNode;
        const question = Object.keys(nextNode)[0];
        displayQuestion(question);
        displayOptions(nextNode[question]);
    }
}

function handleBackClick() {
    selectedOptions.pop();
    const previousNode = getPreviousNode();
    if (previousNode) {
        currentNode = previousNode;
        const question = Object.keys(currentNode)[0];
        displayQuestion(question);
        displayOptions(currentNode[question]);
        resolutionContainer.textContent = "";
        navigationContainer.innerHTML = "";
    }
}

function handleRestartClick() {
    currentNode = decisionTree;
    selectedOptions.length = 0;
    const question = Object.keys(currentNode)[0];
    displayQuestion(question);
    displayOptions(currentNode[question]);
    resolutionContainer.textContent = "";
    navigationContainer.innerHTML = "";
}

function getPreviousNode() {
    let currentPath = "";
    for (let i = 0; i < selectedOptions.length - 1; i++) {
        currentPath += selectedOptions[i] + ".";
        let currentLevel = currentNode;
        for (const option of selectedOptions.slice(0, i + 1)) {
            currentLevel = currentLevel[option];
        }
        if (typeof currentLevel !== "object") {
            return null;
        }
    }
    return currentNode;
}

function copySelectedOptions() {
    const formattedOptions = selectedOptions.join(" > ");
    navigator.clipboard.writeText(formattedOptions)
        .then(() => {
            alert("Selected options copied to clipboard!");
        })
        .catch((err) => {
            console.error("Failed to copy text: ", err);
        });
}

// Start the decision tree
const initialQuestion = Object.keys(currentNode)[0];
displayQuestion(initialQuestion);
displayOptions(currentNode[initialQuestion]);
