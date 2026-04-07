import { useState, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import {
  fetchFilteredPractitioners,
  fetchTotalPractitionerCount,
} from '../util/api.js';
import SearchRegistryComponent from '../components/RegistryComponent.jsx';
import CompareBar from '../components/CompareBar.jsx';
import FullPageSpinner from '../components/FullPageSpinner';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import SearchBar from '../components/baseComponents/SearchBar.jsx';
import PageHeader from '../components/baseComponents/PageHeader.jsx';

export default function AllPractitioners() {
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedForComparison, setSelectedForComparison] = useState(new Map());
  const [nameFilter, setNameFilter] = useState('');

  const filteredPractitioners = useMemo(() => {
    if (!nameFilter.trim()) return practitioners;
    const search = nameFilter.trim().toLowerCase();
    return practitioners.filter(
      p => p.org && p.org.toLowerCase().includes(search)
    );
  }, [practitioners, nameFilter]);

  const filters = {
    activities: [],
    sectors: [],
    hazards: [],
    community: '',
  };

  useEffect(() => {
    fetchTotalPractitionerCount(setTotalPractitioners);
    fetchFilteredPractitioners(filters, data => {
      setPractitioners(data);
      setLoading(false);
    });
  }, []);

  const handleComparisonSelect = (practitionerId, isSelected) => {
    setSelectedForComparison(prev => {
      const newMap = new Map(prev);
      if (isSelected) {
        const practitioner = practitioners.find(
          p => p.airtableRecId === practitionerId
        );
        if (practitioner) {
          newMap.set(practitionerId, practitioner);
        }
      } else {
        newMap.delete(practitionerId);
      }
      return newMap;
    });
  };

  const handleClearSelectedPractitioners = () => {
    setSelectedForComparison(new Map());
  };

  const handleAddFromModal = (newPractitioners) => {
    setSelectedForComparison(prev => {
      const newMap = new Map(prev);
      newPractitioners.forEach(p => {
        newMap.set(p.airtableRecId, p);
      });
      return newMap;
    });
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <FullPageSpinner />
      </>
    );
  }

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      <NavBar />
      <PageHeader
        title="Registry of Adaptation Practitioners"
        subtitle="Connect with vetted experts to build resilience in your community."
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: { xs: 4, sm: 6, md: 12 },
          py: 4,
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            py: 0.5,
            gap: 0.5,
            flexGrow: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5 }}>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                color: 'primary.main',
              }}
            >
              Search for an Adaptation Practitioner
            </Typography>
          </Box>
          <SearchBar
            text="Search by Adaptation Practitioner Name"
            onChange={e => setNameFilter(e.target.value)}
            textSx={{
              width: '100%',
              minWidth: '285px',
              height: '36px',
              backgroundColor: 'primary.inputBg',
              borderRadius: '8px',
            }}
          />
        </Box>
      </Box>
      <SearchRegistryComponent
        practitioners={filteredPractitioners}
        totalPractitioners={totalPractitioners}
        selectedForComparison={selectedForComparison}
        onComparisonSelect={handleComparisonSelect}
      />
      <Footer />
      <CompareBar
        selectedPractitioners={selectedForComparison}
        onClearAll={handleClearSelectedPractitioners}
        onAddFromModal={handleAddFromModal}
      />
    </Box>
  );
}
