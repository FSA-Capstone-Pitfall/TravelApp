import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MediaControlCard = ({
  activity,
  onDelete,
  editMode,
  userId,
  tripId,
  ...props
}) => {
  const [notes, setNotes] = useState(activity.notes || '');
  const [prevNotes, setPrevNotes] = useState(notes);
  const [isEditing, setIsEditing] = useState(false);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const toggleEditing = (isSaving) => {
    if (isEditing) {
      if (!isSaving) {
        setNotes(prevNotes);
      }
    } else {
      setPrevNotes(notes);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    toggleEditing(true);
  };

  const handleDelete = () => {
    onDelete(activity.id, userId, tripId);
  };

  let startDate = new Date(activity.date);
  let activityDuration = activity.duration;

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
      <Card
        className='activity-card'
        sx={{ display: 'flex', padding: 2 }}
        {...props}
      >
        <CardMedia
          component='img'
          sx={{ width: 200, height: 165, objectFit: 'cover' }}
          image={activity.activity.imageUrl}
          alt='activity picture'
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='div' variant='h5'>
              {activity.activity.name}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='div'
            ></Typography>
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
              onDoubleClick={() => !isEditing && toggleEditing(false)}
            >
              {isEditing ? (
                <>
                  <TextField
                    value={notes}
                    onChange={handleNotesChange}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        handleSave();
                        event.preventDefault();
                      }
                    }}
                    multiline
                    fullWidth
                  />
                  <Box mt={1}>
                    {' '}
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
                notes
              )}
            </Typography>
          </CardContent>
          {editMode && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={handleDelete}
                variant='outlined'
                color='secondary'
                size='medium'
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default MediaControlCard;
