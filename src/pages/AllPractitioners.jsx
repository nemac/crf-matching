import { useState, useEffect } from 'react';
import {
  fetchFilteredPractitioners,
  fetchTotalPractitionerCount,
} from '../util/api.js';
import SearchRegistryComponent from '../components/RegistryComponent.jsx';
import FullPageSpinner from '../components/FullPageSpinner';
import NavBar from '../components/NavBar.jsx';

export default function AllPractitioners() {
  const [practitioners, setPractitioners] = useState([]);
  const [totalPractitioners, setTotalPractitioners] = useState(0);
  const [loading, setLoading] = useState(true);

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
      />
    </>
  );
}
