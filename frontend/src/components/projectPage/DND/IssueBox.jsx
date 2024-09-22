import React from 'react';
import { Paper, Typography, styled, Box } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';

const DraggableBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.issueBox,
    borderRadius: '5px',
    border: '0.5px solid',
    borderColor: theme.palette.border.main,
    cursor: 'grab',
    minHeight: '80px',
}));

const IssueBox = ({ item, index }) => {
    return (
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
    );
};

export default IssueBox;