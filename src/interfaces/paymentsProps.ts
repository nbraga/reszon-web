export interface ResponsePaymentsProps {
  company: {
    profile: { fantasyName: string };
    _id: string;
  };
  date: string;
  description: string;
  package: {
    _id: string;
    title: string;
  };
  paymentMethod: string;
  paymentType: string;
  promoterCode: string;
  status: boolean;
  value: number;
  _id: string;
}
