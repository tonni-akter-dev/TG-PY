'use client';
import * as React from 'react';
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';

// ✅ Styled MUI Dialog
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: theme.shadows[24],
  },
}));

// ✅ Interfaces
interface MessageBlock {
  id: string;
  messageLink: string;
  targetGroups: string;
}

interface EditTargetGroupsModalProps {
  open: boolean;
  onClose: () => void;
}

// ✅ Main Edit Modal
export function EditTargetGroupsModal({ open, onClose }: EditTargetGroupsModalProps) {
  const [blocks, setBlocks] = React.useState<MessageBlock[]>([
    { id: '1', messageLink: 'https://t.me/vipstore_world/30', targetGroups: 'https://t.me/+JsrXK_QwINWQ1' },
  ]);

  const handleAddBlock = () => {
    setBlocks(prev => [
      ...prev,
      { id: (prev.length + 1).toString(), messageLink: '', targetGroups: '' },
    ]);
  };

  const handleRemoveBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(b => b.id !== blockId));
  };

  const handleUpdateBlock = (
    blockId: string,
    field: 'messageLink' | 'targetGroups',
    value: string
  ) => {
    setBlocks(prev =>
      prev.map(b => (b.id === blockId ? { ...b, [field]: value } : b))
    );
  };

  const handleSave = () => {
    console.log('Saved blocks:', blocks);
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Edit Target Groups & Messages
          </Typography>
          <Button
            onClick={onClose}
            variant="outlined"
            size="small"
            sx={{
              color: 'error.main',
              borderColor: 'error.main',
              '&:hover': { backgroundColor: 'error.light' },
            }}
          >
            Cancel
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Edit your message blocks. Each block contains a message link and its target groups:
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {blocks.map((block, index) => (
          <Box key={block.id} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 2, backgroundColor: '#fafafa' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ backgroundColor: '#e3f2fd', padding: '4px 8px', borderRadius: 1, display: 'inline-block' }}>
                Block {index + 1}
              </Typography>
              {blocks.length > 1 && (
                <Button
                  onClick={() => handleRemoveBlock(block.id)}
                  variant="contained"
                  size="small"
                  startIcon={<DeleteIcon />}
                  sx={{
                    backgroundColor: 'error.main',
                    color: 'white',
                    minWidth: 'auto',
                    padding: '4px 8px',
                    '&:hover': { backgroundColor: 'error.dark' },
                  }}
                />
              )}
            </Box>

            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}>
              Message Link:
            </Typography>
            <TextField
              fullWidth
              value={block.messageLink}
              onChange={e => handleUpdateBlock(block.id, 'messageLink', e.target.value)}
              sx={{ mb: 2 }}
            />

            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: 'text.primary' }}>
              Target Groups:
            </Typography>
            <TextField
              fullWidth
              value={block.targetGroups}
              onChange={e => handleUpdateBlock(block.id, 'targetGroups', e.target.value)}
            />
          </Box>
        ))}

        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddBlock}
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            borderRadius: 2,
            py: 1.5,
            fontWeight: 500,
            '&:hover': { bgcolor: 'success.dark' },
          }}
        >
          + Add New Block
        </Button>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Save All Changes
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}