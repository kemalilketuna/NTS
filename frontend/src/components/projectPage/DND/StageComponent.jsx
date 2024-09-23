import React, { useState, useEffect, useRef } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import AddIssueButton from './AddIssueButton';
import { useTheme } from '@mui/material/styles';
import IssueBox from './IssueBox';
import Confetti from 'react-confetti';

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


const StageComponent = ({ columnId, items, columnName, handleAddIssue, showInputID, setShowInputID }) => {
    const theme = useTheme();
    const titleColor = theme.palette.stageName[columnName] || 'black';
    const backgroundColor = theme.palette.stageNameBackgroundColor[columnName] || 'white';

    const [showConfetti, setShowConfetti] = useState(false);
    const [prevItemsLength, setPrevItemsLength] = useState(items.length);
    const columnRef = useRef(null);

    useEffect(() => {
        if (columnName === 'DONE' && items.length > prevItemsLength) {
            setShowConfetti(true);
        }
        setPrevItemsLength(items.length);
    }, [columnName, items.length, prevItemsLength]);

    return (
        <Box key={columnId} ref={columnRef}>
            <ColumnPaper elevation={3}>
                {showConfetti && (
                    <Confetti
                        width={columnRef.current?.offsetWidth}
                        height={columnRef.current?.offsetHeight + 400}
                        numberOfPieces={800}
                        recycle={false}
                        onConfettiComplete={() => setShowConfetti(false)}
                        style={{
                            position: 'absolute',
                            top: columnRef.current?.offsetTop,
                            left: columnRef.current?.offsetLeft,
                        }}
                    />
                )}
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
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Droppable droppableId={columnId}>
                        {(provided) => (
                            <DroppableArea
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                            >
                                {items.length > 0 && items.map((item, index) => (
                                    <IssueBox key={item.id} item={item} index={index} />
                                ))}
                                {provided.placeholder}
                            </DroppableArea>
                        )}
                    </Droppable>
                </Box>
                <AddIssueButton
                    columnId={columnId}
                    handleAddIssue={handleAddIssue}
                    showInputID={showInputID}
                    setShowInputID={setShowInputID}
                />
            </ColumnPaper>
        </Box >
    );
};

export default StageComponent;