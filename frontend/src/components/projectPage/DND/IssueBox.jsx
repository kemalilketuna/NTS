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
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
}));

const IssueBox = ({ item, index }) => {
    const priority = item.priority || 3;
    const priorityAsset = GetPriorityAssests(priority);

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
                        style={{ flexGrow: 1, overflowWrap: 'break-word', wordWrap: 'break-word', marginRight: '20px' }}
                    >
                        {item.title}
                    </Typography>
                    {priorityAsset && (
                        <img
                            src={priorityAsset}
                            alt={`Priority: ${priority}`}
                            style={{
                                width: '20px',
                                height: '20px',
                                position: 'absolute',
                                top: '5px',
                                right: '5px'
                            }}
                        />
                    )}
                </DraggableBox>
            )}
        </Draggable>
    );
};

export default IssueBox;