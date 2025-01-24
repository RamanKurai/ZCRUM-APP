import React from 'react'

const OrganizationPage = async ({params}) => {
    const {orgId} = await params;
  return (
    <div>
      {orgId}
    </div>
  )
}

export default OrganizationPage
