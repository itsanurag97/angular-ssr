import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
let StudentRegistrationLists = class StudentRegistrationLists {
    studentService;
    students = [];
    selectedStudent = null;
    studentId = null;
    activeOperation = 'GET_ALL';
    student = {
        studentId: 0,
        studentName: '',
        studentClass: '',
        studentAddress: '',
        studentPhoneNumber: '',
        studentEmailId: ''
    };
    message = '';
    errorMessage = '';
    // Pop-up modals state management
    isUpdateModalOpen = false;
    isPatchModalOpen = false;
    isDeleteModalOpen = false;
    // Toggle flags for partial PATCH updates
    patchFields = {
        studentName: false,
        studentClass: false,
        studentAddress: false,
        studentPhoneNumber: false,
        studentEmailId: false
    };
    constructor(studentService) {
        this.studentService = studentService;
    }
    ngOnInit() {
        this.getAllStudents();
    }
    // =====================================================
    // OPERATION SELECTION
    // =====================================================
    showOperation(operation) {
        this.activeOperation = operation;
        this.selectedStudent = null;
        this.clearMessages();
        this.closeModals();
        if (operation === 'GET_ALL') {
            this.getAllStudents();
        }
    }
    // =====================================================
    // GET - ALL STUDENTS
    // =====================================================
    getAllStudents() {
        this.clearMessages();
        this.studentService.getAllStudents().subscribe({
            next: (response) => {
                this.students = response;
                this.message = 'Students fetched successfully.';
            },
            error: (error) => {
                console.error('GET All Students Error:', error);
                this.students = [];
                this.errorMessage = 'Failed to fetch students.';
            }
        });
    }
    // =====================================================
    // GET - STUDENT BY ID
    // =====================================================
    getStudentById() {
        if (this.studentId === null) {
            this.errorMessage = 'Please enter Student ID.';
            return;
        }
        this.clearMessages();
        this.studentService.getStudentById(this.studentId).subscribe({
            next: (response) => {
                this.selectedStudent = response;
                this.message = 'Student fetched successfully.';
            },
            error: (error) => {
                console.error('GET Student By ID Error:', error);
                this.selectedStudent = null;
                this.errorMessage = 'Student not found.';
            }
        });
    }
    // =====================================================
    // POST - REGISTER STUDENT
    // =====================================================
    registerStudent() {
        this.clearMessages();
        this.studentService.registerStudent(this.student).subscribe({
            next: (response) => {
                this.selectedStudent = response;
                this.message = 'Student registered successfully.';
                this.student = response;
                this.getAllStudents();
            },
            error: (error) => {
                console.error('POST Student Error:', error);
                this.errorMessage = 'Failed to register student.';
            }
        });
    }
    // =====================================================
    // PUT - UPDATE STUDENT (MODAL & API CALL)
    // =====================================================
    openUpdateModal() {
        if (this.studentId === null) {
            this.errorMessage = 'Please enter Student ID.';
            return;
        }
        this.clearMessages();
        this.studentService.getStudentById(this.studentId).subscribe({
            next: (response) => {
                this.selectedStudent = response;
                this.student = { ...response };
                this.isUpdateModalOpen = true;
            },
            error: (error) => {
                console.error('Load Student For Update Error:', error);
                this.selectedStudent = null;
                this.errorMessage = 'Student not found.';
            }
        });
    }
    updateStudent() {
        if (this.studentId === null)
            return;
        this.clearMessages();
        this.studentService.updateStudent(this.studentId, this.student).subscribe({
            next: (response) => {
                this.selectedStudent = response;
                this.student = { ...response };
                this.message = 'Student updated successfully.';
                this.closeModals();
                this.getAllStudents();
            },
            error: (error) => {
                console.error('PUT Student Error:', error);
                this.errorMessage = 'Failed to update student.';
            }
        });
    }
    // =====================================================
    // PATCH - PARTIAL UPDATE (MODAL & API CALL)
    // =====================================================
    openPatchModal() {
        if (this.studentId === null) {
            this.errorMessage = 'Please enter Student ID.';
            return;
        }
        this.clearMessages();
        this.studentService.getStudentById(this.studentId).subscribe({
            next: (response) => {
                this.selectedStudent = response;
                this.student = { ...response };
                this.resetPatchFields();
                this.isPatchModalOpen = true;
            },
            error: (error) => {
                console.error('Load Student For Patch Error:', error);
                this.selectedStudent = null;
                this.errorMessage = 'Student not found.';
            }
        });
    }
    patchStudent() {
        if (this.studentId === null)
            return;
        this.clearMessages();
        const patchPayload = {};
        if (this.patchFields.studentName)
            patchPayload.studentName = this.student.studentName;
        if (this.patchFields.studentClass)
            patchPayload.studentClass = this.student.studentClass;
        if (this.patchFields.studentAddress)
            patchPayload.studentAddress = this.student.studentAddress;
        if (this.patchFields.studentPhoneNumber)
            patchPayload.studentPhoneNumber = this.student.studentPhoneNumber;
        if (this.patchFields.studentEmailId)
            patchPayload.studentEmailId = this.student.studentEmailId;
        this.studentService.patchStudent(this.studentId, patchPayload).subscribe({
            next: (response) => {
                this.selectedStudent = response;
                this.student = { ...response };
                this.message = 'Student partially updated successfully.';
                this.closeModals();
                this.getAllStudents();
            },
            error: (error) => {
                console.error('PATCH Student Error:', error);
                this.errorMessage = 'Failed to patch student.';
            }
        });
    }
    // =====================================================
    // DELETE - STUDENT (CONFIRM MODAL & API CALL)
    // =====================================================
    confirmDelete() {
        if (this.studentId === null) {
            this.errorMessage = 'Please enter Student ID.';
            return;
        }
        this.clearMessages();
        this.studentService.getStudentById(this.studentId).subscribe({
            next: (response) => {
                this.selectedStudent = response;
                this.isDeleteModalOpen = true;
            },
            error: (error) => {
                console.error('Fetch Student For Delete Error:', error);
                this.errorMessage = 'Student not found.';
            }
        });
    }
    deleteStudent() {
        if (this.studentId === null)
            return;
        this.clearMessages();
        this.studentService.deleteStudent(this.studentId).subscribe({
            next: (response) => {
                this.message = response || 'Student deleted successfully.';
                this.selectedStudent = null;
                this.studentId = null;
                this.closeModals();
                this.getAllStudents();
            },
            error: (error) => {
                console.error('DELETE Student Error:', error);
                this.errorMessage = 'Failed to delete student.';
            }
        });
    }
    // =====================================================
    // HEAD - CHECK STUDENT
    // =====================================================
    headStudent() {
        if (this.studentId === null) {
            this.errorMessage = 'Please enter Student ID.';
            return;
        }
        this.clearMessages();
        this.studentService.headStudent(this.studentId).subscribe({
            next: () => {
                this.message = 'Student exists.';
            },
            error: (error) => {
                console.error('HEAD Student Error:', error);
                this.errorMessage = 'Student does not exist.';
            }
        });
    }
    // =====================================================
    // UTILITY METHODS
    // =====================================================
    clearForm() {
        this.studentId = null;
        this.student = {
            studentId: 0,
            studentName: '',
            studentClass: '',
            studentAddress: '',
            studentPhoneNumber: '',
            studentEmailId: ''
        };
        this.selectedStudent = null;
        this.clearMessages();
    }
    closeModals() {
        this.isUpdateModalOpen = false;
        this.isPatchModalOpen = false;
        this.isDeleteModalOpen = false;
    }
    resetPatchFields() {
        this.patchFields = {
            studentName: false,
            studentClass: false,
            studentAddress: false,
            studentPhoneNumber: false,
            studentEmailId: false
        };
    }
    clearMessages() {
        this.message = '';
        this.errorMessage = '';
    }
};
StudentRegistrationLists = __decorate([
    Component({
        selector: 'app-student-registration-lists',
        standalone: true,
        imports: [CommonModule, FormsModule],
        templateUrl: './student-registration-lists.html',
        styleUrl: './student-registration-lists.scss'
    })
], StudentRegistrationLists);
export { StudentRegistrationLists };
