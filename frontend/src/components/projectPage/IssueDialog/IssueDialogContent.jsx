import React from 'react';
import { Box, Divider } from '@mui/material';
import DescriptionPanel from './DescriptionPanel';
import AttachmentsPanel from './AttachmentsPanel';
import TitlePanel from './TitlePanel';
import CreatedByPanel from './CreatedByPanel';
import SelectPriorityPanel from './SelectPriorityPanel';
import DeleteIssuePanel from './DeleteIssuePanel';
import CommentsPanel from './CommentsPanel';

const LeftPanel = ({ issueDetail, setIssueDetail }) => {
    return (
        <Box sx={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', overflowY: 'auto',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        }}>
            <TitlePanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            <Divider sx={{ mb: 2, borderColor: 'border.main' }} />
            <DescriptionPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            <AttachmentsPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            <CommentsPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
        </Box>
    )
}

const RightPanel = ({ issueDetail, setIssueDetail }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 1 }}>
            <CreatedByPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            <SelectPriorityPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            <DeleteIssuePanel issueDetail={issueDetail} />
        </Box>
    )
}


const IssueDialogContent = ({ issueDetail, setIssueDetail }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: '70%', height: '100%', pr: 2 }}>
                <LeftPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={{ width: '30%', height: '100%', pl: 2 }}>
                <RightPanel issueDetail={issueDetail} setIssueDetail={setIssueDetail} />
            </Box>
        </Box>
    )
}

export default IssueDialogContent