import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <>
                <div className="flex items-center col-start-2 col-end-6  w-full ml-14 py-2">
                    <input
                        type={type}
                        className={cn(
                            "flex h-9  border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
            </>
        )
    }
)
Input.displayName = "Input"

export { Input }