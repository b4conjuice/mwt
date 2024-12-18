import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    usage: '/api/mw/$MW?mwDay=$MWDAY',
    $MW: 'm | w',
    $MWDAY: 'optional: 0-6, where 0 = sunday',
  })
}
