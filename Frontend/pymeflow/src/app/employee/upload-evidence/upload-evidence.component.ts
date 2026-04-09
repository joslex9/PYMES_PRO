import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EvidenceService } from '../../core/services/evidence.service';

@Component({
  selector: 'app-upload-evidence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-evidence.component.html',
  styleUrls: ['./upload-evidence.component.css']
})
export class UploadEvidenceComponent implements OnInit {

  taskId!: number;

  files: File[] = [];
  comment: string = '';

  isDragging = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private evidenceService: EvidenceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.params['id']);
  }

  // 📥 SELECCIÓN MANUAL
  onFileSelected(event: any) {
    const selectedFiles = Array.from(event.target.files) as File[];

    selectedFiles.forEach(file => {
      this.files.push(file);
    });
  }

  // 🖱 DRAG OVER
  allowDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  // 🖱 DRAG LEAVE
  onDragLeave() {
    this.isDragging = false;
  }

  // 📦 DROP FILES
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      const droppedFiles = Array.from(event.dataTransfer.files);

      droppedFiles.forEach(file => {
        this.files.push(file);
      });
    }
  }

  // ❌ ELIMINAR ARCHIVO
  removeFile(index: number) {
    this.files.splice(index, 1);
  }
  goBack(){
  this.router.navigate(['/employee/tasks']);
   }

  // 📤 SUBIR EVIDENCIA
  upload() {

    if (this.files.length === 0) {
      alert('Debes subir al menos un archivo');
      return;
    }

    const formData = new FormData();

    formData.append('task_id', this.taskId.toString());
    formData.append('comment', this.comment);

    this.files.forEach(file => {
      formData.append('files', file);
    });

    this.loading = true;

    this.evidenceService.uploadEvidence(formData)
      .subscribe({
        next: () => {
          this.loading = false;
          alert('✅ Evidencia subida correctamente');
          this.router.navigate(['/employee/tasks']);
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
          alert('❌ Error al subir evidencia');
        }
      });

  }

}