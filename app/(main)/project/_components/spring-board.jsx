"use client";
import React, { useEffect, useState } from "react";
import SprintManager from "./sprint-manager";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import statuses from "@/data/status";
import IssueCreationDrawer from "./create-issue";
import { getIssuesForSprint, updateIssueOrder } from "@/actions/issues";
import useFetch from "@/hooks/use-fetch";
import IssueCard from "@/components/issues-card";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";


const  reorder =(list, startIndex, endIndex)=> {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
    
const SprintBoard = ({ sprints, orgId, projectId }) => {
  const [currentSprint, setCurrentSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    if (currentSprint.status === "PLANNED") {
      toast.warning("Start the sprint to update board");
      return;
    }
    if (currentSprint.status === "COMPLETED") {
      toast.warning("Cannot update board after sprint end");
      return;
    }
    // Handle drag logic here (e.g., update issue status in backend)
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newOrderedData = [...issues];

    // source and destination list
    const sourceList = newOrderedData.filter(
      (list) => list.status === source.droppableId
    );

    const destinationList = newOrderedData.filter(
      (list) => list.status === destination.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const reorderedCards = reorder(
        sourceList,
        source.index,
        destination.index
      );

      reorderedCards.forEach((card, i) => {
        card.order = i;
      });
    } else {
      // remove card from the source list
      const [movedCard] = sourceList.splice(source.index, 1);

      // assign the new list id to the moved card
      movedCard.status = destination.droppableId;

      // add new card to the destination list
      destinationList.splice(destination.index, 0, movedCard);

      sourceList.forEach((card, i) => {
        card.order = i;
      });

      // update the order for each card in destination list
      destinationList.forEach((card, i) => {
        card.order = i;
      });
    }

    const sortedIssues = newOrderedData.sort((a, b) => a.order - b.order);
    setIssues(newOrderedData, sortedIssues);

    updateIssueOrder(sortedIssues);
  };

  const handleAddIssue = (status) => {
    setSelectedStatus(status);
    setIsDrawerOpen(true);
  };

  const {
    loading: issuesLoading,
    error: issuesError,
    fn: fetchIssues,
    data: issues,
    setData: setIssues,
  } = useFetch(getIssuesForSprint);

  useEffect(() => {
    if (currentSprint.id) {
      fetchIssues(currentSprint.id);
    }
  }, [currentSprint.id]);

  if (issuesError) {
    return <div>Error Loading Issues</div>;
  }

  return (
    <>
      <div>
        <SprintManager
          sprint={currentSprint}
          setSprint={setCurrentSprint}
          sprints={sprints}
          projectId={projectId}
        />

        
        {(issuesLoading) && (
          <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-slate-900 p-4 rounded-lg">
            {statuses.map((column) => (
              <Droppable key={column.key} droppableId={column.key}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    <h3 className="font-semibold mb-2 text-center">
                      {column.name}
                    </h3>

                    {issues
                      ?.filter((issue) => issue.status === column.key)
                      .map((issue, index) => (
                        <Draggable
                          key={issue.id}
                          draggableId={issue.id}
                          index={index}
                          isDragDisabled={issuesLoading}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <IssueCard
                                issue={issue}
                                onDelete={() => fetchIssues(currentSprint.id)}
                                onUpdate={(updated) =>
                                  setIssues((prevIssues) =>
                                    prevIssues.map((i) =>
                                      i.id === updated.id ? updated : i
                                    )
                                  )
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}

                    {column.key === "TODO" &&
                      currentSprint.status !== "COMPLETED" && (
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => handleAddIssue(column.key)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Create Issue
                        </Button>
                      )}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        <IssueCreationDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sprintId={currentSprint.id}
          status={selectedStatus}
          projectId={projectId}
          onIssueCreated={() => fetchIssues(currentSprint.id)}
          orgId={orgId}
        />
      </div>
    </>
  );
};

export default SprintBoard;
