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
import PageHeader from '../components/baseComponents/PageHeader.jsx';
export default function SearchRegistry() {
  const [searchParams] = useSearchParams();
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(9);

  const community = searchParams.get('community') ?? '';
  const state = searchParams.get('state') ?? '';
  const activities = searchParams.get('activities')?.split(',') ?? [];
  const hazards = searchParams.get('hazards')?.split(',') ?? [];
  const sectors = searchParams.get('sectors')?.split(',') ?? [];

  const filters = {
    state: state ? [state] : [],
    activities,
    hazards,
    sectors,
  };

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
      <PageHeader
        title="Registry of Adaptation Practitioners"
        subtitle={
          <>
            Connect with vetted experts to build resilience in your community or
            organization.
            <br />
            Looking for a specific Practitioner? Search our database of{' '}
            <Box
              component="a"
              href="/AllPractitioners"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                textDecoration: 'underline',
              }}
            >
              Practitioners
            </Box>
          </>
        }
      />
      <Box sx={{ mt: 3, px: 4 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            lineHeight: '19px',
            color: 'primary.main',
            flex: 'none',
            flexGrow: 0,
          }}
        >
          Community Location
        </Typography>
        <SearchBar
          textSx={{
            width: '95vw',
            backgroundColor: 'primary.inputBg',
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
            color: 'text.secondary',
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
        displayCount={displayCount}
        onLoadMore={() => setDisplayCount(prev => prev + 9)}
      />
      <Footer />
    </>
  );
}
