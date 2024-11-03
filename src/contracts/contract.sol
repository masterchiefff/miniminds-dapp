// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserCourseManagement {
    address public owner;

    struct Institution {
        string name;
        address owner;
        bool isActive;
    }

    struct User {
        address walletAddress;
        bool isInstructor;
        uint256 institutionId;
        bool isRegistered;
        uint256 earnedFees;
    }

    struct Course {
        string title;
        string description;
        address creator;
        uint256 mintingPrice;
        bool isActive;
        uint256 institutionId;
        uint256 totalMinted;
        uint256 earnedFees;
        uint256 studentReward;
    }

    mapping(uint256 => Institution) public institutions;
    mapping(address => User) public users;
    mapping(uint256 => Course) public courses;
    mapping(uint256 => mapping(address => bool)) public courseEnrollments;
    mapping(uint256 => mapping(address => bool)) public courseCompletions;
    mapping(uint256 => mapping(address => uint256)) public studentRewards;

    uint256 public institutionCount;
    uint256 public courseCount;

    event InstitutionCreated(uint256 indexed institutionId, string name, address indexed owner);
    event UserRegistered(address indexed walletAddress, bool isInstructor, uint256 institutionId);
    event CourseCreated(uint256 indexed courseId, string title, address indexed creator);
    event UserEnrolled(uint256 indexed courseId, address indexed user);
    event CourseMinted(uint256 indexed courseId, address indexed user, uint256 amount);
    event CourseUpdated(uint256 indexed courseId, string newTitle, string newDescription);
    event InstructorEarningsWithdrawn(address indexed instructor, uint256 amount);
    event CourseCompleted(uint256 indexed courseId, address indexed user, uint256 amount);
    event UserUnenrolled(uint256 indexed courseId, address indexed user);
    event StudentRewardWithdrawn(address indexed student, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createInstitution(string memory _name) external {
        require(bytes(_name).length > 0, "Institution name is required");

        institutions[institutionCount] = Institution({
            name: _name,
            owner: msg.sender,
            isActive: true
        });

        emit InstitutionCreated(institutionCount, _name, msg.sender);
        institutionCount++;
    }

    function activateInstitution(uint256 _institutionId) external {
        require(institutions[_institutionId].owner == msg.sender, "Only the owner can activate the institution");
        institutions[_institutionId].isActive = true;
    }

    function updateInstitution(uint256 _institutionId, string memory _newName) external {
        require(institutions[_institutionId].owner == msg.sender, "Only the owner can update the institution");
        require(bytes(_newName).length > 0, "New institution name is required");
        
        institutions[_institutionId].name = _newName;
    }

    function registerUser(uint256 _institutionId) external {
        require(!users[msg.sender].isRegistered, "User already registered");

        if (_institutionId > 0) {
            require(institutions[_institutionId].isActive, "Institution must be active");
        }

        users[msg.sender] = User({
            walletAddress: msg.sender,
            isInstructor: false,
            institutionId: _institutionId,
            isRegistered: true,
            earnedFees: 0 
        });

        emit UserRegistered(msg.sender, false, _institutionId);
    }

    function registerInstructor(uint256 _institutionId) external {
        require(!users[msg.sender].isRegistered, "User already registered");

        if (_institutionId > 0) {
            require(institutions[_institutionId].isActive, "Institution must be active");
        }

        users[msg.sender] = User({
            walletAddress: msg.sender,
            isInstructor: true,
            institutionId: _institutionId,
            isRegistered: true,
            earnedFees: 0 
        });

        emit UserRegistered(msg.sender, true, _institutionId);
    }

    function createCourse(string memory _title, string memory _description, uint256 _mintingPrice, uint256 _studentReward) external {
        require(bytes(_title).length > 0, "Course title is required");
        require(bytes(_description).length > 0, "Course description is required");
        require(_mintingPrice > 0, "Minting price must be greater than zero");
        require(_studentReward >= 0 && _studentReward <= 100, "Student reward must be between 0 and 100");

        User memory user = users[msg.sender];

        courses[courseCount] = Course({
            title: _title,
            description: _description,
            creator: msg.sender,
            mintingPrice: _mintingPrice,
            isActive: true,
            institutionId: user.institutionId,
            totalMinted: 0,
            earnedFees: 0,
            studentReward: _studentReward
        });

        emit CourseCreated(courseCount, _title, msg.sender);
        courseCount++;
    }

    function enrollInCourse(uint256 _courseId) external {
        require(users[msg.sender].isRegistered, "User must be registered to enroll");

        Course storage course = courses[_courseId];
        
        require(course.isActive, "Course must be active");
        require(!courseEnrollments[_courseId][msg.sender], "User already enrolled in this course");

        courseEnrollments[_courseId][msg.sender] = true;

        emit UserEnrolled(_courseId, msg.sender);
    }

    function unenrollFromCourse(uint256 _courseId) external {
        require(courseEnrollments[_courseId][msg.sender], "User is not enrolled in this course");

        courseEnrollments[_courseId][msg.sender] = false;

        emit UserUnenrolled(_courseId, msg.sender);
    }

    function mintCourse(uint256 _courseId) external payable {
        Course storage course = courses[_courseId];
        
        require(course.isActive, "Course must be active");
        require(msg.value == course.mintingPrice, "Incorrect minting price");

        course.totalMinted++;

        uint256 studentRewardAmount = (msg.value * course.studentReward) / 100;
        uint256 instructorEarnings = (msg.value * 80) / 100;
        uint256 platformFee = msg.value - instructorEarnings - studentRewardAmount;

        course.earnedFees += instructorEarnings;
        studentRewards[_courseId][msg.sender] += studentRewardAmount;

        payable(owner).transfer(platformFee);

        emit CourseMinted(_courseId, msg.sender, msg.value);
    }

    function withdrawInstructorEarnings(uint256 _courseId) external {
        Course storage course = courses[_courseId];
        require(course.creator == msg.sender, "Only course creator can withdraw earnings");
        require(course.earnedFees > 0, "No earnings to withdraw");

        uint256 amount = course.earnedFees;
        course.earnedFees = 0;

        payable(msg.sender).transfer(amount);

        emit InstructorEarningsWithdrawn(msg.sender, amount);
    }

    function completeCourseAndWithdrawReward(uint256 _courseId) external {
        require(courseEnrollments[_courseId][msg.sender], "Not enrolled in the course");
        require(!courseCompletions[_courseId][msg.sender], "Reward already claimed");

        uint256 reward = studentRewards[_courseId][msg.sender];
        require(reward > 0, "No reward available");

        courseCompletions[_courseId][msg.sender] = true;
        studentRewards[_courseId][msg.sender] = 0;

        payable(msg.sender).transfer(reward);

        emit StudentRewardWithdrawn(msg.sender, reward);
    }

    function withdraw() external {
        User storage user = users[msg.sender];
        require(user.earnedFees > 0, "No funds to withdraw");

        uint256 amount = user.earnedFees;
        user.earnedFees = 0;
        
        payable(msg.sender).transfer(amount);
    }

    function getUserDetails(address _userAddress) external view returns (User memory) {
        return users[_userAddress];
    }

    function getCourseDetails(uint256 _courseId) external view returns (Course memory) {
        return courses[_courseId];
    }

    function getAllCourses() external view returns (Course[] memory) {
        Course[] memory allCourses = new Course[](courseCount);

        for (uint256 i = 0; i < courseCount; i++) {
            allCourses[i] = courses[i];
        }

        return allCourses;
    }

    function getCoursesByCreator(address _creator) external view returns (Course[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < courseCount; i++) {
            if (courses[i].creator == _creator) {
                count++;
            }
        }

        Course[] memory creatorCourses = new Course[](count);

        uint256 index = 0;

        for (uint256 i = 0; i < courseCount; i++) {
            if (courses[i].creator == _creator) {
                creatorCourses[index] = courses[i];
                index++;
            }
        }

        return creatorCourses;
    }

    function getAllEnrolledCourses() external view returns (Course[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < courseCount; i++) {
            if (courseEnrollments[i][msg.sender]) {
                count++;
            }
        }

        Course[] memory enrolledCourses = new Course[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < courseCount; i++) {
            if (courseEnrollments[i][msg.sender]) {
                enrolledCourses[index] = courses[i];
                index++;
            }
        }

        return enrolledCourses;
    }
}
