export const commonWords: string[] = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'great', 'between', 'need', 'large', 'big', 'small', 'system', 'program', 'code', 'data',
  'world', 'speed', 'light', 'point', 'hand', 'focus', 'learn', 'power', 'sound', 'mind',
  'fast', 'clean', 'simple', 'build', 'create', 'write', 'quick', 'smart', 'future', 'skill',
  'master', 'level', 'game', 'player', 'keyboard', 'screen', 'click', 'space', 'score', 'react'
];

export function getRandomWords(count: number): string {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * commonWords.length);
    result.push(commonWords[randomIndex]);
  }
  return result.join(' ');
}
