"use server";

import { registrationRepository } from "@/lib/database/repositories/registration.repository";
import { SITE } from "@/constants/site";

export interface VerifiedCertificate {
  certificateId: string;
  registrationNumber: string;
  receiptNumber?: string | null;
  studentName: string;
  programTitle: string;
  programDescription?: string;
  trainingMode: string;
  cohortName: string;
  cohortDates?: string;
  issueDate: string;
  status: "VERIFIED" | "HONORS" | "COMPLETED";
  grade?: string;
  verificationHash: string;
  verificationUrl: string;
  issuer: string;
  issuerAddress: string;
  signatories: { name: string; title: string }[];
  curriculumHighlights: string[];
}

export type CertificateVerifyResult =
  | { success: true; certificate: VerifiedCertificate }
  | { success: false; error: string };

const DEMO_CERTIFICATES: Record<string, VerifiedCertificate> = {
  "REG-2026-000001": {
    certificateId: "CERT-MCEL-2026-0101",
    registrationNumber: "REG-2026-000001",
    receiptNumber: "MCEL-2026-000001",
    studentName: "Godwin Ogbonna",
    programTitle: "AI Productivity & Digital Innovation Bootcamp",
    programDescription:
      "Comprehensive mastery in applied artificial intelligence, prompt engineering, cinematic AI media creation, full-stack vibe coding, automated business systems, and agile technology project delivery.",
    trainingMode: "HYBRID (Online & On-Site Practical)",
    cohortName: "Cohort 1 — Evening Session",
    cohortDates: "August 5, 2026 – August 20, 2026",
    issueDate: "August 20, 2026",
    status: "VERIFIED",
    grade: "Distinction with Honors",
    verificationHash: "8F9B2A7E4C1D0E3F5A8B6C9D2E4F1A7B3C5D8E0F",
    verificationUrl: `${SITE.url}/verify?id=REG-2026-000001`,
    issuer: "M-CEL TECH Academic & Professional Certification Board",
    issuerAddress: SITE.officeAddress,
    signatories: [
      { name: "NATION CHIMEKA", title: "PROGRAM LEAD" },
      { name: "EPKOR JEPHTA", title: "PROGRAM INSTRUCTOR" },
    ],
    curriculumHighlights: [
      "Advanced Generative AI & Systematic Prompt Engineering",
      "Cinematic AI Video Generation & Creative Storytelling",
      "Vibe Coding & Full-Stack AI Toolchain Integration",
      "Enterprise Workflow Automation (Make / Zapier / APIs)",
      "Digital Project Management & Modern Product Delivery",
    ],
  },
  "REG-2026-000002": {
    certificateId: "CERT-MCEL-2026-0102",
    registrationNumber: "REG-2026-000002",
    receiptNumber: "MCEL-2026-000002",
    studentName: "Chioma Adeyemi",
    programTitle: "AI Productivity & Digital Innovation Bootcamp",
    programDescription:
      "Advanced mastery of digital transformation workflows, autonomous agent orchestration, AI automation pipelines, and modern software productivity tooling.",
    trainingMode: "ONLINE INTERACTIVE",
    cohortName: "Cohort 1 — Evening Session",
    cohortDates: "August 5, 2026 – August 20, 2026",
    issueDate: "August 20, 2026",
    status: "VERIFIED",
    grade: "Distinction",
    verificationHash: "4E7A1C9B3D5E0F2A8B6C4D1E3F5A7B9C0D2E4F6A",
    verificationUrl: `${SITE.url}/verify?id=REG-2026-000002`,
    issuer: "M-CEL TECH Academic & Professional Certification Board",
    issuerAddress: SITE.officeAddress,
    signatories: [
      { name: "NATION CHIMEKA", title: "PROGRAM LEAD" },
      { name: "EPKOR JEPHTA", title: "PROGRAM INSTRUCTOR" },
    ],
    curriculumHighlights: [
      "AI Workflow Automation & Multi-Agent Frameworks",
      "Prompt Optimization for Enterprise Knowledge Systems",
      "Modern Web Architecture & AI-Assisted Development",
      "Digital Innovation Systems & Strategic Implementation",
    ],
  },
  "REG-2026-000003": {
    certificateId: "CERT-MCEL-2026-0103",
    registrationNumber: "REG-2026-000003",
    receiptNumber: "MCEL-2026-000003",
    studentName: "Emmanuel Kalu",
    programTitle: "AI Productivity & Digital Innovation Bootcamp",
    programDescription:
      "Intensive technical certification in prompt engineering, automated customer pipelines, and AI multimedia production.",
    trainingMode: "PHYSICAL IMMERSION",
    cohortName: "Cohort 1 — Evening Session",
    cohortDates: "August 5, 2026 – August 20, 2026",
    issueDate: "August 20, 2026",
    status: "VERIFIED",
    grade: "Distinction",
    verificationHash: "2B8C4D1E3F5A7B9C0D2E4F6A8B0C2D4E6F8A1C3E",
    verificationUrl: `${SITE.url}/verify?id=REG-2026-000003`,
    issuer: "M-CEL TECH Academic & Professional Certification Board",
    issuerAddress: SITE.officeAddress,
    signatories: [
      { name: "NATION CHIMEKA", title: "PROGRAM LEAD" },
      { name: "EPKOR JEPHTA", title: "PROGRAM INSTRUCTOR" },
    ],
    curriculumHighlights: [
      "Prompt Engineering & Context Design",
      "AI Creative Studio & Cinematic Visual Rendering",
      "Autonomous Workflow Integrations",
      "Digital Operations & Practical Agile Methodologies",
    ],
  },
};

