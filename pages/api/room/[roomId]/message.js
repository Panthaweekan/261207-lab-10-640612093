import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const result01 = rooms.findIndex((x) => x.roomId === id);
    if (result01 === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
    return res.json({
      ok: true,
      messages: rooms[result01].messages,
    });
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId;
    const result01 = rooms.findIndex((x) => x.roomId === id);
    if (result01 === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    }
    const text = req.body.text;
    if (typeof text !== "string") {
      return res.status(400).json({ ok: false, message: "Invalid text input" });
    }
    //read request body
    //create new id
    const newId = uuidv4();
    rooms[result01].messages.push({ messageId: newId, text: text });
    writeDB(rooms);
    return res.json({
      ok: true,
      message: rooms[result01].messages[rooms[result01].messages.length - 1],
    });
  }
}
