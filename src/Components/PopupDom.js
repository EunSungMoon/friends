import ReactDom from 'react-dom';

export default function PopupDom({ children }) {
  const el = document.getElementById('popupDom');
  return ReactDom.createPortal(children, el);
};