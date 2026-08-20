import data from "@/data/hr-modules.json";

export type ModuleDef = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  summary: string;
  features: { name: string; detail: string }[];
};

export type WorkflowStep = {
  step: string;
  title: string;
  detail: string;
  icon?: string;
  inputs?: string[];
  outputs?: string[];
};

export type WhySystem = {
  intro: string;
  problems: string[];
  wins: string[];
};

export type IntegrationCard = { tag: string; name: string; detail: string };
export type DeploymentCard  = { tag: string; name: string; detail: string };

export type AdditionalModule = {
  tag: string;
  title: string;
  summary: string;
  features: string[];
};

export type AdditionalCompliance = AdditionalModule;

export type ApprovalChain = {
  name: string;
  steps: string[];
  modules: string[];
};

export type ApprovalsBlock = {
  tag: string;
  title: string;
  summary: string;
  chains: ApprovalChain[];
};

export type AlertsBlock = {
  tag: string;
  title: string;
  summary: string;
  categories: { name: string; detail: string }[];
};

export type Additional = {
  wages: AdditionalModule;
  compliance: AdditionalCompliance;
  approvals: ApprovalsBlock;
  alerts: AlertsBlock;
};

export const modules: ModuleDef[] = data.modules;
export const workflow: WorkflowStep[] = data.workflow;

export const whySystem   = (data as unknown as { whySystem: WhySystem }).whySystem;
export const integrations: IntegrationCard[] = (data as unknown as { integrations: IntegrationCard[] }).integrations;
export const deployment:   DeploymentCard[]  = (data as unknown as { deployment:   DeploymentCard[]  }).deployment;
export const additional:   Additional        = (data as unknown as { additional:   Additional        }).additional;

export function getModule(slug: string): ModuleDef | undefined {
  return modules.find((m) => m.slug === slug);
}

/** Grouping for the /modules index (helps the client scan by domain). */
export const MODULE_GROUPS: { key: string; label: string; slugs: string[] }[] = [
  { key: "people", label: "People", slugs: ["employee-lifecycle", "transport"] },
  { key: "time",   label: "Time",   slugs: ["attendance", "leaves", "overtime"] },
  { key: "money",  label: "Money",  slugs: ["payroll", "loans"] },
  { key: "insight",label: "Insight & Compliance", slugs: ["reports", "compliance"] },
];

/** Canonical top-level page order for global Pager. */
export const NAV_ORDER: { href: string; label: string }[] = [
  { href: "/",         label: "Overview" },
  { href: "/modules",  label: "Modules"  },
  { href: "/contact",  label: "Contact"  },
];
