import { NextRequest, NextResponse } from "next/server";
import { equipApplicationRepository } from "@/lib/database/repositories/equip-application.repository";
import { submitEquipApplicationAction } from "@/actions/equip2027";
import { equipApplicationSchema } from "@/lib/validators/equip2027.validator";
import { logger } from "@/lib/utils/logger";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref");
    const email = searchParams.get("email");

    if (ref) {
      const app = await equipApplicationRepository.findByReference(ref);
      if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });
      return NextResponse.json({ success: true, application: app });
    }

    if (email) {
      const app = await equipApplicationRepository.findByEmail(email);
      if (!app) return NextResponse.json({ error: "Application not found" }, { status: 404 });
      return NextResponse.json({ success: true, application: app });
    }

    const applications = await equipApplicationRepository.listAll(100);
    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (err) {
    logger.error("EquipAPI", "GET error", { error: err });
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await submitEquipApplicationAction(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (err) {
    logger.error("EquipAPI", "POST error", { error: err });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { referenceCode, status, whatsappNotes, paymentReference, paymentMethod } = body;

    if (!referenceCode) {
      return NextResponse.json({ error: "referenceCode is required" }, { status: 400 });
    }

    if (status === "STEP4_PAYMENT_CONFIRMED" && paymentReference) {
      const updated = await equipApplicationRepository.markPaid(
        referenceCode,
        paymentReference,
        paymentMethod || "BANK_TRANSFER"
      );
      return NextResponse.json({ success: true, application: updated });
    }

    if (status) {
      const updated = await equipApplicationRepository.updateStatus(
        referenceCode,
        status,
        whatsappNotes
      );
      return NextResponse.json({ success: true, application: updated });
    }

    return NextResponse.json({ error: "No update parameters provided" }, { status: 400 });
  } catch (err) {
    logger.error("EquipAPI", "PATCH error", { error: err });
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}
