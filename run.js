// Importing necessary packages
import express from "express";
import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

// Create an Express app
const app = express();
app.use(express.json()); // To parse JSON request bodies

// Instantiating the model object with Ollama (LLaMA 3)
const llm = new Ollama({
  model: "llama3", // Default model value
  temperature: 0,
  maxRetries: 2,
  // Other params can go here...
});

// POST endpoint for generating completion
app.post("/generate", async (req, res) => {
  const inputText = req.body.input;

  try {
    // Get completion
    const completion = await llm.invoke(inputText);

    // Chaining with a Prompt Template for translation
    const prompt = PromptTemplate.fromTemplate(
      "How to say {input} in {output_language}:\n"
    );
    const chain = prompt.pipe(llm);
    const translation = await chain.invoke({
      output_language: "German",
      input: inputText,
    });

    // Return the result to the frontend
    res.json({
      completion: completion.trim(),
      translation: translation.trim(),
    });

  } catch (error) {
    console.error("Error invoking model:", error);
    res.status(500).json({ error: "Error generating text" });
  }
});

// Serve the static HTML and JS files
app.use(express.static("."));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
