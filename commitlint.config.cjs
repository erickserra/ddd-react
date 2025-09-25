module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      // <type>(<scope>): <subject>
      headerPattern: /^(feat|fix|chore|docs|test)\((\d+|SOS-\d+)\):\s(.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
      noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
    },
  },

  rules: {
    // allowed types
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'docs', 'test']],

    // necessary subject and scope
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],

    // size
    'header-max-length': [2, 'always', 120],

    // turn off annoying rules
    'scope-case': [0],
    'type-case': [0],
    'subject-case': [0],
    'subject-full-stop': [0],
    'header-trim': [0],
  },
};
