import React, { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';

const AttachmentsPanel = ({ issueDetail, setIssueDetail }) => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        const newAttachments = files.map(file => ({
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file)
        }));

        setIssueDetail(prevDetail => ({
            ...prevDetail,
            attachments: [...(prevDetail.attachments || []), ...newAttachments]
        }));
    };

    const handleDeleteAttachment = (index) => {
        setIssueDetail(prevDetail => ({
            ...prevDetail,
            attachments: prevDetail.attachments.filter((_, i) => i !== index)
        }));
    };

    const renderFilePreview = (file) => {
        if (file.type.startsWith('image/')) {
            return <img src={file.url} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {issueDetail && issueDetail.attachments && issueDetail.attachments.map((file, index) => (
                    <Box
                        key={index}
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
                            onClick={() => handleDeleteAttachment(index)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
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
