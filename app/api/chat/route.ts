import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message requis' },
        { status: 400 }
      );
    }

    // Réponse simple du chatbot pour les JO de Tokyo 2020
    const responses: Record<string, string> = {
      'bonjour': 'Bonjour ! Je suis votre assistant pour les Jeux Olympiques de Tokyo 2020. Comment puis-je vous aider ?',
      'médailles': 'Vous pouvez consulter les statistiques de médailles dans les rapports Power BI ou utiliser le prédicteur ML pour anticiper les performances futures.',
      'prédiction': 'Utilisez notre section de prédiction ML pour prévoir les médailles par pays pour les JO futurs (2026-2032).',
      'aide': 'Je peux vous aider avec les statistiques olympiques, les prédictions de médailles, et l\'exportation de rapports. Que souhaitez-vous savoir ?',
    };

    // Recherche de mots-clés dans le message
    const lowerMessage = message.toLowerCase();
    let response = 'Je suis là pour vous aider avec les Jeux Olympiques de Tokyo 2020. Vous pouvez me demander des informations sur les médailles, les prédictions, ou l\'export de rapports.';

    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    return NextResponse.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur du chatbot' },
      { status: 500 }
    );
  }
}
