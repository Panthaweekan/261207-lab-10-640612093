import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const roomIdIDX = rooms.findIndex((x) => x.roomId === roomId);
    if (roomIdIDX === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    const message = rooms[roomIdIDX].messages;
    return res.json({ ok: true, messages: message });
  } else if (req.method === "POST") {
    const rooms1 = readDB();
    const roomId = req.query.roomId;
    const roomIdIDX = rooms1.findIndex((x) => x.roomId === roomId);
    if (roomIdIDX === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    //read request body
    const text = req.body.text;
    if (typeof text !== "string")
      return res.status(400).json({ ok: false, message: "Invalid text input" });
    //create new id
    const newId = uuidv4();
    const newMes = {
      messageId: newId,
      text: text,
    };
    rooms1[roomIdIDX].messages.push(newMes);
    writeDB(rooms1);
    return res.json({ ok: true, message: newMes });
  }
}
