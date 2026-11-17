import { ChevronDown } from "lucide-react";
export default function Disclosure({
  title,
  description,
  icon: Icon,
  meta,
  children,
  className = "",
  id,
}) {
  return (
    <details id={id} className={`digest-disclosure ${className}`}>
      <summary>
        {Icon && <Icon size={19} aria-hidden="true" />}
        <span className="disclosure-label">
          <span>{title}</span>
          {description && <small>{description}</small>}
        </span>
        {meta !== undefined && meta !== null && (
          <span className="disclosure-meta">{meta}</span>
        )}
        <ChevronDown
          size={16}
          className="disclosure-chevron"
          aria-hidden="true"
        />
      </summary>
      <div className="disclosure-content">{children}</div>
    </details>
  );
}
