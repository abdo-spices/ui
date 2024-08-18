'use client'
import * as React from 'react'
import { cn } from '@/lib'
import { Button, ButtonProps } from './Button'
import { filteredObject, generateHeaderArrays } from '@/lib/utils'
import { Separator } from './ShadcnUI'

export type NavGroupProps<T extends boolean> = {
  navigationKeys: ButtonProps[]
  nav: NavType<T>
}

export type NavType<T extends boolean> = NavCollabsableType<T> & {
  group: number[]
  router: any //AppRouterInstance
  pathname: string
  className?: string
}

export type NavCollabsableType<K> = K extends true ? NavCollabsedType : NavNotCollabsedType

export interface NavCollabsedType {
  isCollabsed?: boolean
}
export interface NavNotCollabsedType {}

export const NavGroup = <T extends boolean>({ navigationKeys, nav }: NavGroupProps<T>) => {
  const grouped = generateHeaderArrays<ButtonProps>(nav.group, navigationKeys)
  const navIsCollabsed = (nav as NavCollabsedType).isCollabsed
  const filteredKeys = filteredObject(['group', 'router', 'location', 'isCollabsed'], nav)

  const variants = {
    default: 'grid items-center',
  }

  return (
    <div
      className={cn('w-fit h-full', nav.className)}
      {...filteredKeys}
    >
      {
        <div className={variants.default}>
          {grouped.map((keyGroup, idx) => (
            <React.Fragment key={idx}>
              <ul className={cn(variants.default, 'px-2 py-1')}>
                {keyGroup.map((key, idx) => {
                  const { className, isCollapsed, onClick, variant, children, icon, ...props } = key
                  return (
                    <>
                      <li
                        key={idx}
                        className="w-full"
                      >
                        <Button
                          key={idx}
                          icon={key.icon}
                          variant={variant || 'ghost'}
                          isCollapsed={navIsCollabsed ? navIsCollabsed : false}
                          className={cn(
                            'w-full justify-between',
                            nav.pathname === key.route &&
                              'bg-primary text-white hover:bg-primary/90 hover:text-white h-10',
                            key.className
                          )}
                          onClick={() => console.log('hi')}
                          {...props}
                        >
                          {children}
                        </Button>
                      </li>
                    </>
                  )
                })}
                {idx !== keyGroup.length - 1 && <Separator className="my-1" />}
              </ul>
            </React.Fragment>
          ))}
        </div>
      }
    </div>
  )
}
