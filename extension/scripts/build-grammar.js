require('./generate-grammar').generate(
  process.argv.includes('--watch') || process.argv.includes('-w')
)
