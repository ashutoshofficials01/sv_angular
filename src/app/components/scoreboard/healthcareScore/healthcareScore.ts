import { Component, OnInit } from '@angular/core';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from '../../../services/score.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  AtsGenParamDto,
  AtsListDto,
  resumeCalUpdate,
  SendResponseDto,
} from '../../../shared/classes-dto';

@Component({
  selector: 'app-healthcareScore',
  standalone: false,
  templateUrl: './healthcareScore.html',
  styleUrls: ['./healthcareScore.css'],
})
export class HealthcareScore implements OnInit {
  role: any = String;
  formatType: any = Number;

  selectedFile: File | null = null;
  message = '';
  isSuccess = false;
  uploadState: 'idle' | 'uploading' | 'done' | 'error' = 'idle';
  atsListBulk: AtsListDto[] = [];
  atsGenData: AtsGenParamDto[] = [];
  resMsgUpdate: resumeCalUpdate[] = [];

  positiveModal: boolean = false;
  partialModal: boolean = false;
  negativeModal: boolean = false;
  activeModalType: 'positive' | 'partial' | 'negative' | null = null;
  uploadProgress: number = 0;
  radius = 70;
  circumference = 2 * Math.PI * this.radius;

  animatedScore = 0;
  score = 0;

  strokeOffset = this.circumference;

