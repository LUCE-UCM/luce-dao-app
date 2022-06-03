// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Owner {

    //Address of the owner of the contract.
    address owner;

    mapping (address => bool) grantedUsers;

    // modifier to check if caller is owner
    modifier isOwner(){
        require(
            msg.sender == owner,
            "ERROR_NOT_OWNER."
        );
        _;
    }

    // modifier to check if caller is granted user.
    modifier isGrantedUser(){
        require(
            grantedUsers[msg.sender],
            "ERROR_NOT_GRANTED_USER."
        );
        _;
    }

    /**
     * @dev Set the owner of the contract
     * @param contractOwner address of owner
    */
    constructor(address contractOwner) {
        owner = contractOwner; 
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        owner = newOwner;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }

    function addGrantedUser(address userAccount) public isOwner {
        grantedUsers[userAccount] = true;
    }

    function revokeGrantedUser(address userAccount) public isOwner {
        grantedUsers[userAccount] = false;
    }

}

contract Enrollment is Owner {
    
    struct ActivityEnrollment {
        string[] studentIds;
    }
     
    mapping(string => ActivityEnrollment) activityEnrollments; //string represents activity id
    event EnrollmentIssued(string activityId, string studentId);
    mapping(string => uint32) totalActivityEnrollments; //total enrollments associated with an activity.
    uint32 deployedEnrollments;
    string[] students;
    string[] activities;

    /**
     * @dev Set the owner of the contract
     * @param contractOwner address of owner
    */
    constructor(address contractOwner) Owner(contractOwner) {
        //
    }

       
    /**
     * @dev Check if a student is in the list of students
     * @param _studentId identification of student
     * @param _studentList list of students to check
    */
    function studentExists(string memory _studentId, string[] memory _studentList) private pure returns(bool) {
        uint i = 0;
        while(i < _studentList.length) {
            if(keccak256(bytes(_studentList[i])) == keccak256(bytes(_studentId)))
                return true;
            i++;
        }
        return false;
    }

    /**
     * @dev Check is an activity is in the list of activities
     * @param _activityId identification of activity
    */
    function activityExists (string memory _activityId) private view returns(bool) {
        uint i = 0;
        while(i < activities.length) {
            if(keccak256(bytes(activities[i])) == keccak256(bytes(_activityId)))
                return true;
            i++;
        }
        return false;
    }

    modifier studentAlreadyEnrolledActivity(string memory _activityId, string memory _studentId) {
        string[] memory actStudents = activityEnrollments[_activityId].studentIds;
        string memory studentId = _studentId;
        bool enrolledStudent = studentExists(studentId, actStudents);
        require(!enrolledStudent, "ERROR_STUDENT_ENROLLED_ACTIVITY");
        _;
    }

    function createEnrollment (
        string memory _activityId,
        string memory _studentId

    ) 
    public
    isGrantedUser
    studentAlreadyEnrolledActivity(_activityId, _studentId) {

        //Check if we have the activity created        
        if (totalActivityEnrollments[_activityId] == 0) {          
            ActivityEnrollment memory enrollmentData;
            activityEnrollments[_activityId] = enrollmentData;
            activityEnrollments[_activityId].studentIds.push(_studentId);
        }else {
            activityEnrollments[_activityId].studentIds.push(_studentId);
        }
        totalActivityEnrollments[_activityId]++;
        deployedEnrollments++;
        if (!studentExists(_studentId, students)){
            students.push(_studentId);
        }
        if (!activityExists(_activityId)){
            activities.push(_activityId);
        }

        emit EnrollmentIssued(_activityId, _studentId);
    }

    function getEnrollmentCount() public view returns (uint32) {
        return deployedEnrollments;
    }
    
    function getActivityEnrollmentCount(string memory _activityId) public view returns (uint32) {
        return totalActivityEnrollments[_activityId];
    }

    function getTotalActivities() public view returns (uint256) {
        return activities.length;
    }

    function getTotalStudents() public view returns (uint256) {
        return students.length;
    }
}