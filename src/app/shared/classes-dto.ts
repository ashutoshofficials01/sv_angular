
export class loginCheckDto {
    userId: any = Number;
    emailId: any = String;
    password: any = String;
    role: any = String;
    activeStatus: any = Number;
    fullName: any = String;
    statusId: any = Number;
    userName: any = String;
}

export class SendResponseDto {
    atsDataList: AtsListDto[] = [];
    success: boolean = false;
    filename: any = String;
    savedAs: any = String;
    path: any = String;
    atsScore: any = Number;
    message: any = String;
}

export class AtsListDto {
    atsScore: any = Number;
    atsGeneralId: any = Number;
    atsParamId: any = String;
    atsParamData: Map<string, any> = new Map<string, any>();
    atsParamType: any = String;
    atsGeneralParamDto: AtsGenParamDto = new AtsGenParamDto();
}

export class AtsGenParamDto {
    atsGeneralId: any = Number;
    atsParamId: any = String;
    category: any = String;
    description: any = String;
    max_points: any = Number;
    parameter: any = String;
    penalty_points: any = Number;
    total_points: any = Number;
}

export class resumeCalUpdate {
    atsGeneralId: any = Number;
    atsParamId: any = String;
    category: any = String;
    description: any = String;
    max_points: any = Number;
    parameter: any = String;
    penalty_points: any = Number;
    total_points: any = Number;

    msgDescription: any = String;
    msgParamType: any = String;
    msgScore: any = Number;
    msgPercentage: any = String;
}

export class ATSDataListDto {
    userDataList: ATSUserListDto[] = [];
    resumeDataList: ATSResumeListDto[] = [];
}

export class ATSUserListDto {
    userModifiedOn: any = String;
    userCreatedOn: any = String;
    userName: any = String;
    statusId: any = Number;
    fullName: any = String;
    emailId: any = String;
    userRegistrationCount: any = Number;
    activeStatus: any = Number;
    role: any = String;
}

export class ATSResumeListDto {
    userId: any = Number;
    resModifiedOn: any = String;
    resCreatedOn: any = String;
    fileName: any = String;
    atsScore: any = Number;
    activeStatus: any = Number;
    resUploadId: any = Number;
    resumeUploadCount: any = Number;
}


