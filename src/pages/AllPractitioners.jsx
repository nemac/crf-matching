import { useState, useEffect } from 'react';
import {
  fetchFilteredPractitioners,
  fetchTotalPractitionerCount,
} from '../util/api.js';
import SearchRegistryComponent from '../components/RegistryComponent.jsx';
import CompareBar from '../components/CompareBar.jsx';
import FullPageSpinner from '../components/FullPageSpinner';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';

export default function AllPractitioners() {
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedForComparison, setSelectedForComparison] = useState(new Map());

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
    <>
      <NavBar />
      <SearchRegistryComponent
        practitioners={practitioners}
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
    </>
  );
}
