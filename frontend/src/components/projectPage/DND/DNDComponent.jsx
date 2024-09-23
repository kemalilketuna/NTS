import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import apiClient from '../../../api/apiClient';
import { useParams } from 'react-router-dom';
import StageComponent from './StageComponent';
import { useSelector, useDispatch } from 'react-redux';
import { selectColumns, addIssue, changeIssueStage } from '../../../redux/projectSlice';

const DragAndDropComponent = () => {
    const [showInputID, setShowInputID] = useState(''); // for Add Issue Button

    const { projectId } = useParams();
    const dispatch = useDispatch();
    const columns = useSelector(selectColumns);


    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        dispatch(changeIssueStage({
            issueId: result.draggableId,
            sourceId: source.droppableId,
            destinationId: destination.droppableId
        }));
        apiClient.updateIssue(result.draggableId, { stage: destination.droppableId });
    };

    const handleAddIssue = async (columnId, newBoxContent) => {
        if (!newBoxContent.trim()) return;

        try {
            const response = await apiClient.createIssue(newBoxContent, projectId, columnId);
            const newBox = { id: String(response.id), title: newBoxContent, stageId: columnId };
            dispatch(addIssue(newBox));
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    };


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={{ display: 'flex', gap: '3vw' }}>
                {columns.length > 0 && columns.map((stage) => (
                    <StageComponent
                        key={stage.id}
                        columnId={stage.id}
                        items={stage.issues}
                        columnName={stage.name}
                        handleAddIssue={handleAddIssue}
                        showInputID={showInputID}
                        setShowInputID={setShowInputID}
                    />
                ))}
            </Box>
        </DragDropContext>
    );
};

export default DragAndDropComponent;
