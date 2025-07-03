import { Metadata } from 'next'
import React from 'react'


export const metadata:Metadata = {
    title:"About CamBot"
}
const aboutlayout = ({children}: {
    children: React.ReactNode,
}) => {
  return (
    <div>{children}</div>
  )
}

export default aboutlayout