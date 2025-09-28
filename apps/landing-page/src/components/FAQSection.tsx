import React from "react";

const faqs: Array<{ question: string; answer: React.ReactNode }> = [
  {
    question: "What is a claim chart and why does it matter?",
    answer: (
      <p className="leading-relaxed text-muted-foreground">
        A claim chart is a structured table that maps each element of a patent claim to
        specific evidence. It underpins infringement, invalidity, and licensing analyses
        by showing how facts align with the claim language in a way courts and opposing
        counsel can audit.
      </p>
    ),
  },
  {
    question: "How does AI accelerate claim chart preparation?",
    answer: (
      <p className="leading-relaxed text-muted-foreground">
        AI reduces the hours spent on first-pass charting by segmenting claim elements,
        retrieving semantically aligned evidence, and generating draft mappings with
        citations. Attorneys stay in control by editing the rationale while the system
        handles repetitive sourcing work.
      </p>
    ),
  },
  {
    question: "Can AI-generated mappings withstand legal scrutiny?",
    answer: (
      <p className="leading-relaxed text-muted-foreground">
        Draft outputs are coupled with page-level citations, timestamps, and audit logs.
        Every assertion links back to verifiable source material, enabling practitioners to
        validate and refine the narrative before it becomes part of a legal opinion or
        filing.
      </p>
    ),
  },
  {
    question: "What human oversight is still required?",
    answer: (
      <p className="leading-relaxed text-muted-foreground">
        Experienced counsel interpret the claim scope, confirm doctrinal fit, and decide on
        legal positioning. AI supplies structured evidence and draft language but final
        determinations—such as infringement, invalidity, or estoppel arguments—remain a
        professional judgment.
      </p>
    ),
  },
  {
    question: "How do we keep proprietary materials secure?",
    answer: (
      <p className="leading-relaxed text-muted-foreground">
        Materials are processed within controlled environments that log access, enforce
        role-based permissions, and maintain hashes of every upload. Source documents never
        leave your tenancy, and exports include chain-of-custody metadata for downstream
        review.
      </p>
    ),
  },
  {
    question: "Can the platform support multiple chart formats?",
    answer: (
      <p className="leading-relaxed text-muted-foreground">
        Yes. You can tailor headers, apply firm-style templates, and export to spreadsheet,
        document, or HTML layouts. Batch operations keep parallel matters aligned while
        preserving review notes and status indicators across versions.
      </p>
    ),
  },
  {
    question: "What metrics help measure ROI?",
    answer: (
      <p className="leading-relaxed text-muted-foreground">
        Teams benchmark time-to-first-chart, element coverage, citation completeness, and
        rework rates. Many users report 60–80% reductions in initial drafting time while
        improving repeatability and audit readiness across matters.
      </p>
    ),
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-primary/10"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1 text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance"
            >
              Claim Chart Questions, Answered for IP Professionals
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-8">
              Practical guidance for patent attorneys and agents evaluating AI-supported claim-chart workflows.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left md:text-right md:gap-5 md:self-end">
            <div className="rounded-2xl bg-white shadow-lg border border-primary/10 px-5 py-4">
              <div className="text-3xl font-semibold text-foreground">68%</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                Faster Charting
              </div>
            </div>
            <div className="rounded-2xl bg-primary/10 text-primary shadow-lg border border-primary/20 px-5 py-4">
              <div className="text-3xl font-semibold">100%</div>
              <div className="text-xs uppercase tracking-[0.2em] text-primary/80 mt-1">
                Citation Coverage
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-primary/10 bg-white shadow-xl">
          {faqs.map((item, index) => (
            <details
              key={item.question}
              className="group"
              open={index === 0}
            >
              <summary className="flex w-full items-center justify-between gap-6 px-6 md:px-12 py-7 cursor-pointer list-none">
                <span className="text-lg md:text-xl font-medium text-foreground">
                  {item.question}
                </span>
                <span className="shrink-0 rounded-full border border-muted-foreground/20 p-2 text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 md:px-12 pb-8 text-base md:text-lg text-muted-foreground leading-relaxed border-t border-primary/10 pt-6">
                <div className="space-y-3">
                  {item.answer}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};


