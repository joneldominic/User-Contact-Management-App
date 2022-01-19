// import React from 'react';
// import ReactDOM from 'react-dom';
// import Button from '../Button/Button';
// import Card from '../Card/Card';

// import styles from './Modal.module.css';

// const Backdrop = (props) => {
//   return <div className={styles.backdrop} onClick={props.onConfirm} />;
// };

// const ModalOverlay = (props) => {
//   return (
//     <Card className={styles.modal}>
//       <header className={`${styles.header} ${props.className}`}>
//         <h2>{props.title}</h2>
//       </header>
//       <div className={styles.content}>
//         <p>{props.message}</p>
//       </div>
//       <footer className={styles.actionsContainer}>
//         <Button className={styles.actions} onClick={props.onCancel} buttonStyle="primary">Cancel</Button>
//         <Button className={styles.actions} onClick={props.onConfirm} buttonStyle="success">Confirm</Button>
//       </footer>
//     </Card>
//   );
// };

// const Modal = (props) => {
//   return (
//     <React.Fragment>
//       {ReactDOM.createPortal(
//         <Backdrop onConfirm={props.onConfirm} />,
//         document.getElementById('backdrop-root')
//       )}
//       {ReactDOM.createPortal(
//         <ModalOverlay
//           title={props.title}
//           message={props.message}
//           onConfirm={props.onConfirm}
//           className={props.className}
//         />,
//         document.getElementById('overlay-root')
//       )}
//     </React.Fragment>
//   );
// };

// export default Modal;
