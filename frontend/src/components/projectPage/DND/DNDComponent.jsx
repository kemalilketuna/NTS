import React, { useEffect, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import apiClient from '../../../api/apiClient';
import { useParams } from 'react-router-dom';
import StageComponent from './StageComponent';


const DragAndDropComponent = () => {
    const { projectId } = useParams();
    const [columns, setColumns] = useState({});
    const [columnNames, setColumnNames] = useState({});
    const [showInputID, setShowInputID] = useState('');

    useEffect(() => {
        const fetchIssues = async () => {
            const response = await apiClient.getProjectDetail(projectId);
            const newColumns = {};
            const newColumnNames = {};

            response.stages.forEach((column) => {
                newColumns[column.id] = column.issues;
                newColumnNames[column.id] = column.name;
            });

            setColumns(newColumns);
            setColumnNames(newColumnNames);
        };
        fetchIssues();
    }, [projectId]);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            return;
        }

        setColumns((prevColumns) => {
            const newColumns = { ...prevColumns };
            const sourceColumn = [...newColumns[source.droppableId]];
            const destColumn = [...newColumns[destination.droppableId]];
            const [removed] = sourceColumn.splice(source.index, 1);
            destColumn.splice(destination.index, 0, removed);

            newColumns[source.droppableId] = sourceColumn;
            newColumns[destination.droppableId] = destColumn;

            apiClient.updateIssueStage(removed.id, destination.droppableId);
            return newColumns;
        });
    };

    const handleAddBox = async (columnId, newBoxContent) => {
        if (!newBoxContent.trim()) return;

        try {
            const response = await apiClient.createIssue(newBoxContent, projectId, columnId);
            const newBox = { id: String(response.id), title: newBoxContent };

            setColumns((prevColumns) => ({
                ...prevColumns,
                [columnId]: [...prevColumns[columnId], newBox],
            }));
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={{ display: 'flex', gap: '3vw' }}>
                {Object.entries(columns).map(([columnId, items]) => (
                    <StageComponent
                        key={columnId}
                        columnId={columnId}
                        items={items}
                        columnName={columnNames[columnId]}
                        handleAddBox={handleAddBox}
                        showInputID={showInputID}
                        setShowInputID={setShowInputID}
                    />
                ))}
            </Box>
        </DragDropContext>
    );
};

export default DragAndDropComponent;
