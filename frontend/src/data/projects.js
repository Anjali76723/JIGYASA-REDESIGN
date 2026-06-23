/* ─────────────────────────────────────────────────────────
   SINGLE SOURCE OF TRUTH — all project / case study data
   Used by: Work.jsx (portfolio listing) and CaseStudy.jsx
─────────────────────────────────────────────────────────── */

export const PROJECTS = [
  /* ── 1. Manufacturing Analytics Platform ─────────────── */
  {
    slug: 'manufacturing-analytics-platform',
    category: 'Industrial · Data Analytics',
    industry: 'Manufacturing',
    title: 'Manufacturing Analytics Platform',
    tagline: 'Real-time industrial intelligence for modern factory floors.',
    summary:
      'A full-stack IoT analytics platform that ingests live sensor data from factory equipment, surfaces KPIs through interactive dashboards, and cuts unplanned downtime using predictive maintenance models.',
    year: '2023',
    duration: '8 months',
    team: '12 specialists',

    /* Visual identity */
    accent: '#22D3EE',
    accentSecondary: '#6366F1',
    gradientFrom: 'rgba(34,211,238,0.18)',
    gradientTo: 'rgba(99,102,241,0.08)',

    /* Hero metrics (shown on card and hero) */
    metrics: [
      { value: '300', suffix: '%', label: 'Efficiency Gain' },
      { value: '40',  suffix: '%', label: 'Downtime Reduced' },
      { value: '99.9', suffix: '%', label: 'Platform Uptime' },
      { value: '2.3',  suffix: '×', label: 'Faster Insights' },
    ],

    /* Tech stack */
    tech: ['React', 'Node.js', 'TimescaleDB', 'Apache Kafka', 'AWS IoT', 'Docker', 'Grafana', 'Python'],

    /* Case study sections */
    challenge: {
      headline: 'Legacy systems creating costly blind spots',
      body: [
        'The client operated 14 production lines across 3 facilities, yet had zero real-time visibility into equipment health or throughput. All reporting relied on manual shift logs and delayed CSV exports — a process that regularly produced data that was 6–12 hours stale.',
        'Unplanned machine failures cost an average of $180,000 per incident in lost production, emergency parts, and overtime labour. The maintenance team was reactive by necessity, not choice. Leadership had no consistent KPI framework to compare facility performance or identify systemic bottlenecks.',
      ],
    },

    solution: {
      headline: 'A unified intelligence layer across every machine',
      blocks: [
        {
          title: 'Real-Time Data Ingestion',
          body: 'We deployed edge IoT agents on each PLC and CNC unit, streaming telemetry over MQTT into Apache Kafka. TimescaleDB stores over 400 sensor channels at 1-second resolution — years of history with sub-second query latency.',
          accent: '#22D3EE',
        },
        {
          title: 'Predictive Maintenance Engine',
          body: 'A Python-based anomaly detection pipeline monitors rolling baselines for vibration, temperature, and cycle time. When deviation exceeds learned thresholds the system raises alerts 2–8 hours before likely failure, giving maintenance teams a full shift to respond proactively.',
          accent: '#6366F1',
        },
        {
          title: 'Executive Dashboard Suite',
          body: 'React dashboards with Grafana-embedded panels give floor managers, shift supervisors, and C-suite a role-appropriate view — from granular machine telemetry to facility-level OEE benchmarks — all updating live.',
          accent: '#A78BFA',
        },
      ],
    },

    process: [
      { phase: 'Discovery',    weeks: '1–2',  desc: 'On-site facility audits, PLC compatibility assessment, stakeholder interviews.' },
      { phase: 'Architecture', weeks: '3–4',  desc: 'Data pipeline design, schema definition, IoT protocol selection, cloud topology.' },
      { phase: 'Development',  weeks: '5–18', desc: 'Edge agents, Kafka pipeline, TimescaleDB schema, anomaly models, React dashboards.' },
      { phase: 'Pilot',        weeks: '19–24', desc: 'Single-line deployment, model training on live data, dashboard UAT with operators.' },
      { phase: 'Rollout',      weeks: '25–32', desc: 'Phased deployment across all 3 facilities, staff training, hypercare support.' },
    ],

    results: [
      { value: '300', suffix: '%', label: 'Operational Visibility Increase',   color: '#22D3EE' },
      { value: '40',  suffix: '%', label: 'Unplanned Downtime Reduction',       color: '#6366F1' },
      { value: '99.9', suffix: '%', label: 'Platform Uptime SLA',               color: '#A78BFA' },
      { value: '$2.4', suffix: 'M', label: 'First-Year Savings',                color: '#34D399' },
    ],
  },

  /* ── 2. Healthcare Management System ─────────────────── */
  {
    slug: 'healthcare-management-system',
    category: 'Healthcare · SaaS',
    industry: 'Healthcare',
    title: 'Healthcare Management System',
    tagline: 'End-to-end patient care, from scheduling to billing.',
    summary:
      'A HIPAA-compliant SaaS platform unifying appointment scheduling, EHR integration, telemedicine, and automated billing for multi-location healthcare practices.',
    year: '2023',
    duration: '10 months',
    team: '15 specialists',

    accent: '#6366F1',
    accentSecondary: '#A78BFA',
    gradientFrom: 'rgba(99,102,241,0.18)',
    gradientTo: 'rgba(167,139,250,0.08)',

    metrics: [
      { value: '500', suffix: 'K+', label: 'Patient Records' },
      { value: '60',  suffix: '%',  label: 'Admin Time Saved' },
      { value: '98',  suffix: '%',  label: 'Uptime' },
      { value: '4.9', suffix: '/5', label: 'Provider Rating' },
    ],

    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Twilio', 'Stripe', 'HL7 FHIR'],

    challenge: {
      headline: 'Fragmented systems creating clinical friction',
      body: [
        'The client — a regional healthcare network with 22 clinic locations — was running scheduling on one legacy system, EHR records on another, billing through a third-party service, and telemedicine via a consumer video tool not designed for clinical use.',
        'Staff were copy-pasting patient data between systems multiple times per day, error rates in billing were above 12%, and patients experienced an average 3-week wait for appointments due to manual scheduling bottlenecks. HIPAA compliance was a constant concern across the fragmented stack.',
      ],
    },

    solution: {
      headline: 'One platform from first appointment to final invoice',
      blocks: [
        {
          title: 'Smart Scheduling Engine',
          body: 'An intelligent availability engine eliminates double-bookings and optimises provider calendars across all 22 locations. Patients self-schedule via web or mobile, receive automated reminders via SMS/email, and can join telemedicine sessions directly from the confirmation link.',
          accent: '#6366F1',
        },
        {
          title: 'FHIR-Compliant EHR Integration',
          body: "Bi-directional HL7 FHIR interfaces connect the platform to the client's existing EHR system, eliminating manual data transfer. Clinical staff see a unified patient timeline — history, notes, prescriptions, and lab results — in one view.",
          accent: '#A78BFA',
        },
        {
          title: 'Automated Billing & Revenue Cycle',
          body: 'Stripe-powered billing with automated insurance pre-authorisation checks, claim submission, and remittance processing. Error rates dropped from 12% to under 1.5% in the first month of operation.',
          accent: '#22D3EE',
        },
      ],
    },

    process: [
      { phase: 'Discovery',     weeks: '1–3',  desc: 'Clinical workflow mapping, HIPAA gap analysis, EHR API assessment.' },
      { phase: 'Architecture',  weeks: '4–6',  desc: 'FHIR schema design, security model, multi-tenant SaaS topology.' },
      { phase: 'Development',   weeks: '7–28', desc: 'Core platform build: scheduling, EHR sync, telemedicine, billing.' },
      { phase: 'Compliance',    weeks: '29–34', desc: 'HIPAA security review, penetration testing, audit logging.' },
      { phase: 'Deployment',    weeks: '35–40', desc: 'Phased rollout by location, staff training, go-live support.' },
    ],

    results: [
      { value: '60',  suffix: '%',  label: 'Reduction in Admin Overhead',      color: '#6366F1' },
      { value: '500', suffix: 'K+', label: 'Patient Records Migrated',          color: '#A78BFA' },
      { value: '1.5', suffix: '%',  label: 'Billing Error Rate (from 12%)',     color: '#22D3EE' },
      { value: '4.9', suffix: '/5', label: 'Average Provider Satisfaction',     color: '#34D399' },
    ],
  },

  /* ── 3. FinTech Insights Dashboard ───────────────────── */
  {
    slug: 'fintech-insights-dashboard',
    category: 'FinTech · Web App',
    industry: 'Financial Services',
    title: 'FinTech Insights Dashboard',
    tagline: 'AI-powered financial intelligence at your fingertips.',
    summary:
      'A feature-rich financial analytics platform delivering real-time portfolio tracking, AI-driven spending insights, and market intelligence for retail investors and wealth management advisors.',
    year: '2024',
    duration: '6 months',
    team: '9 specialists',

    accent: '#A78BFA',
    accentSecondary: '#F472B6',
    gradientFrom: 'rgba(167,139,250,0.18)',
    gradientTo: 'rgba(244,114,182,0.06)',

    metrics: [
      { value: '1.2',  suffix: 'M+', label: 'Active Users' },
      { value: '340',  suffix: 'ms', label: 'Avg Response Time' },
      { value: '99.98', suffix: '%', label: 'Uptime' },
      { value: '$8',    suffix: 'B+', label: 'Assets Tracked' },
    ],

    tech: ['React', 'TypeScript', 'GraphQL', 'Redis', 'PostgreSQL', 'Python', 'OpenAI API', 'Vercel'],

    challenge: {
      headline: 'Overwhelming data with no actionable signal',
      body: [
        'Retail investors and wealth advisors were drowning in raw financial data spread across multiple brokerage accounts, spreadsheets, and fragmented news feeds. There was no single source of truth and no intelligent layer to surface what actually mattered.',
        'Existing tools in the market were either too simple (basic balance tracking) or too complex (institutional Bloomberg terminals). The client needed a product that felt premium and powerful while remaining immediately usable by non-finance professionals.',
      ],
    },

    solution: {
      headline: 'Intelligence that turns data into decisions',
      blocks: [
        {
          title: 'Unified Portfolio Engine',
          body: 'A multi-broker aggregation layer connects via OAuth to 40+ financial institutions, normalising position data, transaction history, and performance metrics into a single real-time view. Holdings update within 340ms of any market event.',
          accent: '#A78BFA',
        },
        {
          title: 'AI Spending & Allocation Insights',
          body: 'GPT-4 powered analysis categorises transactions, identifies spending patterns, and generates plain-language portfolio health summaries. Users receive proactive alerts when allocation drifts from their defined strategy — before it becomes a problem.',
          accent: '#F472B6',
        },
        {
          title: 'Market Intelligence Feed',
          body: "A curated real-time news and sentiment pipeline uses NLP to score relevance against each user's holdings, surfacing only the market events that actually affect their portfolio — eliminating information overload.",
          accent: '#FBBF24',
        },
      ],
    },

    process: [
      { phase: 'Research',      weeks: '1–2',  desc: 'Investor interviews, competitor analysis, API feasibility with 40+ brokers.' },
      { phase: 'Design',        weeks: '3–5',  desc: 'Information architecture, design system, interactive prototypes.' },
      { phase: 'Development',   weeks: '6–18', desc: 'Aggregation engine, AI pipeline, React dashboard, real-time feeds.' },
      { phase: 'Beta',          weeks: '19–22', desc: '500-user closed beta, performance optimisation, AI prompt tuning.' },
      { phase: 'Launch',        weeks: '23–24', desc: 'Public launch, growth monitoring, customer success onboarding.' },
    ],

    results: [
      { value: '1.2',  suffix: 'M+', label: 'Users in First Year',             color: '#A78BFA' },
      { value: '340',  suffix: 'ms', label: 'Portfolio Update Latency',        color: '#F472B6' },
      { value: '4.8',  suffix: '/5', label: 'App Store Rating',                color: '#FBBF24' },
      { value: '$8',   suffix: 'B+', label: 'Assets Under Tracking',           color: '#22D3EE' },
    ],
  },
]

/* Utility: find a project by slug */
export function getProjectBySlug(slug) {
  return PROJECTS.find(p => p.slug === slug) ?? null
}
