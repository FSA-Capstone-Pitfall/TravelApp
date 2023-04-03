import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from './Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  const itemRefs = useRef([]);
  const observer = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          itemRefs.current.forEach((item, index) => {
            anime({
              targets: item,
              translateY: [100, 0],
              opacity: [0, 1],
              easing: 'easeOutExpo',
              delay: index * 500,
            });
          });
          observer.current.disconnect();
        }
      });
    }, options);

    itemRefs.current.forEach((item) => {
      observer.current.observe(item);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <Typography variant='h2' align='center' sx={{ mb: 4 }}>
        About the team
      </Typography>
      <Box
        component='section'
        sx={{
          display: 'flex',
          overflow: 'hidden',
          bgcolor: 'primary',
          mt: '0vh',
        }}
      >
        <Container
          sx={{ mt: 15, mb: 20, display: 'flex', position: 'relative' }}
        >
          <Box
            component='img'
            src='https://gitlab.create-ion.at/lt/material-ui/-/raw/v4.0.2/static/themes/onepirate/productCurvyLines.png'
            alt='curvy lines'
            sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
          />
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <Box ref={(el) => (itemRefs.current[0] = el)} sx={item}>
                <Avatar
                  alt='Locals'
                  src='https://media.licdn.com/dms/image/D4E03AQFvqxoFbLvQVA/profile-displayphoto-shrink_800_800/0/1676475244765?e=1685577600&v=beta&t=SzzwQvMvoizr6z7vpXJrSjVNYlA7qTBMO9nAR-_5huw'
                  sx={{ width: 200, height: 200 }}
                />
                <Typography variant='h6' sx={{ my: 5 }}>
                  Valeriia H.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box ref={(el) => (itemRefs.current[1] = el)} sx={item}>
                <Avatar
                  alt='Experiences'
                  src='https://media.licdn.com/dms/image/C5603AQEpfzL16P8KKA/profile-displayphoto-shrink_800_800/0/1654816121419?e=1685577600&v=beta&t=r2HkjhuB5a-__QSSTe4g3hkMMuX-l1v4x9PTOqUIQ8c'
                  sx={{ width: 200, height: 200 }}
                />
                <Typography variant='h6' sx={{ my: 5 }}>
                  Chris E.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box ref={(el) => (itemRefs.current[2] = el)} sx={item}>
                <Avatar
                  alt='Exclusive'
                  src='https://media.licdn.com/dms/image/C4E03AQGZmRPGVULmjQ/profile-displayphoto-shrink_800_800/0/1602177553284?e=1685577600&v=beta&t=TOTXSL7mek_gAVzk8KFZZg-9Bf5oHDiEGC1vEObNK_0'
                  sx={{ width: 200, height: 200 }}
                />
                <Typography variant='h6' sx={{ my: 5 }}>
                  Stephen P.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box ref={(el) => (itemRefs.current[3] = el)} sx={item}>
                <Avatar
                  alt='Exclusive'
                  src='https://media.licdn.com/dms/image/C5603AQHdJ3gZbfIrCw/profile-displayphoto-shrink_800_800/0/1610292910008?e=1685577600&v=beta&t=yTrYaseBEMQEg-W9r2PwaLZ1WOqmyF75NBinHg7kRjA'
                  sx={{ width: 200, height: 200 }}
                />
                <Typography variant='h6' sx={{ my: 5 }}>
                  Lisa K.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ProductValues;
