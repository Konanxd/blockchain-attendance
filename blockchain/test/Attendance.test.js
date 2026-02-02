import chai from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;
const { expect } = chai;

describe("Attendance Contract", function () {
  let Attendance;
  let attendance;
  let owner;
  let operator;
  let user;
  let attacker;

  const ticketId = ethers.id("ABC-123");
  const eventId = ethers.id("EVENT-ABC");

  beforeEach(async function () {
    [owner, operator, user, attacker] = await ethers.getSigners();

    Attendance = await ethers.getContractFactory("Attendance");
    attendance = await Attendance.deploy();
    await attendance.waitForDeployment();
  });

  it("owner can add operator", async function () {
    await attendance.addOperator(operator.address);
    expect(await attendance.operators(operator.address)).to.equal(true);
  });

  it("non-owner cannot add operator", async function () {
    await expect(attendance.connect(attacker).addOperator(operator.address)).to.be.revertedWith(
      "Not Owner"
    );
  });

  it("operator can mark attendance", async function () {
    await attendance.addOperator(operator.address);

    await attendance.connect(operator).markAttendance(user.address, ticketId, eventId);

    expect(await attendance.verifyAttendance(ticketId)).to.equal(true);
  });

  it("non-operator cannot mark attendance", async function () {
    await expect(
      attendance.connect(attacker).markAttendance(user.address, ticketId, eventId)
    ).to.be.revertedWith("Not operator");
  });

  it("should store attendance record correctly", async function () {
    await attendance.markAttendance(user.address, ticketId, eventId);

    const record = await attendance.getAttendanceRecord(ticketId);

    expect(record.userAddress).to.equal(user.address);
    expect(record.eventId).to.equal(eventId);
    expect(record.timestamp).to.be.gt(0);
  });

  it("should prevent ticket reuse", async function () {
    await attendance.markAttendance(user.address, ticketId, eventId);

    await expect(attendance.markAttendance(user.address, ticketId, eventId)).to.be.revertedWith(
      "Ticket already used"
    );
  });

  it("should store event attendees", async function () {
    await attendance.markAttendance(user.address, ticketId, eventId);

    const attendees = await attendance.getEventAttendees(eventId);
    expect(attendees.length).to.equal(1);
    expect(attendees[0]).to.equal(ticketId);
  });

  it("should reject non-owner calls", async function () {
    await expect(attendance.connect(operator).markAttendance(user.address, ticketId, eventId)).to.be
      .reverted;
  });
});
