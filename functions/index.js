const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Función para enviar una notificación push cuando se sube un nuevo archivo
exports.notifyOnNewFile = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  
  // Personaliza el título y cuerpo de la notificación
  const payload = {
    notification: {
      title: "Nueva canción disponible",
      body: `Una nueva canción se ha subido: ${filePath}`,
      icon: "/icon.png",
    },
  };

  // Envía la notificación a todos los dispositivos suscritos
  const tokensSnapshot = await admin.firestore().collection("tokens").get();
  const tokens = tokensSnapshot.docs.map(doc => doc.data().token);

  if (tokens.length > 0) {
    await admin.messaging().sendToDevice(tokens, payload);
  }
});
