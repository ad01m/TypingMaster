import { Quote } from '../types';

export const quotesList: Quote[] = [
  {
    id: 'quote-1',
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
    source: 'Refactoring'
  },
  {
    id: 'quote-2',
    text: 'The only way to do great work is to love what you do. If you have not found it yet, keep looking. Do not settle.',
    author: 'Steve Jobs',
    source: 'Stanford Address'
  },
  {
    id: 'quote-3',
    text: 'Simplicity is prerequisite for reliability. Programs must be written for people to read, and only incidentally for machines to execute.',
    author: 'Edsger W. Dijkstra'
  },
  {
    id: 'quote-4',
    text: 'First, solve the problem. Then, write the code. Premature optimization is the root of all evil in programming.',
    author: 'John Johnson'
  },
  {
    id: 'quote-5',
    text: 'Stay hungry, stay foolish. Dream big, build fast, and never be afraid to take on challenges that seem impossible.',
    author: 'Whole Earth Catalog'
  },
  {
    id: 'quote-6',
    text: 'Typing is not just about moving your fingers quickly. It is about closing the latency gap between your brain and your creation.',
    author: 'TypeMaster Philosophy'
  }
];

export function getRandomQuote(): Quote {
  const index = Math.floor(Math.random() * quotesList.length);
  return quotesList[index];
}
