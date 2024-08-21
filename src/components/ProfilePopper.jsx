import Popper from '@mui/material/Popper';

import ContactRow from './ContactRow';

// MUI
import { ClickAwayListener } from '@mui/material'

import styles from '../styles'


export default function ProfilePopper({ practitioner, poppedPractitioner, setPoppedPractitioner, headerRef }) {

  const open = practitioner === poppedPractitioner
  const id = open ? `profile-popper-${practitioner.id}` : undefined;

  const handleClickAaway = e => {
    setPoppedPractitioner(null)
  }

  return (
    <ClickAwayListener onClickAway={ handleClickAaway }>
      <Popper id={id} open={open} anchorEl={headerRef.current}>
        <div
          style={{
            ...styles.global,
            padding: '30px',
            borderRadius: '10px',
            backgroundColor: styles.colors.lightGray,
            border: `1px solid ${styles.colors.darkBlue}`
          }} 
        >
          <div
            style={{
              paddingBottom: '20px',
              fontSize: '1.2em',
            }} 
          >Practitioner Info</div>
          <ContactRow type="linkedIn" practitioner={ practitioner }></ContactRow>
          <ContactRow type="website" practitioner={ practitioner }></ContactRow>
          <ContactRow type="email" practitioner={ practitioner }></ContactRow>
          <ContactRow type="phone" practitioner={ practitioner }></ContactRow>
          <a
            style={{
              color: styles.colors.white,
              borderRadius: '20px',
              backgroundColor: styles.colors.midBlue,
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: '10px',
              paddingRight: '10px',
              textDecoration: 'none',
            }}
            href={ `#/practitioner/${practitioner.id}` }
          >
            <svg
              style={{
                paddingRight: '5px',
              }}
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1887 12.38C14.2987 11.4125 11.8462 10.625 9 10.625C6.15375 10.625 3.70125 11.4125 1.81125 12.38C0.68625 12.9538 0 14.1125 0 15.3725V18.5H18V15.3725C18 14.1125 17.3137 12.9538 16.1887 12.38ZM6.5025 9.5H11.4975C12.8588 9.5 13.905 8.3075 13.725 6.9575L13.365 4.20125C13.0162 2.06375 11.16 0.5 9 0.5C6.84 0.5 4.98375 2.06375 4.635 4.20125L4.275 6.9575C4.095 8.3075 5.14125 9.5 6.5025 9.5Z"
                fill={ styles.colors.white }/>
            </svg>
            Full Practitioner Org Profile</a>
        </div>
      </Popper>
    </ClickAwayListener>
  );

}