import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import AddBoxButton from './AddBoxButton';
import apiClient from '../../../api/apiClient';
import { useParams } from 'react-router-dom';

const ColumnPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    minHeight: '40vh',
    maxHeight: '75vh',
    backgroundColor: theme.palette.background.dark,
    width: '22vw',
    borderRadius: '15x',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
}));

const DraggableBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // height: '80px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    border: '0.5px solid',
    // borderColor: theme.palette.border.main,
    cursor: 'grab',
}));

const DroppableArea = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 200,
});

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
                    <Box key={columnId}>
                        <ColumnPaper elevation={3}>
                            <Typography variant="h6" align="center" color="text.primary">
                                {columnNames[columnId]}
                            </Typography>
                            <Box sx={{
                                overflowY: 'auto',
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                            }}>
                                <Droppable droppableId={columnId}>
                                    {(provided) => (
                                        <DroppableArea
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                                    {(provided) => (
                                                        <DraggableBox
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            elevation={2}
                                                        >
                                                            <Typography color="text.primary">{item.title}</Typography>
                                                        </DraggableBox>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </DroppableArea>
                                    )}
                                </Droppable>
                            </Box>
                            <AddBoxButton
                                columnId={columnId}
                                handleAddBox={handleAddBox}
                                showInputID={showInputID}
                                setShowInputID={setShowInputID}
                            />
                        </ColumnPaper>
                    </Box>
                ))}
            </Box>
        </DragDropContext>
    );
};

export default DragAndDropComponent;
