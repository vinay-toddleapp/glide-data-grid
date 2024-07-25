import { IColumnsData, IDataRow, IDisabledAndEditCell } from "./interface";

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
    email: { value: "alice.johnson@techcorp.com" },
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
    phone: { value: "+1 (555) 321-0987" },
  },
  {
    name: { value: "David Brown" },
    company: { value: "SoftSolutions" },
    email: { value: "david.brown@softsolutions.com" },
    phone: { value: "+1 (555) 654-3210", isDisabled: true },
  },
];
