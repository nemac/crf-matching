import React, { useRef, useState, useEffect  } from 'react';
import { Typography, Box, Link, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import SectionHeader from './SectionHeader';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WorkExamplesCard from '../components/WorkExamplesCard';

export default function WorkExamples({ practitioner }) {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  const [isClamped1, setIsClamped1] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  const [isClamped2, setIsClamped2] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const [isClamped3, setIsClamped3] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  useEffect(() => {
    const el = textRef1.current;
    if (el) {
      setIsClamped1(el.scrollHeight > el.clientHeight);
    }
  }, [practitioner.example1_description ]);

    useEffect(() => {
    const el = textRef1.current;
    if (el) {
      setIsClamped2(el.scrollHeight > el.clientHeight);
    }
  }, [practitioner.example2_description ]);

    useEffect(() => {
    const el = textRef1.current;
    if (el) {
      setIsClamped3(el.scrollHeight > el.clientHeight);
    }
  }, [practitioner.example3_description ]);


  const extractUrl = (input) => {
  const match = input.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : '';
  };

  practitioner.example1_links = extractUrl(practitioner.example1_links);
  practitioner.example2_links = extractUrl(practitioner.example2_links);
  practitioner.example3_links = extractUrl(practitioner.example3_links);

  const theme = useTheme();
  return (
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          px: 6,
          py: 4,
          my: 8,
          backgroundColor: theme.palette.primary.cellHoverBg,
        }}
      >
        <SectionHeader title="Examples of Our Work"></SectionHeader>
        
        <Box
          sx={{
            overflowX: 'auto',
            px: 2, // padding inside scroll container
          }}
        >
          <Grid 
            container
            spacing={2}
            gap={2}
            sx={{ 
              p: 2, 
              my: 4,
              px: 2,
              flexWrap: 'nowrap',
              width: 'max-content',
            }}>


            <WorkExamplesCard title={practitioner.example1_title} description={practitioner.example1_description} exampleLink={practitioner.example1_links} />
            <WorkExamplesCard title={practitioner.example2_title} description={practitioner.example2_description} exampleLink={practitioner.example2_links} />
            <WorkExamplesCard title={practitioner.example3_title} description={practitioner.example3_description} exampleLink={practitioner.example3_links} />


          </Grid>
        </Box>
      </Box>
  );
}

                        