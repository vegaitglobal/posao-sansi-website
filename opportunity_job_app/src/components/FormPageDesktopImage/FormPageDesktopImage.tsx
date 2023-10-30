import { CSSProperties } from "react";

interface FormPageDesktopImageProps {
  style?: CSSProperties;
}

const FormPageDesktopImage = ({ style }: FormPageDesktopImageProps) => {
  return (
    <div className="form-page__right" style={ style }>
      <img className="form-page-desktop-image__background"
           src="/images/form-image-under.svg"
           alt="ilustration background"/>
      <img className="form-page-desktop-image__overlay"
           src="/images/form-image-over.svg"
           alt="ilustration"/>
    </div>

  );
};

export default FormPageDesktopImage;
