// React
import { useState, useEffect, useContext } from 'react';

// router
import { useParams } from 'react-router-dom';

// API
import { fetchCommunity, fetchPractitionersForCommunity, fetchOptionsFromAirtable } from '../util/api';

// components
import { CssBaseline, Stack, Container, Typography, Box } from '@mui/material';

import FullPageSpinner from '../components/FullPageSpinner';
import PractitionerPane from '../components/PractitionerPane';
import CommunityPane from '../components/CommunityPane';

import { ThemeProvider } from "@mui/material/styles";

// theme
import theme from '../theme';

import { RowHoverContext, SetHoverRowContext } from '../components/RowHoverContext';
import DropDownSelector from "../components/DropDownSelector.jsx";


export default function SelfServicePage() {

  const [selectedOptions, setSelectedOptions] = useState({
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
  });

  const [availableOptions, setAvailableOptions] = useState({
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
  });

  const [ practitioners, setPractitioners ] = useState([]);
  const [ poppedPractitioner, setPoppedPractitioner ] = useState(null);
  const [ hoverRow, setHoverRow ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const community = {
    name: 'Self Service',
    state: selectedOptions.state,
    activities: selectedOptions.activities,
    sectors: selectedOptions.sectors,
    hazards: selectedOptions.hazards,
    size: selectedOptions.size,
  }

  useEffect(() => {
    const loadOptions = async () => {
      setIsLoading(true);
      await fetchOptionsFromAirtable(setAvailableOptions);
    };

    loadOptions().then(() => {
      setIsLoading(false);
    }).catch((err) => {
      setError(err);
    });
  }, []);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading options...</div>;
  }

  if (availableOptions) {

    const practitionerPanes = practitioners.map((pract, index) => {
      return <PractitionerPane
          community={ community }
          practitioner={ pract }
          poppedPractitioner={ poppedPractitioner }
          setPoppedPractitioner={ setPoppedPractitioner }
          key={ index }
          style={{
            flex: 1
          }}
      ></PractitionerPane>
    })

    return (
        <ThemeProvider theme={theme}>
          <RowHoverContext.Provider value={hoverRow}>
            <SetHoverRowContext.Provider value={setHoverRow}>
              <CssBaseline />
              <Container maxWidth="xl" sx={{ p: 2 }} >
                <Stack
                    direction='row'
                    gap={1}
                    ml={1}
                    sx={{
                      bgcolor: theme.palette.primary.lightGray,
                    }}
                >
                  <CommunityPane
                      community={ community }
                  />
                  <DropDownSelector
                      availableSelections = { availableOptions.state }
                      selections = { selectedOptions.state }
                      setSelections = { (selections) => setSelectedOptions({ ...selectedOptions, state: selections }) }
                      option = "State"
                  />
                  <DropDownSelector
                      availableSelections = { availableOptions.activities }
                      selections = { selectedOptions.activities }
                      setSelections = { (selections) => setSelectedOptions({ ...selectedOptions, activities: selections }) }
                      option = "Activity"
                  />
                  <DropDownSelector
                      availableSelections = { availableOptions.sectors }
                      selections = { selectedOptions.sectors }
                      setSelections = { (selections) => setSelectedOptions({ ...selectedOptions, sectors: selections }) }
                      option = "Sector"
                  />
                  <DropDownSelector
                      availableSelections = { availableOptions.hazards }
                      selections = { selectedOptions.hazards }
                      setSelections = { (selections) => setSelectedOptions({ ...selectedOptions, hazards: selections }) }
                      option = "Hazard"
                  />
                  <DropDownSelector
                      availableSelections = { availableOptions.size }
                      selections = { selectedOptions.size }
                      setSelections = { (selections) => setSelectedOptions({ ...selectedOptions, size: selections }) }
                      option = "Size"
                  />

                  { /* Practitioners */ }

                  <Stack sx={{ width: '60%' }}>
                    <Typography
                        color="primary.main"
                        sx={{
                          pt: 1,
                          height: '40px',
                          textAlign: 'center',
                          fontWeight: 700,
                        }}
                        variant="h5"
                    >
                      <Box
                          sx={{
                            display: {
                              xs: 'none',
                              md: 'inline-block',
                            },
                          }}
                      >Matched</Box> Practitioners
                    </Typography>
                    <Stack
                        direction='row'
                        gap={1}
                        mr={1}
                    >
                      { practitionerPanes }
                    </Stack>
                  </Stack>
                </Stack>
              </Container>
            </SetHoverRowContext.Provider>
          </RowHoverContext.Provider>
        </ThemeProvider>
    )
  } else {
    return (
        <FullPageSpinner></FullPageSpinner>
    )
  }

}
