import { z } from 'zod'

import fetcher from '@/lib/fetcher'
import type { MWTResponse } from '@/lib/types'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const swordRouter = createTRPCRouter({
  mwt: publicProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ input }) => {
      const data = await fetcher<MWTResponse>(
        `https://api.dlopez.app/api/sword/mwt/${input.date}`
      )
      return data
    }),
})
