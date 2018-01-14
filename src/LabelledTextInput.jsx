import React from 'react';
import styles from './LabelledTextInput.scss';

export default ({ label, text, onChange }) => {
  return (
    <div className={styles.labelledTextInput}>
      <p>xx{text}</p>
    </div>
  )
}
