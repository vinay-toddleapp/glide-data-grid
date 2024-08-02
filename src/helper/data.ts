import {
  IColumnsData,
  ICustomTableData,
  IDataRow,
  IDisabledAndEditCell,
  IFigmaDesignData,
  IFigmaDesignData2,
} from "./interface";

export const data: IDataRow[] = [
  {
    name: "Alice Johnson",
    company: "TechCorp",
    email: "alice.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
  },
  {
    name: "Bob Smith",
    company: "InnovateX",
    email: "bob.smith@innovatex.com",
    phone: "+1 (555) 987-6543",
  },
  {
    name: "Carol White",
    company: "NextGen",
    email: "carol.white@nextgen.com",
    phone: "+1 (555) 321-0987",
  },
  {
    name: "David Brown",
    company: "SoftSolutions",
    email: "david.brown@softsolutions.com",
    phone: "+1 (555) 654-3210",
  },
  {
    name: "Eva Green",
    company: "BrightFuture",
    email: "eva.green@brightfuture.com",
    phone: "+1 (555) 432-1098",
  },
  {
    name: "Frank Wright",
    company: "TechWorld",
    email: "frank.wright@techworld.com",
    phone: "+1 (555) 678-1234",
  },
  {
    name: "Grace Lee",
    company: "FutureVision",
    email: "grace.lee@futurevision.com",
    phone: "+1 (555) 876-5432",
  },
  {
    name: "Henry Kim",
    company: "SmartIdeas",
    email: "henry.kim@smartideas.com",
    phone: "+1 (555) 210-9876",
  },
  {
    name: "Ivy Walker",
    company: "GreenEnergy",
    email: "ivy.walker@greenenergy.com",
    phone: "+1 (555) 345-6789",
  },
  {
    name: "Jack Harris",
    company: "EcoSolutions",
    email: "jack.harris@ecosolutions.com",
    phone: "+1 (555) 789-0123",
  },
];

export const columns: IColumnsData[] = [
  {
    title: "Name",
    id: "name",
  },
  {
    title: "Company",
    id: "company",
  },
  {
    title: "Email",
    id: "email",
  },
  {
    title: "Phone",
    id: "phone",
  },
];

export const disabledAndEditCellData: IDisabledAndEditCell[] = [
  {
    name: {
      value: "Alice Johnson",
      isDisabled: true,
    },
    company: {
      value: "TechCorp",
      isDisabled: false,
    },
    email: { value: "alice.johnson@techcorp.com", hasError: true },
    phone: { value: "+1 (555) 123-4567" },
  },
  {
    name: { value: "Bob Smith" },
    company: { value: "InnovateX" },
    email: { value: "bob.smith@innovatex.com", isDisabled: true },
    phone: { value: "+1 (555) 987-6543" },
  },
  {
    name: { value: "Carol White" },
    company: { value: "NextGen" },
    email: { value: "carol.white@nextgen.com" },
    phone: { value: "+1 (555) 321-0987", hasError: true },
  },
  {
    name: { value: "David Brown", hasError: true },
    company: { value: "SoftSolutions" },
    email: { value: "david.brown@softsolutions.com" },
    phone: { value: "+1 (555) 654-3210", isDisabled: true },
  },
];

export const customTableColumns: IColumnsData[] = [
  {
    title: "S.no",
    id: "s.no",
  },
  {
    title: "Task Name",
    id: "taskName",
  },
  {
    title: "Task Completed",
    id: "taskCompleted",
  },
  {
    title: "Assigned To",
    id: "assignedTo",
  },
];