  scoreColor = '#3b82f6';
  scoreTextColor = 'text-blue-600';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scoreService: ScoreService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((resp) => {
      this.role = resp.get('role');
      this.formatType = Number(resp.get('id'));
    });
  }

  backNav() {
    this.router.navigate(['/dashboard'], { queryParams: { role: this.role, id: this.formatType } });
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
        this.isSuccess = false;
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
    this.uploadProgress = 10;
    this.message = '';
    this.isSuccess = false;

    const interval = setInterval(() => {
      if (this.uploadProgress < 90) {
        this.uploadProgress += 3;
        this.cdr.detectChanges();
      }
    }, 100);

    this.scoreService.resumeUploadHealthcare(formd).subscribe({
      next: (resp: SendResponseDto) => {
        clearInterval(interval);
        this.uploadProgress = 100;
        this.resumeUploadFormat(resp);
        this.message = `Resume "${this.selectedFile?.name}" uploaded! ATS Score: ${resp.atsScore || 'Calculating...'}`;
        this.isSuccess = true;
        this.uploadState = 'done';
        this.animateScoreCircle(resp.atsScore);

        this.cdr.detectChanges();

        this.cdr.markForCheck();
      },
      error: (err) => {
        clearInterval(interval);
        this.uploadProgress = 0;
        this.message = 'Upload failed: ' + (err.error?.message || err.message || 'Unknown error');
        this.isSuccess = false;
        this.uploadState = 'error';
        this.cdr.detectChanges();

        this.cdr.markForCheck();
      },
    });

    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  private isValidFile(file: File): boolean {
    return /\.(pdf|docx|doc)$/i.test(file.name) && file.size < 2 * 1024 * 1024; // 5MB limit
  }

  resumeUploadFormat(res: SendResponseDto) {
    this.atsListBulk = res.atsDataList;
    for (let i = 0; i < this.atsListBulk.length; i++) {
      this.atsGenData.push(this.atsListBulk[i].atsGeneralParamDto);
    }

    this.generalDataFormat(this.atsGenData, this.atsListBulk);
  }

  generalDataFormat(atsGen: AtsGenParamDto[], atsBulk: AtsListDto[]) {
    for (let i = 0; i < atsBulk.length; i++) {
      for (let j = 0; j < atsGen.length; j++) {
        if (atsBulk[i].atsGeneralId == atsGen[j].atsGeneralId) {
          let resMsg: resumeCalUpdate = new resumeCalUpdate();

          resMsg.atsGeneralId = atsGen[j].atsGeneralId;
          resMsg.atsParamId = atsGen[j].atsParamId;
          resMsg.category = atsGen[j].category;
          resMsg.description = atsGen[j].description;
          resMsg.max_points = atsGen[j].max_points;
          resMsg.parameter = atsGen[j].parameter;
          resMsg.penalty_points = atsGen[j].penalty_points;
          resMsg.total_points = atsGen[j].total_points;

          if (atsBulk[i].atsParamType == 'positive') {
            resMsg.msgDescription = '';
            resMsg.msgParamType = atsBulk[i].atsParamType;
            resMsg.msgScore = atsBulk[i].atsScore;
            resMsg.msgPercentage = `${atsBulk[i].atsScore} %`;
          } else if (atsBulk[i].atsParamType == 'partial') {
            resMsg.msgDescription = '';
            resMsg.msgParamType = atsBulk[i].atsParamType;
            resMsg.msgScore = atsBulk[i].atsScore;
            resMsg.msgPercentage = `${atsBulk[i].atsScore} %`;
          } else if (atsBulk[i].atsParamType == 'negative') {
            resMsg.msgDescription = '';
            resMsg.msgParamType = atsBulk[i].atsParamType;
            resMsg.msgScore = atsBulk[i].atsScore;
            resMsg.msgPercentage = `${atsBulk[i].atsScore} %`;
          }

          this.resMsgUpdate.push(resMsg);
        }
      }
    }

    this.messageUpdate(this.resMsgUpdate);
  }

  messageUpdate(msgUpdate: resumeCalUpdate[]) {
    for (let k = 0; k < msgUpdate.length; k++) {
      if (msgUpdate[k].atsGeneralId == 211) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Resume includes essential skills and technologies expected for this role';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some relevant skills and technologies are present, but improvements are needed';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription = 'Essential skills and technologies are missing';
        }
      } else if (msgUpdate[k].atsGeneralId == 212) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Resume demonstrates a strong and well-balanced range of technical skills';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Your technical skill range is partially covered and can be expanded further';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Limited technical skill coverage is negatively affecting ATS score';
        }
      } else if (msgUpdate[k].atsGeneralId == 213) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Resume uses clear and consistent technology names without unnecessary abbreviations';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Resume uses a few abbreviations, but overall clarity is mostly maintained';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Excessive use of abbreviations is reducing clarity and impacting your ATS score';
        }
      } else if (msgUpdate[k].atsGeneralId == 214) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Resume is in an ATS-friendly format and can be read accurately by screening systems';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Resume format is partially ATS-compatible and may limit accurate parsing';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Resume format is not ATS-readable and is negatively impacting your score';
        }
      } else if (msgUpdate[k].atsGeneralId == 215) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription = 'Resume layout is clean and simple';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Resume layout has some complexity that may slightly affect readability';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Complex resume layout is interfering with ATS parsing and affecting score';
        }
      } else if (msgUpdate[k].atsGeneralId == 216) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription = 'Resume uses clear, standard fonts that are easy to read';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Resume fonts are mostly readable, but minor improvements are needed';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Non-standard font usage is reducing readability and impacting the score';
        }
      } else if (msgUpdate[k].atsGeneralId == 217) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Resume includes all essential sections and is well-structured';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Resume includes some key sections, but a few important ones are missing';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Missing essential resume sections is negatively affecting the score';
        }
      } else if (msgUpdate[k].atsGeneralId == 218) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Resume sections are ordered logically, making it easy for ATS systems to follow';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Resume section order is mostly logical, but could be better organized';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Poor section ordering is disrupting ATS parsing and reducing score';
        }
      } else if (msgUpdate[k].atsGeneralId == 219) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Resume clearly demonstrates strong relevant hands-on experience';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some relevant experience is present, but it could be strengthened further';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Lack of relevant hands-on experience is significantly reducing score';
        }
      } else if (msgUpdate[k].atsGeneralId == 220) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Experience uses clearly recognized designated roles that ATS systems understand well';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some recognized relevant roles are used, but clarity can be improved';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Unclear or uncommon role titles are reducing how ATS systems interpret your experience';
        }
      } else if (msgUpdate[k].atsGeneralId == 221) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Career timeline is clearly presented and easy to interpret';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Career timeline is mostly clear, but some date details need improvement';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Unclear or inconsistent dates are negatively impacting the score';
        }
      } else if (msgUpdate[k].atsGeneralId == 222) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Your experience clearly highlights measurable outcomes and technical impact';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some measurable impact is shown, but more concrete outcomes would strengthen it';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Lack of measurable outcomes is reducing the effectiveness of your experience section';
        }
      } else if (msgUpdate[k].atsGeneralId == 223) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Your technical skillset are clearly listed and easy to identify';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some technical skills are listed, but clearer and more complete coverage is needed';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Unclear or missing technical skills are negatively impacting the score';
        }
      } else if (msgUpdate[k].atsGeneralId == 224) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Your resume reflects awareness of standard relevant practices';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some relevant practices are mentioned, but coverage is limited';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Lack of standard relevant practices is reducing your ATS score';
        }
      } else if (msgUpdate[k].atsGeneralId == 225) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Your educational background aligns well with the role requirements';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Education is somewhat relevant, but alignment can be improved';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription = 'Lack of relevant education or certification';
        }
      } else if (msgUpdate[k].atsGeneralId == 226) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Education and certifications are clearly attributed to recognized institutions';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some education or certification sources are listed, but clarity can be improved';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Unclear or missing institution details are negatively impacting the score';
        }
      } else if (msgUpdate[k].atsGeneralId == 227) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Experience is described using strong, action-driven language';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Action-oriented language is used, but descriptions could be stronger';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Weak or passive wording is reducing the impact of experience';
        }
      } else if (msgUpdate[k].atsGeneralId == 228) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Resume is clean and free from spelling or grammatical issues';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Minor spelling or grammar issues are present but do not heavily affect readability';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Spelling and grammar errors are interfering with ATS parsing and lowering score';
        }
      } else if (msgUpdate[k].atsGeneralId == 229) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Your resume avoids graphical elements and remains fully ATS-friendly';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some non-text elements are present, which may slightly affect readability';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Use of images or graphics is negatively impacting ATS parsing and score';
        }
      } else if (msgUpdate[k].atsGeneralId == 230) {
        if (msgUpdate[k].msgParamType == 'positive') {
          msgUpdate[k].msgDescription =
            'Important resume information is placed, so to improve readability';
        } else if (msgUpdate[k].msgParamType == 'partial') {
          msgUpdate[k].msgDescription =
            'Some important information placement could be improved for better readability';
        } else if (msgUpdate[k].msgParamType == 'negative') {
          msgUpdate[k].msgDescription =
            'Critical information placed in headers or footers is reducing the score';
        }
      }
    }
    console.log('Message Update Array {atsListBulk} :: ', this.atsListBulk);
    console.log('Message Update Array {atsGenData} :: ', this.atsGenData);
    console.log('Message Update Array {generalDataFormat} :: ', this.resMsgUpdate);
  }

  openMsgModal(type: 'positive' | 'partial' | 'negative') {
    this.positiveModal = false;
    this.partialModal = false;
    this.negativeModal = false;

    if (type === 'positive') {
      this.positiveModal = true;
      this.activeModalType = type;
    } else if (type === 'partial') {
      this.partialModal = true;
      this.activeModalType = type;
    } else if (type === 'negative') {
      this.negativeModal = true;
      this.activeModalType = type;
    }
  }

  closeModal() {
    this.positiveModal = false;
    this.partialModal = false;
    this.negativeModal = false;

    this.activeModalType = null;
  }

  limitText(text: string, limit: number = 65): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  animateScoreCircle(finalScore: number) {
    this.score = finalScore;
    this.animatedScore = 0;

    const duration = 1200;
    const frameRate = 15;
    const totalSteps = duration / frameRate;
    const increment = finalScore / totalSteps;

    let current = 0;

    const interval = setInterval(() => {
      current += increment;

      if (current >= finalScore) {
        current = finalScore;
        clearInterval(interval);
      }

      this.animatedScore = Math.floor(current);

      const progress = current / 100;
      this.strokeOffset = this.circumference - this.circumference * progress;

      this.updateScoreColor(current);
    }, frameRate);
  }

  updateScoreColor(value: number) {
    if (value >= 80) {
      this.scoreColor = '#22c55e';
      this.scoreTextColor = 'text-green-500';
    } else if (value >= 50) {
      this.scoreColor = '#eab308';
      this.scoreTextColor = 'text-yellow-500';
    } else {
      this.scoreColor = '#ef4444';
      this.scoreTextColor = 'text-red-500';
    }
  }

  get filteredMessages() {
    return this.resMsgUpdate.filter((msg) => msg.msgParamType === this.activeModalType);
  }
}
