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
import Button from '@mui/material/Button';

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

  let startDate = new Date(activity.itinerary_activity.date);
  let activityDuration = activity.itinerary_activity.duration;

  const dateTimeGenerator = (date, duration) => {
    let endDate = new Date(date.getTime() + duration * 60000);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')} - ${endDate.getHours()}:${endDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Box
    sx={{
      '& > *:not(:last-child)': {
        marginBottom: '16px',
      },
    }}
  >
    <Card sx={{ display: 'flex', padding: 2 }}>
      <CardMedia
        component='img'
        sx={{ width: 200, height: 165, objectFit: 'cover' }}
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
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {dateTimeGenerator(startDate, activityDuration)}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            component='div'
            onDoubleClick={() => !isEditing && toggleEditing(false)} // Add this line to enable editing on double click
          >
            {isEditing ? (
              <>
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
                <Box mt={1}>
                  {' '}
                  {/* Add this Box to show the Save and Cancel buttons */}
                  <Button
                    onClick={handleSave}
                    variant='contained'
                    color='primary'
                    size='small'
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => toggleEditing(false)}
                    variant='outlined'
                    color='secondary'
                    size='small'
                    style={{ marginLeft: '8px' }}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              description
            )}
          </Typography>
        </CardContent>
      </Box>
    </Card>
    </Box>
  );
}
