import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SearchRegistryComponent from '../components/RegistryComponent.jsx';
import SearchBar from '../components/baseComponents/SearchBar.jsx';
import { useEffect, useState } from 'react';
import {
  fetchFilteredPractitioners,
  fetchTotalPractitionerCount,
} from '../util/api.js';
import FullPageSpinner from '../components/FullPageSpinner';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import CallToActionButton from '../components/baseComponents/CallToActionButton.jsx';
import PullDownFilter from '../components/baseComponents/PulldownFilter.jsx';
export default function SearchRegistry() {
  const [searchParams] = useSearchParams();
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [loading, setLoading] = useState(true);

  const community = searchParams.get('community') ?? '';
  const activities = searchParams.get('activities')?.split(',') ?? [];
  const hazards = searchParams.get('hazards')?.split(',') ?? [];
  const sectors = searchParams.get('sectors')?.split(',') ?? [];

  const filters = { community, activities, hazards, sectors };

  useEffect(() => {
    fetchTotalPractitionerCount(setTotalPractitioners);
    fetchFilteredPractitioners(filters, data => {
      setPractitioners(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <FullPageSpinner />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 48,
          lineHeight: '56px',
          textAlign: 'center',
          color: '#2D3F5D',
          flex: 'none',
          flexGrow: 1,
          mt: 4,
        }}
      >
        Registry of Adaptation Practitioners
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: 18,
          lineHeight: '21px',
          textAlign: 'center',
          color: '#56657D',
          flex: 'none',
          flexGrow: 1,
        }}
      >
        Connect with vetted experts to build resilience in your community or
        organization.
        <br />
        Looking for a specific Practitioner? Search our database of{' '}
        <Box
          component="a"
          href="/AllPractitioners"
          sx={{
            color: '#56657D',
            fontWeight: 400,
            textDecoration: 'underline',
          }}
        >
          Practitioners
        </Box>
      </Typography>
      <Box sx={{ mt: 3, px: 4 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            lineHeight: '19px',
            color: '#2D3F5D',
            flex: 'none',
            flexGrow: 0,
          }}
        >
          Community Location
        </Typography>
        <SearchBar
          textSx={{
            width: '95vw',
            backgroundColor: '#F3F3F5',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignContent: 'flex-start',
            justifyContent: 'space-between',
            m: 3,
          }}
        >
          <Box sx={{ borderStyle: 'dashed', borderWidth: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Services Provided
            </Typography>
          </Box>
          <Box sx={{ borderStyle: 'dashed', borderWidth: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Climate Hazards
            </Typography>
          </Box>

          <Box sx={{ borderStyle: 'dashed', borderWidth: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Sectors
            </Typography>
          </Box>

          <Box sx={{ borderStyle: 'dashed', borderWidth: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Population Size
            </Typography>
          </Box>
          <CallToActionButton />
        </Box>
        <Typography
          sx={{
            fontSize: 16,
            color: '#56657D',
          }}
        >
          {community || '—'}
        </Typography>
      </Box>
      <SearchRegistryComponent
        practitioners={practitioners}
        totalPractitioners={totalPractitioners}
        loading={loading}
        community={community}
        activities={activities}
        hazards={hazards}
        sectors={sectors}
      />
      <Footer />
    </>
  );
}
