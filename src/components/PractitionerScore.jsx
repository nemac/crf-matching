
import styles from '../styles';

export default function PractitionerScore({ score }) {
  return <div
    style={{
      ...styles.scoreSection,
      textAlign: 'center',
    }} 
  >
    { score } 
  </div>
}