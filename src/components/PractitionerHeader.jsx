
import { useRef } from "react";
import { Typography } from "@mui/material";
import StrTrainedBadge from './StrTrainedBadge';
import ProfilePopper from "./ProfilePopper";
import HeaderBox from './HeaderBox';

export default function PractitionerHeader({
  strTrained,
  practitioner,
  poppedPractitioner,
  setPoppedPractitioner
}) {

  const headerRef = useRef(null);

  const onMouseEnter = e => {
    setPoppedPractitioner(practitioner)
  }

  return (
    <HeaderBox
      ref={ headerRef }
      onMouseEnter={ onMouseEnter }
    >
      <Typography variant="h5">{ practitioner.org }</Typography>
      <StrTrainedBadge isTrained={ strTrained }></StrTrainedBadge>
      <ProfilePopper
        headerRef={ headerRef }
        practitioner={ practitioner }
        poppedPractitioner={ poppedPractitioner }
        setPoppedPractitioner={ setPoppedPractitioner }
      ></ProfilePopper>
    </HeaderBox>
  )
}

