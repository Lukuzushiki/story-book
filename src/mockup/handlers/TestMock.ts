import { rest } from 'msw'

export const TestMock = [
  rest.get('/pets', ({ req, res, ctx }) => {
    return res(
      ctx.json(['Tom', 'Jerry', 'Spike'])
    )
  }),
  rest.post('https://api.github.com/repo', ({ req, res, ctx }) => {
    return res(
     ctx.json({
      data: {
        pets: [
          { id: 1, name: 'Tom' },
          { id: 2, name: 'Jerry' },
          { id: 3, name: 'Spike' },
        ],
      },
    })
    )
  }),
]