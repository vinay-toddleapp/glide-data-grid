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
  score: IFigmaDesignCellData;
  grade: IFigmaDesignCellData;
}
