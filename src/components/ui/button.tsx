import * as React from "react"
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'xl'
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, href, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4"
    
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300"
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6 text-base",
      xl: "h-14 px-8 text-lg"
    }
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className || ''}`
    
    // If asChild is true and we have a Link as children, render the Link directly
    if (asChild && React.isValidElement(children) && children.type === Link) {
      return React.cloneElement(children, {
        className: classes,
        ...props
      })
    }
    
    // If href is provided, render as Link
    if (href) {
      return (
        <Link href={href} className={classes} {...props}>
          {children}
        </Link>
      )
    }
    
    // Otherwise render as button
    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }