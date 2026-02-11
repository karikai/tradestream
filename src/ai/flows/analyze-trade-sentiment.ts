
'use server';

/**
 * @fileOverview An AI agent to analyze trade sentiment for a given stock ticker.
 *
 * - analyzeTradeSentiment - Analyzes the sentiment (bullish/bearish) based on recent trades.
 * - AnalyzeTradeSentimentInput - The input type for the analyzeTradeSentiment function.
 * - AnalyzeTradeSentimentOutput - The return type for the analyzeTradeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTradeSentimentInputSchema = z.object({
  ticker: z.string().describe('The stock ticker symbol to analyze.'),
  trades: z
    .array(z.object({
      contracts: z.number().describe('The number of contracts purchased.'),
      avgCost: z.number().describe('The average cost per contract.'),
      optionType: z.enum(['call', 'put']).describe('The option type (call or put).'),
    }))
    .describe('An array of recent trades for the given ticker.'),
});
export type AnalyzeTradeSentimentInput = z.infer<typeof AnalyzeTradeSentimentInputSchema>;

const AnalyzeTradeSentimentOutputSchema = z.object({
  sentiment: z
    .enum(['bullish', 'bearish', 'neutral'])
    .describe('The overall sentiment (bullish, bearish, or neutral) based on the trades.'),
  confidence: z
    .number()
    .describe('A confidence score (0-1) indicating the reliability of the sentiment analysis.'),
  reasoning: z.string().describe('The AI reasoning behind the sentiment analysis.'),
});
export type AnalyzeTradeSentimentOutput = z.infer<typeof AnalyzeTradeSentimentOutputSchema>;

export async function analyzeTradeSentiment(input: AnalyzeTradeSentimentInput): Promise<AnalyzeTradeSentimentOutput> {
  return analyzeTradeSentimentFlow(input);
}

const analyzeTradeSentimentPrompt = ai.definePrompt({
  name: 'analyzeTradeSentimentPrompt',
  input: {schema: AnalyzeTradeSentimentInputSchema},
  output: {schema: AnalyzeTradeSentimentOutputSchema},
  prompt: `You are an AI specializing in analyzing stock market sentiment based on options trades.

  Analyze the following recent trades for the stock ticker {{{ticker}}} and determine the overall sentiment (bullish, bearish, or neutral).
  Provide a confidence score (0-1) for your analysis.
  Explain your reasoning for the sentiment.

  Trades:
  {{#each trades}}
  - Contracts: {{contracts}}, Avg Cost: {{avgCost}}, Option Type: {{optionType}}
  {{/each}}

  Consider factors such as the relative volume of calls vs. puts, the price trends, and any significant outliers.

  Output your reasoning, the overall sentiment, and a confidence score.
  Be concise.
  `,
});

const analyzeTradeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeTradeSentimentFlow',
    inputSchema: AnalyzeTradeSentimentInputSchema,
    outputSchema: AnalyzeTradeSentimentOutputSchema,
  },
  async input => {
    const {output} = await analyzeTradeSentimentPrompt(input);
    return output!;
  }
);
