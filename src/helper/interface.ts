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
}
