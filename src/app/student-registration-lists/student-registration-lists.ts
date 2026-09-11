import { Component, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StudentRegistration } from '../models/student-registration.model';
import { StudentRegistrationService } from '../services/student-registration.service';

@Component({
  selector: 'app-student-registration-lists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-registration-lists.html',
  styleUrl: './student-registration-lists.scss'
})
export class StudentRegistrationLists implements OnInit {

  private readonly platformId = inject(PLATFORM_ID);

  students: StudentRegistration[] = [];
  selectedStudent: StudentRegistration | null = null;
  studentId: number | null = null;
  activeOperation: string = 'GET_ALL';

  student: StudentRegistration = {
    studentId: 0,
    studentName: '',
    studentClass: '',
    studentAddress: '',
    studentPhoneNumber: '',
    studentEmailId: ''
  };

  message: string = '';
  errorMessage: string = '';

  // Pop-up modals state management
  isUpdateModalOpen: boolean = false;
  isPatchModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;

  // Toggle flags for partial PATCH updates
  patchFields = {
    studentName: false,
    studentClass: false,
    studentAddress: false,
    studentPhoneNumber: false,
    studentEmailId: false
  };

  constructor(
    private readonly studentService: StudentRegistrationService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllStudents();
    }
  }

  // =====================================================
  // OPERATION SELECTION
  // =====================================================

  showOperation(operation: string): void {
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

  getAllStudents(): void {
    this.clearMessages();

    this.studentService.getAllStudents().subscribe({
      next: (response: StudentRegistration[]) => {
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

  getStudentById(): void {
    if (this.studentId === null) {
      this.errorMessage = 'Please enter Student ID.';
      return;
    }

    this.clearMessages();

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response: StudentRegistration) => {
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

  registerStudent(): void {
    this.clearMessages();

    this.studentService.registerStudent(this.student).subscribe({
      next: (response: StudentRegistration) => {
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

  openUpdateModal(): void {
    if (this.studentId === null) {
      this.errorMessage = 'Please enter Student ID.';
      return;
    }

    this.clearMessages();

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response: StudentRegistration) => {
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

  updateStudent(): void {
    if (this.studentId === null) return;

    this.clearMessages();

    this.studentService.updateStudent(this.studentId, this.student).subscribe({
      next: (response: StudentRegistration) => {
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

  openPatchModal(): void {
    if (this.studentId === null) {
      this.errorMessage = 'Please enter Student ID.';
      return;
    }

    this.clearMessages();

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response: StudentRegistration) => {
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

  patchStudent(): void {
    if (this.studentId === null) return;

    this.clearMessages();

    const patchPayload: Partial<StudentRegistration> = {};

    if (this.patchFields.studentName) patchPayload.studentName = this.student.studentName;
    if (this.patchFields.studentClass) patchPayload.studentClass = this.student.studentClass;
    if (this.patchFields.studentAddress) patchPayload.studentAddress = this.student.studentAddress;
    if (this.patchFields.studentPhoneNumber) patchPayload.studentPhoneNumber = this.student.studentPhoneNumber;
    if (this.patchFields.studentEmailId) patchPayload.studentEmailId = this.student.studentEmailId;

    this.studentService.patchStudent(this.studentId, patchPayload).subscribe({
      next: (response: StudentRegistration) => {
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

  confirmDelete(): void {
    if (this.studentId === null) {
      this.errorMessage = 'Please enter Student ID.';
      return;
    }

    this.clearMessages();

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (response: StudentRegistration) => {
        this.selectedStudent = response;
        this.isDeleteModalOpen = true;
      },
      error: (error) => {
        console.error('Fetch Student For Delete Error:', error);
        this.errorMessage = 'Student not found.';
      }
    });
  }

  deleteStudent(): void {
    if (this.studentId === null) return;

    this.clearMessages();

    this.studentService.deleteStudent(this.studentId).subscribe({
      next: (response: string) => {
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

  headStudent(): void {
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

  clearForm(): void {
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

  closeModals(): void {
    this.isUpdateModalOpen = false;
    this.isPatchModalOpen = false;
    this.isDeleteModalOpen = false;
  }

  private resetPatchFields(): void {
    this.patchFields = {
      studentName: false,
      studentClass: false,
      studentAddress: false,
      studentPhoneNumber: false,
      studentEmailId: false
    };
  }

  private clearMessages(): void {
    this.message = '';
    this.errorMessage = '';
  }
}
