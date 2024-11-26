import React, { ReactNode, CSSProperties } from "react";
import Image from "next/image";

interface CardProps {
  title?: string; 
  image?: string; 
  children: ReactNode; 
  footer?: ReactNode; 
  style?: CSSProperties; 
}

const Card: React.FC<CardProps> = ({ title, image, children, footer, style }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
    >
      {image && (
        <Image
          src={image}
          alt={title || "Card image"}
          style={{
            width: "100%",
            borderRadius: "8px 8px 0 0",
            marginBottom: "16px",
          }}
        />
      )}
      {title && <h3 style={{ margin: "0 0 16px" }}>{title}</h3>}
      <div style={{ marginBottom: footer ? "16px" : "0" }}>{children}</div>
      {footer && <div style={{ borderTop: "1px solid #eee", paddingTop: "8px" }}>{footer}</div>}
    </div>
  );
};

export default Card;
