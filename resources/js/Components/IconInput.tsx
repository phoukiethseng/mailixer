import React from 'react'
import { Input } from '@/Components/Input'
import { LucideIcon, LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/Components/Separator'

type IconInputProps = {
  icon: LucideIcon
  enableSeparator?: boolean
} & React.ComponentPropsWithoutRef<'input'>

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ enableSeparator = true, ...props }, ref) => {
    const { icon: Icon, ...forwardedProps } = props
    const iconProps: LucideProps = {
      strokeWidth: 1.5,
      size: 19,
    }
    const { className, ...propsWithoutClassname } = props
    return (
      <div
        className={cn(
          'w-full flex flex-row justify-start items-center bg-background border border-input rounded-md p-0 m-0 pl-2',
          className
        )}
      >
        <Icon {...iconProps} className={'text-muted-foreground'} />
        {enableSeparator && (
          <Separator orientation={'vertical'} className={'h-6 ml-2'} />
        )}
        <Input
          type={'text'}
          className={
            'border-none rounded-none shadow-none focus-visible:ring-0'
          }
          {...propsWithoutClassname}
          ref={ref}
        />
      </div>
    )
  }
)

export default IconInput
