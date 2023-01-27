import { z } from 'zod'

import fetcher from '@/lib/fetcher'

import { createTRPCRouter, publicProcedure } from '../trpc'

interface DTResponse {
  success: boolean
  comment: string
  dailyText: string
  date: string
  scripture: string
  text: string
}

interface MWTResponse {
  success: boolean
  date: string
  url: string
  week: string
  mw: string
  mwTitle: string
  wt: string
  wtTitle: string
}

export const swordRouter = createTRPCRouter({
  dt: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ input }) => {
      const data = await fetcher<DTResponse>(
        `https://notes.dlopez.app/api/sword/dt/${input.date}`
      )
      return data
    }),
  mwt: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ input }) => {
      const data = await fetcher<MWTResponse>(
        `https://notes.dlopez.app/api/sword/mwt/${input.date}`
      )
      return data
    }),
})
