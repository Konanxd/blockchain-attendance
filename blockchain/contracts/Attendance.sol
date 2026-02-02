// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Attendance {
     address public owner;

     constructor() {
          owner = msg.sender;
          operators[msg.sender] = true;
     }

     mapping(address => bool) public operators;

     modifier onlyOwner() {
          require(msg.sender == owner, "Not Owner");
          _;
     }

     modifier onlyOperator() {
          require(operators[msg.sender], "Not operator");
          _;
     }

     function addOperator(address _operator) external onlyOwner() {
          operators[_operator] = true;
     }

     function removeOperator(address _operator) external onlyOwner() {
          operators[_operator] = false;
     }

     struct AttendanceRecord {
          uint256 timestamp;
          bytes32 eventId;
     }

     mapping(bytes32 => AttendanceRecord) private attendanceRecords;
     
     mapping(bytes32 => bool) public hasAttended;

     mapping(bytes32 => bytes32[]) private eventAttendees;

     event AttendanceMarked(
          bytes32 indexed ticketId,
          bytes32 indexed eventId,
          uint256 timestamp
     );

     function markAttendance(
          bytes32 _ticketId,
          bytes32 _eventId
     ) external onlyOperator() {
          require(!hasAttended[_ticketId], "Ticket already used");

          attendanceRecords[_ticketId] = AttendanceRecord({
               timestamp: block.timestamp,
               eventId: _eventId
          });

          hasAttended[_ticketId] = true;
          eventAttendees[_eventId].push(_ticketId);

          emit AttendanceMarked(_ticketId, _eventId, block.timestamp);
     }

     function verifyAttendance(bytes32 _ticketId) external view returns (bool) {
          return hasAttended[_ticketId];
     }

     function getAttendanceRecord(bytes32 _ticketId)
          external
          view
          returns (AttendanceRecord memory)
     {
          return attendanceRecords[_ticketId];
     }

     function getEventAttendees(bytes32 _eventId)
          external
          view
          returns (bytes32[] memory)
     {
          return eventAttendees[_eventId];
     }
}