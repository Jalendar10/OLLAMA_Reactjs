document.getElementById("submitBtn").addEventListener("click", async function () {
    const inputText = document.getElementById("inputText").value;

    if (!inputText) {
        alert("Please enter some text.");
        return;
    }

    // Clear previous results
    document.getElementById("completionResult").innerText = "Generating...";
    document.getElementById("translationResult").innerText = "Translating...";

    try {
        // Sending the input text to the backend (running LLaMA3)
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: inputText }),
        });

        const result = await response.json();

        // Update the UI with the results
        document.getElementById("completionResult").innerText = result.completion;
        document.getElementById("translationResult").innerText = result.translation;

    } catch (error) {
        console.error("Error:", error);
        alert("There was an error generating the text. Please try again.");
    }
});
