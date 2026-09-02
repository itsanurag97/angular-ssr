import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentRegistration } from '../models/student-registration.model';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {

  // Aapke Spring Boot Controller ka RequestMapping URL
  private readonly baseUrl = 'http://localhost:8080/api/v1/students';

  constructor(private readonly http: HttpClient) {}

  // 1. GET - All Students
  getAllStudents(): Observable<StudentRegistration[]> {
    return this.http.get<StudentRegistration[]>(this.baseUrl);
  }

  // 2. GET - Student by ID
  getStudentById(id: number): Observable<StudentRegistration> {
    return this.http.get<StudentRegistration>(`${this.baseUrl}/${id}`);
  }

  // 3. POST - Register Student
  registerStudent(student: StudentRegistration): Observable<StudentRegistration> {
    return this.http.post<StudentRegistration>(this.baseUrl, student);
  }

  // 4. PUT - Update Student
  updateStudent(id: number, student: StudentRegistration): Observable<StudentRegistration> {
    return this.http.put<StudentRegistration>(`${this.baseUrl}/${id}`, student);
  }

  // 5. PATCH - Partial Update Student
  patchStudent(id: number, student: Partial<StudentRegistration>): Observable<StudentRegistration> {
    return this.http.patch<StudentRegistration>(`${this.baseUrl}/${id}`, student);
  }

  // 6. DELETE - Delete Student (Backend Text Response Return Kar Raha Hai)
  deleteStudent(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // 7. HEAD - Check Student Existence
  headStudent(id: number): Observable<void> {
    return this.http.head<void>(`${this.baseUrl}/${id}`);
  }
}