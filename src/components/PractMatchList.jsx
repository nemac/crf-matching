
import Section from './Section';
import ScoreSection from './ScoreSection';
import Pane from './Pane';
import PractitionerHeader from './PractitionerHeader';

import theme from '../theme';

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
        cards: matches
      }
    })

  return (
    <div
      style={{
        flex: '1 1 33%',
        backgroundColor: theme.palette.primary.lightGray,
      }}
    >
      <PractitionerHeader
        practitioner={ practitioner }
        linkPath={ `#/practitioner/${practitioner.id}`}
        strTrained={ practitioner.strTrained }
        poppedPractitioner={ poppedPractitioner }
        setPoppedPractitioner={ setPoppedPractitioner }
      ></PractitionerHeader>
      <Pane>
        {
          sections.map((section, index) => {
            section.key=index;
            return Section(section)
          })
        }
        <ScoreSection
          style={{
            justifyContent: 'center',
          }}
        > <div>{ practitioner.matchScore }</div>
         
        </ScoreSection>
      </Pane>

    </div>
  )
}

