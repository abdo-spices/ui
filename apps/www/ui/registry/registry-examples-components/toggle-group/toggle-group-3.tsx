import { Bold, Italic, Underline } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/registry/registry-ui-components/toggle-group'

export default function ToggleGroup1Demo() {
  return (
    <ToggleGroup
      variant="outline"
      type="multiple"
    >
      <ToggleGroupItem
        value="bold"
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        aria-label="Toggle underline"
      >
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
