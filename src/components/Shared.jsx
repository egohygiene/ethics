import {
  ArrowUpRight,
  Building2,
  Cpu,
  Leaf,
  Orbit,
  Palette,
  ShieldCheck,
} from "lucide-react";
export const dimensionIcons = {
  leaf: Leaf,
  building: Building2,
  shield: ShieldCheck,
  palette: Palette,
  cpu: Cpu,
  orbit: Orbit,
};
export function ExternalLink({ href, children, className = "", ...props }) {
  return (
    <a className={`external-link ${className}`} href={href} {...props}>
      {children}
      <ArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}
export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          {number && <span className="section-number">{number}</span>}
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function Tag({ children, tone = "neutral" }) {
  return <span className={`tag ${tone}`}>{children}</span>;
}
