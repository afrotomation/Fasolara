export interface AddressValues {
  name?: string;
  address?: string;
  villageId?: string;
  locationId?: string;
  addressType?: string;
  mobileNumber?: string;
  dotcolor?: string;
}

export type AddressErrors = Partial<Record<keyof AddressValues, string>>;

export const validate = (values: AddressValues): AddressErrors => {
  const errors: AddressErrors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!values.address || values.address.trim().length < 3) {
    errors.address = "Address is required.";
  }
  if (!values.villageId) {
    errors.villageId = "Village is required.";
  }
  if (!values.addressType) {
    errors.addressType = "Address type is required.";
  }
  if (
    values.mobileNumber &&
    !/^\+?[\d\s-]{6,}$/.test(values.mobileNumber.trim())
  ) {
    errors.mobileNumber = "Invalid phone number.";
  }

  return errors;
};

export default validate;
