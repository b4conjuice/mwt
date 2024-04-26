'use client'

import { useState, useEffect } from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/solid'

import Modal from '@/components/modal'
import Button from '@/components/design/button'
import useLocalStorage from '@/lib/useLocalStorage'
import days from '@/lib/days'

const Settings = ({
  midweekDayNumber,
  setMidweekDayNumber,
}: {
  midweekDayNumber?: number
  setMidweekDayNumber: (midweekDayNumber: number | undefined) => void
}) => {
  const [day, setDay] = useState<number | undefined>(midweekDayNumber)
  useEffect(() => {
    setDay(midweekDayNumber)
  }, [midweekDayNumber])
  return (
    <form className='space-y-3'>
      <label>when is your midweek meeting?</label>
      <select
        className='w-full bg-cobalt'
        value={day}
        onChange={e => {
          setDay(Number(e.target.value))
        }}
      >
        <option>select day</option>
        {days.map((day, index) => (
          <option key={index} value={index}>
            {day}
          </option>
        ))}
      </select>
      <Button
        className='disabled:pointer-events-none disabled:opacity-25'
        type='submit'
        onClick={e => {
          e.preventDefault()
          setMidweekDayNumber(day)
        }}
        disabled={midweekDayNumber === day}
      >
        save
      </Button>
    </form>
  )
}

export default function SettingsButton() {
  const [showModal, setShowModal] = useState(false)

  const [midweekDayNumber, setMidweekDayNumber] = useLocalStorage<
    number | undefined
  >('midweekday', undefined)

  return (
    <>
      <button
        type='button'
        onClick={() => {
          setShowModal(true)
        }}
      >
        <Cog6ToothIcon className='h-6 w-6' />
      </button>
      <Modal isOpen={showModal} setIsOpen={setShowModal} title='settings'>
        <Settings
          midweekDayNumber={midweekDayNumber}
          setMidweekDayNumber={setMidweekDayNumber}
        />
      </Modal>
    </>
  )
}
