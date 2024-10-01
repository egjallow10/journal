// require('dotenv').config()
import z from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers'
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";


const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      mood: z
        .string()
        .describe('the mood of the person who wrote the journal entry.'),
      summary: z.string().describe('quick summary of the entire entry.'),
      subject: z.string().describe('the subject of the journal entry.'),
      negative: z
        .boolean()
        .describe(
          'is the journal entry negative? (i.e. does it contain negative emotions?).'
        ),
      color: z
        .string()
        .describe(
          'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
        ),
    })
  )

  const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions();
  
    
    const prompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
          "Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}"
        ),
        HumanMessagePromptTemplate.fromTemplate("{entry}")
    ]);
  
    const input = await prompt.format({
      entry: content,
      format_instructions: format_instructions
    });
  
    return input;
};
  

export const analyze = async (content) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


  const input = await getPrompt(content)



  const result = await model.generateContent(input);
  console.log(result.response.text());
  try {
    return parser.parse(result.response.text())
  } catch (error) {
    console.log(error)
  }
};
