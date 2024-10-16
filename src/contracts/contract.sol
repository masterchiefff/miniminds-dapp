// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserCourseManagement {
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
    }

    struct Course {
        string title;
        string description;
        address creator;
        uint256 mintingPrice; 
        bool isActive; 
        uint256 institutionId; // Added institutionId to link course to institution
    }

    mapping(uint256 => Institution) public institutions; 
    mapping(address => User) public users; 
    mapping(uint256 => Course) public courses; 
    mapping(uint256 => mapping(address => bool)) public courseEnrollments; // Track enrollments

    uint256 public institutionCount; 
    uint256 public courseCount; 

    event InstitutionCreated(uint256 indexed institutionId, string name, address indexed owner);
    event UserRegistered(address indexed walletAddress, bool isInstructor, uint256 institutionId);
    event CourseCreated(uint256 indexed courseId, string title, address indexed creator);
    event UserEnrolled(uint256 indexed courseId, address indexed user);

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

    function registerUser(uint256 _institutionId) external {
        require(!users[msg.sender].isRegistered, "User already registered");

        if (_institutionId > 0) {
            require(institutions[_institutionId].isActive, "Institution must be active");
        }

        users[msg.sender] = User({
            walletAddress: msg.sender,
            isInstructor: false,
            institutionId: _institutionId,
            isRegistered: true
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
            isRegistered: true
        });

        emit UserRegistered(msg.sender, true, _institutionId); 
    }

    function createCourse(string memory _title, string memory _description, uint256 _mintingPrice) external {
        require(bytes(_title).length > 0, "Course title is required");
        require(bytes(_description).length > 0, "Course description is required");
        require(_mintingPrice > 0, "Minting price must be greater than zero");

        // Fetch user details once
        User memory user = users[msg.sender];

        // Create course and minimize writes
        courses[courseCount] = Course({
            title: _title,
            description: _description,
            creator: msg.sender,
            mintingPrice: _mintingPrice,
            isActive: true,
            institutionId: user.institutionId // Associate course with the user's institution
        });

        emit CourseCreated(courseCount, _title, msg.sender);
        courseCount++;
    }

    function enrollInCourse(uint256 _courseId) external {
        require(users[msg.sender].isRegistered, "User must be registered to enroll");
        
        Course storage course = courses[_courseId];
        
        require(course.isActive, "Course must be active");
        require(!courseEnrollments[_courseId][msg.sender], "User already enrolled in this course");

        // Directly update enrollment
        courseEnrollments[_courseId][msg.sender] = true; 

        emit UserEnrolled(_courseId, msg.sender);
    }

    function getUserDetails(address _userAddress) external view returns (User memory) {
        return users[_userAddress];
    }

    function getCourseDetails(uint256 _courseId) external view returns (Course memory) {
        return courses[_courseId];
    }
    
    // New Function to Get All Courses
    function getAllCourses() external view returns (Course[] memory) {
        Course[] memory allCourses = new Course[](courseCount);
        
        for (uint256 i = 0; i < courseCount; i++) {
            allCourses[i] = courses[i];
        }
        
        return allCourses;
    }
    
    // New Function to Get Courses by Creator
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
}