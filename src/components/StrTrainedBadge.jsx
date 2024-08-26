import GradCapIcon from './svg/GradCapIcon';

import theme from '../theme';

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
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.lightGray,
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
        backgroundColor: theme.palette.primary.lightGray,
      }} 
    >

    </div>
  }
}

