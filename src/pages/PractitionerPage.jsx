import { useState, useLayoutEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import FullPageSpinner from '../components/FullPageSpinner';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import NewPractitionerLayout from '../components/updateData/NewPractitionerLayout';
import { fetchPractitioner } from '../util/api';

function practitionerToFormData(practitioner) {
  return {
    org: practitioner.org,
    org_registry_category: practitioner.org_registry_category,
    website: practitioner.website,
    email: practitioner.email,
    phone: practitioner.phone,
    city: practitioner.org_city,
    state: practitioner.org_state,
    info: practitioner.info,
    specificTypesOfCommunities: practitioner.specificTypesOfCommunities,
    organizationType: practitioner.organizationType,
    topServicesProvided: practitioner.topServicesProvided || practitioner.org_services_provided_top || [],
    activities: practitioner.activities || [],
    hazards: practitioner.hazards || [],
    sectors: practitioner.sectors || [],
    communitySize: practitioner.size || [],
    whereOrganizationWorks: practitioner.state || [],
    example1_title: practitioner.example1_title,
    example1_description: practitioner.example1_description,
    example1_links: practitioner.example1_links,
    example1_location: practitioner.example1_location,
    example1_engagement: practitioner.example1_engagement,
    example1_equity: practitioner.example1_equity,
    example1_lead: practitioner.example1_lead,
    example2_title: practitioner.example2_title,
    example2_description: practitioner.example2_description,
    example2_links: practitioner.example2_links,
    example2_location: practitioner.example2_location,
    example2_engagement: practitioner.example2_engagement,
    example2_equity: practitioner.example2_equity,
    example2_lead: practitioner.example2_lead,
    example3_title: practitioner.example3_title,
    example3_description: practitioner.example3_description,
    example3_links: practitioner.example3_links,
    example3_location: practitioner.example3_location,
    example3_engagement: practitioner.example3_engagement,
    example3_equity: practitioner.example3_equity,
    example3_lead: practitioner.example3_lead,
  };
}

function PractitionerPageLoaded({ practitioner, urlFilters }) {
  const formData = practitionerToFormData(practitioner);

  return (
    <>
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{
          p: 3,
          pb: 8,
          cursor: 'default',
          px: { xs: 4, sm: 6, md: 12 },
        }}
      >
        <Typography variant="h1" sx={{ mb: 3 }}>
          {practitioner.org}
        </Typography>

        <NewPractitionerLayout
          formData={formData}
          urlFilters={urlFilters}
        />
      </Container>
      <Footer />
    </>
  );
}

function PractitionerPage() {
  const { practitionerId } = useParams();
  const [searchParams] = useSearchParams();
  const urlFilters = {
    state: searchParams.get('state')?.split(',').filter(Boolean) || [],
    activities: searchParams.get('activities')?.split(',').filter(Boolean) || [],
    hazards: searchParams.get('hazards')?.split(',').filter(Boolean) || [],
    sectors: searchParams.get('sectors')?.split(',').filter(Boolean) || [],
  };

  const [practitioner, setPractitioner] = useState(null);

  useLayoutEffect(() => {
    fetchPractitioner(practitionerId, setPractitioner);
  }, []);

  if (practitioner) {
    return <PractitionerPageLoaded practitioner={practitioner} urlFilters={urlFilters} />;
  } else {
    return <FullPageSpinner />;
  }
}

export default PractitionerPage;