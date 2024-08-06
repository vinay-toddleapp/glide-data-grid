export interface IDataRow {
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface IDisabledAndEditCell {
  name: {
    value: string;
    isDisabled?: boolean;
    hasError?: boolean;
  };
  company: {
    value: string;
    isDisabled?: boolean;
    hasError?: boolean;
  };
  email: {
    value: string;
    isDisabled?: boolean;
    hasError?: boolean;
  };
  phone: {
    value: string;
    isDisabled?: boolean;
    hasError?: boolean;
  };
}

export interface IColumnsData {
  title: string;
  id: string;
  width?: number;
  group?: string;
}

export interface ICustomTableData {
  sNo: number;
  taskName: string;
  isCompleted: boolean;
  assignedTo:
    | "Vinay Pratap Singh"
    | "Satish Kumar Narava"
    | "Abhirup Bardhan"
    | "Soumendu Prasad Sinha";
}

export interface IFigmaDesignCellData {
  prefixText?: string;
  title?: string;
  subTitle?: string;
  suffixText?: string;
}

export interface IFigmaDesignData {
  student: IFigmaDesignCellData;
  english?: number;
  maths?: number;
  total?: number;
  percentage?: number;
}

export interface IStudentData {
  prefixText: string;
  prefixTextColor: string;
  prefixBgColor: string;
  title: string;
  subTitle: string;
  suffixText: string;
  suffixTextColor: string;
  suffixBgColor: string;
}

export interface IFigmaDesignData2 {
  student: IStudentData;
  studentImage: string;
  english: number;
  comment: string;
}

export interface IGradeOneData {
  student: IStudentData;
  term1TotalScore: string;
  term1TotalGrade: number;
  classwork1Marks: number;
  classwork1Comment: string;
  classwork2Marks: number;
  classwork2Comment: string;
  homework1Marks: number;
  homework1Comment: string;
  homework2Marks: number;
  homework2Comment: string;
  classTest1Marks: number;
  classTest1Comment: string;
  classTest2Marks: number;
  classTest2Comment: string;
}
