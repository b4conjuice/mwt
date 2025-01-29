import type { NextApiRequest, NextApiResponse } from 'next'
import { add, format, getDay } from 'date-fns'

import fetcher from '@/lib/fetcher'
import type { MWTResponse } from '@/lib/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { mw, mwDay, debug },
  } = req

  const now = new Date()
  const todayDate = format(now, 'yyyy-w')
  const nextWeekDate = format(add(now, { weeks: 1 }), 'yyyy-w')
  const todaysDayOfWeek = getDay(now)

  const thisWeekData = await fetcher<MWTResponse>(
    `https://api.dlopez.app/api/sword/mwt/${todayDate}`
  )
  const nextWeekData = await fetcher<MWTResponse>(
    `https://api.dlopez.app/api/sword/mwt/${nextWeekDate}`
  )

  const mwUrl = thisWeekData?.mw
  const wtUrl = thisWeekData?.wt
  const mwUrlNextWeek = nextWeekData?.mw

  const finishedMidweek =
    mwDay !== undefined ? todaysDayOfWeek > Number(mwDay) : false

  const url =
    mw === 'w'
      ? wtUrl
      : mw === 'm'
      ? finishedMidweek
        ? mwUrlNextWeek
        : mwUrl
      : null

  if (!url) {
    res.status(404).json({ message: 'not found', finishedMidweek })
  } else if (Boolean(debug)) {
    res.json({
      mw,
      mwDay,
      now,
      todaysDayOfWeek,
      finishedMidweek,
      url,
    })
  } else {
    res.redirect(301, url)
  }
}
