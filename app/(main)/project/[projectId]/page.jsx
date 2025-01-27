import { getProject } from '@/actions/projects';
import { notFound } from 'next/navigation';
import React from 'react'
import SprintCreationForm from '../_components/create-sprint';

const ProjectPage = async ({params}) => {
  const {projectId} =  await params;
  const project = await getProject(projectId)
    if (!project) {
      notFound();
  }
  return (
    <div className="container mx-auto">
    <SprintCreationForm
      projectTitle={project.name}
      projectId={projectId}
      projectKey={project.key}
      sprintKey={project.sprints?.length + 1}
    />

    {project.sprints.length > 0 ? (
      // <SprintBoard
      //   sprints={project.sprints}
      //   projectId={projectId}
      //   orgId={project.organizationId}
       <></>
    ) : (
      <div>Create a Sprint from button above</div>
    )}
  </div>
  )
}

export default ProjectPage
