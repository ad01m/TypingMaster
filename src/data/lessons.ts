import { Lesson } from '../types';

export const typingLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Lesson 1: The Home Row Foundations',
    category: 'Home Row',
    description: 'Learn the anchor keys. Rest left fingers on A S D F and right fingers on J K L ;',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    text: 'fff jjj ddd kkk sss lll aaa ;;; fj dk sl a; fjdk sla; fff jjj ddd kkk asdf jkl; fdsa ;lkj'
  },
  {
    id: 'lesson-2',
    title: 'Lesson 2: Home Row Words',
    category: 'Home Row',
    description: 'Practice real words formed using only the home row keys.',
    targetKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    text: 'as ask dad fad lad fall flask flash glass salad shall glad dash half gas hag jag fad dad flask'
  },
  {
    id: 'lesson-3',
    title: 'Lesson 3: Top Row E and I',
    category: 'Top Row',
    description: 'Reach up from D to E with left middle finger, and from K to I with right middle finger.',
    targetKeys: ['e', 'i', 'd', 'k'],
    text: 'ded kik ded kik see die kid led fed ill like file side life kill feel lake idea skill aide'
  },
  {
    id: 'lesson-4',
    title: 'Lesson 4: Top Row R and U',
    category: 'Top Row',
    description: 'Reach up from F to R with left index finger, and from J to U with right index finger.',
    targetKeys: ['r', 'u', 'f', 'j'],
    text: 'frf juj frf juj fur run rug red jug jar fire user rule surf dark rural flare fur jur fruit'
  },
  {
    id: 'lesson-5',
    title: 'Lesson 5: Full Top Row Flow',
    category: 'Top Row',
    description: 'Integrate Q W E R T Y U I O P into dynamic words.',
    targetKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'type quiet power write pretty quote wire tower port reply report youth tweet poetry query wipe'
  },
  {
    id: 'lesson-6',
    title: 'Lesson 6: Bottom Row C, V, M, N',
    category: 'Bottom Row',
    description: 'Reach down with index and middle fingers to C, V, N, and M.',
    targetKeys: ['c', 'v', 'm', 'n'],
    text: 'dcd fvf jmj jnj came cave move name main vine coin calm cave mean venom manic climb mince'
  },
  {
    id: 'lesson-7',
    title: 'Lesson 7: Full Alphabet Mastery',
    category: 'Full Alphabet',
    description: 'The ultimate pangram workout across all letters from A to Z.',
    targetKeys: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    text: 'the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs sphynx of black quartz judge my vow'
  },
  {
    id: 'lesson-8',
    title: 'Lesson 8: Numbers & Symbols Drill',
    category: 'Numbers & Symbols',
    description: 'Master the top numeric row and essential punctuation symbols.',
    targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '$', '%'],
    text: '123 456 7890 2026 100% $250 #1 plan! @user email item: 42 units, total = $99; order #789 now.'
  }
];
