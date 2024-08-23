
import SectionList from './SectionList';

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
    <SectionList
      type="community"
      score={ community.totalCategories }
      sections={ sections }
    ></SectionList>
  )
}