/**
 * Normalizes user input so that:
 * - "REG-2026-000001" -> "REG-2026-000001"
 * - "2026-000001" -> "REG-2026-000001"
 * - "reg 2026 000001" -> "REG-2026-000001"
 */
function normalizeRegNumber(raw: string): string {
  let clean = raw.trim().toUpperCase().replace(/\s+/g, "-");
  if (!clean.startsWith("REG-") && /^\d{4}-\d+$/.test(clean)) {
    clean = `REG-${clean}`;
  }
  return clean;
}

export async function verifyCertificateAction(
  query: string
): Promise<CertificateVerifyResult> {
  const rawClean = query?.trim();

  if (!rawClean) {
    return {
      success: false,
      error: "Please enter your Student Registration Number (e.g., REG-2026-000001).",
    };
  }

  const normalized = normalizeRegNumber(rawClean);

  // 1. Check in database first
  try {
    const record = await registrationRepository.findCertificate(normalized) ??
                   await registrationRepository.findCertificate(rawClean);

    if (record) {
      const regNo = record.registrationNumber;
      const certId = record.receiptNumber
        ? `CERT-${record.receiptNumber}`
        : `CERT-${record.registrationNumber}`;
      const certUrl = `${SITE.url}/verify?id=${encodeURIComponent(regNo)}`;

      const issueDateFormatted = record.updatedAt
        ? new Date(record.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "August 20, 2026";

      const cohortDatesFormatted =
        record.cohort.startDate && record.cohort.endDate
          ? `${new Date(record.cohort.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })} – ${new Date(record.cohort.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`
          : record.cohort.name;

      // Deterministic synthetic verification hash for cryptographic look
      const hashSeed = `${record.id}-${record.registrationNumber}-MCEL`;
      let hash = "";
      for (let i = 0; i < 40; i++) {
        const code = (hashSeed.charCodeAt(i % hashSeed.length) * (i + 13)) % 16;
        hash += code.toString(16).toUpperCase();
      }

      return {
        success: true,
        certificate: {
          certificateId: certId,
          registrationNumber: record.registrationNumber,
          receiptNumber: record.receiptNumber,
          studentName: record.certificateName || record.fullName,
          programTitle: record.program.title,
          programDescription: record.program.description,
          trainingMode: record.program.trainingMode,
          cohortName: record.cohort.name,
          cohortDates: cohortDatesFormatted,
          issueDate: issueDateFormatted,
          status: "VERIFIED",
          grade: "Distinction",
          verificationHash: hash,
          verificationUrl: certUrl,
          issuer: "M-CEL TECH Academic & Professional Certification Board",
          issuerAddress: SITE.officeAddress,
          signatories: [
            { name: "NATION CHIMEKA", title: "PROGRAM LEAD" },
            { name: "EPKOR JEPHTA", title: "PROGRAM INSTRUCTOR" },
          ],
          curriculumHighlights: [
            "Advanced Generative AI & Systematic Prompt Engineering",
            "Cinematic AI Video Generation & Creative Storytelling",
            "Vibe Coding & Full-Stack AI Toolchain Integration",
            "Enterprise Workflow Automation (Make / Zapier / APIs)",
            "Digital Project Management & Modern Product Delivery",
          ],
        },
      };
    }
  } catch (err) {
    console.error("Database lookup error during certificate verification:", err);
  }

  // 2. Check demo records by normalized or raw key
  const demoMatch = DEMO_CERTIFICATES[normalized] || DEMO_CERTIFICATES[rawClean.toUpperCase()];
  if (demoMatch) {
    return {
      success: true,
      certificate: demoMatch,
    };
  }

  return {
    success: false,
    error: `No verified certificate record was found for Registration Number "${rawClean}". Please verify the number matches your admission/registration confirmation (format: REG-YYYY-XXXXXX).`,
  };
}