export const customTableData: ICustomTableData[] = [
  {
    sNo: 1,
    taskName: "Develop Login Page",
    isCompleted: false,
    assignedTo: "Abhirup Bardhan",
  },
  {
    sNo: 2,
    taskName: "Database Optimization",
    isCompleted: true,
    assignedTo: "Abhirup Bardhan",
  },
  {
    sNo: 3,
    taskName: "API Integration",
    isCompleted: true,
    assignedTo: "Abhirup Bardhan",
  },
  {
    sNo: 4,
    taskName: "Fix UI Bugs",
    isCompleted: false,
    assignedTo: "Soumendu Prasad Sinha",
  },
  {
    sNo: 5,
    taskName: "Write Unit Tests",
    isCompleted: true,
    assignedTo: "Abhirup Bardhan",
  },
  {
    sNo: 6,
    taskName: "Deploy to Production",
    isCompleted: false,
    assignedTo: "Soumendu Prasad Sinha",
  },
  {
    sNo: 7,
    taskName: "Update Documentation",
    isCompleted: true,
    assignedTo: "Abhirup Bardhan",
  },
  {
    sNo: 8,
    taskName: "Code Review",
    isCompleted: true,
    assignedTo: "Vinay Pratap Singh",
  },
  {
    sNo: 9,
    taskName: "Implement Search Feature",
    isCompleted: true,
    assignedTo: "Satish Kumar Narava",
  },
  {
    sNo: 10,
    taskName: "Bug Fixing",
    isCompleted: true,
    assignedTo: "Satish Kumar Narava",
  },
];

export const figmaDesignColumn: IColumnsData[] = [
  { id: "student", title: "Student Name", width: 300 },
  { id: "english", title: "English (/10)", group: "Subjects", width: 200 },
  { id: "maths", title: "Maths (/10)", group: "Subjects", width: 200 },
  { id: "total", title: "Total", group: "Semester 1", width: 200 },
  { id: "percentage", title: "Percentage", group: "Semester 1", width: 200 },
];

export const figmaDesignData: IFigmaDesignData[] = [
  {
    student: {
      title: "Vinay Pratap Singh",
      subTitle: "ASE",
      prefixText: "VP",
      suffixText: "FE",
    },
    english: 7,
    maths: 9,
  },
  {
    student: {
      title: "Abhirup Bardhan",
      subTitle: "SE",
      prefixText: "AB",
      suffixText: "FE",
    },
    english: 10,
    maths: 9,
  },
  {
    student: {
      title: "Satish Kumar Narava",
      subTitle: "SE",
      prefixText: "SK",
      suffixText: "FE",
    },
    english: 8,
    maths: 6,
  },
  {
    student: {
      title: "Soumendu Prasad Sinha",
      subTitle: "SSE",
      prefixText: "SP",
      suffixText: "FE",
    },
    english: 6,
    maths: 9,
  },
];

export const figmaDesignColumn2: IColumnsData[] = [
  { id: "student", title: "Student name", width: 217 },
  { id: "/50", title: "(/50)", group: "English", width: 90 },
  { id: "comment", title: "Comment", group: "English", width: 90 },
];

export const figmaDesignData2: IFigmaDesignData2[] = [
  {
    student: {
      title: "Vinay Pratap",
      subTitle: "ASE",
      prefixText: "VP",
      prefixBgColor: "#E3E3FC",
      prefixTextColor: "#5050C5",
      suffixText: "FE",
      suffixBgColor: "#EBFFFA",
      suffixTextColor: "#1C725D",
    },
    english: 45,
    comment: "",
  },
  {
    student: {
      title: "Satish Kumar",
      subTitle: "SE",
      prefixText: "SK",
      prefixBgColor: "#E3E3FC",
      prefixTextColor: "#5050C5",
      suffixText: "FE",
      suffixBgColor: "#EBFFFA",
      suffixTextColor: "#1C725D",
    },
    english: 45,
    comment: "",
  },
  {
    student: {
      title: "Abhirup Bardhan",
      subTitle: "SE",
      prefixText: "AB",
      prefixBgColor: "#E3E3FC",
      prefixTextColor: "#5050C5",
      suffixText: "FE",
      suffixBgColor: "#EBFFFA",
      suffixTextColor: "#1C725D",
    },
    english: 45,
    comment: "",
  },
  {
    student: {
      title: "Soumendu",
      subTitle: "SSE",
      prefixText: "SP",
      prefixBgColor: "#E3E3FC",
      prefixTextColor: "#5050C5",
      suffixText: "FE",
      suffixBgColor: "#EBFFFA",
      suffixTextColor: "#1C725D",
    },
    english: 45,
    comment: "",
  },
];
