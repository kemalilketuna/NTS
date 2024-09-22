import React from 'react';
import { Typography, styled, Box } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';
import GetPriorityAssests from '../../general/PriorityAssets';

const DraggableBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.issueBox,
    borderRadius: '5px',
    border: '0.5px solid',
    borderColor: theme.palette.border.main,
    cursor: 'grab',
    minHeight: '80px',
    position: 'relative', // Added for positioning child elements
}));

const PriorityLogo = ({ item, style }) => { // Added style prop
    const priority = GetPriorityAssests(item.priority);
    return <img style={{ width: '20px', height: '20px', ...style }} src={priority} alt="Priority" />; // Merged styles
};

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
                    <Typography
                        color="text.primary"
                        style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis' }} // Added styles for multiline
                    >
                        {item.title}
                    </Typography>
                    <PriorityLogo item={item} style={{ position: 'absolute', top: '5px', right: '5px' }} />
                </DraggableBox>
            )}
        </Draggable>
    );
};

export default IssueBox;