import { Box, Typography, Chip, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkExampleCard from './WorkExampleCard';
import BroadServiceProvider from '../baseComponents/BroadServiceProvider';
import SpecialistLabel from '../baseComponents/SpecialistLabel';

const SectionHeader = ({ children, sx = {} }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 'bold',
        mb: 1,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const ChipList = ({ items = [], highlighted = [] }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ml: 2, mb: 8 }}>
      {items.map((item, index) => {
        const isHighlighted = highlighted.includes(item);
        return (
          <Chip
            key={index}
            label={isHighlighted ? <strong>{item}</strong> : item}
            icon={
              isHighlighted ? (
                <CheckCircleIcon sx={{ color: '#0066CC !important' }} />
              ) : undefined
            }
            sx={{
              borderRadius: '9999px',
              border: '1px solid #0066CC',
              padding: isHighlighted ? '5px 12px' : '6px 12px',
              color: isHighlighted ? 'primary.linkBlue' : '#000',
              bgcolor: isHighlighted ? '#66CCFF' : 'primary.sectionBg',
              ...(isHighlighted && {
                '& .MuiChip-icon': {
                  marginLeft: '12px',
                  marginRight: '-6px',
                },
              }),
            }}
          />
        );
      })}
    </Box>
  );
};

const NewPractitionerLayout = props => {
  const {
    formData,
    urlFilters = {},
  } = props;
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        {formData.org_registry_category === 'Specialist' ? (
          <>
            <SpecialistLabel />
            {formData.org_registry_category_specialist && (
              <Box
                sx={{
                  bgcolor: '#FFFBF5',
                  border: '1px solid #FFDDBB',
                  borderRadius: '8px',
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <Typography component="div" variant="body1" sx={{ mb: 0 }}>
                  {formData.org_registry_category_specialist}
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <BroadServiceProvider />
        )}
      </Box>

      <SectionHeader>Organization Contact</SectionHeader>

      <Box
        sx={{ display: 'flex', flexDirection: 'column', ml: 2, mb: 8 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LanguageIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />
          <Typography
            component="a"
            variant="body1"
            href={formData.website || '#'}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'underline' }}
          >
            {formData.website || ''}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />
          <Typography
            component="a"
            variant="body1"
            href={`mailto:${formData.email || ''}`}
            sx={{ textDecoration: 'underline' }}
          >
            {formData.email || ''}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhoneIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />
          <Typography component="div" variant="body1">{formData.phone || ''}</Typography>
        </Box>
      </Box>

      <SectionHeader>Organization Location</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <LocationOnIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />
        <Typography component="div" variant="body1">
          {formData.city && formData.state
            ? `${formData.city}, ${formData.state}`
            : formData.city || formData.state || ''}
        </Typography>
      </Box>

      <SectionHeader>Organization Description</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography component="div" variant="body1">{formData.info || ''}</Typography>
      </Box>

      <SectionHeader>Community Specializations</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography component="div" variant="body1">
          {formData.specificTypesOfCommunities || ''}
        </Typography>
      </Box>

      <SectionHeader>Organization Type</SectionHeader>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, mb: 8 }}>
        <Typography component="div" variant="body1">
          {formData.organizationType || ''}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Top Services Provided</SectionHeader>
      <ChipList items={formData.topServicesProvided} highlighted={urlFilters.activities || []} />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>All Services Provided</SectionHeader>
      <ChipList items={formData.activities} highlighted={urlFilters.activities || []} />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Climate Hazards Addressed</SectionHeader>
      <ChipList items={formData.hazards} highlighted={urlFilters.hazards || []} />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Sector Expertise</SectionHeader>
      <ChipList items={formData.sectors} highlighted={urlFilters.sectors || []} />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Community Size Experience</SectionHeader>
      <ChipList items={formData.communitySize} />
      <Divider sx={{ mb: 4 }} />

      <SectionHeader>Where Organization Works</SectionHeader>
      <ChipList items={formData.whereOrganizationWorks} highlighted={urlFilters.state || []} />

      <Divider sx={{ mb: 4 }} />

      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          backgroundColor: '#F9F3FF',
          py: 6,
          mt: 8,
        }}
      >
        <Box
          sx={{ maxWidth: '1200px', margin: '0 auto', px: { xs: 4, md: 8 } }}
        >
          <SectionHeader sx={{ mb: 4 }}>Examples of Our Work</SectionHeader>
        </Box>

        <Box
          sx={{
            overflowX: 'auto',
            px: { xs: 4, md: 8 },
            pb: 2,
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#D1D5DB',
              borderRadius: '4px',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              maxWidth: '1200px',
              margin: '0 auto',
              width: 'fit-content',
            }}
          >
            <WorkExampleCard
              title={formData.example1_title}
              description={formData.example1_description}
              links={formData.example1_links}
              location={formData.example1_location}
              engagement={formData.example1_engagement}
              equity={formData.example1_equity}
              lead={formData.example1_lead}
              exampleNumber={1}
              organizationName={formData.org}
              buttonText="Full Work Example"
              openInPreview
            />
            <WorkExampleCard
              title={formData.example2_title}
              description={formData.example2_description}
              links={formData.example2_links}
              location={formData.example2_location}
              engagement={formData.example2_engagement}
              equity={formData.example2_equity}
              lead={formData.example2_lead}
              exampleNumber={2}
              organizationName={formData.org}
              buttonText="Full Work Example"
              openInPreview
            />
            <WorkExampleCard
              title={formData.example3_title}
              description={formData.example3_description}
              links={formData.example3_links}
              location={formData.example3_location}
              engagement={formData.example3_engagement}
              equity={formData.example3_equity}
              lead={formData.example3_lead}
              exampleNumber={3}
              organizationName={formData.org}
              buttonText="Full Work Example"
              openInPreview
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewPractitionerLayout;

NewPractitionerLayout.propTypes = {
  formData: PropTypes.object.isRequired,
  urlFilters: PropTypes.object,
};
