'use client'

import * as React from 'react'

import { Style, styles } from '@duck/registers'
import { useConfig } from '~/hooks/use-config'
import { cn } from '@duck/libs/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@duck/registry-ui-duckui/select'

export function StyleSwitcher({
  className,
  ...props
<<<<<<< HEAD
}: React.ComponentPropsWithoutRef<typeof SelectTrigger>) {
=======
}: React.ComponentPropsWithRef<typeof SelectTrigger>) {
>>>>>>> main
  const [config, setConfig] = useConfig()

  return (
    <Select
      value={config.style}
      onValueChange={(value: Style['name']) =>
        setConfig({
          ...config,
          style: value,
        })
      }
    >
      <SelectTrigger
        className={cn(
          'h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4',
          className,
        )}
        {...props}
      >
        <span className="text-muted-foreground">Style: </span>
        <SelectValue placeholder="Select style" />
      </SelectTrigger>
      <SelectContent>
        {styles.map((style) => (
          <SelectItem key={style.name} value={style.name} className="text-xs">
            {style.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
