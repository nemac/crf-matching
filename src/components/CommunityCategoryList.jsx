
import ScoreSection from './ScoreSection';
import Pane from './Pane';
import Section from './Section';

export default function CommunityCategoryList({ community }) {
  const sections = [
    {
      header: 'State',
      cards: [ community.state ]
    },
    {
      header: 'Activities',
      cards: community.activities
    },
    {
      header: 'Sectors',
      cards: community.sectors
    },
    {
      header: 'Hazards',
      cards: community.hazards
    },
    {
      header: 'Size',
      cards: [ community.size ]
    }
  ]
    .map(section => {
      section.type = 'community'
      return section
    })

  return (
    <Pane
      sections={ sections }
    >
      {
        sections.map((section, index) => {
          section.key=index;
          return Section(section)
        })
      }

      <ScoreSection
        style={{
          justifyContent: 'space-between',
        }} 
      >
        <div>Total</div>
        <div>{ community.totalCategories }</div>
      </ScoreSection>
    </Pane>
  )
}
