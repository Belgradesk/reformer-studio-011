import type { Dictionary } from "@/lib/i18n";

type InstructorProps = {
  instructor: Dictionary["instructor"];
};

export function Instructor({ instructor }: InstructorProps) {
  return (
    <section className="instructor section-air" aria-labelledby="instructor-title">
      {/* TODO: dodati foto instruktora kao 2-kolona layout kad bude dostupna */}
      <div className="wrap instructor-inner">
        <h2 id="instructor-title" className="reveal">
          {instructor.title}
        </h2>
        {/* TODO: bio instruktora — sertifikati, godine iskustva, pristup */}
        <p className="instructor-bio reveal reveal-d1">{instructor.bioPlaceholder}</p>
        <ul className="instructor-trust reveal reveal-d2">
          {instructor.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
