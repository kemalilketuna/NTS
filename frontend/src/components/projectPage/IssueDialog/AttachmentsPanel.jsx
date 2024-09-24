import React, { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import apiClient from '../../../api/apiClient';

const AttachmentsPanel = ({ issueDetail, setIssueDetail }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = async (event) => {
        const files = Array.from(event.target.files);
        const newAttachments = files.map(file => ({
            name: file.name,
            type: file.type,
            size: file.size,
            file: file
        }));

        const responses = await Promise.all(newAttachments.map(async (attachment) => {
            const formData = new FormData();
            formData.append('file', attachment.file);
            formData.append('name', attachment.name);
            formData.append('type', attachment.type);
            formData.append('size', attachment.size);
            formData.append('issue', issueDetail.id);
            formData.append('project', issueDetail.project);
            const response = await apiClient.createAttachment(formData);
            return response;
        }))

        setIssueDetail(prevDetail => ({
            ...prevDetail,
            attachments: [...(prevDetail.attachments || []), ...responses]
        }));
    };

    const handleDeleteAttachment = (index) => {
        const attachment = issueDetail.attachments[index];
        apiClient.deleteAttachment(attachment.id);

        setIssueDetail(prevDetail => ({
            ...prevDetail,
            attachments: prevDetail.attachments.filter((_, i) => i !== index)
        }));
    };

    const renderFilePreview = (file) => {
        if (file.type.startsWith('image/')) {
            console.log(file.file);
            return <img src={file.file} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
        } else if (file.type === 'application/pdf') {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <PictureAsPdfIcon sx={{ fontSize: 40, color: '#f40f02' }} />
                    <Typography variant="caption" align="center">
                        {file.name}
                    </Typography>
                </Box>
            );
        } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <DescriptionIcon sx={{ fontSize: 40, color: '#4285f4' }} />
                    <Typography variant="caption" align="center">
                        {file.name}
                    </Typography>
                </Box>
            );
        } else {
            return (
                <Typography variant="caption" align="center">
                    {file.name}
                </Typography>
            );
        }
    };

    return (
        <Box>
            <Typography variant="h6" pl={1} mb={1}>Attachments</Typography>
            <Box sx={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }, gap: 2, width: '100%', whiteSpace: 'nowrap' }}>
                <IconButton
                    sx={{
                        width: 120,
                        height: 120,
                        border: '1px dashed #ccc',
                        borderRadius: 1,
                    }}
                    onClick={() => fileInputRef.current.click()}
                >
                    <AddIcon />
                </IconButton>
                {issueDetail && issueDetail.attachments && issueDetail.attachments.slice().reverse().map((file, index) => (
                    <Box
                        key={issueDetail.attachments.length - 1 - index} // Adjusted key for correct mapping
                        sx={{
                            width: 120,
                            height: 120,
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            flexShrink: 0, // Prevent shrinking
                        }}
                    >
                        {renderFilePreview(file)}
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            }}
                            onClick={() => handleDeleteAttachment(issueDetail.attachments.length - 1 - index)} // Adjusted index for deletion
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
            </Box>
        </Box>
    );
};

export default AttachmentsPanel;
