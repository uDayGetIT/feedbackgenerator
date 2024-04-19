// Decision Tree data
const decisionTree = {
    "Mobile Category": {
        "Issue with firm phone": {
            "License type": {
                "Mobilewood": {
                    "Can access Mobilewood app?": {
                        "Yes": {
                            "Receiving error messages?": {
                                "Yes": "Resolution: Check Mobilewood error code list (KB234567) and follow troubleshooting steps. If issue persists, collect device logs and submit ticket to Mobilewood support.",
                                "No": "Contact IT for further assistance"
                            }
                        },
                        "No": {
                            "Tried restarting app/phone?": {
                                "Yes": "Resolution: Check Mobilewood server status and verify login credentials (KB123456)",
                                "No": "Resolution: Restart app/phone, then try accessing Mobilewood app again. If issue persists, check server status and verify credentials (KB123456)"
                            }
                        }
                    }
                },
                "Insynced": {
                    "Can sync with Insynced server?": {
                        "Yes": "Resolution: Verify Insynced sync settings and conflict resolution policies. If issue persists, collect device logs and submit ticket to Insynced support (KB456789)",
                        "No": {
                            "Checked internet/credentials?": {
                                "Yes": "Resolution: Verify Insynced server status and check for software updates (KB345678). If issue persists, collect logs and submit ticket to Insynced support.",
                                "No": "Resolution: Check internet connection and login credentials, then try syncing data again. If issue persists, verify server status and check for updates (KB345678)"
                            }
                        }
                    }
                },
                "Other (please specify)": "Contact IT with license details for further assistance"
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
}

function handleOptionClick(option, nextNode) {
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
    // Implement back functionality here
}

function handleRestartClick() {
    currentNode = decisionTree;
    const question = Object.keys(currentNode)[0];
    displayQuestion(question);
    displayOptions(currentNode[question]);
    resolutionContainer.textContent = "";
    navigationContainer.innerHTML = "";
}

// Start the decision tree
const initialQuestion = Object.keys(currentNode)[0];
displayQuestion(initialQuestion);
displayOptions(currentNode[initialQuestion]);
