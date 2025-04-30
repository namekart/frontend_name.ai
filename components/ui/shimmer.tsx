import { cn } from '@/lib/utils'

export function Shimmer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 bg-[length:200%_100%] animate-shimmer',
        className
      )}
      {...props}
    />
  )
}

export function ChatMessageShimmer() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 bg-[length:200%_100%] animate-shimmer" />
      <div className="flex-1">
        <div className="max-w-[80%] rounded-lg overflow-hidden bg-muted/30">
          <div className="p-4 space-y-2">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function UserMessageShimmer() {
  return (
    <div className="flex gap-3 justify-end">
      <div className="flex-1">
        <div className="max-w-[80%] rounded-lg overflow-hidden bg-primary/30 ml-auto">
          <div className="p-4 space-y-2">
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-3/4" />
          </div>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 bg-[length:200%_100%] animate-shimmer" />
    </div>
  )
} 