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
  verificationUrl: string;
  issuer: string;
  issuerAddress: string;
  curriculumHighlights: string[];
}

export type CertificateVerifyResult =
  | { success: true; certificate: VerifiedCertificate }
  | { success: false; error: string };

const DEMO_CERTIFICATES: Record<string, VerifiedCertificate> = {
  "MCEL-2026-000001": {
    certificateId: "MCEL-2026-000001",
    registrationNumber: "REG-2026-000001",
    receiptNumber: "MCEL-2026-000001",
    studentName: "Godwin Ogbonna",
    programTitle: "AI Productivity & Digital Innovation Bootcamp",
    programDescription:
      "Advanced hybrid certification in prompt engineering, cinematic AI video generation, vibe coding, AI automation, and project management.",
    trainingMode: "HYBRID",
    cohortName: "Evening Class (Aug 5 – Aug 20, 2026)",
    cohortDates: "August 5, 2026 – August 20, 2026",
    issueDate: "August 20, 2026",
    status: "VERIFIED",
    verificationUrl: `${SITE.url}/verify?id=MCEL-2026-000001`,
    issuer: "M-CEL TECH",
    issuerAddress: SITE.officeAddress,
    curriculumHighlights: [
      "Generative AI & Advanced Prompt Engineering",
      "Cinematic AI Video Generation & Creative Storytelling",
      "Vibe Coding & Full-Stack AI Tool Integration",
      "Enterprise Automation & Zapier/Make Workflows",
      "Digital Project Management & Delivery",
    ],
  },
  "REG-2026-000001": {
    certificateId: "MCEL-2026-000001",
    registrationNumber: "REG-2026-000001",
    receiptNumber: "MCEL-2026-000001",
    studentName: "Godwin Ogbonna",
    programTitle: "AI Productivity & Digital Innovation Bootcamp",
    programDescription:
      "Advanced hybrid certification in prompt engineering, cinematic AI video generation, vibe coding, AI automation, and project management.",
    trainingMode: "HYBRID",
    cohortName: "Evening Class (Aug 5 – Aug 20, 2026)",
    cohortDates: "August 5, 2026 – August 20, 2026",
    issueDate: "August 20, 2026",
    status: "VERIFIED",
    verificationUrl: `${SITE.url}/verify?id=MCEL-2026-000001`,
    issuer: "M-CEL TECH",
    issuerAddress: SITE.officeAddress,
    curriculumHighlights: [
      "Generative AI & Advanced Prompt Engineering",
      "Cinematic AI Video Generation & Creative Storytelling",
      "Vibe Coding & Full-Stack AI Tool Integration",
      "Enterprise Automation & Zapier/Make Workflows",
      "Digital Project Management & Delivery",
    ],
  },
  "MCEL-2026-DEMO": {
    certificateId: "MCEL-2026-DEMO",
    registrationNumber: "REG-2026-009999",
    receiptNumber: "MCEL-2026-DEMO",
    studentName: "Alex Chukwu",
    programTitle: "AI Productivity & Digital Innovation Bootcamp",
    programDescription:
      "Comprehensive certification covering AI productivity tooling, workflow automation, code generation, and modern tech workflows.",
    trainingMode: "ONLINE",
    cohortName: "Cohort 1 — Digital Innovation",
    cohortDates: "August 2026",
    issueDate: "August 20, 2026",
    status: "VERIFIED",
    verificationUrl: `${SITE.url}/verify?id=MCEL-2026-DEMO`,
    issuer: "M-CEL TECH",
    issuerAddress: SITE.officeAddress,
    curriculumHighlights: [
      "Prompt Engineering Mastery",
      "Automated Workflows & Tool Chaining",
      "AI-Augmented Software Construction",
      "Productivity & Systems Strategy",
    ],
  },
};

export async function verifyCertificateAction(
  query: string
): Promise<CertificateVerifyResult> {
  const cleanQuery = query?.trim().toUpperCase();

  if (!cleanQuery) {
    return {
      success: false,
      error: "Please enter a Certificate ID, Receipt Number, or Registration Number.",
    };
  }

  // 1. Check in database
  try {
    const record = await registrationRepository.findCertificate(cleanQuery);
    if (record) {
      const certId = record.receiptNumber || record.registrationNumber;
      const certUrl = `${SITE.url}/verify?id=${encodeURIComponent(certId)}`;
      
      const issueDateFormatted = record.updatedAt
        ? new Date(record.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Confirmed";

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
          verificationUrl: certUrl,
          issuer: "M-CEL TECH",
          issuerAddress: SITE.officeAddress,
          curriculumHighlights: [
            "Generative AI & Advanced Prompt Engineering",
            "Cinematic AI Video Generation & Creative Storytelling",
            "Vibe Coding & Full-Stack AI Tool Integration",
            "Enterprise Automation & Zapier/Make Workflows",
            "Digital Project Management & Delivery",
          ],
        },
      };
    }
  } catch (err) {
    console.error("Database lookup error during certificate verification:", err);
  }

  // 2. Fallback to demo mock certificates if query matches
  if (DEMO_CERTIFICATES[cleanQuery]) {
    return {
      success: true,
      certificate: DEMO_CERTIFICATES[cleanQuery],
    };
  }

  return {
    success: false,
    error: `No authentic certificate record was found matching "${query.trim()}". Please double-check the ID or contact M-CEL TECH support if you believe this is an error.`,
  };
}
