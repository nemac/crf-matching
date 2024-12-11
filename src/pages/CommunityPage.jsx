import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommunity, fetchPractitionersForCommunity } from '../util/api';
import { Container } from '@mui/material';
import ComparisonBoard from '../components/ComparisonBoard';
import Logo from '../components/Logo';
import FullPageSpinner from '../components/FullPageSpinner';

export default function CommunityPage() {
  const [community, setCommunity] = useState(false);
  const [practitioners, setPractitioners] = useState([]);
  const [displayCount, setDisplayCount] = useState(3);
  const { communityId } = useParams();

  useEffect(() => {
    fetchPractitionersForCommunity(communityId, setPractitioners);
    fetchCommunity(communityId, setCommunity);
  }, [communityId]);

  if (!(community && practitioners.length)) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ p: 3 }}>
        <Logo /> {/* CSCI Logo */}
      </Container>
      <ComparisonBoard
        community={community}
        practitioners={practitioners}
        isSelectable={false}
        displayCount={displayCount}
        setDisplayCount={setDisplayCount}
      />
    </>
  );
}
