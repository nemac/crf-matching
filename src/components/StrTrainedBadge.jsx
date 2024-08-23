
import styles from '../styles'

import GradCapIcon from './svg/GradCapIcon';


export default function StrTrainedBadge({ isTrained }) {
  const trainedStyle = {
    height: '45px',
    marginTop: '10px',
  }
  if (isTrained === 'Yes') {
    return <div
      style={{
        ...trainedStyle,
        borderRadius: '15px',
        backgroundColor: styles.colors.darkBlue,
        color: styles.colors.lightGray,
        display: 'flex',
        verticalAlign: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '.8em',
      }} 
    >
      <div>
        <GradCapIcon></GradCapIcon>
        <span
          style={{
            marginLeft: '10px',
            verticalAlign: 'baseline',
          }}>STR Trained</span>
      </div>
    </div>
  } else {
    return <div
      style={{
        ...trainedStyle,
        backgroundColor: styles.colors.lightGray,
      }} 
    >

    </div>
  }
}

