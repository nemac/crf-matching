
import styles from '../styles';

export default function CommunityTotal({ totalCategories }) {
  return (
    <div
      style={{
        ...styles.scoreSection
      }}
    >
      Total
      <div style={{ float: 'right' }}>{ totalCategories }</div>
    </div>
  )
}