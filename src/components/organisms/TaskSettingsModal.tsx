/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import * as React from 'react';
import {
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { EditTargetGroupsModal } from './EditTargetGroupsModal';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    maxHeight: '95vh',
    overflowY: 'auto',
    boxShadow: theme.shadows[24]
  }
}));

interface TaskSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskSettingsModal({ isOpen, onClose }: TaskSettingsModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ pb: 2, backgroundColor: 'transparent' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant='h5' fontWeight='bold' color='text.primary'>
              01 Settings
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                fontSize: '0.875rem',
                color: 'text.secondary'
              }}
            >
              <span>0/1</span>
              <span>0 success</span>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant='body2' color='text.secondary'>
              Account Settings
            </Typography>
            <Typography variant='body2' fontWeight='medium' color='text.primary'>
              1816948258
            </Typography>
            <Button
              size='small'
              onClick={onClose}
              sx={{
                minWidth: 'auto',
                height: 32,
                width: 32,
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <CloseIcon fontSize='small' />
            </Button>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 3,
          '&:last-child': { pb: 3 },
          backgroundColor: 'transparent',
          color: 'text.primary'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6' fontWeight='bold' color='text.primary'>
            Forwarder Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type='number'
                label='Internal Min'
                value={20}
                InputProps={{
                  endAdornment: (
                    <Typography variant='body2' color='text.secondary'>
                      seconds
                    </Typography>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider'
                    },
                    '&:hover fieldset': {
                      borderColor: 'text.secondary'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main'
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type='number'
                label='Internal Max'
                value={25}
                InputProps={{
                  endAdornment: (
                    <Typography variant='body2' color='text.secondary'>
                      seconds
                    </Typography>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider'
                    },
                    '&:hover fieldset': {
                      borderColor: 'text.secondary'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main'
                  }
                }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                type='number'
                label='After Each Forward'
                value={360}
                InputProps={{
                  endAdornment: (
                    <Typography variant='body2' color='text.secondary'>
                      seconds
                    </Typography>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider'
                    },
                    '&:hover fieldset': {
                      borderColor: 'text.secondary'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main'
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type='number'
                label='Random Sleep Min'
                value={30}
                InputProps={{
                  endAdornment: (
                    <Typography variant='body2' color='text.secondary'>
                      seconds
                    </Typography>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider'
                    },
                    '&:hover fieldset': {
                      borderColor: 'text.secondary'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'primary.main'
                  }
                }}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            multiline
            rows={3}
            label='Reply Message'
            value='Hi this is advertising bot main @vipstore'
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'divider'
                },
                '&:hover fieldset': {
                  borderColor: 'text.secondary'
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main'
                }
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary'
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'primary.main'
              }
            }}
          />
        </Box>

        <Divider sx={{ my: 3, borderColor: 'divider' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h6' fontWeight='bold' color='text.primary'>
            Task Management for this account
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Found 3 tasks for this account:
          </Typography>
          <FormControl fullWidth variant='outlined'>
            <InputLabel color='primary'>Select Task</InputLabel>
            <Select
              value='1'
              label='Select Task'
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'text.secondary'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main'
                }
              }}
            >
              <MenuItem value='1' sx={{ color: 'text.primary' }}>
                Asraful (1)
              </MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
              border: `1px solid ${'divider'}`
            }}
          >
            <Typography variant='body2' fontWeight='medium' color='text.primary'>
              Asraful
            </Typography>
          </Box>
          <Button
            fullWidth
            variant='outlined'
            onClick={() => setOpen(true)}
            size='small'
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              marginbottom: 2,
              '&:hover': {
                borderColor: 'text.secondary',
                backgroundColor: 'action.hover'
              }
            }}
          >
            Edit Target Groups Messages
          </Button>
        </Box>

        <Box
          sx={{
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: 1,
            border: `1px solid ${'divider'}`
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            These settings apply only to this account when forwarding messages.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          backgroundColor: 'transparent'
        }}
      >
        <Button
          variant='outlined'
          fullWidth
          sx={{
            flex: { xs: 1, sm: 'auto' },
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'text.secondary',
              backgroundColor: 'action.hover'
            }
          }}
        >
          Reset to Defaults
        </Button>
        <Button
          variant='outlined'
          fullWidth
          sx={{
            flex: { xs: 1, sm: 'auto' },
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'text.secondary',
              backgroundColor: 'action.hover'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          sx={{
            flex: { xs: 1, sm: 'auto' },
            bgcolor: 'primary.main',
            color: 'common.white',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          Save Settings
        </Button>
      </DialogActions>
      {open && <EditTargetGroupsModal onClose={handleClose} open={open} />}
    </StyledDialog>
  );
}