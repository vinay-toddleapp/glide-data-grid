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
  };
  company: {
    value: string;
    isDisabled?: boolean;
  };
  email: {
    value: string;
    isDisabled?: boolean;
  };
  phone: {
    value: string;
    isDisabled?: boolean;
  };
}

export interface IColumnsData {
  title: string;
  id: string;
}
