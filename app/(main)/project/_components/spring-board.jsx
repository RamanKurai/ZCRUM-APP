"use client"
import React, { useState } from 'react'
import SprintManager from './sprint-manager'

const SprintBoard = ({sprints , orgId , projectId}) => {
  const [currentSprint, setCurrentSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );
  return (
    <>
    <div>
    <SprintManager
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        sprints={sprints}
        projectId={projectId}
      />
    </div>
    </>
  )
}

export default SprintBoard
