module.exports = {
  questions: ['type', 'customScope', 'subject', 'footer', 'confirmCommit'],

  types: [
    { value: 'feat', name: '✨ feature: A new feature' },
    { value: 'fix', name: '🐛 bugfix: A fix during dev' },
    { value: 'fix', name: '🚑 hotfix: Emergency prod fix' },
    { value: 'chore', name: '🧹 chore: A non-functional update' },
    { value: 'docs', name: '📝 docs: Documentation changes' },
    { value: 'test', name: '✅ test: Adding or modifying tests' },
  ],
  scopes: [],
  allowCustomScopes: true,
  allowEmptyScopes: false,

  issuePrefixes: [],
  allowCustomIssuePrefix: false,
  allowEmptyIssuePrefix: false,

  defaultScope: '___CUSTOM___:',
  messages: {
    type: 'Select the type of change:',
    customScope: '🔖 Task ID (e.g. XXXX-1234):',
    subject: '📜 Short description:',
    footer: '📌 Related tickets/release (space separated, optional):',
    confirmCommit: '✅ Proceed with commit?',
  },
  skipQuestions: ['body', 'scope', 'breaking', 'footerPrefix'],
};
