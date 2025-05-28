import { useEffect, useState } from "react";
import './alertStyles.css'

const AlertMessage = ({ type , message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), duration);

    return () => {
      clearTimeout(hideTimer);
    };
    
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`alert alert-${type} alert-fixed`}
      style={{ transition: "opacity 0.5s ease" }}
      role="alert"
    >
      {message}
    </div>
  );
}

export default AlertMessage
