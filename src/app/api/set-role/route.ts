import { adminAuth } from "@/src/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Body recebido:", body); // ← adicione isso

    const { uid, role } = body;

    console.log("uid:", uid, "role:", role); // ← e isso

    if (!uid || !["patient", "therapist"].includes(role)) {
      console.log("Validação falhou"); // ← e isso
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    await adminAuth.setCustomUserClaims(uid, { role });
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Erro no set-role:", error);
    return NextResponse.json({ error: "Erro ao definir role." }, { status: 500 });
  }
}
