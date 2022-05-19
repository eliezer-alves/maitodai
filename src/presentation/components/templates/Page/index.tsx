import { ReactNode } from "react"

type PageProps = {
  children: ReactNode
  className?: string
}

export function Page({children, className}: PageProps ) {
  return (
    <div className={"h-screen w-full flex-col-center scroll-m-1 overflow-y-auto " + className}>
      {children}
    </div>
  )
}