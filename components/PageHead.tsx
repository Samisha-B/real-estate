export default function PageHead({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <section className="page-head">
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)' }}>{title}</h1>
        {text && <p className="lead">{text}</p>}
      </div>
    </section>
  );
}
