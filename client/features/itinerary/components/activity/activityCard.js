import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function MediaControlCard({ activity, onDelete }) {
  const [description, setDescription] = useState(activity.description || '');
  const [prevDescription, setPrevDescription] = useState(description);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleEditing = (isSaving) => {
    if (isEditing) {
      if (!isSaving) {
        setDescription(prevDescription); // Revert to the previous description when canceling
      }
    } else {
      setPrevDescription(description); // Store the current description when entering edit mode
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    toggleEditing(true); // Pass true to indicate you are saving the edit
  };

  const handleDelete = () => {
    onDelete(activity.id);
    handleClose();
  };

  return (
    <Card sx={{ display: 'flex', padding: 3 }}>
      <CardMedia
        component='img'
        sx={{ width: 250 }}
        image={activity.imageUrl}
        alt='activity picture'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            {activity.name}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            10:00am - 12:00pm
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {isEditing ? (
              <TextField
                value={description}
                onChange={handleDescriptionChange}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleSave();
                    event.preventDefault(); // Prevent adding a new line
                  }
                }}
                multiline
                fullWidth
              />
            ) : (
              description
            )}
          </Typography>
        </CardContent>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
          <IconButton
            edge='end'
            color='inherit'
            aria-label='menu'
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={toggleEditing}>
              {isEditing ? 'Cancel' : 'Edit'}
            </MenuItem>
            {isEditing && <MenuItem onClick={handleSave}>Save</MenuItem>}
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Card>
  );
}
