import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  if (req.method === "DELETE") {
    const rooms = readDB();
    //read value from URL
    const roomId = req.query.roomId;
    const messageId = req.query.messageId;
    const roomIdIDX = rooms.findIndex((x) => x.roomId === roomId);
    if (roomIdIDX === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    const mes = rooms[roomIdIDX].messages;
    const mesIdIDX = mes.findIndex((x) => x.messageId === messageId);
    if (mesIdIDX === -1)
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    mes.splice(mesIdIDX, 1);
    writeDB(rooms);
    return res.json({ ok: true });
  }
}
