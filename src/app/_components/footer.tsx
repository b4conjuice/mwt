'use client'

import { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid'

import Footer, { FooterListItem } from '@/components/design/footer'
import Modal from '@/components/modal'
import useLocalStorage from '@/lib/useLocalStorage'

export default function FooterComponent() {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [text, setText] = useLocalStorage<string>('text', '')
  return (
    <>
      <Footer>
        <FooterListItem onClick={() => setIsNoteModalOpen(true)}>
          <PencilSquareIcon className='h-6 w-6' />
        </FooterListItem>
      </Footer>
      <Modal
        isOpen={isNoteModalOpen}
        setIsOpen={setIsNoteModalOpen}
        dialogClassName='fixed inset-0 flex flex-col overflow-y-auto'
        outerContainerClassName='flex-grow flex flex-col'
        dialogPanelClassName='relative z-10 rounded-lg dark:bg-cb-dusty-blue dark:text-gray-100 flex-grow flex flex-col'
        innerContainerClassName='space-y-3 flex-grow flex flex-col'
      >
        <textarea
          className='w-full flex-grow bg-cobalt text-cb-white'
          value={text}
          onChange={e => {
            setText(e.target.value)
          }}
        />
      </Modal>
    </>
  )
}
