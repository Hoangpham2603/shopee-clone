import { FloatingPortal } from '@floating-ui/react'
import { arrow, offset, shift, useFloating, type Placement } from '@floating-ui/react-dom'
import React, { useRef, useState, useId, ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function ({ children, className, renderPopover, as: Element = 'div', initialOpen, placement }: Props) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)

  const { x, y, refs, strategy, middlewareData } = useFloating({
    open,
    placement: placement,
    middleware: [
      offset(5),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })

  const id = useId()

  const showPopover = () => {
    setOpen(true)
  }

  const hidePopover = () => {
    setOpen(false)
  }

  //          MAIN
  return (
    <Element className='flex justify-end '>
      <div className={className} ref={refs.setReference} onMouseOver={showPopover} onMouseLeave={hidePopover}>
        {children}

        <FloatingPortal id={id}>
          <AnimatePresence>
            {open && (
              <motion.div
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content',
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                }}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
              >
                <div className='relative w-max rounded-sm border-gray-200 bg-white shadow-md'>
                  {/* Arrow */}
                  <span
                    className=' absolute z-10 -translate-y-[99%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                    ref={arrowRef}
                    style={{
                      left: middlewareData.arrow?.x,
                      top: middlewareData.arrow?.y
                    }}
                  />

                  {renderPopover}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </Element>
  )
}
