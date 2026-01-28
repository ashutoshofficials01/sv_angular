import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from '../../../services/score.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-score',
  standalone: false,
  templateUrl: './score.html',
  styleUrl: './score.css',
})
export class Score implements OnInit {

  role: any = String;
  formatType: any = Number;

  selectedFile: File | null = null;
  message = '';
  isSuccess = false;
  uploadState: 'idle' | 'uploading' | 'done' | 'error' = 'idle';

  constructor(private router: Router, private route: ActivatedRoute, private scoreService: ScoreService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((resp) => {
      this.role = resp.get("role");
      this.formatType = Number(resp.get("id"));
    });
  }

  resSelect(event: any): void {
    // const resile = event.target.files[0]; 
    this.selectedFile = null;
    const resFile = event.target as HTMLInputElement;

    if (resFile.files?.[0]) {
      const flow = resFile.files[0];
      if (this.isValidFile(flow)) {
        this.selectedFile = flow;
        this.message = '';
        this.uploadState = 'idle';
      } else {
        this.message = 'Please Select a valid PDF or DOCX file (max 2MB).';
        this.isSuccess = false
        this.uploadState = 'idle';
      }
    }
  }

  clearFile() {
    this.selectedFile = null;
    this.message = '';
    this.uploadState = 'idle';

    const input = document.getElementById('resSelect') as HTMLInputElement;
    if (input) input.value = '';
  }

  resUpload() {
    if (!this.selectedFile) return;

    const formd = new FormData();
    formd.append('resume', this.selectedFile);
    formd.append('userId', this.formatType.toString());

    this.uploadState = 'uploading';

    this.scoreService.resumeUpload(formd).subscribe({
      next: (resp) => {
        console.log('Upload success:', JSON.stringify(resp, null, 4));
        this.message = `Resume "${this.selectedFile?.name}" uploaded! ATS Score: ${resp.atsScore || 'Calculating...'}`;
        this.isSuccess = true;
        this.uploadState = 'done';

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.message = 'Upload failed: ' + (err.error?.message || err.message || 'Unknown error');
        this.isSuccess = false;
        this.uploadState = 'error';

        this.cdr.markForCheck();
      }
    });

    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  private isValidFile(file: File): boolean {
    return /\.(pdf|docx|doc)$/i.test(file.name) && file.size < 2 * 1024 * 1024;  // 5MB limit
  }

}
