
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
