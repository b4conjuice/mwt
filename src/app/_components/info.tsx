'use client'

import Balancer from 'react-wrap-balancer'

import days from '@/lib/days'
import useLocalStorage from '@/lib/useLocalStorage'
import type { MWTResponse } from '@/lib/types'

const ExternalLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='group w-full cursor-pointer rounded-lg border-none bg-cb-dark-blue text-center text-lg'
  >
    <span className='block translate-y-[-4px] transform rounded-lg bg-[#5a3e84] p-3 text-lg duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] hover:ease-[cubic-bezier(.3,.7,.4,1.5)] group-hover:translate-y-[-6px] group-hover:duration-[250ms] group-active:translate-y-[-2px] group-active:duration-[34ms]'>
      <Balancer>{children}</Balancer>
    </span>
  </a>
)

export default function Info(props: {
  thisWeekData: MWTResponse
  nextWeekData: MWTResponse
  todaysDayOfWeek: number
}) {
  const { thisWeekData, nextWeekData, todaysDayOfWeek } = props
  const [midweekDayNumber] = useLocalStorage<number | undefined>(
    'midweekday',
    undefined
  )

  const midweekDay =
    typeof midweekDayNumber === 'number' ? days[midweekDayNumber] : null

  const finishedMidweek = todaysDayOfWeek > Number(midweekDayNumber)
  const week = thisWeekData?.week
  const mwUrl = thisWeekData?.mw
  const mwTitle = thisWeekData?.mwTitle
  const wtUrl = thisWeekData?.wt
  const wtTitle = thisWeekData?.wtTitle
  const nextWeek = nextWeekData?.week
  const mwUrlNextWeek = nextWeekData?.mw
  const mwTitleNextWeek = nextWeekData?.mwTitle

  return (
    <>
      <p>Midweek Day: {midweekDay ?? 'not set'}</p>
      <h2>{week}</h2>
      {!finishedMidweek && (
        <ExternalLink href={mwUrl ?? ''}>{mwTitle}</ExternalLink>
      )}
      {wtTitle && <ExternalLink href={wtUrl ?? ''}>{wtTitle}</ExternalLink>}
      {finishedMidweek && (
        <>
          <h2>{nextWeek}</h2>
          <ExternalLink href={mwUrlNextWeek ?? ''}>
            {mwTitleNextWeek}
          </ExternalLink>
        </>
      )}
    </>
  )
}
