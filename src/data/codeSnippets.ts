import { CodeSnippet } from '../types';

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'code-js-1',
    language: 'javascript',
    title: 'JavaScript Async Fetch',
    code: 'async function fetchUserData(userId) {\n  const response = await fetch(`/api/users/${userId}`);\n  if (!response.ok) {\n    throw new Error("Failed to load user");\n  }\n  return await response.json();\n}'
  },
  {
    id: 'code-js-2',
    language: 'javascript',
    title: 'React Custom Hook',
    code: 'export function useDebounce(value, delay) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}'
  },
  {
    id: 'code-py-1',
    language: 'python',
    title: 'Python List Comprehension & Class',
    code: 'class SpeedTester:\n    def __init__(self, target_wpm=100):\n        self.target = target_wpm\n        self.scores = []\n\n    def record(self, score):\n        self.scores.append(score)\n        return [s for s in self.scores if s >= self.target]'
  },
  {
    id: 'code-html-1',
    language: 'html',
    title: 'HTML Semantic Card',
    code: '<article class="card flex flex-col p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">\n  <header class="flex items-center justify-between mb-4">\n    <h3 class="text-xl font-bold text-cyan-400">TypeMaster Pro</h3>\n    <span class="badge">Live</span>\n  </header>\n</article>'
  }
];

export function getCodeSnippetsByLang(lang: string): CodeSnippet[] {
  return codeSnippets.filter(s => s.language === lang);
}
