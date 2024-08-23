
import styles from '../styles';

import SectionList from './SectionList';
import PractitionerHeader from './PractitionerHeader';


const matchVals = (commCats, practCats) => {
  return commCats.map(commCat => practCats.includes(commCat))
}

export default function PractMatchList ({
  community,
  practitioner,
  poppedPractitioner,
  setPoppedPractitioner
}) {

  const sections = [
    [ [community.state], practitioner.state ],
    [ community.activities, practitioner.activities ],
    [ community.sectors, practitioner.sectors ],
    [ community.hazards, practitioner.hazards ],
    [ [community.size], practitioner.size ],
  ]
    .map(([ commCats, practCats ]) => matchVals(commCats, practCats))
    .map(matches => {
      return {
        type: 'practitioner',
        cards: matches
      }
    })

  return (
    <div
      style={{
        flex: '1 1 33%',
        backgroundColor: styles.colors.lightGray,
      }}
    >
      <PractitionerHeader
        practitioner={ practitioner }
        linkPath={ `#/practitioner/${practitioner.id}`}
        strTrained={ practitioner.strTrained }
        poppedPractitioner={ poppedPractitioner }
        setPoppedPractitioner={ setPoppedPractitioner }
      ></PractitionerHeader>
      <SectionList
        type="practitioner"
        score={ practitioner.matchScore }
        sections= { sections }
      ></SectionList>
    </div>
  )
}

