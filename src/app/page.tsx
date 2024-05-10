import { getDay, add } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'

import Page from '@/components/page'
import Main from '@/components/design/main'
import Title from '@/components/design/title'
import SettingsButton from './_components/settings-button'
import Info from './_components/info'
import fetcher from '@/lib/fetcher'
import type { MWTResponse } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function fetchMWT(date: string) {
  const data = await fetcher<MWTResponse>(
    `https://api.dlopez.app/api/sword/mwt/${date}`
  )
  return data
}

const timezone = 'America/Los_Angeles'

export default async function Home() {
  const now = new Date()
  const todayText = formatInTimeZone(now, timezone, 'MMM dd, yyyy')
  const todayDate = formatInTimeZone(now, timezone, 'yyyy-w')
  const nextWeekDate = formatInTimeZone(
    add(now, { weeks: 1 }),
    'America/Los_Angeles',
    'yyyy-w'
  )
  const todaysDayOfWeek = getDay(now)

  const thisWeekData = await fetchMWT(todayDate)
  const nextWeekData = await fetchMWT(nextWeekDate)

  return (
    <Page>
      <Main className='flex flex-col p-4'>
        <div className='flex justify-end space-x-4'>
          <SettingsButton />
          <a
            href='https://github.com/b4conjuice/mwt'
            target='_blank'
            rel='noopener noreferrer'
          >
            <svg
              // https://lucide.dev/icon/github
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
              <path d='M9 18c-4.51 2-5-2-7-2'></path>
            </svg>
          </a>
        </div>
        <div className='flex flex-grow flex-col items-center justify-center space-y-4'>
          <Title>mwt</Title>
          <p>{todayText}</p>
          <Info
            thisWeekData={thisWeekData}
            nextWeekData={nextWeekData}
            todaysDayOfWeek={todaysDayOfWeek}
          />
        </div>
      </Main>
    </Page>
  )
}
