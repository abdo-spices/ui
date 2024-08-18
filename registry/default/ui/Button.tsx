import React from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Slot } from '@radix-ui/react-slot'
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'
import { Badge } from './Badge'
import { CommandShortcut } from './Command'

import { cn } from '@/lib'
import { cva } from 'class-variance-authority'
import { VariantProps } from 'class-variance-authority'
import { Loader } from 'lucide-react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isCollapsed?: boolean
  icon?: React.ReactElement
  secondIcon?: React.ReactElement
  label?: LabelType
  route?: string
  command?: CommandType
  delayDuration?: number
  loading?: boolean
}

export interface LabelType extends Partial<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>> {
  showLabel?: boolean
}

export type CommandType = {
  label?: string
  key: string
  state?: unknown
  action?: <T>(arg?: T) => void
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      isCollapsed = false,
      size = 'default',
      variant = 'default',
      title,
      className,
      label,
      children,
      icon: Icon,
      secondIcon: SecondIcon,
      delayDuration = 0,
      loading = false,
      command,
      ...props
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement> | undefined
  ) => {
    const Component = asChild ? Slot : 'button'

    // Handle keyboard shortcuts
    React.useEffect(() => {
      if (command?.key) {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === command.key && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            command.action && command.action()
          }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
      }
    }, [command?.state])

    // Handle keyboard shortcut Badge
    const CommandComponent = () => (
      <CommandShortcut className="text-[.8rem]">
        <Badge
          variant={'secondary'}
          size={'sm'}
          className="p-0 px-2"
        >
          {command?.label}
        </Badge>
      </CommandShortcut>
    )

    return (
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          <Component
            ref={ref}
            className={cn(
              buttonVariants({
                variant: variant || 'ghost',
                size: size ? (isCollapsed ? 'icon' : size) : isCollapsed ? 'icon' : 'default',
                className: cn(!isCollapsed && 'flex items-center gap-2', 'justify-center', className),
              })
            )}
            disabled={loading}
            {...props}
          >
            <div className="flex items-center gap-2">
              {!loading ? (
                Icon && <span className="[&_svg]:size-[1.18rem]">{!!Icon && !loading && Icon} </span>
              ) : (
                <Loader className="size-[1.18rem] animate-spin" />
              )}
              {!isCollapsed && (children || title)}
            </div>
            {!isCollapsed && command?.label && <CommandComponent />}

            {!isCollapsed && label && !label?.showLabel && (
              <span className="ml-2 text-[.9rem]">{label.children as unknown as React.ReactNode}</span>
            )}
            {!isCollapsed && !loading && SecondIcon}
          </Component>
        </TooltipTrigger>
        {(isCollapsed || label?.showLabel) && (title || label) && (
          <TooltipContent
            {...label}
            className={cn('flex items-center gap-4 z-50 justify-start', label?.className)}
            side={label?.side || 'right'}
          >
            {title && (title as unknown as React.ReactNode)}
            {command?.label && <CommandComponent />}
            {label && (
              <span className={cn('ml-auto text-[.9rem]', !label.showLabel && 'text-muted-foreground')}>
                {label.children as unknown as React.ReactNode}
              </span>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
