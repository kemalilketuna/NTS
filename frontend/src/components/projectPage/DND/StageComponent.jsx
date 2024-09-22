import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import AddIssueButton from './AddIssueButton';
import { useTheme } from '@mui/material/styles';
import IssueBox from './IssueBox';

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



const DroppableArea = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 200,
});



const StageComponent = ({ columnId, items, columnName, handleAddBox, showInputID, setShowInputID }) => {
    const theme = useTheme();
    const titleColor = theme.palette.stageName[columnName] || 'black';
    const backgroundColor = theme.palette.stageNameBackgroundColor[columnName] || 'white';

    return (
        <Box key={columnId}>
            <ColumnPaper elevation={3}>
                <Box display='flex' justifyContent='space-between'>
                    <Box sx={{
                        backgroundColor: backgroundColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0px 5px',
                        borderRadius: '3px',
                        width: 'fit-content',
                    }}>
                        <Typography variant="body2" color={titleColor} fontWeight="bold" fontSize="0.8rem" width='fit-content'>
                            {columnName}
                        </Typography>
                    </Box>

                    <Typography variant="body1" color={titleColor} fontWeight="bold" fontSize="1rem" width='fit-content'>
                        {items.length}
                    </Typography>
                </Box>
                <Box sx={{
                    mt: 2,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    ml: -1.5,
                    mr: -1.5,
                }}>
                    <Droppable droppableId={columnId}>
                        {(provided) => (
                            <DroppableArea
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {items.map((item, index) => (
                                    <IssueBox key={item.id} item={item} index={index} />
                                ))}
                                {provided.placeholder}
                            </DroppableArea>
                        )}
                    </Droppable>
                </Box>
                <AddIssueButton
                    columnId={columnId}
                    handleAddBox={handleAddBox}
                    showInputID={showInputID}
                    setShowInputID={setShowInputID}
                />
            </ColumnPaper>
        </Box>
    );
};

export default StageComponent;