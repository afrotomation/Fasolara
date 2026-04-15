export interface IOrderProps {
  index: number;
  order: {
    id: string;
    title: string;
    description: string;
    orderDate: string;
    userId: string;
    quantity: number;
    currency: string;
    purchaseCost: number;
    status: string;
  };
}

export interface IPanelProps {
  index: number;
  panel: {
    id: string;
    serialNumber: string;
    installCost: number;
    orderId: string;
    groupId: string;
    isActive: boolean;
    isInstalled: boolean;
    isReplacement: boolean;
    ratedCapacity: number;
    maintenanceDates: string[];
    createdAt: string;
    updatedAt: string;
  };
  user?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
