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
    maxHeight: '70vh',
    backgroundColor: theme.palette.background.dark,
    width: '20vw',
    borderRadius: '15x',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    display: 'flex',
    flexDirection: 'column',
}));

const DraggableBox = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // height: '80px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    border: '0.5px solid',
    borderColor: '#ddd',
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

    useEffect(() => {
        const fetchIssues = async () => {
            const response = await apiClient.getProjectDetail(projectId);
            setColumns({});
            response.stages.forEach((column) => {
                setColumns((prevColumns) => ({
                    ...prevColumns,
                    [column.id]: column.issues,
                }));
                setColumnNames((prevColumnNames) => ({
                    ...prevColumnNames,
                    [column.id]: column.name,
                }));
            });
        };
        fetchIssues();
    }, [projectId]);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceColumn = Array.from(columns[source.droppableId]);
        const [removed] = sourceColumn.splice(source.index, 1);
        const destinationColumn = Array.from(columns[destination.droppableId]);
        destinationColumn.splice(destination.index, 0, removed);

        setColumns((prevColumns) => ({
            ...prevColumns,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destinationColumn,
        }));

        apiClient.updateIssueStage(removed.id, destination.droppableId);
    };

    const handleAddBox = async (columnId, newBoxContent) => {
        if (!newBoxContent.trim()) return;

        try {
            const response = await apiClient.createIssue(newBoxContent, projectId, columnId);
            const newBoxId = String(response.id); // Ensure newBoxId is a string
            const newBox = { id: newBoxId, title: newBoxContent };
            const newColumnItems = [...columns[columnId], newBox];

            setColumns((prevColumns) => ({
                ...prevColumns,
                [columnId]: newColumnItems,
            }));
        } catch (error) {
            console.error('Error creating issue:', error);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box sx={{ display: 'flex', gap: 4 }}>
                {Object.entries(columns).map(([columnId, items]) => (
                    <Box key={columnId}>
                        <ColumnPaper elevation={3}>
                            <Typography variant="h6" align="center" color="text.primary">
                                {columnNames[columnId]}
                            </Typography>
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
                            <AddBoxButton
                                columnId={columnId}
                                handleAddBox={handleAddBox}
                            />
                        </ColumnPaper>
                    </Box>
                ))}
            </Box>
        </DragDropContext>
    );
};

export default DragAndDropComponent;
