import {Kot} from '@types';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });

type Props = {
  koten: Array<Kot>
}

const KotOverviewTable: React.FC<Props> = ({koten}: Props) => {
  return (
    <>
    {koten.map((kot, index) => (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        {/* <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid> */}
        <Grid item xs={12} sm container key={index}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {kot.locatie}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {kot.oppervlakte}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {kot.verhuurder}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Meer info
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {kot.verhuurprijs}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    )
    )}
    </>
    
  );
};

export default KotOverviewTable;