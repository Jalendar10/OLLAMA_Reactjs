// Importing necessary packages
import { Ollama } from "@langchain/ollama";
import { PromptTemplate } from "@langchain/core/prompts";

// Instantiating the model object with Ollama (LLaMA 3)
const llm = new Ollama({
  model: "llama3", // Default model value
  temperature: 0,
  maxRetries: 2,
  // Other params can go here...
});

// Function to invoke the model and get the completion
const inputText = "Ollama is an AI company that ";
async function getCompletion() {
  const completion = await llm.invoke(inputText);
  console.log("Completion Result:", completion);
}

getCompletion();

// Chaining with a Prompt Template
async function chainExample() {
  const prompt = PromptTemplate.fromTemplate(
    "How to say {input} in {output_language}:\n"
  );
  
  // Chaining prompt template with the model
  const chain = prompt.pipe(llm);

  // Example for translating "I love programming" into German
  const result = await chain.invoke({
    output_language: "German",
    input: "I love programming.",
  });

  console.log("Translation Result:", result);
}

chainExample();
