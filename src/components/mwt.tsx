import { useState } from 'react'
import { add, format, getDay } from 'date-fns'
import {
  CloudArrowDownIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/solid'

import { api } from '@/lib/api'
import Button from './design/button'

function SkeletonButton({ children }: { children: React.ReactNode }) {
  return (
    <span className='group w-full flex-grow-[calc(5/6)] rounded-lg border-none bg-cb-dark-blue text-center text-lg'>
      <span className='block translate-y-[-4px] transform animate-pulse rounded-lg bg-sword-purple p-3 text-lg text-gray-100 duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)]'>
        <span className='invisible'>{children}</span>
      </span>
    </span>
  )
}

function MWTButton({
  week,
  url,
  title,
  isLoading,
  children,
}: {
  week: string
  url: string
  title: string
  isLoading: boolean
  children: React.ReactNode
}) {
  const [showButton, setShowButton] = useState(false)
  if (!showButton) {
    return (
      <div className='flex w-full gap-4'>
        <div className='flex-grow-[calc(5/6)]'>
          <a
            className='group w-full cursor-pointer rounded-lg border-none bg-cb-dark-blue text-center text-lg'
            href={`https://wol.jw.org/en/wol/meetings/r1/lp-e/${week}`}
            target='_blank'
            rel='noreferrer'
          >
            <span className='block translate-y-[-4px] transform rounded-lg bg-sword-purple p-3 text-lg text-gray-100 duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] hover:ease-[cubic-bezier(.3,.7,.4,1.5)] group-hover:translate-y-[-6px] group-hover:duration-[250ms] group-active:translate-y-[-2px] group-active:duration-[34ms]'>
              {children}
            </span>
          </a>
        </div>
        <Button
          onClick={() => {
            setShowButton(true)
          }}
          className='w-auto flex-grow-[calc(1/6)]'
        >
          <CloudArrowDownIcon className='mx-auto h-6 w-6' />
        </Button>
      </div>
    )
  }
  return (
    <>
      <div className='flex gap-4'>
        {isLoading ? (
          <SkeletonButton>{children}</SkeletonButton>
        ) : (
          <a
            className='group w-full flex-grow-[calc(5/6)] cursor-pointer rounded-lg border-none bg-cb-dark-blue text-center text-lg'
            href={url}
            target='_blank'
            rel='noreferrer'
            // onClick={() => {
            //   incrementStreak({ streakInfo, setStreakInfo })
            // }}
          >
            <span className='block translate-y-[-4px] transform rounded-lg bg-sword-purple p-3 text-lg text-gray-100 duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] hover:ease-[cubic-bezier(.3,.7,.4,1.5)] group-hover:translate-y-[-6px] group-hover:duration-[250ms] group-active:translate-y-[-2px] group-active:duration-[34ms]'>
              {title}
            </span>
          </a>
        )}
        <Button
          onClick={() => {
            // await copyToClipboard(dailyText)
            // toast.success('copied daily text')
          }}
          className='w-auto flex-grow-[calc(1/6)] disabled:pointer-events-none disabled:opacity-25'
          disabled={isLoading}
        >
          <DocumentDuplicateIcon className='mx-auto h-6 w-6' />
        </Button>
      </div>
    </>
  )
}

export default function MWTButtons({
  now,
  midweekDayNumber,
}: {
  now: Date
  midweekDayNumber: number | undefined
}) {
  const thisWeek = format(now, 'yyyy/w')
  const nextWeek = format(add(now, { weeks: 1 }), 'yyyy/w')
  const todaysDayOfWeek = getDay(now)
  const finishedMidweek = todaysDayOfWeek > Number(midweekDayNumber)

  const { data: thisWeekData, isLoading: thisWeekIsLoading } =
    api.sword.mwt.useQuery({ date: thisWeek })
  const { data: nextWeekData, isLoading: nextWeekIsLoading } =
    api.sword.mwt.useQuery({ date: nextWeek })
  return (
    <>
      {!finishedMidweek && (
        <MWTButton
          week={thisWeek}
          url={thisWeekData?.mw ?? ''}
          title={thisWeekData?.mwTitle ?? ''}
          isLoading={thisWeekIsLoading}
        >
          mw
        </MWTButton>
      )}
      <MWTButton
        week={thisWeek}
        url={thisWeekData?.wt ?? ''}
        title={thisWeekData?.wtTitle ?? ''}
        isLoading={thisWeekIsLoading}
      >
        wt
      </MWTButton>
      {finishedMidweek && (
        <MWTButton
          week={nextWeek}
          url={nextWeekData?.mw ?? ''}
          title={nextWeekData?.mwTitle ?? ''}
          isLoading={nextWeekIsLoading}
        >
          mw
        </MWTButton>
      )}
    </>
  )
}
