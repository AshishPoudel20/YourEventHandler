
import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export async function getDB() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('eventhandler.db');
  }
  return dbInstance;
}


export async function initDB() {
  const db = await getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS events (
      eventId INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT,
      location TEXT
    );
    CREATE TABLE IF NOT EXISTS members (
      memberid INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      email TEXT
    );
    CREATE TABLE IF NOT EXISTS participants (
      userid INTEGER PRIMARY KEY AUTOINCREMENT,
      memberid INTEGER NOT NULL,
      eventId INTEGER NOT NULL,
      isAttending INTEGER DEFAULT 0,
      FOREIGN KEY (memberid) REFERENCES members(memberid),
      FOREIGN KEY (eventId) REFERENCES events(eventId)
    );
  `);

  // Seed members (read-only entity per spec)
  const count = await db.getFirstAsync('SELECT COUNT(*) as c FROM members');
  if (count.c === 0) {
    await db.runAsync('INSERT INTO members (name, email) VALUES (?, ?)', ['alice', 'alice@example.com']);
    await db.runAsync('INSERT INTO members (name, email) VALUES (?, ?)', ['bob', 'bob@example.com']);
    await db.runAsync('INSERT INTO members (name, email) VALUES (?, ?)', ['charlie', 'charlie@example.com']);
    await db.runAsync('INSERT INTO members (name, email) VALUES (?, ?)', ['diana', 'diana@example.com']);
  }

  // Seed sample events for demonstration
  const ec = await db.getFirstAsync('SELECT COUNT(*) as c FROM events');
  if (ec.c === 0) {
    await db.runAsync('INSERT INTO events (title, date, location) VALUES (?, ?, ?)', ['Tech Meetup', '2026-06-01', 'Melbourne']);
    await db.runAsync('INSERT INTO events (title, date, location) VALUES (?, ?, ?)', ['React Workshop', '2026-06-15', 'Sydney']);
  }
}

// EVENT CRUD
export async function getEvents() {
  const db = await getDB();
  return db.getAllAsync('SELECT * FROM events ORDER BY eventId DESC');
}

export async function createEvent(title, date, location) {
  const db = await getDB();
  return db.runAsync('INSERT INTO events (title, date, location) VALUES (?, ?, ?)', [title, date, location]);
}

export async function updateEvent(eventId, title, date, location) {
  const db = await getDB();
  return db.runAsync('UPDATE events SET title=?, date=?, location=? WHERE eventId=?', [title, date, location, eventId]);
}

export async function deleteEvent(eventId) {
  const db = await getDB();
  await db.runAsync('DELETE FROM participants WHERE eventId=?', [eventId]);
  return db.runAsync('DELETE FROM events WHERE eventId=?', [eventId]);
}

// MEMBER (read-only)
export async function getMemberByName(name) {
  const db = await getDB();
  return db.getFirstAsync('SELECT * FROM members WHERE name=?', [name.trim().toLowerCase()]);
}

export async function getMemberByEmail(email) {
  const db = await getDB();
  return db.getFirstAsync('SELECT * FROM members WHERE email=?', [email.trim().toLowerCase()]);
}

export async function createMember(name, email) {
  const db = await getDB();
  const baseName = name.trim().toLowerCase() || 'member';
  const normalizedEmail = email.trim().toLowerCase();

  let candidateName = baseName;
  let attempt = 1;
  while (true) {
    const existing = await db.getFirstAsync('SELECT memberid FROM members WHERE name=?', [candidateName]);
    if (!existing) break;
    attempt += 1;
    candidateName = `${baseName}${attempt}`;
  }

  await db.runAsync('INSERT INTO members (name, email) VALUES (?, ?)', [candidateName, normalizedEmail]);
  return db.getFirstAsync('SELECT * FROM members WHERE email=?', [normalizedEmail]);
}

// PARTICIPANT operations
export async function isRegistered(memberid, eventId) {
  const db = await getDB();
  const r = await db.getFirstAsync('SELECT * FROM participants WHERE memberid=? AND eventId=?', [memberid, eventId]);
  return !!r;
}

export async function registerForEvent(memberid, eventId) {
  const db = await getDB();
  return db.runAsync('INSERT INTO participants (memberid, eventId, isAttending) VALUES (?, ?, 0)', [memberid, eventId]);
}

export async function unregisterFromEvent(memberid, eventId) {
  const db = await getDB();
  return db.runAsync('DELETE FROM participants WHERE memberid=? AND eventId=?', [memberid, eventId]);
}

export async function getParticipantsForEvent(eventId) {
  const db = await getDB();
  return db.getAllAsync(
    `SELECT p.userid, p.memberid, p.eventId, p.isAttending, m.name, m.email
     FROM participants p JOIN members m ON p.memberid = m.memberid
     WHERE p.eventId=?`,
    [eventId]
  );
}

export async function setAttendance(userid, isAttending) {
  const db = await getDB();
  return db.runAsync('UPDATE participants SET isAttending=? WHERE userid=?', [isAttending ? 1 : 0, userid]);
}
