import React from "react";
import Popup from "./Popup";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";

const ICONS = {
  success: SuccessIcon,
  error: ErrorIcon,
};

export type TMessageData = {
  iconType: keyof typeof ICONS;
  text: string;
}

type InfoTooltipProps = {
  onClose: () => void;
  status: TMessageData;
};

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  onClose,
  status = {iconType: 'success', text: ''}
}) => {
  return (
    <Popup onClose={onClose}>
      <img className='popup__icon' src={ICONS[status.iconType]} alt={status.text} />
      <p className='popup__status-message'>{status.text}</p>
    </Popup>
  );
};

export default InfoTooltip;
