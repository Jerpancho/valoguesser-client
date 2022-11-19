import React from 'react';
import Tutorial from './tutorial';
import styles from '../css/Modal.module.css';
function modal({ open, closeModal, start, time, confirmed }) {
	if (!open) return null;
	function handleCloseModal() {
		closeModal(false);
		if (time > 0 && !confirmed) start();
	}
	return (
		<div className={styles.modalBackground}>
			<div className={styles.modalContainer}>
				<button className={styles.closeButton} onClick={handleCloseModal}>
					x
				</button>
				<Tutorial />
			</div>
		</div>
	);
}

export default modal;
