import Proto from 'typescript/lib/protocol'
import { createLanguageServerForTest } from '../server'

describe('getBraceMatchingAtPosition', () => {
  test('should complete the opened braces', async () => {
    const server = createLanguageServerForTest()
    server.openFile('fixture-brace-completions.vue')
    server.sendCommand(Proto.CommandTypes.BraceCompletion, <Proto.BraceCompletionRequestArgs>{
      file: server.canonicalFileName('fixture-brace-completions.vue'),
      line: 11,
      offset: 12,
      openingBrace: '{'
    })

    await server.close()
    expect(server.responses).toHaveLength(1)
    const response: Proto.BraceResponse = server.responses[0]
    expect(response.command).toBe(Proto.CommandTypes.BraceCompletion)
    expect(response.body).toBe(true)
  })
})
