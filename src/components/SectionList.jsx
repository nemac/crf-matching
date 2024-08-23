
import Section from './Section';
import Pane from './Pane';
import PractitionerScore from './PractitionerScore';
import CommunityTotal from './CommunityTotal';

export default function SectionList ({ sections, type, score }) {
  const scoreSection = type === 'community'
    ? <CommunityTotal totalCategories={ score }></CommunityTotal>
    : <PractitionerScore score={ score }></PractitionerScore>

  return (
    <Pane>
      {
        sections.map((section, index) => {
          section.key=index;
          return Section(section)
        })
      }
      { scoreSection }
    </Pane>
  )
}

