import { UserButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
      This is the dashboard.
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}

export default page
